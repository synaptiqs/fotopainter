# Fotopainter Website and Application Plan

## 1. Purpose & Core Objectives

### Purpose
Fotopainter is an AI-powered art platform that transforms user-uploaded photographs into paint-by-number artworks. The platform provides intelligent color palette recommendations and enables users to purchase digital downloads or physical paint kits, making personalized art creation accessible to everyone.

### Core Objectives
- **Primary Goal**: Convert user photos into high-quality paint-by-number templates with AI-generated color palettes
- **User Value**: Enable non-artists to create personalized artwork from their memories
- **Business Value**: Generate revenue through digital downloads and physical kit sales via Printify integration
- **Automation Goal**: Leverage Galaxy.ai Agents for support, marketing, and finance operations

### Main User Journeys

#### Journey 1: First-Time Visitor → Conversion
1. Land on homepage → View value proposition and examples
2. Click "Get Started" or "Upload Photo" CTA
3. Upload photo (drag-and-drop or file picker)
4. View AI processing progress indicator
5. Preview paint-by-number result with 3 palette options
6. Select preferred palette and medium suggestion
7. Choose product type (digital download or physical kit)
8. Complete checkout (with or without account creation)
9. Receive confirmation and download/order tracking

#### Journey 2: Returning User → Repeat Purchase
1. Login to account (optional)
2. View order history and previous artworks
3. Upload new photo or reorder from history
4. Streamlined checkout with saved preferences

#### Journey 3: Support & Engagement
1. Contact form submission → Galaxy.ai Agent handles inquiry
2. Marketing email triggers → Galaxy.ai Agent manages campaigns
3. Order updates → Automated notifications via Galaxy.ai

### Success Metrics for MVP
- **Performance**: Page load time < 2 seconds (Lighthouse score > 90)
- **Processing**: AI conversion time < 5 seconds per image
- **Conversion**: Upload-to-purchase rate > 15%
- **Reliability**: Uptime > 99.5% on Railway
- **User Experience**: Time-to-first-interaction < 1 second

---

## 2. Technology Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  Next.js Frontend (TypeScript + TailwindCSS + Responsive)   │
│  - Landing Page                                              │
│  - Dashboard/Upload Interface                                │
│  - Order Flow                                                │
│  - User Account (NextAuth)                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/REST API
┌──────────────────────▼──────────────────────────────────────┐
│                     API LAYER                                │
│  FastAPI Backend (Python)                                    │
│  - /api/upload (image upload & validation)                   │
│  - /api/process (AI conversion trigger)                      │
│  - /api/palettes (palette generation)                       │
│  - /api/orders (order creation & management)                 │
│  - /api/webhooks (Galaxy.ai integration)                     │
└──────┬──────────────────┬──────────────────┬────────────────┘
       │                  │                  │
┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼─────────┐
│   AI APIs   │  │   PostgreSQL    │  │  External     │
│             │  │   Database      │  │  Services     │
│ - OpenAI    │  │                 │  │               │
│ - Replicate │  │ - users         │  │ - AWS S3      │
│             │  │ - artworks      │  │ - Printify    │
│             │  │ - orders        │  │ - Galaxy.ai   │
│             │  │ - palettes      │  │ - Stripe      │
└─────────────┘  └─────────────────┘  └───────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Authentication**: NextAuth.js (email provider)
- **State Management**: React Context API / Zustand (if needed)
- **Image Handling**: Next/Image for optimization
- **Forms**: React Hook Form + Zod validation

#### Backend
- **Framework**: FastAPI (Python 3.11+)
- **ORM**: SQLAlchemy 2.0
- **Database Driver**: asyncpg (async PostgreSQL)
- **File Upload**: python-multipart
- **Image Processing**: Pillow (PIL)
- **API Client**: httpx (async HTTP)

#### AI Integration
- **Primary**: OpenAI API (GPT-4 Vision for analysis, DALL-E for enhancements)
- **Alternative**: Replicate API (for specialized image segmentation models)
- **Fallback**: Custom Python algorithms (OpenCV) for basic segmentation

#### Database
- **Type**: PostgreSQL 15+
- **Hosting**: Railway PostgreSQL service
- **Connection**: Connection pooling via SQLAlchemy

#### Storage
- **Image Storage**: AWS S3 (or Railway Volumes for MVP)
- **CDN**: CloudFront (optional, for production scaling)

#### External Services
- **E-commerce**: Printify API (physical kit fulfillment)
- **Payment**: Stripe (digital downloads + kit payments)
- **Automation**: Galaxy.ai Agents (webhook-based)
- **Email**: Resend or SendGrid (transactional emails)

#### Hosting
- **Platform**: Railway
- **Frontend**: Next.js deployment (Node.js runtime)
- **Backend**: FastAPI deployment (Python runtime)
- **Database**: Railway PostgreSQL addon
- **CI/CD**: GitHub Actions → Railway auto-deploy

---

## 3. Functional Requirements

### Module 1: Landing Page

#### Core Features
- Hero section with value proposition and primary CTA
- Example gallery (before/after transformations)
- How it works (3-step process)
- Testimonials carousel
- Pricing preview
- Footer with contact and social links

#### User Interactions
- Click "Get Started" → Navigate to dashboard
- Click "View Examples" → Scroll to gallery
- Click "Contact" → Open contact modal/form
- Click pricing tier → Navigate to dashboard with tier pre-selected

#### Required Endpoints
- `GET /api/examples` - Fetch example artworks for gallery
- `POST /api/contact` - Submit contact form (triggers Galaxy.ai webhook)

#### External Dependencies
- None (static content + API calls)

---

### Module 2: Dashboard / Upload Interface

#### Core Features
- Drag-and-drop image upload zone
- File validation (size, format, dimensions)
- Progress bar during AI processing
- AI preview render (paint-by-number result)
- Palette selector (3 generated palettes)
- Medium suggestion card (acrylic, watercolor, oil)
- Download preview button
- Order creation flow trigger

#### User Interactions
- Drag image or click to upload
- View upload progress (0-100%)
- See processing status ("Analyzing...", "Generating palettes...")
- Click palette option → Preview updates
- Click medium suggestion → See color recommendations
- Click "Order Now" → Navigate to order flow

#### Required Endpoints
- `POST /api/upload` - Upload image, validate, store in S3
- `POST /api/process` - Trigger AI conversion (returns job ID)
- `GET /api/process/{job_id}/status` - Poll for processing status
- `GET /api/artworks/{artwork_id}` - Fetch processed artwork with palettes
- `POST /api/artworks/{artwork_id}/palette` - Update selected palette

#### External Dependencies
- AWS S3 (image storage)
- OpenAI/Replicate API (AI processing)
- Database (artwork metadata storage)

#### Data Structures
```json
{
  "artwork": {
    "id": "uuid",
    "user_id": "uuid (optional)",
    "original_image_url": "s3://...",
    "processed_image_url": "s3://...",
    "palettes": [
      {
        "id": 1,
        "name": "Vibrant",
        "colors": ["#FF5733", "#33FF57", "#3357FF"],
        "color_count": 12
      }
    ],
    "selected_palette_id": 1,
    "medium_suggestion": "acrylic",
    "status": "completed",
    "created_at": "timestamp"
  }
}
```

---

### Module 3: Order Flow

#### Core Features
- Product selection (Digital Download vs. Physical Kit)
- Digital: Instant download link generation
- Physical: Printify integration for kit creation
- Payment processing (Stripe)
- Order confirmation page
- Email receipt (via Galaxy.ai or direct email service)

#### User Interactions
- Select product type (radio buttons)
- Choose kit size (if physical)
- Enter shipping address (if physical)
- Enter payment details (Stripe Elements)
- Submit order → Processing spinner
- View confirmation with download link or tracking number

#### Required Endpoints
- `POST /api/orders` - Create order
- `POST /api/orders/{order_id}/payment` - Process Stripe payment
- `GET /api/orders/{order_id}` - Fetch order status
- `POST /api/orders/{order_id}/fulfill` - Trigger Printify fulfillment (webhook)
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `POST /api/webhooks/printify` - Printify webhook handler

#### External Dependencies
- Stripe API (payment processing)
- Printify API (physical kit creation)
- Galaxy.ai webhook (order notification for finance agent)

#### Data Structures
```json
{
  "order": {
    "id": "uuid",
    "user_id": "uuid (optional)",
    "artwork_id": "uuid",
    "product_type": "digital|physical",
    "palette_id": 1,
    "amount": 29.99,
    "currency": "USD",
    "status": "pending|paid|fulfilled|shipped",
    "stripe_payment_intent_id": "pi_...",
    "printify_order_id": "12345",
    "shipping_address": {...},
    "created_at": "timestamp"
  }
}
```

---

### Module 4: User Account (Optional)

#### Core Features
- Email/password login (NextAuth)
- Order history page
- Saved artworks gallery
- Profile settings
- Re-download previous purchases

#### User Interactions
- Click "Sign In" → Email magic link or password
- View order history → Click order → See details
- View saved artworks → Click artwork → Re-order or download
- Update profile → Save changes

#### Required Endpoints
- `GET /api/auth/session` - NextAuth session check
- `GET /api/users/me` - Fetch current user
- `GET /api/users/me/orders` - Fetch user orders
- `GET /api/users/me/artworks` - Fetch user artworks
- `PATCH /api/users/me` - Update user profile

#### External Dependencies
- NextAuth.js (authentication)
- Database (user sessions)

---

### Module 5: Contact & Pricing Pages

#### Contact Page Features
- Contact form (name, email, message)
- FAQ section
- Support email display
- Social media links

#### Pricing Page Features
- Tiered pricing display
- Feature comparison table
- CTA buttons per tier
- FAQ about pricing

#### Required Endpoints
- `POST /api/contact` - Submit contact form (triggers Galaxy.ai support agent)

#### External Dependencies
- Galaxy.ai webhook (support agent)

---

## 4. Non-Functional Requirements

### Performance Targets
- **Page Load**: < 2 seconds (First Contentful Paint)
- **Time to Interactive**: < 3 seconds
- **AI Processing**: < 5 seconds per image (95th percentile)
- **API Response Time**: < 200ms for non-processing endpoints
- **Image Optimization**: WebP format, lazy loading, responsive sizes

### Accessibility
- **WCAG 2.1 AA Compliance**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Color contrast ratio ≥ 4.5:1 for text
- Alt text for all images
- Screen reader compatibility testing

### Security
- **Environment Variables**: All API keys in `.env` (never committed)
- **Image Validation**: File type, size (max 10MB), dimension checks
- **Rate Limiting**: 10 uploads per hour per IP/user
- **CORS**: Configured for production domain only
- **HTTPS**: Enforced on all routes
- **Input Sanitization**: All user inputs validated and sanitized
- **SQL Injection Prevention**: Parameterized queries via SQLAlchemy
- **XSS Prevention**: React's built-in escaping + Content Security Policy

### Scalability
- **Horizontal Scaling**: Railway auto-scaling based on traffic
- **Database Connection Pooling**: Max 20 connections per instance
- **Image CDN**: CloudFront for global distribution (future)
- **Caching**: Redis for session storage and API response caching (future)
- **Queue System**: Celery + Redis for async AI processing (future, if needed)

### Reliability
- **Error Handling**: Graceful degradation for AI API failures
- **Retry Logic**: Exponential backoff for external API calls
- **Monitoring**: Railway logs + Sentry for error tracking
- **Backup**: Daily PostgreSQL backups on Railway

---

## 5. Integration Plan

### Frontend ↔ FastAPI Communication

#### REST API Routes
```
POST   /api/upload              - Upload image
POST   /api/process             - Start AI processing
GET    /api/process/{job_id}    - Get processing status
GET    /api/artworks/{id}       - Get artwork details
POST   /api/orders              - Create order
POST   /api/orders/{id}/payment - Process payment
GET    /api/orders/{id}         - Get order status
GET    /api/users/me/orders     - Get user orders
POST   /api/contact             - Submit contact form
```

#### Request/Response Format
- **Content-Type**: `application/json`
- **Authentication**: Bearer token (NextAuth session token)
- **Error Format**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Image file too large",
    "details": {...}
  }
}
```

### FastAPI ↔ AI Model API

#### OpenAI Integration
```python
# Pseudocode
async def process_image(image_url: str) -> dict:
    # 1. Send image to GPT-4 Vision for analysis
    analysis = await openai.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": "Analyze this image for paint-by-number conversion..."},
                {"type": "image_url", "image_url": image_url}
            ]
        }]
    )
    
    # 2. Generate segmentation mask (or use Replicate)
    # 3. Extract color palette
    # 4. Generate 3 palette variations
    return {
        "processed_image": "...",
        "palettes": [...],
        "medium_suggestion": "acrylic"
    }
```

#### Replicate Alternative
```python
# For specialized segmentation models
output = await replicate.run(
    "model-name",
    input={"image": image_url}
)
```

#### Error Handling
- Retry 3 times with exponential backoff
- Fallback to basic OpenCV segmentation if API fails
- Log errors to Sentry

### FastAPI ↔ Database

#### SQLAlchemy Models
```python
# users table
class User(Base):
    id: UUID
    email: str (unique)
    created_at: datetime

# artworks table
class Artwork(Base):
    id: UUID
    user_id: UUID (nullable, FK)
    original_image_url: str
    processed_image_url: str
    status: str (pending|processing|completed|failed)
    created_at: datetime

# palettes table
class Palette(Base):
    id: int
    artwork_id: UUID (FK)
    name: str
    colors: JSON
    color_count: int

# orders table
class Order(Base):
    id: UUID
    user_id: UUID (nullable, FK)
    artwork_id: UUID (FK)
    product_type: str (digital|physical)
    amount: decimal
    status: str
    stripe_payment_intent_id: str (nullable)
    printify_order_id: str (nullable)
    created_at: datetime
```

#### Database Operations
- Use async SQLAlchemy sessions
- Connection pooling: 5-20 connections
- Transactions for order creation
- Indexes on `user_id`, `artwork_id`, `status`

### FastAPI ↔ Galaxy.ai Agents

#### Webhook Integration
```python
# When order is created
async def notify_galaxy_agent(event_type: str, data: dict):
    await httpx.post(
        "https://galaxy.ai/webhook/fotopainter",
        json={
            "event": event_type,  # "order_created", "contact_submitted", etc.
            "data": data,
            "timestamp": datetime.utcnow().isoformat()
        },
        headers={"Authorization": f"Bearer {GALAXY_API_KEY}"}
    )
```

#### Event Types
- `order_created` → Finance agent (track revenue)
- `contact_submitted` → Support agent (handle inquiry)
- `user_registered` → Marketing agent (welcome email)
- `artwork_processed` → Marketing agent (re-engagement)

#### Data Structures
```json
{
  "event": "order_created",
  "data": {
    "order_id": "uuid",
    "amount": 29.99,
    "product_type": "digital",
    "user_email": "user@example.com"
  }
}
```

### Expected Data Structures

#### Palette Result Schema
```json
{
  "artwork_id": "uuid",
  "processed_image_url": "https://...",
  "palettes": [
    {
      "id": 1,
      "name": "Vibrant",
      "colors": [
        {"hex": "#FF5733", "name": "Coral Red"},
        {"hex": "#33FF57", "name": "Lime Green"}
      ],
      "color_count": 12,
      "difficulty": "medium"
    }
  ],
  "medium_suggestion": {
    "type": "acrylic",
    "reason": "Bright colors work well with acrylic paints"
  },
  "processing_time_ms": 3200
}
```

#### Order Schema
```json
{
  "order_id": "uuid",
  "artwork_id": "uuid",
  "product_type": "digital|physical",
  "palette_id": 1,
  "amount": 29.99,
  "currency": "USD",
  "status": "pending|paid|fulfilled|shipped",
  "payment_intent_id": "pi_...",
  "download_url": "https://...",  // if digital
  "tracking_number": "1Z...",     // if physical
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

## 6. Design Guidelines

### Brand Aesthetic
- **Primary Colors**: 
  - Sienna: `#A0522D` (warm, earthy)
  - Teal: `#008080` (fresh, creative)
- **Neutral Palette**:
  - White: `#FFFFFF` (backgrounds)
  - Light Gray: `#F5F5F5` (subtle backgrounds)
  - Dark Gray: `#333333` (text)
  - Black: `#000000` (headings)
- **Accent Colors**:
  - Success Green: `#10B981`
  - Error Red: `#EF4444`
  - Warning Yellow: `#F59E0B`

### Typography
- **Primary Font**: Poppins (headings, CTAs)
  - Weights: 400 (regular), 600 (semibold), 700 (bold)
- **Body Font**: Inter (body text, UI elements)
  - Weights: 400 (regular), 500 (medium), 600 (semibold)
- **Font Sizes**:
  - H1: 3rem (48px) - Hero titles
  - H2: 2rem (32px) - Section titles
  - H3: 1.5rem (24px) - Subsection titles
  - Body: 1rem (16px) - Default text
  - Small: 0.875rem (14px) - Captions, labels

### Component Styles

#### Buttons
- **Primary**: Teal background (`#008080`), white text, rounded-lg, padding: 12px 24px
- **Secondary**: White background, teal border, teal text, rounded-lg
- **Ghost**: Transparent, teal text on hover
- **States**: Hover (darker shade), Active (pressed), Disabled (opacity 50%)

#### Cards
- **Container**: White background, rounded-xl, shadow-sm, padding: 24px
- **Hover**: Shadow-md transition
- **Image Cards**: Aspect ratio 4:3, object-cover

#### Image Previews
- **Upload Zone**: Dashed border (teal), rounded-lg, min-height: 300px
- **Preview**: Rounded-lg, shadow-md, max-width: 100%
- **Loading State**: Skeleton loader with shimmer animation

#### Modals
- **Overlay**: Black background, opacity 50%
- **Modal**: White background, rounded-2xl, max-width: 500px, centered
- **Close Button**: Top-right, X icon, hover: gray background

### Color Usage Rules
- **Sienna**: Used for warm accents, secondary CTAs, highlights
- **Teal**: Primary brand color, main CTAs, links, active states
- **White Space**: Generous padding (24px+ between sections)
- **Contrast**: All text meets WCAG AA standards

### Typography Hierarchy
1. **Hero Section**: Poppins Bold, 48px, teal or dark gray
2. **Section Headings**: Poppins Semibold, 32px
3. **Card Titles**: Poppins Medium, 24px
4. **Body Text**: Inter Regular, 16px, dark gray
5. **Labels**: Inter Medium, 14px, gray
6. **Captions**: Inter Regular, 14px, light gray

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)
- **Wide**: > 1280px (xl)

---

## 7. Implementation Roadmap

### Phase 1: Project Setup (Week 1)

#### Deliverables
- Next.js project initialized with TypeScript and TailwindCSS
- FastAPI backend structure with basic routes
- Railway accounts and project setup
- PostgreSQL database created
- Environment variables configured
- GitHub repository with initial structure
- Basic CI/CD pipeline (GitHub Actions → Railway)

#### Tasks
1. Initialize Next.js app with App Router
2. Configure TailwindCSS with custom theme (sienna/teal)
3. Set up FastAPI project structure
4. Create Railway projects (frontend, backend, database)
5. Configure environment variables (.env files)
6. Set up GitHub repository
7. Create basic deployment scripts

#### Dependencies
- None (foundation phase)

#### Estimated Duration
- 3-5 days

---

### Phase 2: Upload & Preview Module (Week 2)

#### Deliverables
- Image upload component (drag-and-drop)
- File validation (size, type, dimensions)
- Upload progress indicator
- Image preview component
- Basic FastAPI upload endpoint
- S3 integration (or Railway Volumes)
- Database models for artworks

#### Tasks
1. Build upload UI component
2. Implement client-side validation
3. Create `/api/upload` endpoint
4. Set up S3 bucket and upload logic
5. Create Artwork SQLAlchemy model
6. Store metadata in database
7. Display uploaded image preview

#### Dependencies
- Phase 1 complete
- AWS S3 account (or Railway Volumes)

#### Estimated Duration
- 4-6 days

---

### Phase 3: AI Integration and Palette Display (Week 3-4)

#### Deliverables
- AI processing endpoint (`/api/process`)
- OpenAI/Replicate integration
- Job queue system (or async processing)
- Status polling endpoint
- Palette generation logic
- Palette selector UI component
- Medium suggestion display
- Processed image preview

#### Tasks
1. Integrate OpenAI API (or Replicate)
2. Implement image segmentation algorithm
3. Create color extraction and palette generation
4. Build 3 palette variations
5. Create processing status endpoint
6. Build palette selector UI
7. Display processed paint-by-number image
8. Add medium suggestion logic

#### Dependencies
- Phase 2 complete
- OpenAI API key (or Replicate account)

#### Estimated Duration
- 7-10 days (most complex phase)

---

### Phase 4: Order and Payment Flows (Week 5)

#### Deliverables
- Order creation endpoint
- Stripe integration
- Payment processing UI
- Order confirmation page
- Digital download link generation
- Printify API integration (if physical kits)
- Order history page (if user accounts)

#### Tasks
1. Create Order SQLAlchemy model
2. Build order creation endpoint
3. Integrate Stripe Elements
4. Implement payment processing
5. Generate secure download links
6. Integrate Printify API (if applicable)
7. Build order confirmation UI
8. Set up Stripe webhooks

#### Dependencies
- Phase 3 complete
- Stripe account
- Printify account (if physical kits)

#### Estimated Duration
- 5-7 days

---

### Phase 5: Interface Polish and Testing (Week 6)

#### Deliverables
- Landing page with all sections
- Contact and pricing pages
- User account pages (if implemented)
- Responsive design across all breakpoints
- Accessibility improvements
- Error handling and user feedback
- Loading states and animations
- Unit tests for core endpoints
- Integration tests for critical flows

#### Tasks
1. Build landing page components
2. Create contact and pricing pages
3. Implement NextAuth (if user accounts)
4. Add responsive breakpoints
5. Implement error boundaries
6. Add loading skeletons
7. Write API tests (pytest)
8. Write frontend tests (Jest + React Testing Library)
9. Accessibility audit and fixes

#### Dependencies
- Phase 4 complete

#### Estimated Duration
- 5-7 days

---

### Phase 6: Deployment and Monitoring Setup (Week 7)

#### Deliverables
- Production deployment on Railway
- Environment variables configured
- Database migrations applied
- Monitoring and logging setup
- Error tracking (Sentry)
- Performance monitoring
- Documentation (README)
- Deployment runbook

#### Tasks
1. Configure Railway production environments
2. Set up environment variables
3. Run database migrations
4. Deploy frontend and backend
5. Configure custom domain (if applicable)
6. Set up Sentry error tracking
7. Configure Railway monitoring
8. Write deployment documentation
9. Perform smoke tests

#### Dependencies
- Phase 5 complete
- All external service accounts ready

#### Estimated Duration
- 3-4 days

---

## 8. Deployment Readiness

### Railway Configuration

#### Frontend (Next.js) - `railway.toml`
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
healthcheckPath = "/"
healthcheckTimeout = 100
restartPolicyType = "on_failure"
```

#### Backend (FastAPI) - `railway.toml`
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "uvicorn main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "on_failure"
```

#### Procfile (Alternative)
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.fotopainter.com
NEXTAUTH_URL=https://fotopainter.com
NEXTAUTH_SECRET=<generate-secret>
DATABASE_URL=<railway-postgres-url>
```

#### Backend (.env)
```
DATABASE_URL=<railway-postgres-url>
OPENAI_API_KEY=<openai-key>
REPLICATE_API_TOKEN=<replicate-token>  # optional
AWS_ACCESS_KEY_ID=<aws-key>
AWS_SECRET_ACCESS_KEY=<aws-secret>
AWS_S3_BUCKET_NAME=fotopainter-uploads
AWS_REGION=us-east-1
STRIPE_SECRET_KEY=<stripe-secret>
STRIPE_WEBHOOK_SECRET=<stripe-webhook-secret>
PRINTIFY_API_KEY=<printify-key>  # optional
GALAXY_API_KEY=<galaxy-key>
GALAXY_WEBHOOK_URL=https://galaxy.ai/webhook/fotopainter
SENTRY_DSN=<sentry-dsn>  # optional
ENVIRONMENT=production
```

### CI/CD Pipeline (GitHub Actions)

#### `.github/workflows/deploy.yml`
```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: bervProject/railway-deploy@master
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: fotopainter-frontend
      
      - uses: bervProject/railway-deploy@master
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: fotopainter-backend
```

### Deployment Steps

1. **Pre-deployment Checklist**
   - [ ] All environment variables set in Railway
   - [ ] Database migrations tested locally
   - [ ] API keys and secrets configured
   - [ ] Domain names configured (if custom)
   - [ ] SSL certificates active

2. **Initial Deployment**
   - Push code to `main` branch
   - Railway auto-deploys via GitHub integration
   - Monitor deployment logs
   - Run database migrations manually (first time)

3. **Post-deployment Verification**
   - Test homepage loads
   - Test image upload flow
   - Test AI processing (with test image)
   - Test order creation (test mode)
   - Verify webhooks are receiving events

4. **Monitoring Setup**
   - Configure Railway alerts
   - Set up Sentry error tracking
   - Monitor API response times
   - Track error rates

---

## 9. Documentation and Next Tasks

### Recommended Folder Structure

```
fotopainter/
├── frontend/                    # Next.js app
│   ├── app/                     # App Router pages
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   ├── contact/
│   │   ├── pricing/
│   │   ├── layout.tsx
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── upload/
│   │   ├── palette/
│   │   └── order/
│   ├── lib/
│   │   ├── api.ts               # API client functions
│   │   ├── utils.ts
│   │   └── auth.ts              # NextAuth config
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   ├── package.json
│   └── tailwind.config.ts
│
├── backend/                     # FastAPI app
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── upload.py
│   │   │   │   ├── process.py
│   │   │   │   ├── orders.py
│   │   │   │   └── webhooks.py
│   │   │   └── dependencies.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── artwork.py
│   │   │   ├── palette.py
│   │   │   └── order.py
│   │   ├── services/
│   │   │   ├── ai_processor.py
│   │   │   ├── palette_generator.py
│   │   │   ├── s3_service.py
│   │   │   └── stripe_service.py
│   │   ├── schemas/
│   │   │   ├── artwork.py
│   │   │   └── order.py
│   │   └── main.py
│   ├── alembic/                 # Database migrations
│   ├── tests/
│   ├── requirements.txt
│   └── railway.toml
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── docs/
│   ├── api.md
│   └── deployment.md
│
└── README.md
```

### Dependencies

#### Frontend (`package.json`)
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.0",
    "tailwindcss": "^3.3.0",
    "next-auth": "^4.24.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "@stripe/stripe-js": "^2.1.0",
    "@stripe/react-stripe-js": "^2.4.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.52.0",
    "eslint-config-next": "^14.0.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0",
    "jest": "^29.7.0"
  }
}
```

#### Backend (`requirements.txt`)
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
sqlalchemy==2.0.23
asyncpg==0.29.0
alembic==1.12.1
pydantic==2.5.0
pydantic-settings==2.1.0
httpx==0.25.2
pillow==10.1.0
openai==1.3.0
replicate==0.20.0
boto3==1.29.7
stripe==7.0.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.0
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0
sentry-sdk[fastapi]==1.38.0
```

### Documentation Topics for README

1. **Project Overview**
   - What Fotopainter does
   - Key features
   - Tech stack summary

2. **Getting Started**
   - Prerequisites (Node.js, Python, Railway account)
   - Installation steps
   - Environment setup
   - Running locally

3. **Development**
   - Project structure
   - Running frontend and backend
   - Database setup and migrations
   - API documentation (link to Swagger)

4. **Deployment**
   - Railway setup instructions
   - Environment variables reference
   - Deployment checklist

5. **API Reference**
   - Endpoint documentation
   - Request/response examples
   - Authentication

6. **Contributing**
   - Code style guidelines
   - Testing requirements
   - Pull request process

### Testing Plan

#### Unit Tests
- **Frontend**: Component rendering, form validation, API client functions
- **Backend**: Service functions (palette generation, image processing), utility functions

#### Integration Tests
- **API Endpoints**: 
  - `POST /api/upload` - Image upload and validation
  - `POST /api/process` - AI processing trigger
  - `GET /api/artworks/{id}` - Artwork retrieval
  - `POST /api/orders` - Order creation
  - `POST /api/orders/{id}/payment` - Payment processing

#### End-to-End Tests
- **Critical User Flows**:
  1. Upload photo → Process → View palettes → Create order
  2. User registration → Login → View order history
  3. Contact form submission → Galaxy.ai webhook trigger

#### Test Coverage Goals
- Backend: > 80% coverage
- Frontend: > 70% coverage
- Critical paths: 100% coverage

### Next Steps After Planning

1. **Review and Approval**
   - Stakeholder review of this plan
   - Adjustments based on feedback
   - Finalize technology choices

2. **Resource Preparation**
   - Create Railway accounts
   - Obtain API keys (OpenAI, Stripe, AWS, etc.)
   - Set up GitHub repository
   - Configure development environment

3. **Begin Phase 1**
   - Initialize Next.js project
   - Set up FastAPI backend
   - Configure Railway projects
   - Create initial project structure

4. **Iterative Development**
   - Follow roadmap phases
   - Regular testing and feedback loops
   - Adjust plan as needed based on learnings

---

## 10. Critical Implementation Details & Gap Resolutions

### AI Processing Pipeline Specification

#### Paint-by-Number Generation Algorithm
The core conversion process follows this pipeline:

1. **Image Preprocessing**
   - Convert to RGB color space
   - Resize to max 2048px (maintain aspect ratio)
   - Normalize brightness/contrast if needed
   - Strip EXIF data

2. **Color Quantization**
   - Use K-means clustering to reduce colors to target count (12-24 colors)
   - Generate 3 variations: "Vibrant" (more colors), "Balanced" (medium), "Simple" (fewer colors)

3. **Image Segmentation**
   - Use OpenCV watershed algorithm or DeepLabV3 model (via Replicate)
   - Identify distinct color regions
   - Create region boundaries

4. **Number Assignment**
   - Assign numbers to regions based on:
     - Spatial ordering (top-to-bottom, left-to-right)
     - Color similarity grouping
     - Region size (larger regions get lower numbers)
   - Ensure numbers are readable and don't overlap

5. **Template Generation**
   - Create outline image (black lines on white background)
   - Overlay numbers in each region
   - Generate color guide (swatch with number-to-color mapping)
   - Output: PNG with transparency for numbers layer

#### Output Format
- **Processed Image**: PNG format, numbered template (outline + numbers)
- **Color Guide**: JSON + visual swatch showing number-to-color mapping
- **Digital Download Package**: ZIP file containing:
  - `template.png` - High-res numbered template (300 DPI)
  - `color-guide.pdf` - Color reference with paint recommendations
  - `instructions.pdf` - How-to guide
  - `template-web.png` - Web-optimized preview (72 DPI)

### Digital Download Specifications

#### File Generation
- **Format**: ZIP archive containing multiple files (see above)
- **Resolution**: 300 DPI for print-ready template
- **File Size**: Target < 10MB per download
- **Security**: S3 presigned URLs with 7-day expiration, single-use token
- **Delivery**: Instant download link after payment confirmation

#### Download Link Structure
```
https://downloads.fotopainter.com/{order_id}/{token}
- Token: Cryptographically secure, single-use
- Expiration: 7 days from generation
- Rate Limit: 5 downloads per link
```

### Physical Kit Specifications

#### Product Configuration
- **Base Product**: Pre-printed canvas with paint-by-number template
- **Sizes**: 
  - Small: 8" x 10" - $49.99
  - Medium: 12" x 16" - $69.99
  - Large: 16" x 20" - $89.99
- **Kit Contents**: Canvas + 12-24 paint pots (based on palette) + 3 brushes + instructions
- **Printify Product**: Custom product blueprint with variable printing

#### Color Matching System
- **Process**: Match hex colors to closest paint color in Printify catalog
- **Algorithm**: 
  1. Get available paint colors from Printify API
  2. Calculate color distance (CIE76 or Delta E)
  3. Map each palette color to closest paint
  4. Store mapping in order for fulfillment

#### Printify Integration Details
- **Product Blueprint**: "Custom Paint-by-Number Canvas"
- **Variants**: Size options (S/M/L)
- **Print Areas**: Front canvas with template
- **Fulfillment**: Automatic order creation via API when payment confirmed

### Pricing Structure

#### MVP Pricing
- **Digital Download**: $19.99 USD
- **Physical Kit - Small**: $49.99 USD + $9.99 shipping (US), $19.99 (International)
- **Physical Kit - Medium**: $69.99 USD + $9.99 shipping (US), $19.99 (International)
- **Physical Kit - Large**: $89.99 USD + $12.99 shipping (US), $24.99 (International)

#### Tax Calculation
- **Service**: Stripe Tax (automatic calculation)
- **Regions**: US states, EU countries, Canada
- **Display**: Shown at checkout before payment

### Error Handling & Recovery Flows

#### AI Processing Failures
**Scenario**: OpenAI/Replicate API timeout or failure

**Flow**:
1. Retry 3 times with exponential backoff (1s, 2s, 4s)
2. If all retries fail:
   - Set artwork status to `processing_failed`
   - Notify user via email: "We're having trouble processing your image. Please try again or contact support."
   - Offer free retry (button in dashboard)
   - Log error to Sentry with full context
3. Fallback: Use OpenCV-based segmentation (lower quality but functional)

#### Payment Failures
**Scenario**: Stripe payment fails after order creation

**Flow**:
1. Order status set to `payment_failed`
2. Payment intent remains in "requires_payment_method" state
3. User sees error message with retry button
4. Order can be retried for 24 hours
5. After 24 hours, order cancelled automatically
6. Email notification sent with payment retry link

#### Printify Fulfillment Failures
**Scenario**: Printify rejects order (invalid address, product unavailable)

**Flow**:
1. Order status set to `fulfillment_failed`
2. User notified via email with reason
3. Offer: Refund or address correction
4. Manual review queue for admin to resolve
5. If unresolved after 7 days, automatic refund

### Image Preprocessing Requirements

#### Supported Formats
- **Primary**: JPEG, PNG, WebP
- **Secondary** (with conversion): HEIC, RAW (convert to JPEG)
- **Max File Size**: 10MB
- **Min Dimensions**: 500x500px
- **Max Dimensions**: 8000x8000px (will be resized)

#### Preprocessing Steps
1. Format detection and conversion (if needed)
2. EXIF orientation correction (auto-rotate)
3. Color space conversion to sRGB
4. Resize to optimal processing size (max 2048px)
5. Quality optimization (JPEG quality 85)

### Database Schema Enhancements

#### Additional Fields Needed

**Artwork Model**:
```python
class Artwork(Base):
    # ... existing fields ...
    width: int
    height: int
    file_size: int  # bytes
    original_format: str  # "JPEG", "PNG", etc.
    processing_time_ms: int
    color_count: int  # number of colors in palette
    difficulty: str  # "easy", "medium", "hard"
    updated_at: datetime
```

**Order Model**:
```python
class Order(Base):
    # ... existing fields ...
    shipping_address: JSON  # or separate ShippingAddress model
    tax_amount: decimal
    shipping_cost: decimal
    total_amount: decimal
    cancelled_at: datetime (nullable)
    cancellation_reason: str (nullable)
    refund_amount: decimal (nullable)
    updated_at: datetime
```

**New Models**:
```python
class ShippingAddress(Base):
    id: UUID
    order_id: UUID (FK)
    name: str
    street: str
    city: str
    state: str
    postal_code: str
    country: str
    phone: str (nullable)

class PaymentAttempt(Base):
    id: UUID
    order_id: UUID (FK)
    stripe_payment_intent_id: str
    status: str  # "succeeded", "failed", "requires_action"
    amount: decimal
    created_at: datetime
```

### User Experience Enhancements

#### Preview Before Purchase
- **Requirement**: Users must see full preview before checkout
- **Implementation**: 
  - Show processed template (watermarked)
  - Show all 3 palette options
  - Show color guide preview
  - "Order Now" button only enabled after preview

#### Guest Checkout Flow
1. User uploads and processes image (no account required)
2. At checkout, prompt: "Create account to save your artwork" (optional)
3. If guest: Create temporary user record with email
4. After order: Send email with "Create account" link to save artwork
5. Temporary user converts to permanent account if they sign up

### API Versioning & Rate Limiting

#### API Versioning
- **Strategy**: URL-based versioning (`/api/v1/...`)
- **MVP**: All endpoints under `/api/v1/`
- **Future**: Maintain backward compatibility for 6 months when introducing v2

#### Rate Limiting Details
- **Upload Endpoint**: 10 requests/hour per IP
- **Process Endpoint**: 5 requests/hour per user
- **Order Endpoint**: 20 requests/hour per user
- **General API**: 100 requests/hour per IP
- **Implementation**: FastAPI rate limiting middleware (slowapi)

### Monitoring & Metrics

#### Key Metrics to Track
- **Conversion Funnel**: 
  - Landing page views → Uploads → Processing success → Orders → Payments
- **Performance**:
  - Average processing time
  - API response times (p50, p95, p99)
  - Error rates by endpoint
- **Business**:
  - Revenue per user
  - Average order value
  - Digital vs Physical ratio
  - Refund rate

#### Alert Thresholds
- **Error Rate**: > 5% of requests → Page on-call
- **Processing Time**: > 10 seconds (p95) → Alert
- **Payment Failure Rate**: > 10% → Alert
- **API Downtime**: Any 5xx errors for > 1 minute → Page

---

## Conclusion

This plan provides a comprehensive blueprint for building the Fotopainter platform. The architecture is designed for scalability, the user experience is optimized for conversion, and the technical stack is modern and maintainable. The phased approach allows for iterative development and early validation of core features.

**Key Success Factors**:
- Clean separation between frontend and backend
- Robust error handling and fallbacks for AI processing
- Secure payment and order fulfillment flows
- Seamless integration with Galaxy.ai for automation
- Performance optimization for fast user experience

**Ready for Implementation**: This plan is complete and ready to be handed off to the development team for execution.

