# MSME Demo Frontend

This is the demo version of the MSME Intel Platform. It can run in two modes:

## Running in Demo Mode (static data)
```bash
cp .env.local.demo .env.local && npm run dev
```

## Running in Live Mode (real FastAPI backend)  
```bash
cp .env.local.live .env.local && npm run dev
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
