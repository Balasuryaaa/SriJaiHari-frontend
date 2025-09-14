# Environment Variables for SRI JAI HARI Frontend

## Local Development (.env)

```env
# API Configuration
VITE_API_BASE_URL=https://sri-jai-hari-backend.vercel.app

# Application Configuration
VITE_APP_NAME=SRI JAI HARI Engineering Solutions
VITE_APP_VERSION=1.0.0

# Optional: Analytics (if you add later)
# VITE_GA_TRACKING_ID=your-ga-id
# VITE_HOTJAR_ID=your-hotjar-id
```

## Vercel Deployment Environment Variables

Add these in your Vercel project settings:

### Required Variables:
- `VITE_API_BASE_URL`: `https://sri-jai-hari-backend.vercel.app`
- `VITE_APP_NAME`: `SRI JAI HARI Engineering Solutions`

### Optional Variables:
- `VITE_APP_VERSION`: `1.0.0`
- `NODE_ENV`: `production`

## How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with its value
5. Make sure to add for all environments (Production, Preview, Preview, Development)
6. Redeploy your application

## Security Notes:

- Never commit `.env` files to version control
- Use Vercel's environment variables for production
- Keep sensitive data in Vercel's secure environment variable system
