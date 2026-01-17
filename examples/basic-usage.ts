/**
 * Examples of using Web Accessibility Checker programmatically
 */

import {
  scan,
  scanAndReport,
  AccessibilityScanner,
  JsonReporter,
  ConsoleReporter,
} from '../src/index';

/**
 * Example 1: Simple scan
 */
async function example1() {
  console.log('\n=== Example 1: Simple Scan ===\n');

  const result = await scan('https://example.com');

  console.log(`Found ${result.violations.length} violation types`);
  console.log(`Total issues: ${result.violations.reduce((sum, v) => sum + v.nodes.length, 0)}`);
}

/**
 * Example 2: Scan with options
 */
async function example2() {
  console.log('\n=== Example 2: Scan with Options ===\n');

  const result = await scan('https://example.com', {
    wcagLevel: ['AA', 'AAA'],
    timeout: 60000,
    verbose: true,
  });

  // Filter critical issues
  const criticalIssues = result.violations.filter((v) => v.impact === 'critical');
  console.log(`Critical issues: ${criticalIssues.length}`);
}

/**
 * Example 3: Scan and generate reports
 */
async function example3() {
  console.log('\n=== Example 3: Scan and Generate Reports ===\n');

  await scanAndReport('https://example.com', {
    outputPath: './reports/example-scan.json',
    screenshot: true,
    verbose: true,
  });
}

/**
 * Example 4: Advanced usage with manual control
 */
async function example4() {
  console.log('\n=== Example 4: Advanced Usage ===\n');

  const scanner = new AccessibilityScanner();

  try {
    const result = await scanner.scan({
      url: 'https://example.com',
      wcagLevel: ['AA'],
      timeout: 30000,
    });

    // Custom processing
    const violations = result.violations;

    // Group by impact
    const byImpact = violations.reduce(
      (acc, v) => {
        acc[v.impact] = (acc[v.impact] || 0) + v.nodes.length;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log('Violations by impact:', byImpact);

    // Save custom report
    await JsonReporter.saveReport(result, './reports/custom-report.json');

    // Display in console
    ConsoleReporter.printReport(result, true);
  } finally {
    await scanner.close();
  }
}

/**
 * Example 5: Batch scanning multiple URLs
 */
async function example5() {
  console.log('\n=== Example 5: Batch Scanning ===\n');

  const urls = [
    'https://example.com',
    'https://example.org',
    'https://example.net',
  ];

  for (const url of urls) {
    console.log(`\nScanning: ${url}`);
    const result = await scan(url, { timeout: 20000 });
    console.log(
      `  - Violations: ${result.violations.reduce((sum, v) => sum + v.nodes.length, 0)}`
    );
  }
}

/**
 * Example 6: Error handling
 */
async function example6() {
  console.log('\n=== Example 6: Error Handling ===\n');

  const scanner = new AccessibilityScanner();

  try {
    const result = await scanner.scan({
      url: 'https://invalid-url-that-does-not-exist.xyz',
      timeout: 10000,
    });
    console.log('Scan completed:', result);
  } catch (error) {
    console.error('Scan failed:', (error as Error).message);
    // Handle error gracefully
  } finally {
    await scanner.close();
  }
}

// Run examples (uncomment the one you want to try)
(async () => {
  try {
    // await example1();
    // await example2();
    // await example3();
    // await example4();
    // await example5();
    // await example6();

    console.log('\n✅ Examples completed!\n');
  } catch (error) {
    console.error('Error running examples:', error);
    process.exit(1);
  }
})();

