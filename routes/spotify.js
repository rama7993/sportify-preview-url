const express = require("express");
const searchAndGetLinks = require("spotify-preview-finder");
const router = express.Router();

// Check if environment variables are set
const hasSpotifyCredentials =
  process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET;

if (!hasSpotifyCredentials) {
  console.error(
    "❌ Failed to initialize Spotify Preview Finder: Missing credentials"
  );
  console.log(
    "⚠️  Make sure to set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env file"
  );
} else {
  //console.log("✅ Spotify Preview Finder ready (credentials found)");
}

// Get preview URL for a track
router.post("/preview", async (req, res) => {
  try {
    const { trackName, artistName } = req.body;

    if (!trackName) {
      return res.status(400).json({
        success: false,
        error: "Track name is required",
      });
    }

    if (!hasSpotifyCredentials) {
      return res.status(500).json({
        success: false,
        error: "Spotify Preview Finder not initialized",
        message: "Check server configuration and environment variables",
      });
    }

    // console.log(
    //   `🔍 Searching for preview: "${trackName}" by "${
    //     artistName || "Unknown Artist"
    //   }"`
    // );

    // Create search query combining track name and artist
    const searchQuery = artistName ? `${trackName} ${artistName}` : trackName;
    const result = await searchAndGetLinks(searchQuery, 1);

    if (result.success && result.results && result.results.length > 0) {
      const track = result.results[0];
      const previewUrl =
        track.previewUrls && track.previewUrls.length > 0
          ? track.previewUrls[0]
          : null;

      //console.log(`✅ Preview found: ${previewUrl ? "Yes" : "No"}`);

      res.json({
        success: true,
        previewUrl,
        track: {
          name: track.name,
          artist: artistName || "Unknown Artist",
          spotifyUrl: track.spotifyUrl,
        },
        searchQuery: searchQuery,
      });
    } else {
      //console.log(`❌ No preview found for "${trackName}"`);
      res.json({
        success: false,
        previewUrl: null,
        message: "No preview found for this track",
        searchQuery: searchQuery,
      });
    }
  } catch (error) {
    console.error("❌ Error finding preview:", error);
    res.status(500).json({
      success: false,
      error: "Failed to find preview URL",
      details: error.message,
    });
  }
});

// Test endpoint
router.get("/test", async (req, res) => {
  try {
    if (!hasSpotifyCredentials) {
      return res.status(500).json({
        success: false,
        error: "Spotify Preview Finder not initialized",
        message: "Check server configuration and environment variables",
      });
    }

    //console.log("🧪 Testing backend preview finder...");
    const result = await searchAndGetLinks("Shape of You Ed Sheeran", 1);

    res.json({
      success: true,
      message: "Backend preview finder is working",
      testResult: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Backend test failed:", error);
    res.status(500).json({
      success: false,
      error: "Backend preview finder test failed",
      details: error.message,
    });
  }
});

// Health check for this route
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Spotify routes are healthy",
    spotifyPreviewFinder: hasSpotifyCredentials ? "ready" : "not initialized",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
