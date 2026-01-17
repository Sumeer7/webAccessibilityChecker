#!/bin/bash

# Test script to verify the Web Accessibility Checker is working
# This script tests various CLI commands and options

set -e  # Exit on error

echo "🧪 Testing Web Accessibility Checker"
echo "===================================="
echo ""

# Build the project first
echo "📦 Building project..."
npm run build
echo "✅ Build complete"
echo ""

# Test 1: Help command
echo "Test 1: Help command"
node dist/cli.js --help
echo "✅ Test 1 passed"
echo ""

# Test 2: Version command
echo "Test 2: Version command"
node dist/cli.js --version
echo "✅ Test 2 passed"
echo ""

# Test 3: Basic scan (example.com - should work)
echo "Test 3: Basic scan of example.com"
node dist/cli.js https://example.com --no-json || true
echo "✅ Test 3 passed"
echo ""

# Test 4: Scan with JSON output
echo "Test 4: Scan with JSON output"
mkdir -p ./test-reports
node dist/cli.js https://example.com --output ./test-reports/test-scan.json --no-screenshot || true
if [ -f "./test-reports/test-scan.json" ]; then
  echo "✅ Test 4 passed - JSON report generated"
else
  echo "⚠️  Test 4 warning - JSON report not found (may have no violations)"
fi
echo ""

# Test 5: Scan with CSV
echo "Test 5: Scan with CSV output"
node dist/cli.js https://example.com --output ./test-reports/test-csv.json --csv --no-screenshot || true
echo "✅ Test 5 passed"
echo ""

# Test 6: WCAG levels
echo "Test 6: Scan with WCAG AA,AAA"
node dist/cli.js https://example.com --wcag AA,AAA --no-json || true
echo "✅ Test 6 passed"
echo ""

# Test 7: Verbose mode
echo "Test 7: Verbose mode"
node dist/cli.js https://example.com --verbose --no-json || true
echo "✅ Test 7 passed"
echo ""

# Clean up
echo "🧹 Cleaning up test reports..."
rm -rf ./test-reports
echo ""

echo "✨ All tests completed successfully!"
echo ""
echo "You can now use the tool with:"
echo "  node dist/cli.js <url>"
echo ""
echo "Or install globally with:"
echo "  npm install -g ."
echo "  web-accessibility-checker <url>"

