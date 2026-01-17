# 📦 Installation Guide

Complete installation instructions for Web Accessibility Checker.

## Prerequisites

Before installing, ensure you have:
- **Node.js** version 16.0.0 or higher
- **npm** version 7.0.0 or higher

Check your versions:
```bash
node --version
npm --version
```

## Installation Methods

### Method 1: Global Installation (Recommended for CLI)

Install globally to use from anywhere:

```bash
npm install -g web-accessibility-checker
```

Verify installation:
```bash
web-accessibility-checker --version
```

Usage:
```bash
web-accessibility-checker https://example.com
```

### Method 2: Local Project Installation

Install as a dev dependency in your project:

```bash
npm install --save-dev web-accessibility-checker
```

Add to `package.json` scripts:
```json
{
  "scripts": {
    "a11y": "web-accessibility-checker",
    "a11y:check": "web-accessibility-checker https://localhost:3000"
  }
}
```

Usage:
```bash
npm run a11y https://example.com
npm run a11y:check
```

### Method 3: Use with npx (No Installation)

Run without installing:

```bash
npx web-accessibility-checker https://example.com
```

This is perfect for one-off checks or trying the tool.

### Method 4: From Source (For Development)

Clone and build from source:

```bash
# Clone the repository
git clone https://github.com/yourusername/web-accessibility-checker.git
cd web-accessibility-checker

# Install dependencies
npm install

# Build the project
npm run build

# Test it works
node dist/cli.js https://example.com

# Optional: Link for global usage
npm link
web-accessibility-checker https://example.com
```

## Playwright Installation

The tool uses Playwright for browser automation. On first use, Playwright will download browser binaries.

To pre-install browsers:
```bash
npx playwright install chromium
```

## Troubleshooting

### Permission Errors (macOS/Linux)

If you get permission errors during global installation:

```bash
# Option 1: Use sudo (not recommended)
sudo npm install -g web-accessibility-checker

# Option 2: Configure npm to use a different directory (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g web-accessibility-checker
```

### Playwright Browser Download Issues

If browsers fail to download:

```bash
# Manually install Chromium
npx playwright install chromium --with-deps

# Or install system dependencies (Linux)
npx playwright install-deps chromium
```

### Node.js Version Issues

If you have an older Node.js version:

```bash
# Using nvm (Node Version Manager)
nvm install 18
nvm use 18

# Or download from nodejs.org
# https://nodejs.org/
```

### Windows-Specific Issues

On Windows, you may need to:

1. **Run as Administrator** for global installs
2. **Enable Developer Mode** for symlinks
3. **Use Git Bash or WSL** for better compatibility

```powershell
# PowerShell (Run as Administrator)
npm install -g web-accessibility-checker
```

### Corporate Proxy Issues

If behind a corporate proxy:

```bash
# Set proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Install
npm install -g web-accessibility-checker
```

## Verifying Installation

After installation, verify everything works:

```bash
# Check version
web-accessibility-checker --version

# Check help
web-accessibility-checker --help

# Run a test scan
web-accessibility-checker https://example.com --no-json
```

## Updating

### Update Global Installation

```bash
npm update -g web-accessibility-checker
```

### Update Local Installation

```bash
npm update web-accessibility-checker
```

### Check for Updates

```bash
npm outdated -g web-accessibility-checker
```

## Uninstalling

### Remove Global Installation

```bash
npm uninstall -g web-accessibility-checker
```

### Remove Local Installation

```bash
npm uninstall web-accessibility-checker
```

## Platform-Specific Notes

### macOS
- May require Xcode Command Line Tools
- Use Homebrew for Node.js: `brew install node`

### Linux
- May need to install system dependencies
- Use package manager: `apt install nodejs npm` or `yum install nodejs npm`

### Windows
- Use Node.js installer from nodejs.org
- Consider using Chocolatey: `choco install nodejs`
- Git Bash recommended for better shell experience

## Docker Installation (Alternative)

Coming soon! Docker support is planned for a future release.

```bash
# Future usage
docker run -it web-accessibility-checker https://example.com
```

## Development Installation

For contributors and developers:

```bash
# Clone the repository
git clone https://github.com/yourusername/web-accessibility-checker.git
cd web-accessibility-checker

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
./test-examples.sh

# Start development
npm run dev https://example.com
```

## Getting Help

If you encounter issues:

1. Check [Common Issues](README.md#troubleshooting)
2. Search [GitHub Issues](https://github.com/yourusername/web-accessibility-checker/issues)
3. Open a new issue with:
   - Your OS and version
   - Node.js version
   - npm version
   - Complete error message
   - Steps to reproduce

## Next Steps

After installation:
- Read the [Quick Start Guide](QUICKSTART.md)
- Review the [README](README.md) for full documentation
- Try the [Examples](examples/basic-usage.ts)
- Join the community discussions

Happy accessibility testing! 🎉

