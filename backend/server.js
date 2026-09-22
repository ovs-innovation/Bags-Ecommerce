require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { BRAND_CONFIG } = require('./config/constants');

const PORT = process.env.PORT || 5001;

/**
 * Start the HTTP server after connecting to database
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log('====================================================');
      console.log(`  ${BRAND_CONFIG.brandName} E-COMMERCE BACKEND RUNNING`);
      console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`);
      console.log(`  Port: ${PORT}`);
      console.log(`  Health Check: http://localhost:${PORT}/api/health`);
      console.log('====================================================');
    });

    // Handle termination signals cleanly
    const shutdown = () => {
      console.log('\nGracefully shutting down server...');
      server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
