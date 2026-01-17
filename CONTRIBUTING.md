# Contributing to Web Accessibility Checker

Thank you for your interest in contributing! We welcome contributions from developers of all experience levels.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Error messages or logs**
- **Screenshots** if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide detailed explanation** of the proposed feature
- **Explain why this enhancement would be useful**
- **List any similar tools** that have this feature

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 Development Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow the existing code style (enforced by ESLint and Prettier)
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(scanner): add support for custom axe rules
fix(reporter): correct color contrast calculation
docs(readme): update installation instructions
```

### Code Quality

- **Write meaningful comments** explaining "why", not "what"
- **Handle errors gracefully** with informative messages
- **Avoid console.log** in production code (use proper logging)
- **Keep dependencies minimal** - justify each new dependency
- **Test your changes** before submitting

### Testing

- Add tests for new features
- Ensure all existing tests pass
- Test on different websites
- Test edge cases (timeouts, network errors, etc.)

## 🏗️ Project Structure

```
web-accessibility-checker/
├── src/
│   ├── cli.ts              # CLI interface
│   ├── index.ts            # Main entry point
│   ├── scanner.ts          # Core scanning logic
│   ├── types.ts            # TypeScript type definitions
│   └── reporters/
│       ├── console-reporter.ts  # Console output formatter
│       └── json-reporter.ts     # JSON/CSV report generator
├── dist/                   # Compiled output (generated)
├── tests/                  # Test files (coming soon)
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Development Setup

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/web-accessibility-checker.git
cd web-accessibility-checker

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Test your changes
npm run dev https://example.com

# 5. Run linting
npm run lint

# 6. Format code
npm run format
```

### Running Locally

```bash
# Run TypeScript directly (for development)
npm run dev https://example.com -- --verbose

# Run compiled version
node dist/cli.js https://example.com
```

## 📋 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- [ ] Add unit and integration tests
- [ ] Implement custom axe rule support
- [ ] Add HTML report format
- [ ] Support for authenticated pages
- [ ] Batch scanning multiple URLs
- [ ] Performance optimizations

### Medium Priority
- [ ] Support for single-page applications (SPA)
- [ ] Add more output formats (Markdown, HTML)
- [ ] Lighthouse integration
- [ ] Docker support
- [ ] GitHub Action

### Documentation
- [ ] Add more usage examples
- [ ] Create video tutorials
- [ ] Translate documentation to other languages
- [ ] Improve API documentation

## 🤔 Questions?

- Open a [GitHub Discussion](https://github.com/yourusername/web-accessibility-checker/discussions)
- Check existing [Issues](https://github.com/yourusername/web-accessibility-checker/issues)
- Read the [README](README.md) for usage instructions

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment, trolling, or discriminatory comments
- Personal or political attacks
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mention for first-time contributors

Thank you for making the web more accessible! 🌐♿

