/**
 * Console reporter for formatting and displaying scan results
 */

import chalk from 'chalk';
import { ScanResult, ScanSummary, Violation } from '../types';

export class ConsoleReporter {
  /**
   * Generate summary statistics from scan results
   */
  private static generateSummary(result: ScanResult): ScanSummary {
    const summary: ScanSummary = {
      totalViolations: result.violations.reduce((sum, v) => sum + v.nodes.length, 0),
      critical: 0,
      serious: 0,
      moderate: 0,
      minor: 0,
      url: result.url,
      timestamp: result.timestamp,
    };

    result.violations.forEach((violation) => {
      const count = violation.nodes.length;
      switch (violation.impact) {
        case 'critical':
          summary.critical += count;
          break;
        case 'serious':
          summary.serious += count;
          break;
        case 'moderate':
          summary.moderate += count;
          break;
        case 'minor':
          summary.minor += count;
          break;
      }
    });

    return summary;
  }

  /**
   * Get colored label for impact level
   */
  private static getImpactLabel(impact: string): string {
    switch (impact) {
      case 'critical':
        return chalk.red.bold('🔴 CRITICAL');
      case 'serious':
        return chalk.red('🟠 SERIOUS');
      case 'moderate':
        return chalk.yellow('🟡 MODERATE');
      case 'minor':
        return chalk.blue('🔵 MINOR');
      default:
        return chalk.gray(impact.toUpperCase());
    }
  }

  /**
   * Print formatted header
   */
  private static printHeader(): void {
    console.log('\n' + chalk.cyan.bold('═'.repeat(80)));
    console.log(chalk.cyan.bold('  WEB ACCESSIBILITY CHECKER - SCAN REPORT'));
    console.log(chalk.cyan.bold('═'.repeat(80)) + '\n');
  }

  /**
   * Print scan summary
   */
  private static printSummary(summary: ScanSummary): void {
    console.log(chalk.bold('📊 SUMMARY'));
    console.log(chalk.gray('─'.repeat(80)));
    console.log(`${chalk.bold('URL:')} ${summary.url}`);
    console.log(`${chalk.bold('Scanned at:')} ${new Date(summary.timestamp).toLocaleString()}`);
    console.log(
      `${chalk.bold('Total Issues:')} ${summary.totalViolations > 0 ? chalk.red(summary.totalViolations) : chalk.green(summary.totalViolations)}`
    );
    console.log('');

    if (summary.totalViolations > 0) {
      console.log(chalk.bold('Issues by Severity:'));
      if (summary.critical > 0) {
        console.log(`  ${chalk.red('●')} Critical: ${chalk.red.bold(summary.critical)}`);
      }
      if (summary.serious > 0) {
        console.log(`  ${chalk.red('●')} Serious:  ${chalk.red(summary.serious)}`);
      }
      if (summary.moderate > 0) {
        console.log(`  ${chalk.yellow('●')} Moderate: ${chalk.yellow(summary.moderate)}`);
      }
      if (summary.minor > 0) {
        console.log(`  ${chalk.blue('●')} Minor:    ${chalk.blue(summary.minor)}`);
      }
    }

    console.log('');
  }

  /**
   * Print detailed violations
   */
  private static printViolations(violations: Violation[]): void {
    if (violations.length === 0) {
      console.log(chalk.green.bold('✅ No accessibility violations found!\n'));
      return;
    }

    console.log(chalk.bold('🔍 DETAILED VIOLATIONS'));
    console.log(chalk.gray('─'.repeat(80)) + '\n');

    violations.forEach((violation, index) => {
      console.log(
        `${chalk.bold(`${index + 1}.`)} ${this.getImpactLabel(violation.impact)} ${chalk.bold(violation.id)}`
      );
      console.log(`   ${chalk.bold('Description:')} ${violation.description}`);
      console.log(`   ${chalk.bold('Help:')} ${violation.help}`);
      console.log(`   ${chalk.bold('Learn more:')} ${chalk.cyan.underline(violation.helpUrl)}`);
      console.log(
        `   ${chalk.bold('WCAG Tags:')} ${violation.tags.filter((t) => t.startsWith('wcag')).join(', ')}`
      );
      console.log(
        `   ${chalk.bold('Affected elements:')} ${chalk.red(violation.nodes.length)} instance(s)`
      );

      // Show first 3 affected elements
      violation.nodes.slice(0, 3).forEach((node, nodeIndex) => {
        console.log(`   ${chalk.gray(`   [${nodeIndex + 1}]`)} ${chalk.gray(node.target.join(' > '))}`);
        const truncatedHtml =
          node.html.length > 100 ? node.html.substring(0, 100) + '...' : node.html;
        console.log(`       ${chalk.dim(truncatedHtml)}`);
      });

      if (violation.nodes.length > 3) {
        console.log(
          chalk.gray(`   ... and ${violation.nodes.length - 3} more instance(s)`)
        );
      }

      console.log('');
    });
  }

  /**
   * Print footer
   */
  private static printFooter(result: ScanResult): void {
    console.log(chalk.gray('─'.repeat(80)));
    console.log(
      `${chalk.bold('Tests passed:')} ${chalk.green(result.passes)} | ` +
        `${chalk.bold('Incomplete:')} ${result.incomplete} | ` +
        `${chalk.bold('Not applicable:')} ${result.inapplicable}`
    );
    console.log(chalk.cyan('═'.repeat(80)) + '\n');
  }

  /**
   * Print complete formatted report to console
   */
  static printReport(result: ScanResult, verbose: boolean = false): void {
    const summary = this.generateSummary(result);

    this.printHeader();
    this.printSummary(summary);

    if (verbose || summary.totalViolations > 0) {
      this.printViolations(result.violations);
    }

    this.printFooter(result);

    // Exit code suggestion
    if (summary.totalViolations > 0) {
      console.log(
        chalk.yellow(
          `⚠️  Found ${summary.totalViolations} accessibility issue(s). Review and fix before deployment.`
        )
      );
    } else {
      console.log(chalk.green.bold('✨ Great job! No accessibility violations detected.'));
    }
    console.log('');
  }

  /**
   * Print error message
   */
  static printError(message: string, error?: Error): void {
    console.error(chalk.red.bold('\n❌ ERROR'));
    console.error(chalk.red(message));
    if (error && error.message) {
      console.error(chalk.gray(error.message));
    }
    console.error('');
  }
}

