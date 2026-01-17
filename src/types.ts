/**
 * Type definitions for the Web Accessibility Checker
 */

/**
 * Severity levels for accessibility violations
 */
export type ViolationImpact = 'minor' | 'moderate' | 'serious' | 'critical';

/**
 * WCAG conformance levels
 */
export type WCAGLevel = 'A' | 'AA' | 'AAA';

/**
 * Individual accessibility violation node
 */
export interface ViolationNode {
  html: string;
  target: any; // Can be string[] or complex selector types from axe
  failureSummary?: string;
}

/**
 * Accessibility violation found on a page
 */
export interface Violation {
  id: string;
  impact: ViolationImpact;
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
  nodes: ViolationNode[];
}

/**
 * Complete accessibility scan result
 */
export interface ScanResult {
  url: string;
  timestamp: string;
  violations: Violation[];
  passes: number;
  incomplete: number;
  inapplicable: number;
  toolOptions: ToolOptions;
}

/**
 * Configuration options for the accessibility checker
 */
export interface ToolOptions {
  url: string;
  timeout?: number;
  wcagLevel?: WCAGLevel[];
  outputPath?: string;
  verbose?: boolean;
  screenshot?: boolean;
}

/**
 * Summary statistics for the scan
 */
export interface ScanSummary {
  totalViolations: number;
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
  url: string;
  timestamp: string;
}

