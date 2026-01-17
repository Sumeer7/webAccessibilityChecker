/**
 * JSON reporter for saving scan results to files
 */

import * as fs from 'fs';
import * as path from 'path';
import { ScanResult } from '../types';

export class JsonReporter {
  /**
   * Ensure the output directory exists
   */
  private static ensureDirectoryExists(filePath: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Generate a default output path based on URL and timestamp
   */
  static generateOutputPath(url: string): string {
    const sanitizedUrl = url
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9]/gi, '_')
      .substring(0, 50);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    return path.join(process.cwd(), 'reports', `accessibility_${sanitizedUrl}_${timestamp}.json`);
  }

  /**
   * Save scan results to a JSON file
   * @param result - The scan results to save
   * @param outputPath - Path where the JSON file should be saved
   */
  static async saveReport(result: ScanResult, outputPath?: string): Promise<string> {
    const finalPath = outputPath || this.generateOutputPath(result.url);

    this.ensureDirectoryExists(finalPath);

    // Create a formatted JSON report
    const report = {
      metadata: {
        url: result.url,
        timestamp: result.timestamp,
        scannedAt: new Date(result.timestamp).toLocaleString(),
      },
      summary: {
        totalViolations: result.violations.reduce((sum, v) => sum + v.nodes.length, 0),
        violationTypes: result.violations.length,
        critical: result.violations.filter((v) => v.impact === 'critical').reduce((sum, v) => sum + v.nodes.length, 0),
        serious: result.violations.filter((v) => v.impact === 'serious').reduce((sum, v) => sum + v.nodes.length, 0),
        moderate: result.violations.filter((v) => v.impact === 'moderate').reduce((sum, v) => sum + v.nodes.length, 0),
        minor: result.violations.filter((v) => v.impact === 'minor').reduce((sum, v) => sum + v.nodes.length, 0),
        passes: result.passes,
        incomplete: result.incomplete,
        inapplicable: result.inapplicable,
      },
      violations: result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        tags: violation.tags,
        affectedElements: violation.nodes.length,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          html: node.html,
          failureSummary: node.failureSummary,
        })),
      })),
      testDetails: {
        passes: result.passes,
        incomplete: result.incomplete,
        inapplicable: result.inapplicable,
      },
    };

    // Write to file with pretty formatting
    fs.writeFileSync(finalPath, JSON.stringify(report, null, 2), 'utf-8');

    return finalPath;
  }

  /**
   * Save a simple CSV summary of violations
   */
  static async saveCsvSummary(result: ScanResult, outputPath?: string): Promise<string> {
    const csvPath =
      outputPath?.replace('.json', '.csv') ||
      this.generateOutputPath(result.url).replace('.json', '.csv');

    this.ensureDirectoryExists(csvPath);

    // CSV Header
    const headers = ['ID', 'Impact', 'Description', 'Help', 'Help URL', 'Affected Elements'];
    const rows = [headers.join(',')];

    // Add each violation as a row
    result.violations.forEach((violation) => {
      const row = [
        `"${violation.id}"`,
        `"${violation.impact}"`,
        `"${violation.description.replace(/"/g, '""')}"`,
        `"${violation.help.replace(/"/g, '""')}"`,
        `"${violation.helpUrl}"`,
        violation.nodes.length,
      ];
      rows.push(row.join(','));
    });

    fs.writeFileSync(csvPath, rows.join('\n'), 'utf-8');

    return csvPath;
  }
}

