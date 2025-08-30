# Portfolio Backend API

A comprehensive Node.js/Express.js backend for Raj Agarwal's portfolio website with MongoDB database, authentication, and admin panel.

## Features

- 🚀 **RESTful API** - Complete portfolio data management
- 🔐 **Authentication** - JWT-based user authentication
- 📧 **Contact Form** - Email notifications with rate limiting
- 🛡️ **Security** - Helmet, CORS, rate limiting, input validation
- 📊 **Admin Panel** - Content management system
- 🗄️ **Database** - MongoDB with Mongoose ODM
- 📁 **File Upload** - Image upload support with Multer
- ✅ **Validation** - Express-validator for input validation

## API Endpoints

### Portfolio Data
- `GET /api/portfolio/projects` - Get all projects
- `GET /api/portfolio/projects/:id` - Get single project
- `GET /api/portfolio/blog` - Get all blog posts
- `GET /api/portfolio/blog/:slug` - Get single blog post
- `GET /api/portfolio/skills` - Get skills data
- `GET /api/portfolio/experience` - Get experience data
- `GET /api/portfolio/info` - Get personal information
- `GET /api/portfolio/stats` - Get portfolio statistics

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/stats` - Get contact statistics (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/password` - Change password

### Admin Panel
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/admin/blog` - Create blog post
- `PUT /api/admin/blog/:id` - Update blog post
- `DELETE /api/admin/blog/:id` - Delete blog post
- `GET /api/admin/contacts` - Get all contacts
- `PUT /api/admin/contacts/:id/status` - Update contact status
- `DELETE /api/admin/contacts/:id` - Delete contact

## Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_super_secret_jwt_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB locally
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

5. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/portfolio |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration | 30d |
| `EMAIL_SERVICE` | Email service provider | gmail |
| `EMAIL_USER` | Email username | - |
| `EMAIL_PASS` | Email password/app password | - |
| `EMAIL_FROM` | From email address | - |
| `ADMIN_EMAIL` | Admin email | raj390504@gmail.com |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Database Models

### Project
- Title, description, technologies
- Category, year, status
- GitHub URL, live URL
- Featured flag, order

### Blog Post
- Title, excerpt, content
- Category, read time
- Published status, views, likes
- Auto-generated slug

### Contact
- Name, email, subject, message
- Status (new/read/replied)
- IP address, user agent
- Timestamps

### User
- Name, email, password (hashed)
- Role (admin/user)
- Active status, last login

## Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request rate limiting
- **Input Validation** - Express-validator
- **Password Hashing** - bcryptjs
- **JWT Authentication** - JSON Web Tokens

## Email Configuration

For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `EMAIL_PASS`

## Admin Setup

1. Register a user account
2. Update the user's role to 'admin' in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "raj390504@gmail.com" },
     { $set: { role: "admin" } }
   )
   ```

## Frontend Integration

Update your React frontend to use the backend API:

```javascript
// Example API call
const response = await fetch('http://localhost:5000/api/portfolio/projects');
const data = await response.json();
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Configure proper CORS origins
4. Set up SSL/HTTPS
5. Use environment variables for secrets

## Health Check

Visit `http://localhost:5000/health` to check if the server is running.

## Support

For issues or questions, contact: raj390504@gmail.com
