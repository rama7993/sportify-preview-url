// CORS Configuration
function getCorsOptions() {
  return {
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // Development: Allow localhost
      if (origin.includes("localhost")) return callback(null, true);

      // Production: Allow Vercel domains and configured origins
      if (process.env.NODE_ENV === "production") {
        // Allow any Vercel domain
        if (origin.includes(".vercel.app")) return callback(null, true);

        // Allow specific configured origins
        const allowedOrigins = [
          "https://sportify-rho.vercel.app",
          process.env.CORS_ORIGIN,
        ].filter(Boolean);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      }

      // Development: Allow any origin
      callback(null, true);
    },
    credentials: true,
  };
}

module.exports = { getCorsOptions };
