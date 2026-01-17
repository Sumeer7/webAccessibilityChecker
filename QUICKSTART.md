# 🚀 Quick Start Guide

Get up and running with Web Accessibility Checker in 5 minutes!

## Installation

```bash
npm install -g web-accessibility-checker
```

## Your First Scan

```bash
# Scan any website
web-accessibility-checker https://example.com
```

That's it! You'll see a detailed accessibility report in your terminal.

## Common Use Cases

### 1. Scan with Report Files

```bash
# Generate JSON and CSV reports
web-accessibility-checker https://example.com \
  --output ./reports/scan.json \
  --csv
```

### 2. Check WCAG Compliance

```bash
# Check WCAG Level AA (default)
web-accessibility-checker https://example.com

# Check multiple WCAG levels
web-accessibility-checker https://example.com --wcag AA,AAA
```

### 3. Capture Screenshots

```bash
# Save a screenshot with the scan
web-accessibility-checker https://example.com --screenshot
```

### 4. CI/CD Integration

```bash
# The tool exits with appropriate codes:
# 0 = no issues, 1 = issues found, 2 = critical issues, 3 = error

web-accessibility-checker https://staging.mysite.com
if [ $? -eq 0 ]; then
  echo "✅ Accessibility check passed!"
else
  echo "❌ Accessibility issues found!"
  exit 1
fi
```

## Understanding the Output

### Console Report Sections

1. **Summary** - Overview of total issues and breakdown by severity
2. **Detailed Violations** - Each issue with:
   - Impact level (Critical, Serious, Moderate, Minor)
   - Description and help text
   - Link to learn more
   - WCAG tags
   - Affected HTML elements

3. **Footer** - Test statistics (passed, incomplete, not applicable)

### Severity Levels

- 🔴 **Critical** - Must fix immediately (blocks users)
- 🟠 **Serious** - Major accessibility barrier
- 🟡 **Moderate** - Impacts some users
- 🔵 **Minor** - Best practice violation

## Next Steps

1. **Review Issues** - Start with Critical and Serious violations
2. **Learn More** - Click the help URLs for each violation
3. **Fix Issues** - Update your HTML/CSS/JavaScript
4. **Re-scan** - Verify your fixes
5. **Automate** - Add to your CI/CD pipeline

## Common Checks

This tool automatically checks for:
- ✅ Missing alt text on images
- ✅ Form labels and ARIA attributes
- ✅ Color contrast ratios
- ✅ Keyboard navigation
- ✅ Heading hierarchy
- ✅ Link text clarity
- ✅ And 90+ other rules!

## Programmatic Usage

Create a Node.js script:

```javascript
// scan.js
const { scan } = require('web-accessibility-checker');

(async () => {
  const result = await scan('https://example.com');
  console.log(`Found ${result.violations.length} issue types`);
})();
```

Run it:
```bash
node scan.js
```

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🐛 Report issues on [GitHub](https://github.com/yourusername/web-accessibility-checker/issues)
- 💬 Ask questions in [Discussions](https://github.com/yourusername/web-accessibility-checker/discussions)

**Happy accessibility testing! 🌐♿**

