/**
 * Main entry point for programmatic usage
 * Export all public APIs
 */

export { AccessibilityScanner } from './scanner';
export { ConsoleReporter } from './reporters/console-reporter';
export { JsonReporter } from './reporters/json-reporter';
export type {
  Violation,
  ViolationNode,
  ViolationImpact,
  WCAGLevel,
  ScanResult,
  ScanSummary,
  ToolOptions,
} from './types';

// Re-export for convenience
import { AccessibilityScanner } from './scanner';
import { ConsoleReporter } from './reporters/console-reporter';
import { JsonReporter } from './reporters/json-reporter';
import { ToolOptions } from './types';

/**
 * Quick scan function for simple use cases
 * @param url - URL to scan
 * @param options - Optional configuration
 */
export async function scan(url: string, options?: Partial<ToolOptions>) {
  const scanner = new AccessibilityScanner();
  try {
    const result = await scanner.scan({
      url,
      ...options,
    } as ToolOptions);
    return result;
  } finally {
    await scanner.close();
  }
}

/**
 * Scan and automatically generate reports
 * @param url - URL to scan
 * @param options - Optional configuration
 */
export async function scanAndReport(url: string, options?: Partial<ToolOptions>) {
  const scanner = new AccessibilityScanner();
  try {
    const result = await scanner.scan({
      url,
      ...options,
    } as ToolOptions);

    // Display console report
    ConsoleReporter.printReport(result, options?.verbose);

    // Save JSON report
    if (options?.outputPath) {
      await JsonReporter.saveReport(result, options.outputPath);
    }

    return result;
  } finally {
    await scanner.close();
  }
}

