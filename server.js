const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const spotifyRoutes = require("./routes/spotify");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4200", process.env.CORS_ORIGIN].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/spotify", spotifyRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  // console.log(`🚀 Backend server running on port ${PORT}`);
  // console.log(
  //   `🌐 CORS enabled for: ${process.env.CORS_ORIGIN || "http://localhost:4200"}`
  // );
  // console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
