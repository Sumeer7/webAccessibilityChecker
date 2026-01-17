# 🚀 Getting Started with Web Accessibility Checker

Welcome! This guide will help you get up and running quickly.

## 📚 What You'll Learn

1. How to install the tool
2. How to run your first accessibility scan
3. How to interpret the results
4. Common use cases and workflows
5. Next steps for deeper integration

---

## Step 1: Installation (2 minutes)

### Quick Install

```bash
npm install -g web-accessibility-checker
```

### Verify Installation

```bash
web-accessibility-checker --version
```

You should see: `1.0.0` (or current version)

> **Troubleshooting:** See [INSTALLATION.md](INSTALLATION.md) for detailed installation instructions and troubleshooting.

---

## Step 2: Your First Scan (1 minute)

Let's scan a simple website:

```bash
web-accessibility-checker https://example.com
```

You'll see output like this:

```
🔍 Scanning: https://example.com

════════════════════════════════════════════════════════════════════════════════
  WEB ACCESSIBILITY CHECKER - SCAN REPORT
════════════════════════════════════════════════════════════════════════════════

📊 SUMMARY
────────────────────────────────────────────────────────────────────────────────
URL: https://example.com
Scanned at: 1/18/2026, 10:30:45 AM
Total Issues: 0

✅ Great job! No accessibility violations detected.
```

---

## Step 3: Understanding the Output (5 minutes)

### Report Structure

The report has three main sections:

#### 1. **Summary Section**
- URL scanned
- Timestamp
- Total number of issues
- Breakdown by severity (Critical, Serious, Moderate, Minor)

#### 2. **Detailed Violations** (if any)
Each violation shows:
- **Impact Level** - How severe the issue is
- **Description** - What the problem is
- **Help Text** - How to fix it
- **Help URL** - Link to detailed documentation
- **WCAG Tags** - Which WCAG criteria are violated
- **Affected Elements** - HTML elements with the issue

#### 3. **Test Statistics**
- Tests passed
- Incomplete tests
- Not applicable tests

### Severity Levels Explained

| Level | Icon | Meaning | Action |
|-------|------|---------|--------|
| Critical | 🔴 | Blocks users completely | Fix immediately |
| Serious | 🟠 | Major accessibility barrier | High priority fix |
| Moderate | 🟡 | Impacts some users | Medium priority |
| Minor | 🔵 | Best practice violation | Low priority |

---

## Step 4: Common Workflows (10 minutes)

### Workflow 1: Development Testing

Check your local development site:

```bash
# Start your dev server first (e.g., localhost:3000)
web-accessibility-checker http://localhost:3000 --verbose
```

### Workflow 2: Pre-Deployment Check

Before deploying, save a report:

```bash
web-accessibility-checker https://staging.mysite.com \
  --output ./reports/pre-deploy.json \
  --csv \
  --screenshot
```

This creates:
- `pre-deploy.json` - Detailed JSON report
- `pre-deploy.csv` - Quick summary
- `pre-deploy.png` - Screenshot of the page

### Workflow 3: CI/CD Integration

Add to your build pipeline:

```bash
# In your CI script
web-accessibility-checker https://staging.mysite.com

# Check exit code
if [ $? -eq 0 ]; then
  echo "✅ Accessibility check passed!"
  # Continue deployment
else
  echo "❌ Accessibility issues found!"
  # Fail the build
  exit 1
fi
```

### Workflow 4: WCAG Compliance Check

Check specific WCAG levels:

```bash
# Check WCAG AA (default)
web-accessibility-checker https://mysite.com --wcag AA

# Check both AA and AAA
web-accessibility-checker https://mysite.com --wcag AA,AAA
```

### Workflow 5: Batch Scanning

Create a script to scan multiple pages:

```bash
#!/bin/bash
# scan-all.sh

urls=(
  "https://mysite.com"
  "https://mysite.com/about"
  "https://mysite.com/contact"
  "https://mysite.com/products"
)

for url in "${urls[@]}"; do
  echo "Scanning: $url"
  web-accessibility-checker "$url" --output "./reports/$(basename $url).json"
done
```

---

## Step 5: Fixing Issues (Ongoing)

### Common Issues and Fixes

#### 1. **Missing Alt Text**

**Issue:** Images without alt attributes

**Fix:**
```html
<!-- Before -->
<img src="logo.png">

<!-- After -->
<img src="logo.png" alt="Company Logo">
```

#### 2. **Color Contrast**

**Issue:** Text doesn't have enough contrast with background

**Fix:**
```css
/* Before - insufficient contrast */
.text {
  color: #999;
  background: #fff;
}

/* After - WCAG AA compliant */
.text {
  color: #595959;
  background: #fff;
}
```

#### 3. **Missing Form Labels**

**Issue:** Form inputs without labels

**Fix:**
```html
<!-- Before -->
<input type="text" name="email">

<!-- After -->
<label for="email">Email Address:</label>
<input type="text" id="email" name="email">
```

#### 4. **Heading Hierarchy**

**Issue:** Skipping heading levels (h1 to h3)

**Fix:**
```html
<!-- Before -->
<h1>Page Title</h1>
<h3>Section Title</h3>

<!-- After -->
<h1>Page Title</h1>
<h2>Section Title</h2>
```

### Workflow for Fixing

1. **Scan** - Identify issues
2. **Prioritize** - Start with Critical and Serious
3. **Fix** - Update code
4. **Re-scan** - Verify fixes
5. **Repeat** - Until clean

---

## Step 6: Advanced Features (15 minutes)

### Programmatic Usage

Use in your Node.js applications:

```javascript
// my-scan.js
const { scan } = require('web-accessibility-checker');

(async () => {
  const result = await scan('https://mysite.com', {
    wcagLevel: ['AA'],
    timeout: 30000,
  });
  
  console.log(`Found ${result.violations.length} violation types`);
  
  // Process results
  result.violations.forEach(violation => {
    console.log(`- ${violation.id}: ${violation.nodes.length} instances`);
  });
})();
```

### Custom Reporting

Create custom reports:

```javascript
const { scan, JsonReporter } = require('web-accessibility-checker');

(async () => {
  const result = await scan('https://mysite.com');
  
  // Custom processing
  const criticalIssues = result.violations.filter(v => v.impact === 'critical');
  
  if (criticalIssues.length > 0) {
    console.log(`🚨 ${criticalIssues.length} critical issues found!`);
    // Send alert, create ticket, etc.
  }
  
  // Save report
  await JsonReporter.saveReport(result, './reports/custom.json');
})();
```

---

## Step 7: Integration Examples (10 minutes)

### GitHub Actions

Create `.github/workflows/accessibility.yml`:

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
      
      - name: Install checker
        run: npm install -g web-accessibility-checker
      
      - name: Install browsers
        run: npx playwright install chromium --with-deps
      
      - name: Run scan
        run: web-accessibility-checker https://your-site.com --output report.json
      
      - name: Upload report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: accessibility-report
          path: report.json
```

### npm Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "a11y": "web-accessibility-checker",
    "a11y:local": "web-accessibility-checker http://localhost:3000",
    "a11y:staging": "web-accessibility-checker https://staging.mysite.com --output reports/staging.json --csv",
    "a11y:prod": "web-accessibility-checker https://mysite.com --wcag AA,AAA"
  }
}
```

Usage:
```bash
npm run a11y:local
npm run a11y:staging
```

---

## Step 8: Best Practices (5 minutes)

### 1. **Scan Early and Often**
- Run during development, not just before deployment
- Integrate into your development workflow
- Fix issues as you build

### 2. **Prioritize Fixes**
- Start with Critical issues
- Then Serious
- Then Moderate and Minor
- Don't ignore Minor issues - they add up!

### 3. **Automate Checks**
- Add to CI/CD pipeline
- Fail builds on Critical issues
- Generate reports for tracking

### 4. **Learn from Results**
- Click help URLs to understand issues
- Learn WCAG principles
- Improve your accessibility knowledge

### 5. **Test with Real Users**
- Automated tools catch ~30-40% of issues
- Also test with screen readers
- Get feedback from users with disabilities

---

## Next Steps

Now that you're up and running:

1. **Scan Your Site** - Run a full audit
2. **Review Results** - Understand the issues
3. **Create a Plan** - Prioritize fixes
4. **Start Fixing** - Begin with Critical issues
5. **Automate** - Add to CI/CD
6. **Learn More** - Read WCAG guidelines

### Resources

- 📖 [Full README](README.md) - Complete documentation
- 🚀 [Quick Start](QUICKSTART.md) - 5-minute guide
- 📦 [Installation Guide](INSTALLATION.md) - Detailed setup
- 🤝 [Contributing](CONTRIBUTING.md) - Help improve the tool
- 📝 [Project Summary](PROJECT_SUMMARY.md) - Architecture overview

### Community

- 🐛 [Report Issues](https://github.com/yourusername/web-accessibility-checker/issues)
- 💬 [Discussions](https://github.com/yourusername/web-accessibility-checker/discussions)
- ⭐ [Star the Project](https://github.com/yourusername/web-accessibility-checker)

---

## Quick Reference

### Common Commands

```bash
# Basic scan
web-accessibility-checker <url>

# With all options
web-accessibility-checker <url> \
  --output report.json \
  --csv \
  --screenshot \
  --wcag AA,AAA \
  --timeout 60000 \
  --verbose

# Help
web-accessibility-checker --help

# Version
web-accessibility-checker --version
```

### Exit Codes

- `0` - ✅ No violations
- `1` - ⚠️ Non-critical violations
- `2` - 🔴 Critical violations
- `3` - ❌ Error during scan

---

**You're all set! Start making the web more accessible! 🌐♿**

Questions? Check the [README](README.md) or open an [issue](https://github.com/yourusername/web-accessibility-checker/issues).

