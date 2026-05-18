# Contributing to Paahuney

First off, thank you for considering contributing to Paahuney! It's people like you that make Paahuney such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [issue list](https://github.com/YOUR_USERNAME/paahuney/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/YOUR_USERNAME/paahuney/issues). When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the TypeScript and Tailwind CSS styleguide
- End all files with a newline
- Avoid platform-dependent code

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🚀 `:rocket:` when improving performance
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - ✨ `:sparkles:` when adding a new feature
  - 🧹 `:broom:` when cleaning up code
  - ♿ `:wheelchair:` when improving accessibility

### TypeScript Styleguide

- Use `const` for variables that won't be reassigned
- Use type annotations for function parameters and return types
- Use interfaces for object types over type aliases when possible
- Avoid `any` type; use `unknown` if necessary and narrow the type

### Tailwind CSS Styleguide

- Use utility classes instead of custom CSS when possible
- Group related utilities logically
- Use Tailwind's responsive prefixes (`sm:`, `md:`, etc.) for responsive design
- Extract repeated utility combinations into components
- Refer to [Tailwind documentation](https://tailwindcss.com/docs) for best practices

### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown) for all documentation
- Use clear, accessible language
- Include code examples where relevant
- Keep headings clear and consistent

## Project Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file (copy from `.env.local.example`)
4. Start the development server: `npm run dev`
5. Create a feature branch: `git checkout -b feature/your-feature-name`

## Testing Your Changes

Before submitting a pull request:

1. Test thoroughly in development
2. Run linter: `npm run lint`
3. Test on multiple browsers if making UI changes
4. Test on mobile if making responsive changes
5. Update README if adding new features or changing setup

## Questions?

Feel free to open a [GitHub discussion](https://github.com/YOUR_USERNAME/paahuney/discussions) if you have questions!

---

Thank you for contributing! 🎉
