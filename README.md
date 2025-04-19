# Next.js Full-Stack Starter

A production-ready Next.js 15.3 starter template designed to work seamlessly with the [Express TypeScript GraphQL API Starter](https://github.com/miracleonyenma/express-ts-graphql-starter). This project includes built-in authentication, UI components, and advanced features for rapid full-stack application development.

![Next.js Starter](https://res.cloudinary.com/dmwfd0zhh/image/upload/v1713723535/next-starter-banner_olvetr.png)

## 🌟 Features

### 🏗 Core Architecture

- **Next.js 15.3** with App Router
- **TypeScript** support for type safety
- Organized route groups for site and dashboard layouts
- SEO-ready with OpenGraph images and manifests
- Custom port configuration (3030)

### 🔐 Authentication & Security

- **Complete authentication system**
  - Email/Password authentication
  - Google OAuth integration
  - Password reset flow
  - OTP verification
  - Session-based auth with encrypted cookies
- Protected routes middleware
- Secure API routes with proxy capabilities
- Token refresh handling
- Role-based access control

### 🎨 UI/Components

- **Comprehensive UI component library**:
  - Built on Radix UI primitives
  - Tailwind CSS styling with v4 support
  - Shadcn-style component architecture
  - Dark/light theme support via `next-themes`
- **Pre-built components**:
  - App components (Header, Sidebar)
  - Authentication forms
  - Site components
  - Profile components
  - Responsive dialogs and drawers

### 📊 State & Data Management

- **Zustand** for global state management
- **GraphQL integration** with automatic code generation
- Form handling with **Formik + Yup**
- Custom data access layer (DAL)

### 🚀 Advanced Features

- Cloudinary integration for file uploads
- Mobile-responsive design
- Custom hooks for media queries and shortcuts
- Loading states and animations
- Toast notifications via **Sonner**
- Progress bar via **nextjs-toploader**
- Web Share API integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- [Express TypeScript GraphQL API Starter](https://github.com/miracleonyenma/express-ts-graphql-starter) (set up and running)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nextjs-starter-client.git
cd nextjs-starter-client
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

4. Update the environment variables:

```env
# API
NEXT_PUBLIC_BASE_API=http://localhost:5416
NEXT_PUBLIC_GRAPHQL_API=http://localhost:5416/graphql
API_KEY=your_api_key_here

# Auth
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3030
```

5. Generate GraphQL types (requires the backend to be running):

```bash
npm run codegen
```

6. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3030`

## 🔧 Integration with Express API Starter

This frontend is designed to work with the [Express TypeScript GraphQL API Starter](https://github.com/miracleonyenma/express-ts-graphql-starter). To connect them:

1. Set up and run the Express API starter according to its instructions
2. Make sure your `.env.local` file points to the correct API endpoint
3. Generate GraphQL types using `npm run codegen`
4. Verify the connection by attempting to login or register via the UI

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── (dashboard)/         # Dashboard routes (authenticated)
│   ├── (site)/             # Public site routes
│   ├── api/                # API route handlers
│   ├── server/             # Server proxy routes
│   ├── actions.ts          # Server actions
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── App/               # App-specific components
│   ├── Auth/              # Authentication components
│   ├── Icon/              # Custom icon components
│   ├── Profile/           # User profile components
│   ├── Site/              # Site components
│   └── ui/                # Shadcn UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Shared libraries & utilities
│   ├── dal.ts             # Data Access Layer
│   ├── gqlClient.ts       # GraphQL client setup
│   ├── session.ts         # Session management
│   └── utils.ts           # Utility functions
├── public/               # Static assets
├── store/                # Zustand state stores
├── types/                # TypeScript type definitions
│   └── gql/              # Generated GraphQL types
└── utils/                # Utility functions
    ├── auth/             # Authentication utilities
    ├── cloudinary/       # Cloudinary utilities
    └── user/             # User management utilities
```

## 🛠️ Key Features Explained

### Server Proxy

The project includes a sophisticated server proxy (`app/server/[...slug]/route.ts`) that handles:

- Forwarding requests to the backend API
- Managing authentication headers
- Automatic token refresh on expired tokens
- Error handling and redirection

### Authentication Flow

The authentication system provides:

- Registration with email verification
- Login with email/password
- Google OAuth integration
- Secure session management
- Protected routes via middleware
- Token refresh mechanism

### GraphQL Integration

The project uses GraphQL for data fetching with:

- Automatic type generation via `graphql-codegen`
- Client-side and server-side GraphQL clients
- Type-safe GraphQL operations

## 📝 Available Scripts

- `npm run dev` - Start development server on port 3030
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run codegen` - Generate GraphQL types

## 🧩 Customization

### Theming

The project uses Tailwind CSS for styling and next-themes for theme management:

```tsx
// In app/layout.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

### Adding New Components

Follow the Shadcn UI approach for adding components:

1. Create a new component in `components/ui/`
2. Import and use Radix UI primitives
3. Style with Tailwind CSS utility classes

### Protected Routes

Add new protected route patterns in `utils/routePatterns.ts`:

```typescript
export const PROTECTED_PATTERNS = [
  "/dashboard", 
  "/account",
  // Add your new protected route pattern here
];
```

## 📚 Best Practices

- Use Server Components for data fetching when possible
- Use Client Components for interactive elements
- Keep state management simple with Zustand
- Use server actions for mutations
- Follow the pattern of separating UI components from page components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com/)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [Zustand](https://github.com/pmndrs/zustand)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

---

Created by [Miracle Onyenma](https://github.com/miracleonyenma)
