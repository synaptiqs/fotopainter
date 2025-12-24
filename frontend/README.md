# Fotopainter Frontend

The frontend website for Fotopainter - an AI-powered platform that transforms photos into paint-by-number artworks.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (20.9.0+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Upload and processing page
│   ├── contact/            # Contact form page
│   ├── pricing/            # Pricing page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── upload/             # Upload-specific components (future)
│   ├── palette/            # Palette selector components (future)
│   └── order/              # Order flow components (future)
└── lib/
    └── api.ts              # API client (currently mock)
```

## 🎨 Design System

### Colors
- **Primary Teal**: `#008080`
- **Sienna Accent**: `#A0522D`
- **Success**: `#10B981`
- **Error**: `#EF4444`
- **Warning**: `#F59E0B`

### Typography
- **Headings**: Poppins (400, 500, 600, 700)
- **Body**: Inter (400, 500, 600)

### Components
- `Button`: Primary, secondary, and ghost variants
- `Card`: Container with hover effects
- `Modal`: Overlay modal component

## 🔌 API Integration

The frontend currently uses a **mock API client** located in `lib/api.ts`. This allows for frontend development without a backend.

When the backend is ready:
1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Replace mock functions in `lib/api.ts` with real API calls
3. The interface remains the same, so no component changes needed

## 📄 Pages

### Landing Page (`/`)
- Hero section with value proposition
- Examples gallery
- How it works (3-step process)
- Testimonials
- Pricing preview
- Footer

### Dashboard (`/dashboard`)
- Image upload interface (drag-and-drop)
- File validation
- Processing status (placeholder)
- Ready for backend integration

### Pricing (`/pricing`)
- Complete pricing tiers
- Feature comparison
- FAQ section

### Contact (`/contact`)
- Contact form
- Contact information
- FAQ link

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

## 📝 Next Steps

1. **Backend Integration**: Connect to FastAPI backend when ready
2. **Image Processing UI**: Add progress indicators and result preview
3. **Palette Selector**: Build palette selection component
4. **Order Flow**: Create checkout and payment pages
5. **User Authentication**: Add NextAuth integration
6. **Responsive Polish**: Enhance mobile experience
7. **Accessibility**: Add ARIA labels and keyboard navigation

## 🚢 Deployment

The frontend is ready to deploy to Railway or Vercel. Configure the following environment variables:

```env
NEXT_PUBLIC_API_URL=https://api.fotopainter.com
```

## 📚 Documentation

See the main project plan: `../Fotopainter_Website_and_Application_Plan.md`
