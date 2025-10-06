# Vercel Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- Node.js installed
- Vercel account
- Spotify Developer account

### Step 1: Get Spotify Credentials
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Note down your Client ID and Client Secret

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd sportify

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? sportify-backend
# - In which directory is your code located? ./
```

#### Option B: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Select the `sportify` folder as root directory

### Step 3: Configure Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Step 4: Test Deployment
After deployment, test your endpoints:

```bash
# Health check
curl https://your-app.vercel.app/health

# Test Spotify integration
curl https://your-app.vercel.app/api/spotify/test
```

### API Endpoints
- `GET /health` - Server health check
- `GET /api/spotify/health` - Spotify service status
- `POST /api/spotify/preview` - Find preview URL
- `GET /api/spotify/test` - Test Spotify integration

### Example Usage
```bash
curl -X POST https://your-app.vercel.app/api/spotify/preview \
  -H "Content-Type: application/json" \
  -d '{
    "trackName": "Shape of You",
    "artistName": "Ed Sheeran"
  }'
```

## Troubleshooting

### Common Issues
1. **Environment variables not set** - Check Vercel dashboard settings
2. **CORS errors** - Update CORS_ORIGIN in environment variables
3. **Spotify API errors** - Verify credentials are correct

### Debug Commands
```bash
# Check deployment logs
vercel logs

# Redeploy with latest changes
vercel --prod
```
