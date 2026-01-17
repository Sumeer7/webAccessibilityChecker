# 🌐 Web Accessibility Checker

A professional, open-source CLI tool for running comprehensive web accessibility audits using [axe-core](https://github.com/dequelabs/axe-core). Quickly identify WCAG violations, missing alt text, color contrast issues, ARIA problems, and more.

[![npm version](https://img.shields.io/npm/v/web-accessibility-checker.svg)](https://www.npmjs.com/package/web-accessibility-checker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

---

## 🎯 Why This Tool?

Web accessibility is crucial for ensuring everyone can use your website, regardless of disabilities. This tool helps you:

- **Automate accessibility testing** - Catch issues early in development
- **Meet WCAG standards** - Test against WCAG 2.0/2.1 Level A, AA, or AAA
- **Improve user experience** - Make your site usable for everyone
- **Save time** - Quick scans with detailed, actionable reports
- **CI/CD integration** - Fail builds on critical accessibility issues

---

## ✨ Features

- ✅ **Comprehensive scans** using industry-standard axe-core engine
- 📊 **Multiple output formats**: Console (colored), JSON, CSV
- 🎨 **Beautiful console output** with color-coded severity levels
- 🔍 **Detailed violation reports** with help URLs and affected elements
- 📸 **Screenshot capture** for visual reference
- ⚙️ **Configurable WCAG levels** (A, AA, AAA)
- 🚀 **Fast and headless** using Playwright
- 💻 **Easy CLI interface** - simple to use, powerful results
- 📦 **Zero configuration** required - works out of the box
- 🔧 **Programmatic API** for custom integrations

---

## 📦 Installation

### Global Installation (Recommended for CLI usage)

```bash
npm install -g web-accessibility-checker
```

### Local Installation (For project-specific use)

```bash
npm install --save-dev web-accessibility-checker
```

### Run without installation (using npx)

```bash
npx web-accessibility-checker <url>
```

---

## 🚀 Quick Start

### Basic Usage

```bash
# Scan a website
web-accessibility-checker https://example.com

# Or use the shorter alias
a11y-check https://example.com
```

### With Options

```bash
# Scan with WCAG AA and AAA levels
web-accessibility-checker https://example.com --wcag AA,AAA

# Save JSON and CSV reports
web-accessibility-checker https://example.com --output ./reports/scan.json --csv

# Capture a screenshot
web-accessibility-checker https://example.com --screenshot

# Verbose output (show details even if no issues)
web-accessibility-checker https://example.com --verbose

# Complete example
web-accessibility-checker https://example.com \
  --wcag AA,AAA \
  --output ./reports/scan.json \
  --csv \
  --screenshot \
  --timeout 60000 \
  --verbose
```

---

## 📋 CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `<url>` | - | **Required.** URL of the website to check | - |
| `--output <path>` | `-o` | Path to save JSON report | Auto-generated |
| `--csv` | `-c` | Also generate a CSV summary report | `false` |
| `--screenshot` | `-s` | Capture a screenshot of the page | `false` |
| `--timeout <ms>` | `-t` | Page load timeout in milliseconds | `30000` |
| `--wcag <levels>` | `-w` | WCAG levels to check (A, AA, AAA) | `AA` |
| `--verbose` | `-v` | Show detailed output | `false` |
| `--no-json` | - | Skip JSON report generation | `false` |
| `--help` | `-h` | Display help information | - |
| `--version` | `-V` | Display version number | - |

---

## 📊 Example Output

### Console Output

```
════════════════════════════════════════════════════════════════════════════════
  WEB ACCESSIBILITY CHECKER - SCAN REPORT
════════════════════════════════════════════════════════════════════════════════

📊 SUMMARY
────────────────────────────────────────────────────────────────────────────────
URL: https://example.com
Scanned at: 1/18/2026, 10:30:45 AM
Total Issues: 12

Issues by Severity:
  ● Critical: 2
  ● Serious:  5
  ● Moderate: 3
  ● Minor:    2

🔍 DETAILED VIOLATIONS
────────────────────────────────────────────────────────────────────────────────

1. 🔴 CRITICAL color-contrast
   Description: Elements must have sufficient color contrast
   Help: Ensures the contrast between foreground and background colors meets WCAG
   Learn more: https://dequeuniversity.com/rules/axe/4.10/color-contrast
   WCAG Tags: wcag2aa, wcag143
   Affected elements: 3 instance(s)
      [1] div > p.text-gray-400
          <p class="text-gray-400">Low contrast text</p>
   ...

────────────────────────────────────────────────────────────────────────────────
Tests passed: 45 | Incomplete: 2 | Not applicable: 78
════════════════════════════════════════════════════════════════════════════════

⚠️  Found 12 accessibility issue(s). Review and fix before deployment.

📄 JSON report saved to: reports/accessibility_example_com_2026-01-18.json
```

### JSON Report Structure

```json
{
  "metadata": {
    "url": "https://example.com",
    "timestamp": "2026-01-18T10:30:45.123Z",
    "scannedAt": "1/18/2026, 10:30:45 AM"
  },
  "summary": {
    "totalViolations": 12,
    "violationTypes": 8,
    "critical": 2,
    "serious": 5,
    "moderate": 3,
    "minor": 2,
    "passes": 45,
    "incomplete": 2,
    "inapplicable": 78
  },
  "violations": [
    {
      "id": "color-contrast",
      "impact": "critical",
      "description": "Elements must have sufficient color contrast",
      "help": "Ensures the contrast between foreground and background...",
      "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/color-contrast",
      "tags": ["wcag2aa", "wcag143"],
      "affectedElements": 3,
      "nodes": [...]
    }
  ]
}
```

---

## 💻 Programmatic API

You can also use this tool programmatically in your Node.js applications:

```typescript
import { scan, scanAndReport, AccessibilityScanner } from 'web-accessibility-checker';

// Simple scan
const result = await scan('https://example.com');
console.log(result.violations);

// Scan with options
const result = await scan('https://example.com', {
  wcagLevel: ['AA', 'AAA'],
  timeout: 60000,
  verbose: true
});

// Scan and automatically generate reports
await scanAndReport('https://example.com', {
  outputPath: './reports/scan.json',
  screenshot: true
});

// Advanced usage with manual control
const scanner = new AccessibilityScanner();
try {
  const result = await scanner.scan({
    url: 'https://example.com',
    wcagLevel: ['AA'],
    timeout: 30000
  });
  
  // Process results...
  console.log(`Found ${result.violations.length} violation types`);
} finally {
  await scanner.close();
}
```

---

## 🔧 Common Checks Performed

This tool automatically checks for:

- **Missing alt text** on images
- **Form labels** and accessibility
- **Color contrast** ratios (WCAG AA/AAA)
- **Keyboard navigation** support
- **ARIA** attributes and roles
- **Heading hierarchy** issues
- **Link text** clarity
- **Page language** declaration
- **Semantic HTML** usage
- **Focus management**
- **Skip links** for navigation
- And 90+ other accessibility rules

---

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: Accessibility Check

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install -g web-accessibility-checker
      
      - name: Run accessibility scan
        run: web-accessibility-checker https://your-site.com --output ./a11y-report.json
      
      - name: Upload report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: accessibility-report
          path: a11y-report.json
```

### Exit Codes

- `0` - No violations found
- `1` - Non-critical violations found
- `2` - Critical violations found
- `3` - Error during scan

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/web-accessibility-checker.git
cd web-accessibility-checker

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev https://example.com

# Run linter
npm run lint

# Format code
npm run format
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [axe-core](https://github.com/dequelabs/axe-core) by Deque Systems
- Powered by [Playwright](https://playwright.dev/)
- Inspired by the need for accessible web experiences for all users

---

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/) - Web accessibility resources
- [a11y Project](https://www.a11yproject.com/) - Community-driven accessibility guide
- [Deque University](https://dequeuniversity.com/) - Accessibility training

---

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/yourusername/web-accessibility-checker/issues) page.

---

## 💬 Support

If you find this tool helpful, please consider:
- ⭐ Starring the repository
- 🐦 Sharing on social media
- 🤝 Contributing improvements
- 📝 Writing about your experience

**Making the web accessible for everyone! 🌍♿**

