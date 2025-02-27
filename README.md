# ndex-next: Modernized frontend for NDEx v3

(TBD)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Project Structure

```
public/                  # Directory for config and resource files
├── config.json          # Basic application config
└── contents             # Directory for contents for thetop page

src/
├── app/                     # Core application directory for App Router
│   ├── layout.tsx           # Root layout definition
│   ├── page.tsx             # Home page component
│   └── providers.tsx        # Global providers (SWR Config, etc.)
│
├── components/              # Reusable component library
│   ├── ui/                  # Basic UI components
│   │   ├── button.tsx       # Atomic button component
│   │   └── input.tsx        # Form input elements
│   └── features/            # Feature-specific components
│       └── auth/            # Authentication related components
│           ├── login-form.tsx
│           └── register-form.tsx
│
├── hooks/                   # Custom React hooks
│   ├── use-auth.ts          # Authentication hooks
│   └── use-form.ts          # Form handling hooks
│
├── lib/                    # Utility functions and configurations
│   ├── api/               # API client setup
│   │   └── client.ts      # Axios/fetch instance configuration
│   └── utils/             # Utility functions
│       └── format.ts      # Date formatting, string manipulation, etc.
│
├── services/              # Business logic and API calls
│   ├── auth.ts           # Authentication service
│   └── user.ts           # User management service
│
└── types/                # TypeScript type definitions
    ├── api/              # API-related types
    │   ├── requests.ts   # Request type definitions
    │   └── responses.ts  # Response type definitions
    ├── entities/         # Domain entity types
    │   ├── user.ts      # User entity definition
    │   └── post.ts      # Post entity definition
    └── index.ts         # Common type definitions and exports
```
