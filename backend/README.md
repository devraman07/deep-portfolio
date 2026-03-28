# Portfolio Backend

A production-ready backend for handling portfolio contact form submissions with email functionality.

## Features

- ✅ Express.js server with TypeScript support
- ✅ Nodemailer integration for Gmail SMTP
- ✅ Request validation with express-validator
- ✅ Rate limiting to prevent spam
- ✅ CORS configuration for frontend integration
- ✅ Security headers with Helmet
- ✅ Comprehensive error handling
- ✅ Request logging with Morgan
- ✅ Environment variable configuration
- ✅ Graceful shutdown handling

## Quick Start

### 1. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your credentials
PORT=5000
EMAIL_USER=maitydipayan07@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-factor authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Use this password in your `.env` file

### 4. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

Server will start at `http://localhost:5000`

## API Endpoints

### POST /api/contact

Handle contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters, letters and spaces only
- `email`: Required, valid email format
- `message`: Required, 10-1000 characters

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-03-28T10:45:00.000Z"
}
```

## Rate Limiting

- **Contact Form**: 3 requests per 15 minutes per IP
- **General API**: 100 requests per 15 minutes per IP

## Security Features

- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation and sanitization
- ✅ Rate limiting
- ✅ Error handling without exposing sensitive data

## Frontend Integration

### Example API Call (JavaScript)

```javascript
const sendMessage = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Message sent successfully!');
      // Handle success (show success message, clear form, etc.)
    } else {
      console.error('Failed to send message:', data.message);
      // Handle error (show error message)
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle network error
  }
};

// Usage
sendMessage({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, I have a project inquiry...'
});
```

### Example API Call (React)

```jsx
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to send message: ' + data.message);
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
    </form>
  );
};
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── contactController.js    # Handle contact form logic
│   ├── middlewares/
│   │   ├── errorHandler.js         # Global error handling
│   │   ├── logger.js              # Request logging
│   │   ├── rateLimiter.js         # Rate limiting
│   │   └── validateContact.js      # Input validation
│   ├── routes/
│   │   └── index.js               # API routes
│   ├── services/
│   │   └── emailService.js        # Email functionality
│   ├── utils/                     # Utility functions
│   ├── app.js                     # Express app configuration
│   └── server.js                  # Server startup
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── package.json
└── README.md
```

## Deployment

### Environment Variables

Make sure to set these environment variables in production:

```bash
PORT=5000
EMAIL_USER=maitydipayan07@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

### Production Considerations

1. Use a process manager like PM2
2. Set up SSL/TLS certificates
3. Configure reverse proxy (Nginx/Apache)
4. Monitor logs and performance
5. Set up proper backup strategies

## Testing

You can test the API using curl:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the API."
  }'
```

## Troubleshooting

### Gmail Authentication Issues

1. **Enable 2-Factor Authentication**: Required for app passwords
2. **Use App Password**: Don't use your regular Gmail password
3. **Check Spam Folder**: Emails might go to spam initially
4. **Less Secure Apps**: Make sure "Less secure app access" is OFF (use app passwords instead)

### Common Errors

- **535 Authentication failed**: Check your Gmail app password
- **ECONNREFUSED**: Server isn't running or wrong port
- **CORS errors**: Check frontend URL in CORS configuration
- **Rate limit exceeded**: Wait 15 minutes before trying again

## License

MIT License - feel free to use this in your projects!
