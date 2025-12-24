# Fotopainter

AI-powered platform that transforms user photos into paint-by-number artworks with intelligent color palette recommendations.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (for frontend)
- Python 3.11+ (for backend - coming soon)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fotoPainter
   ```

2. **Set up Git (if not already done)**
   ```bash
   npm install
   npm run setup-git
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Visit `http://localhost:3000`

4. **Backend Setup** (Coming soon)
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

## 📁 Project Structure

```
fotoPainter/
├── frontend/              # Next.js frontend application
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   └── lib/               # Utilities and API client
├── backend/               # FastAPI backend (coming soon)
├── .github/
│   └── workflows/        # CI/CD automation
├── scripts/              # Automation scripts
└── docs/                 # Documentation
```

## 🤖 Automation

### Auto-Commit Script
Automatically commit and push changes:

```bash
# Using npm script
npm run auto-commit

# Or directly
node scripts/auto-commit.js

# PowerShell (Windows)
.\scripts\auto-commit.ps1

# Bash (Linux/Mac)
./scripts/auto-commit.sh
```

### GitHub Actions
- **CI Pipeline**: Runs on every push/PR (builds and tests)
- **Deploy Pipeline**: Auto-deploys to Railway on main branch

### Setup GitHub Secrets
For automated deployment, add these secrets in GitHub:
- `RAILWAY_TOKEN` - Your Railway API token
- `RAILWAY_PROJECT_ID` - Your Railway project ID
- `NEXT_PUBLIC_API_URL` - API URL (optional)

## 📚 Documentation

- [Project Plan](./Fotopainter_Website_and_Application_Plan.md) - Complete technical plan
- [Gap Analysis](./Gap_Analysis_Report.md) - Identified gaps and resolutions
- [Website Summary](./WEBSITE_DEVELOPMENT_SUMMARY.md) - Frontend development summary
- [Frontend README](./frontend/README.md) - Frontend-specific docs

## 🛠️ Development

### Frontend
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: TailwindCSS v4
- State: React Hooks

### Backend (Coming Soon)
- Framework: FastAPI
- Language: Python 3.11+
- Database: PostgreSQL
- ORM: SQLAlchemy

## 🚢 Deployment

### Railway Deployment
1. Connect GitHub repository to Railway
2. Set up environment variables
3. Push to `main` branch - auto-deploys via GitHub Actions

### Manual Deployment
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend (when ready)
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 📝 Git Workflow

1. **Make changes** to your code
2. **Auto-commit** (optional):
   ```bash
   npm run auto-commit
   ```
3. **Or manual commit**:
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```

## 🔐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Backend (.env) - Coming Soon
```env
DATABASE_URL=postgresql://...
OPENAI_API_KEY=...
STRIPE_SECRET_KEY=...
```

## 📄 License

MIT

## 👥 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Status**: ✅ Website complete | ⏳ Backend in development

