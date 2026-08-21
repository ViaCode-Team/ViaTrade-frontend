# AI Factory Guardrails

## Project Conventions

- Follow existing code style and patterns in the project
- Use conventional commits format for all commit messages
- Always check for existing implementations before creating new ones
- Prefer editing existing files over creating new ones
- Run tests after making changes when test infrastructure exists

## Skill Usage

- Use `/aif-explore` to think through ideas before planning — no implementation, just exploration
- Use `/aif-plan` for new features — creates branch, plan, and tasks
- Use `/aif-fix` for bug fixes — analyzes, fixes, suggests tests
- Use `/aif-commit` for commits — follows conventional commits
- Use `/aif-implement` to execute plans step by step
- Use `/aif-rules-check` for a standalone project rules gate
- Use `/aif-review` before merging — checks code quality

## Safety

- Never commit secrets, tokens, or credentials
- Never force-push to main/master branches
- Always create feature branches for new work
