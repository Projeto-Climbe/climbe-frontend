# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Install dependencies:**
```sh
npm install
```

**Development server:**
```sh
npm run dev
```

**Build for production:**
```sh
npm run build  # Runs type-check and build-only in parallel
```

**Type checking only:**
```sh
npm run type-check  # Uses vue-tsc
```

**Linting:**
```sh
npm run lint  # Auto-fixes issues
```

**Code formatting:**
```sh
npm run format  # Prettier on src/
```

**Node version requirement:** ^20.19.0 || >=22.12.0

## Architecture

**Stack:** Vue 3 + TypeScript + Vite + PrimeVue 4 + Pinia + Vue Router

**Project is written in Portuguese** - Component names, variables, and file names use Portuguese.

### Directory Structure

- `src/pages/` - Top-level page components (Dashboard, Companies, Contracts, Meetings, Reminders)
- `src/components/` - Organized by concern:
  - `core/` - Generic reusable components (tables, modals, form fields, dashboard widgets)
  - `layout/` - App shell components (EstruturaApp, Sidebar)
  - `domain/` - Feature-specific components (Contratos, Relatorios)
- `src/services/` - API layer with axios HTTP client and service modules
- `src/stores/` - Pinia state stores (UserStore, PermissionStore, DashboardStore, CompanieStore)
- `src/composables/` - Reusable logic (useCompanies, useValidatorZod)
- `src/router/` - Vue Router configuration
- `src/styles/` - Global theme variables and CSS

### API Integration

- Single axios instance in `src/services/https.ts` with base URL `http://localhost:3000`
- Service modules expose typed API methods (e.g., `companyService.ts`)
- Pattern: composables call service functions, manage loading/error state
- Comprehensive error handling with user-friendly messages

### State Management

- **Pinia stores prepared but mostly empty** - Current approach uses composables for data fetching
- Stores exist as infrastructure placeholders: UserStore, PermissionStore, DashboardStore, CompanieStore
- Data fetching pattern: composables (e.g., `useCompanies()`) manage reactive state, loading flags, and error handling

### Form Validation

- Custom `useValidatorZod` composable provides Zod-based validation
- Two-way binding helpers via `bind()` for v-model
- Error extraction with `erroCampo()`
- See `src/components/core/EmpresasComponents/ModalEmpresa.vue` for usage example

### PrimeVue Integration

- Global component registration in `main.ts` (Button, Dialog, InputText, DataTable, Toast, etc.)
- ToastService and ConfirmationService configured
- Extensive theme customization in `src/styles/theme.css` (260+ lines)
- Custom green color palette: `--climb-green-*` CSS variables

### Routing

- Lazy-loaded pages via dynamic imports for code-splitting
- Flat routing structure (no nested routes yet)
- Root redirects to `/dashboard`
- No authentication guards currently implemented

### Component Patterns

- **Wrapper/Composition:** Generic DialogFormulario wrapped by feature-specific modals
- **Generic tables:** TabelaDeDados component with configurable columns, loading states, status pills
- **Path alias:** `@/*` resolves to `src/*` for clean imports

### TypeScript

- Strict type checking enabled
- vue-tsc for type checking .vue files
- Type definitions for all API responses and component props

### Current State

- Early-stage development with mixed mock data and API integration
- Authentication/authorization infrastructure prepared but not implemented
- No auth middleware or route guards yet
