# Practice_Supabase_React

A minimal React + TypeScript + Vite project configured to work with Supabase. This repository is a practice playground for integrating Supabase (auth, database, storage) with a Vite + React app.

## Table of contents
- About
- Requirements
- Quick start
- Supabase setup
  - Create a project
  - Add environment variables
  - Install client library
  - Initialize the client in the project
  - Optional: Supabase CLI and local development
- Running the app
- Building and deployment
- Example usage (auth + simple query)
- Troubleshooting
- Contributing
- License

## About
This project demonstrates how to add Supabase to a Vite + React + TypeScript application. It includes instructions to install the Supabase client, configure environment variables, initialize the client, and run the app locally.

## Requirements
- Node.js >= 16 (recommended)
- npm, yarn, or pnpm
- A Supabase account (https://supabase.com) to create a project and obtain API keys

## Quick start
1. Clone the repo:

```bash
git clone https://github.com/JayveeFortissimo/Practice_Supabase_React.git
cd Practice_Supabase_React
```

2. Install dependencies:

```bash
# using npm
npm install
# or using yarn
yarn
# or pnpm
# pnpm install
```

3. Create a `.env.local` file in the project root (see Supabase setup below).

4. Start the dev server:

```bash
npm run dev
```

## Supabase setup
Follow these steps to configure Supabase for this project.

1. Create a project on Supabase:
   - Sign in at https://app.supabase.com
   - Click "New Project" and follow the prompts (choose a name, password, and region).

2. Get your project credentials:
   - In the Supabase project, go to `Settings -> API` and copy the `Project URL` and `anon/public` key.

3. Add environment variables (Vite):
   - Create a `.env.local` file in the project root and add the following (replace with your real values):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your_anon_key_here...
```

Note: Vite only exposes variables prefixed with `VITE_` to the client. Do NOT commit your `.env.local` to version control. Make sure `.gitignore` contains the env file.

4. Install the Supabase client library:

```bash
npm install @supabase/supabase-js
```

5. Initialize the Supabase client in your project:

Create a small helper file (example path: `src/lib/supabaseClient.ts`) and export a shared client instance: 

```ts
// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Then import `supabase` where you need it (components, hooks, services).

6. Optional: Supabase CLI for local development

The Supabase CLI allows running a local development database and other tools. To install: 

```bash
npm install -g supabase
# or follow https://supabase.com/docs/guides/cli for other install methods
```

To initialize a local project and start the local DB (if you plan to use the local emulator):

```bash
supabase init
supabase start
```

See Supabase docs for migrating schema, seeding, and using the local emulator.

## Running the app

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` (or the port Vite prints) and test features that use Supabase.

## Building and deployment

Build for production:

```bash
npm run build
```

Deploy to Vercel, Netlify, or any static host. When deploying, add the same environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) to the hosting provider's environment settings.

## Example usage (auth + simple query)

Sign up / sign in using `supabase.auth`:

```ts
// example: src/hooks/useAuth.ts
import { supabase } from '../lib/supabaseClient'

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}
```

Querying a table:

```ts
// example: fetch rows from "messages" table
const { data, error } = await supabase.from('messages').select('*')
```

Refer to the Supabase JavaScript docs for more examples: https://supabase.com/docs/reference/javascript

## Troubleshooting
- If env vars are undefined in the browser, ensure the file is named `.env` or `.env.local` and variables are prefixed with `VITE_`. Restart the dev server after changing env files.
- If you see CORS or network issues, double-check the Supabase Project URL and keys.
- Check the browser console and terminal for helpful error messages.

## Contributing
Contributions and suggestions are welcome. Open an issue or PR with improvements.

## License
This project is provided as-is for practice and learning purposes. Add a license if you plan to reuse or publish the code.
