# Prime World Media - Frontend

A modern, responsive media and news website built with Next.js, delivering real-time news content with an engaging user experience.

## 🌟 Features

### Core Functionality
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Media Gallery & Player** - Advanced media playback with video/audio streaming capabilities
- **Search Functionality** - Fast, full-text search across articles and media content
- **Content Management** - Dynamic content rendering with server-side and static generation

### User Features
- **Authentication & User Accounts** - Secure user registration, login, and profile management
- **Personalized Experience** - Customizable news feeds and saved articles
- **Real-time Updates** - Live content updates and breaking news notifications

### Technical Features
- **API Integration** - RESTful API consumption with optimized data fetching
- **SEO Optimized** - Meta tags, structured data, and sitemap generation
- **Performance Optimized** - Image optimization, lazy loading, and code splitting
- **Accessibility** - WCAG 2.1 compliant with screen reader support

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (React)
- **Styling:** Tailwind CSS / CSS Modules / Styled Components
- **State Management:** React Context API / Redux / Zustand
- **Authentication:** NextAuth.js / JWT
- **API Client:** Axios / Fetch API
- **Media Player:** Video.js / React Player
- **Forms:** React Hook Form + Zod validation
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel / AWS / Docker

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git**

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/primeworldmedia-frontend.git
   cd primeworldmedia-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=https://api.primeworldmedia.com
   NEXT_PUBLIC_API_KEY=your_api_key_here
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # Database (if applicable)
   DATABASE_URL=your_database_url
   
   # Media Storage
   NEXT_PUBLIC_MEDIA_CDN=https://cdn.primeworldmedia.com
   
   # Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
primeworldmedia-frontend/
├── public/              # Static files (images, fonts, etc.)
├── src/
│   ├── app/            # Next.js 14 App Router
│   │   ├── (auth)/    # Authentication routes
│   │   ├── (main)/    # Main application routes
│   │   ├── api/       # API routes
│   │   └── layout.tsx # Root layout
│   ├── components/     # Reusable components
│   │   ├── ui/        # UI components (buttons, cards, etc.)
│   │   ├── layout/    # Layout components (header, footer)
│   │   ├── media/     # Media player components
│   │   └── forms/     # Form components
│   ├── lib/           # Utility functions and configurations
│   │   ├── api/       # API client setup
│   │   ├── auth/      # Authentication helpers
│   │   └── utils/     # Helper functions
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── styles/        # Global styles and themes
│   └── config/        # App configuration
├── .env.local         # Environment variables (not in git)
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier

# Building
npm run build        # Create production build
npm run start        # Start production server

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Type checking
npm run type-check   # Run TypeScript compiler check
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes |
| `NEXT_PUBLIC_API_KEY` | API authentication key | Yes |
| `NEXTAUTH_URL` | Application URL for auth | Yes |
| `NEXTAUTH_SECRET` | Secret for session encryption | Yes |
| `DATABASE_URL` | Database connection string | No |
| `NEXT_PUBLIC_MEDIA_CDN` | CDN URL for media assets | Yes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |

## 🔒 Authentication

The application uses NextAuth.js for authentication with the following providers:
- Email/Password authentication
- OAuth providers (Google, Facebook, etc.)
- JWT-based session management

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px)

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px)

/* Desktop */
@media (min-width: 1025px)

/* Large Desktop */
@media (min-width: 1440px)
```

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy automatically on push to main branch

### Docker

Build and run with Docker:
```bash
docker build -t primeworldmedia-frontend .
docker run -p 3000:3000 primeworldmedia-frontend
```

### Manual Deployment

```bash
npm run build
npm run start
```

## 🎨 Design System

The project follows a consistent design system with:
- Predefined color palette
- Typography scale
- Spacing system
- Component variants
- Accessibility guidelines

## 🔄 API Integration

The frontend integrates with the backend API for:
- News articles and content retrieval
- User authentication and profile management
- Media asset streaming
- Search and filtering
- Real-time updates via WebSocket/SSE

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Run linting before committing

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Development Team** - Prime World Media Tech
- **Design Team** - Prime World Media Creative
- **Product Owner** - [Name]

## 📞 Support

For support and questions:
- **Email:** support@primeworldmedia.com
- **Documentation:** [https://docs.primeworldmedia.com](https://docs.primeworldmedia.com)
- **Issues:** [GitHub Issues](https://github.com/your-org/primeworldmedia-frontend/issues)

## 🗺️ Roadmap

- [ ] Implement Progressive Web App (PWA) features
- [ ] Add dark mode support
- [ ] Integrate real-time commenting system
- [ ] Enhance media player with playlist support
- [ ] Add multi-language support (i18n)
- [ ] Implement advanced analytics dashboard

---

**Built with ❤️ by the Prime World Media Team**