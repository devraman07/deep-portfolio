import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server is running!
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV}
📧 Email Service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}
🕐 Started at: ${new Date().toLocaleString()}
📖 API Documentation: http://localhost:${PORT}/api/health
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated!');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated!');
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    console.log('Server closed due to unhandled promise rejection');
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => {
    console.log('Server closed due to uncaught exception');
    process.exit(1);
  });
});

export default server;
