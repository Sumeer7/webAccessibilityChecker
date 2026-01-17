/**
 * Core accessibility scanner using axe-core
 */

import { chromium, Browser, Page } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { ScanResult, ToolOptions, Violation } from './types';

export class AccessibilityScanner {
  private browser: Browser | null = null;
  private page: Page | null = null;

  /**
   * Initialize the browser instance
   */
  private async initBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
      });
    }
  }

  /**
   * Create a new page with configured settings
   */
  private async createPage(): Promise<Page> {
    await this.initBrowser();
    const context = await this.browser!.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    this.page = await context.newPage();
    return this.page;
  }

  /**
   * Navigate to URL with timeout handling
   */
  private async navigateToUrl(url: string, timeout: number = 30000): Promise<void> {
    if (!this.page) {
      throw new Error('Page not initialized. Call createPage() first.');
    }

    try {
      await this.page.goto(url, {
        waitUntil: 'networkidle',
        timeout,
      });
    } catch (error) {
      // Try with domcontentloaded if networkidle fails
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout,
      });
    }
  }

  /**
   * Run accessibility scan on a URL
   * @param options - Configuration options for the scan
   * @returns Complete scan results
   */
  async scan(options: ToolOptions): Promise<ScanResult> {
    try {
      console.log(`🔍 Scanning: ${options.url}`);

      // Create page and navigate
      const page = await this.createPage();
      await this.navigateToUrl(options.url, options.timeout);

      // Build axe scanner with options
      const axeBuilder = new AxeBuilder({ page });

      // Apply WCAG level filters if specified
      if (options.wcagLevel && options.wcagLevel.length > 0) {
        const tags = options.wcagLevel.map((level) => `wcag2${level.toLowerCase()}`);
        axeBuilder.withTags(tags);
      }

      // Run the accessibility scan
      const results = await axeBuilder.analyze();

      // Take screenshot if requested
      if (options.screenshot && options.outputPath) {
        const screenshotPath = options.outputPath.replace('.json', '.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot saved to: ${screenshotPath}`);
      }

      // Transform results to our format
      const violations: Violation[] = results.violations.map((v) => ({
        id: v.id,
        impact: v.impact as any,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        tags: v.tags,
        nodes: v.nodes.map((node) => ({
          html: node.html,
          target: node.target,
          failureSummary: node.failureSummary,
        })),
      }));

      return {
        url: options.url,
        timestamp: new Date().toISOString(),
        violations,
        passes: results.passes.length,
        incomplete: results.incomplete.length,
        inapplicable: results.inapplicable.length,
        toolOptions: options,
      };
    } catch (error) {
      console.error('❌ Error during scan:', error);
      throw error;
    }
  }

  /**
   * Clean up browser resources
   */
  async close(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

