# Agent Guidelines for Wedding Website Project

## Project Overview

This is a SvelteKit static website deployed to GitHub Pages. The project uses modern web technologies with GSAP animations, Nix flakes for development environment, and Supabase for backend services including database and edge functions.

## Build and Development Commands

### Development

```bash
npm run dev          # Start development server with local Supabase
nix develop          # Enter development shell with Supabase tools
supabase start       # Start local Supabase services (database, auth, edge functions)
supabase status      # Check local development status
```

### Build and Deployment

```bash
npm run build        # Build for production
npm run preview      # Build and preview locally
npm run deploy       # Deploy to GitHub Pages (uses gh-pages)
```

### Supabase Operations

```bash
supabase db reset    # Reset database and run seed data
supabase db push     # Push database schema changes
supabase functions deploy rsvp  # Deploy edge function
supabase gen types typescript --local > src/lib/database.types.ts  # Generate TypeScript types
```

### Nix Development Environment

The project uses Nix flakes for reproducible development environments:

```bash
nix develop          # Enter development shell
nix flake show       # Show available outputs
```

### Testing

No testing framework is currently configured. Use browser testing during development.

## Code Style Guidelines

### General Formatting

- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Never use semicolons
- **Line Length**: Maximum 80 characters
- **Trailing Commas**: Not specified, follow existing patterns

### Prettier Configuration

The project uses Prettier with `prettier-plugin-svelte`:

```json
{
  "plugins": ["prettier-plugin-svelte"],
  "tabWidth": 2,
  "semi": false,
  "printWidth": 80,
  "overrides": [
    {
      "files": "*.svelte",
      "options": {
        "parser": "svelte"
      }
    }
  ]
}
```

### Svelte Components

- Use kebab-case for component file names (e.g., `MyComponent.svelte`)
- Script sections should come first, then markup, then style
- Use double quotes for attributes and props
- Import paths use `$lib/` alias for library components
- Use Svelte 5 syntax with runes where appropriate

### JavaScript/TypeScript

- Use ES6+ syntax (arrow functions, template literals, destructuring)
- Variables: `const` for constants, `let` for variables (avoid `var`)
- Use descriptive variable names with camelCase
- TypeScript is configured but minimal - add types when helpful

### Imports

Group imports in this order:

1. External libraries/frameworks (Svelte, GSAP)
2. Internal components (`$lib/`, `$app/` paths)
3. Local relative imports

Example:

```javascript
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { onMount } from "svelte"
import RsvpForm from "$lib/RsvpForm.svelte"
import { base } from "$app/paths"
```

### Naming Conventions

- **Files**: kebab-case (e.g., `rsvp-form.svelte`)
- **Components**: PascalCase for Svelte components
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Database Tables**: snake_case (e.g., `rsvp_responses`)
- **Edge Functions**: kebab-case (e.g., `submit-rsvp`)
- **Environment Variables**: UPPER*SNAKE_CASE with `VITE*` prefix for client-side variables

### GSAP Animation Patterns

- Register plugins at component initialization
- Use GSAP context for cleanup
- ScrollTrigger configuration: `start: "bottom 90%"`, `toggleActions: "play reverse play reverse"`
- Animation easing: `"power3.out"`
- Duration: 1 second for standard animations

### Error Handling

- Form validation with clear user feedback
- Graceful degradation if GSAP fails
- Use try-catch for async operations
- Supabase operations should include error handling for network failures
- Edge functions should validate JWT tokens for authenticated endpoints
- Use proper HTTP status codes in API responses (200, 400, 401, 500)

### Project Structure

```
src/
├── routes/           # Page components
│   ├── +layout.js    # Layout configuration
│   ├── +page.svelte  # Home page
│   └── about/        # About page
├── lib/              # Shared components
│   ├── RsvpForm.svelte           # Client-side RSVP form
│   └── database.types.ts         # Supabase database types (generated)
└── global.d.ts       # TypeScript definitions

supabase/
├── config.toml       # Local development configuration
├── seed.sql          # Database seed data
├── functions/        # Edge functions
│   └── rsvp/         # RSVP edge function
│       ├── index.ts  # Function handler
│       └── deno.json # Deno configuration
└── migrations/       # Database migrations

flake.nix            # Nix development shell
flake.lock           # Nix dependencies lock
```

### Routing and Paths

- Use `$app/paths` for base path handling: `{base}/about`
- Layout exports: `prerender = true` and `trailingSlash = "always"`
- GitHub Pages deployment with base path: `/sveltekit-gh-pages`

### Git Practices

0. Check `git status` before making changes
1. Review recent commits: `git log --oneline -5`
2. Stage changes: `git add .`
3. Commit with descriptive messages following existing style
4. Push to remote when ready

### Deployment Notes

- Production build uses `/sveltekit-gh-pages` base path
- Static adapter prerenders all pages
- `.nojekyll` file included for GitHub Pages
- Deploy command: `gh-pages -d build --nojekyll`

### Important Considerations for Agents

1. **Animations**: Test GSAP animations across browsers
2. **Mobile Responsive**: Ensure all components work on mobile
3. **Performance**: Keep bundle size small for static deployment
4. **Accessibility**: Add appropriate ARIA labels and keyboard navigation
5. **Forms**: Client-side validation with clear error messages
6. **Images**: Optimize and use appropriate formats

### Supabase Integration

**Database Setup**:

- Uses PostgreSQL with Row Level Security (RLS)
- Local development with `supabase start`
- Edge functions for serverless API endpoints

**RSVP Edge Function**:

- Located at `supabase/functions/rsvp/index.ts`
- Handles RSVP form submissions
- JWT verification enabled (`verify_jwt = true` in config)
- Generated TypeScript types available via `supabase gen types`

**Environment Variables**:

- Store Supabase secrets in `.env` file (not committed)
- Use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for client-side access
- Local development uses `http://127.0.0.1:54321` for API

### Nix Development Environment

The project includes a Nix flake providing:

- `supabase-cli` for local development
- `podman` for containerized services
- `lazygit` for Git operations

### Recent Changes (from commit history)

- GSAP smooth scrolling implementation
- Scroll trigger animations
- FAQ content addition
- Base path configuration for GitHub Pages
- Nix flakes setup for reproducible development
- Supabase integration with edge functions

### Warnings

- No automated tests configured
- No linting beyond Prettier formatting
- Check GSAP registration order (ScrollSmoother requires ScrollTrigger)
- Verify production base path matches repository name
- Edge functions require JWT verification for production use
- Database RLS policies should be properly configured before production
- Environment variables must be set for Supabase integration
- Nix development environment requires system configuration (Podman, user session)
