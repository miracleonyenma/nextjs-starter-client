# Next.js Full-Stack Starter

A production-ready Next.js 15.3 starter template with built-in authentication, UI components, and advanced features for rapid application development.

## Features

### 🏗 Core Architecture
- Next.js 15.3 with App Router
- TypeScript support
- Organized route groups for site and dashboard layouts
- SEO-ready with OpenGraph images and manifests
- Custom port configuration (3030)

### 🔐 Authentication & Security
- Complete authentication system
  - Email/Password authentication
  - Google OAuth integration
  - Password reset flow
  - OTP verification
  - Session-based auth with encrypted cookies
- Protected routes middleware
- Secure API routes
- Role-based access control

### 🎨 UI/Components
- Comprehensive UI component library:
  - Built on Radix UI primitives
  - Tailwind CSS styling
  - Shadcn-style component architecture
  - Dark/light theme support
- Pre-built components:
  - App components (Header, Sidebar)
  - Authentication forms
  - Site components
  - Profile components
  - Responsive dialogs and drawers

### 📊 State & Data Management
- Zustand for state management
- GraphQL integration with code generation
- Form handling (Formik + Yup)
- Custom data access layer (DAL)

### 🚀 Advanced Features
- Cloudinary integration for file uploads
- Mobile-responsive design
- Custom hooks for media queries
- Loading states and animations
- Toast notifications (Sonner)
- Progress bar (nextjs-toploader)
- Keyboard shortcuts
- Share functionality

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
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

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3030`

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `JWT_SECRET`: Secret for JWT signing

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard routes
│   ├── (site)/           # Public site routes
│   ├── api/              # API routes
│   └── lib/              # Shared server utilities
├── components/           # React components
│   ├── App/             # App-specific components
│   ├── Auth/            # Authentication components
│   ├── Site/            # Site components
│   └── ui/              # Shared UI components
├── hooks/               # Custom React hooks
├── lib/                 # Client-side utilities
├── public/             # Static assets
├── store/              # State management
├── types/              # TypeScript types
└── utils/              # Shared utilities
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run codegen` - Generate GraphQL types

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

### VSCode Configuration

Recommended extensions are configured in `.vscode/extensions.json`

## Deployment

The project is optimized for deployment on Vercel. For other platforms, ensure:

1. Environment variables are properly configured
2. Build command is set to `npm run build`
3. Node.js version is 18 or higher

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
