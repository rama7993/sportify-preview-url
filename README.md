# Sportify Backend API

Backend API for the Sportify Angular application with Spotify preview finding capabilities.

## 🚀 Quick Start

### 1. Navigate to Project Directory

```bash
cd sportify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the `sportify` directory:

```bash
# Create .env file
touch .env
```

Edit `.env` file with your Spotify credentials:

```env
PORT=3000
SPOTIFY_CLIENT_ID=your_actual_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_actual_spotify_client_secret
CORS_ORIGIN=http://localhost:4200
```

**Get Spotify Credentials:**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy the Client ID and Client Secret to your `.env` file

### 4. Start the Server

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check

- **GET** `/health` - Check if server is running
- **GET** `/api/spotify/health` - Check Spotify service status

### Preview Finding

- **POST** `/api/spotify/preview` - Find preview URL for a track
- **GET** `/api/spotify/test` - Test Spotify Preview Finder

## 🔧 Usage Examples

### Find Preview URL

```bash
curl -X POST http://localhost:3000/api/spotify/preview \
  -H "Content-Type: application/json" \
  -d '{
    "trackName": "Shape of You",
    "artistName": "Ed Sheeran"
  }'
```

### Test Backend

```bash
curl http://localhost:3000/api/spotify/test
```

## 🏗️ Architecture

```
Angular Frontend → Backend API → Spotify Preview Finder → Spotify API
```

## 📦 Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **spotify-preview-finder** - Spotify preview URL finding

## 🔒 Security

- Client secrets are stored securely in environment variables
- CORS is configured for specific origins
- No sensitive data is exposed to the frontend

## 🐛 Troubleshooting

### Common Issues

1. **"Spotify Preview Finder not initialized"**

   - Check your `.env` file has correct credentials
   - Verify `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are set

2. **CORS Error**

   - Ensure `CORS_ORIGIN` matches your Angular app URL
   - Default is `http://localhost:4200`

3. **Port Already in Use**
   - Change `PORT` in `.env` file
   - Or kill the process using port 3000

### Debug Commands

```bash
# Check if server is running
curl http://localhost:3000/health

# Test Spotify integration
curl http://localhost:3000/api/spotify/test

# Check environment variables
node -e "require('dotenv').config(); console.log(process.env.SPOTIFY_CLIENT_ID)"
```

## 📝 Logs

The server logs important events:

- ✅ Successful operations
- ❌ Errors and failures
- 🔍 Search queries
- 🧪 Test results

## 🚀 Deployment

### Vercel Deployment (Recommended)

This project is optimized for Vercel deployment:

#### 1. Prepare for Vercel

The project already includes a `vercel.json` configuration file for optimal deployment.

#### 2. Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from sportify directory
cd sportify
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? sportify-backend
# - In which directory is your code located? ./
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `sportify` folder as the root directory
5. Add environment variables in the Vercel dashboard

#### 3. Set Environment Variables in Vercel

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### 4. Redeploy

After adding environment variables, redeploy your project:

```bash
vercel --prod
```

### Other Deployment Options

For other platforms:

1. Set production environment variables
2. Use a process manager like PM2
3. Set up reverse proxy (nginx)
4. Enable HTTPS
5. Monitor logs and performance

## 📄 License

MIT License - see main project for details.
