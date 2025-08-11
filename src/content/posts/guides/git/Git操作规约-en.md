---
title: Git Operation Guidelines
published: 2025-08-04T00:00:00.000Z
updated: 2025-08-04T00:00:00.000Z
tags:
  - Development Guidelines
  - Git
pin: 1
lang: en
abbrlink: git-commit-message-guidelines
aicommit: "This is Zang-AI. This article introduces Git operation guidelines, mainly covering the Git Flow model, commit message conventions, and branch naming conventions. The Git Flow model defines branches such as Master, Develop, Feature, Release, and Hotfix and their purposes, aimed at improving team collaboration and version stability. The commit message convention specifies the type(scope): subject format, clarifies the meanings of different types such as new features and fixes, and sets requirements for scope and subject writing. The branch naming convention adopts the type/date-description-developer format, detailing the specifications for each part to achieve clear management."
---

## Git Operation Guidelines

### Git Flow Model

Git Flow is a popular Git workflow model designed to better manage branches and version control in Git repositories. It was introduced by Vincent Driessen in a blog post and has been widely adopted. Git Flow defines a set of strict branch naming conventions and branch purposes so that team members can better collaborate on development and manage software projects. The workflow includes the following main branches:

> 1. **Master Branch**: Represents the main stable version, used for releasing production environment code. Usually contains the latest releasable code that has been tested and reviewed.
> 2. **Develop Branch**: The development branch containing the latest development code. All feature development, bug fixes, etc., are performed on this branch.
> 3. **Feature Branch**: Used for individual feature development, typically created from the Develop branch and merged back to the Develop branch upon completion.
> 4. **Release Branch**: Used for release preparation. When sufficient features have accumulated on the Develop branch, a Release branch is created from the Develop branch for final testing and bug fixes, then merged back to both Master and Develop branches.
> 5. **Hotfix Branch**: Used for emergency fixes of bugs in the production environment. Created from the Master branch, and merged back to both Master and Develop branches after fixing.

> Git Flow, through this branch management approach, enables teams to collaborate better while ensuring stability and reliability during development and release processes. This workflow is widely used by many software development teams and is considered a mature, reliable Git workflow model.

### Commit Message Conventions

#### Format Specification

**Basic Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring (neither new features nor bug fixes)
- `test`: Adding or modifying tests
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements
- `ci`: Continuous integration changes
- `build`: Build system or dependency changes
- `revert`: Reverting previous commits

**Scope:**
- Optional field indicating the scope of changes
- Can be component name, file name, or feature module
- Examples: `api`, `ui`, `auth`, `database`

**Subject:**
- Brief description of changes (under 50 characters)
- Use imperative mood (e.g., "add" not "added" or "adds")
- No period at the end
- First letter should be lowercase

**Body (Optional):**
- Detailed description of changes
- Explain what and why, not how
- Wrap lines at 72 characters

**Footer (Optional):**
- Reference issues or breaking changes
- Examples:
  - `Closes #123`
  - `BREAKING CHANGE: API endpoint changed`

#### Examples

**Simple Examples:**
```
feat(auth): add login functionality
fix(api): resolve user data validation issue
docs: update README installation guide
style: format code with prettier
```

**Detailed Examples:**
```
feat(user-profile): add avatar upload functionality

Allow users to upload and change their profile avatars.
Supports JPEG and PNG formats up to 2MB.
Includes image validation and automatic resizing.

Closes #456
```

```
fix(payment): resolve checkout button not responding

The checkout button was not responding due to missing event
listener binding after dynamic content loading.

Fixed by ensuring event listeners are reattached after DOM updates.

Fixes #789
```

### Branch Naming Conventions

#### Format Specification

**Pattern:**
```
<type>/<date>-<description>-<developer>
```

**Components:**

**Type:**
- `feature`: New feature development
- `bugfix`: Bug fixes
- `hotfix`: Emergency production fixes
- `release`: Release preparation
- `chore`: Maintenance tasks

**Date:**
- Format: `YYYYMMDD`
- Creation date of the branch

**Description:**
- Brief description using kebab-case
- 2-4 words maximum
- Descriptive of the main purpose

**Developer:**
- Developer's name or identifier
- Use consistent naming across team

#### Examples

```
feature/20250807-user-authentication-john
bugfix/20250807-payment-validation-sarah
hotfix/20250807-security-patch-mike
release/20250807-v2.1.0-team
chore/20250807-dependency-update-alice
```

### Best Practices

#### Commit Practices
1. **Atomic Commits**: Each commit should represent a single logical change
2. **Frequent Commits**: Commit often to avoid large, complex changesets
3. **Clear Messages**: Write clear, descriptive commit messages
4. **Review Before Committing**: Review changes before committing

#### Branch Management
1. **Keep Branches Focused**: Each branch should have a single purpose
2. **Regular Syncing**: Keep feature branches updated with develop
3. **Clean History**: Use interactive rebase to clean up commit history
4. **Delete Merged Branches**: Remove branches after successful merging

#### Collaboration Guidelines
1. **Pull Requests**: Always use pull requests for code review
2. **Testing**: Ensure all tests pass before merging
3. **Documentation**: Update documentation with code changes
4. **Communication**: Communicate significant changes with the team

### Tools and Automation

#### Git Hooks
- **Pre-commit**: Lint code and run tests
- **Commit-msg**: Validate commit message format
- **Pre-push**: Run additional checks before pushing

#### Helpful Tools
- **Commitizen**: Interactive commit message creation
- **Conventional Changelog**: Generate changelogs from commits
- **Husky**: Git hooks management
- **Lint-staged**: Run linters on staged files

### Conclusion

Following these Git operation guidelines ensures:
- **Consistency**: Uniform approach across the team
- **Traceability**: Clear history of changes and decisions
- **Quality**: Better code quality through structured processes
- **Collaboration**: Improved team collaboration and communication

These guidelines should be adapted to fit your team's specific needs while maintaining the core principles of clarity, consistency, and collaboration.
