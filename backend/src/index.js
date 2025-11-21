import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import fs from 'fs';
import mongoose from 'mongoose';

// Routes
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import receiptRoutes from './routes/receipts.js';

// Middleware
import { protect } from './middleware/authMiddleware.js';

// DB connection
import connectDB from './config/db.js';

// Models for debug routes
import User from './models/User.js';

// Env validation
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI', 'FRONTEND_URL'];
const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// FRONTEND_URL cleanup and parsing
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .trim()
  .replace(/\/$/, '');
console.log('🌍 FRONTEND_URL (sanitized):', FRONTEND_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 1000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/* ------------------------------------------------------
   ⭐ ULTRA SIMPLE CORS Configuration - No wildcards
-------------------------------------------------------*/
const allowedOrigins = [
  'https://knoxvilletechnologies.com',
  'http://localhost:5173',
  'https://knoxville-rp7g.onrender.com'
];

// Simple CORS middleware without complex patterns
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-Key');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }

  next();
});

/* ------------------------------------------------------
   Helmet Security
-------------------------------------------------------*/
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "data:"],
      fontSrc: ["'self'", "https:", "data:"],
      imgSrc: ["'self'", "data:", "https:", "blob:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https:"],
      connectSrc: [
        "'self'", 
        "https://knoxvilletechnologies.com",
        "http://localhost:5173",
        "https://knoxville-rp7g.onrender.com",
        "ws:", "wss:"
      ],
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

/* ------------------------------------------------------
   Core middleware
-------------------------------------------------------*/
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

/* ------------------------------------------------------
   DEBUG ROUTES - To identify login issues
-------------------------------------------------------*/

// Debug route to check all users and their passwords
app.get('/api/debug/users', async (req, res) => {
  try {
    const users = await User.find({}).select('+password');
    const userData = users.map(user => ({
      email: user.email,
      role: user.role,
      passwordExists: !!user.password,
      passwordLength: user.password ? user.password.length : 0,
      passwordPrefix: user.password ? user.password.substring(0, 20) + '...' : 'none',
      _id: user._id
    }));
    
    console.log('📋 ALL USERS IN DATABASE:');
    userData.forEach(user => {
      console.log(`   ${user.email} (${user.role}): password=${user.passwordExists ? 'YES' : 'NO'}, length=${user.passwordLength}`);
    });
    
    res.json({ success: true, users: userData });
  } catch (error) {
    console.error('❌ Debug error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Debug login test endpoint
app.post('/api/debug/login-test', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔍 DEBUG LOGIN - Email:', email, 'Password:', password);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required for debug'
      });
    }

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    console.log('🔍 User found:', user ? 'YES' : 'NO');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found in database',
        debug: { userExists: false, email }
      });
    }

    console.log('🔍 User details:', {
      email: user.email,
      role: user.role,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0,
      passwordStartsWith: user.password ? user.password.substring(0, 10) : 'none'
    });

    // Check if comparePassword method exists
    if (typeof user.comparePassword !== 'function') {
      return res.status(500).json({
        success: false,
        message: 'comparePassword method missing from User model',
        debug: { hasCompareMethod: false }
      });
    }

    // Test password comparison
    console.log('🔍 Testing password comparison...');
    const isMatch = await user.comparePassword(password);
    console.log('🔍 Password match result:', isMatch);

    if (isMatch) {
      return res.json({
        success: true,
        message: 'DEBUG: Login successful',
        debug: {
          userExists: true,
          passwordMatch: true,
          hasCompareMethod: true,
          user: { email: user.email, role: user.role }
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'DEBUG: Password does not match',
        debug: {
          userExists: true,
          passwordMatch: false,
          hasCompareMethod: true,
          providedPassword: password,
          storedPasswordHash: user.password ? user.password.substring(0, 20) + '...' : 'none'
        }
      });
    }

  } catch (error) {
    console.error('❌ Debug login error:', error);
    res.status(500).json({
      success: false,
      message: 'Debug error occurred',
      error: error.message
    });
  }
});

// Debug route to create a test admin user
app.post('/api/debug/create-test-admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }

    // Delete existing user
    await User.deleteOne({ email });
    
    // Create new user with manual password hashing
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash(password, 12);
    
    const newUser = new User({
      email,
      password: hashedPassword,
      role: 'admin'
    });
    
    await newUser.save();
    
    // Verify it works
    const testUser = await User.findOne({ email }).select('+password');
    const canLogin = await testUser.comparePassword(password);
    
    res.json({
      success: true,
      message: 'Test admin created',
      debug: {
        userCreated: true,
        loginTest: canLogin,
        email: email
      }
    });
    
  } catch (error) {
    console.error('❌ Debug create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create test admin',
      error: error.message
    });
  }
});

/* ------------------------------------------------------
   Rate limits
-------------------------------------------------------*/
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: NODE_ENV === 'production' ? 200 : 2000,
  message: { success: false, message: 'Too many requests. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: NODE_ENV === 'production' ? 10 : 100,
  message: { success: false, message: 'Too many authentication attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const exportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: NODE_ENV === 'production' ? 50 : 500,
  message: { success: false, message: 'Too many export requests. Please wait a while.' }
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);
app.use('/api/invoices/export', exportLimiter);
app.use('/api/receipts/export', exportLimiter);

/* ------------------------------------------------------
   Logging
-------------------------------------------------------*/
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
app.use(
  morgan(
    NODE_ENV === 'production'
      ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
      : ':method :url :status :res[content-length] - :response-time ms',
    { stream: accessLogStream }
  )
);

// Add request logging middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`🌐 ${req.method} ${req.path} from origin: ${origin || 'none'}`);
  next();
});

/* ------------------------------------------------------
   Static directories
-------------------------------------------------------*/
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

const exportsDir = path.join(__dirname, '../exports');
if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });

/* ------------------------------------------------------
   Health check
-------------------------------------------------------*/
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy ✅',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    cors: {
      allowedOrigins: allowedOrigins,
      currentOrigin: req.headers.origin || 'none'
    }
  });
});

/* ------------------------------------------------------
   Root
-------------------------------------------------------*/
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: '🚀 Backend running!', 
    version: '2.0.0',
    cors: {
      enabled: true,
      allowedOrigins: allowedOrigins
    }
  });
});

/* ------------------------------------------------------
   Routes
-------------------------------------------------------*/
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/settings', protect, settingRoutes);
app.use('/api/invoices', protect, invoiceRoutes);
app.use('/api/receipts', protect, receiptRoutes);

/* ------------------------------------------------------
   404 handler
-------------------------------------------------------*/
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found', 
    path: req.path,
    method: req.method 
  });
});

/* ------------------------------------------------------
   Error handler
-------------------------------------------------------*/
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err);
  
  if (err.message.includes('CORS')) {
    res.status(403).json({
      success: false,
      message: 'CORS error: Request origin not allowed',
      error: err.message,
      allowedOrigins: allowedOrigins,
      yourOrigin: req.headers.origin || 'not provided'
    });
  } else {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      ...(NODE_ENV === 'development' && { stack: err.stack })
    });
  }
});

/* ------------------------------------------------------
   Graceful shutdown
-------------------------------------------------------*/
const gracefulShutdown = (signal) => () => {
  console.log(`\n${signal} received. Shutting down...`);
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('✅ Shutdown complete');
      process.exit(0);
    });
  });
  setTimeout(() => process.exit(1), 10000);
};

/* ------------------------------------------------------
   Start server
-------------------------------------------------------*/
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`
🚀 Server running on port: ${PORT}
🌍 Environment: ${NODE_ENV}
✅ CORS Enabled for:
   - https://knoxvilletechnologies.com
   - http://localhost:5173
   - https://knoxville-rp7g.onrender.com
      
🔧 DEBUG ENDPOINTS AVAILABLE:
   - GET  /api/debug/users - List all users
   - POST /api/debug/login-test - Test login
   - POST /api/debug/create-test-admin - Create test admin
      `);
    });
    process.on('SIGTERM', gracefulShutdown('SIGTERM'));
    process.on('SIGINT', gracefulShutdown('SIGINT'));
    return server;
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;