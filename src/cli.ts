#!/usr/bin/env node

/**
 * CLI interface for the Web Accessibility Checker
 */

import { Command } from 'commander';
import { AccessibilityScanner } from './scanner';
import { ConsoleReporter } from './reporters/console-reporter';
import { JsonReporter } from './reporters/json-reporter';
import { ToolOptions, WCAGLevel } from './types';

const program = new Command();

program
  .name('web-accessibility-checker')
  .description('Professional CLI tool for web accessibility audits using axe-core')
  .version('1.0.0')
  .argument('<url>', 'URL of the website to check')
  .option('-o, --output <path>', 'Path to save JSON report')
  .option('-c, --csv', 'Also generate a CSV summary report')
  .option('-s, --screenshot', 'Capture a screenshot of the page')
  .option('-t, --timeout <ms>', 'Page load timeout in milliseconds', '30000')
  .option(
    '-w, --wcag <levels>',
    'WCAG levels to check (A, AA, AAA). Comma-separated for multiple',
    'AA'
  )
  .option('-v, --verbose', 'Show detailed output even if no violations found')
  .option('--no-json', 'Skip JSON report generation (only show console output)')
  .action(async (url: string, options) => {
    const scanner = new AccessibilityScanner();

    try {
      // Validate URL
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      // Parse WCAG levels
      const wcagLevels = options.wcag
        .split(',')
        .map((level: string) => level.trim().toUpperCase())
        .filter((level: string) => ['A', 'AA', 'AAA'].includes(level)) as WCAGLevel[];

      if (wcagLevels.length === 0) {
        wcagLevels.push('AA'); // Default to AA
      }

      // Build tool options
      const toolOptions: ToolOptions = {
        url,
        timeout: parseInt(options.timeout, 10),
        wcagLevel: wcagLevels,
        outputPath: options.output,
        verbose: options.verbose || false,
        screenshot: options.screenshot || false,
      };

      console.log(
        `\n🚀 Starting accessibility scan for: ${url}\n` +
          `   WCAG Levels: ${wcagLevels.join(', ')}\n`
      );

      // Run the scan
      const result = await scanner.scan(toolOptions);

      // Display console report
      ConsoleReporter.printReport(result, toolOptions.verbose);

      // Save JSON report if enabled
      if (options.json !== false) {
        const jsonPath = await JsonReporter.saveReport(result, options.output);
        console.log(`📄 JSON report saved to: ${jsonPath}`);

        // Save CSV if requested
        if (options.csv) {
          const csvPath = await JsonReporter.saveCsvSummary(result, options.output);
          console.log(`📊 CSV summary saved to: ${csvPath}`);
        }
      }

      // Exit with appropriate code
      const totalViolations = result.violations.reduce((sum, v) => sum + v.nodes.length, 0);
      const criticalIssues = result.violations.filter((v) => v.impact === 'critical').length;

      if (criticalIssues > 0) {
        process.exit(2); // Critical issues found
      } else if (totalViolations > 0) {
        process.exit(1); // Non-critical issues found
      } else {
        process.exit(0); // No issues
      }
    } catch (error) {
      ConsoleReporter.printError(
        'Failed to complete accessibility scan',
        error as Error
      );
      process.exit(3); // Error during scan
    } finally {
      await scanner.close();
    }
  });

// Parse command line arguments
program.parse(process.argv);

