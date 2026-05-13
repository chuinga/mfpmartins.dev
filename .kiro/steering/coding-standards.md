# Coding Standards

## TypeScript

- Enable strict mode in tsconfig.json
- Prefer interfaces over type aliases for object shapes
- Use explicit return types on exported functions
- Avoid `any` — use `unknown` and narrow with type guards when needed
- Use const assertions and satisfies operator where appropriate

## React & Next.js

- Use functional components exclusively
- Prefer Server Components; mark Client Components explicitly with "use client"
- Co-locate component-specific styles and tests with the component
- Use named exports for components (no default exports except for pages/layouts)
- Keep props interfaces defined in the same file as the component
- Use React.FC sparingly — prefer explicit props typing: `function Component(props: Props)`

## Styling (Tailwind CSS)

- Use Tailwind utility classes directly in JSX
- Extract repeated patterns into reusable components rather than @apply
- Use CSS variables for theme tokens (colors, spacing) when needed
- Follow mobile-first responsive design (sm → md → lg → xl)

## File Naming

- Components: PascalCase (e.g., `ProjectCard.tsx`)
- Utilities/hooks: camelCase (e.g., `useMediaQuery.ts`, `formatDate.ts`)
- Content/data files: kebab-case (e.g., `project-data.ts`)
- Next.js route files: follow App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`)

## Formatting

- Use Prettier with default settings (override only printWidth to 100)
- Use ESLint with next/core-web-vitals config
- No semicolons (Prettier default: with semicolons — keep consistent, pick one)
- Use single quotes for strings
- Trailing commas in multiline structures

## Git & GitHub

- Code is hosted on GitHub — all changes must be pushed to the remote repo
- Make atomic commits: each commit should represent a single logical change
- Write concise commit messages in imperative mood (e.g., "Add project card component")
- Push changes after completing each meaningful unit of work
- Use feature branches for new work; never push directly to main
- Open pull requests for review before merging to main
