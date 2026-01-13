# Restaurant Reservation System - Frontend

Modern, responsive React application for managing restaurant table reservations with role-based user interfaces.

## 🛠️ Technology Stack

- **React 18** - UI library with Hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Fast build tool and dev server

## 📋 Prerequisites

- Node.js v14 or higher
- npm or yarn
- Backend API running (see backend README)

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

**Important:** Update `VITE_API_URL` to your deployed backend URL in production.

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Build output will be in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable components
│   │   ├── ProtectedRoute.jsx   # Route protection wrapper
│   │   ├── Toast.jsx            # Toast notification component
│   │   └── LoadingSpinner.jsx   # Loading indicator
│   ├── context/              # React Context providers
│   │   └── AuthContext.jsx      # Authentication state management
│   ├── pages/                # Page components
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── UserDashboard.jsx    # Customer dashboard
│   │   └── AdminDashboard.jsx   # Admin dashboard
│   ├── services/             # API services
│   │   └── api.js               # Axios instance & interceptors
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🎨 Features

### Authentication
- User registration with role selection
- Secure login with JWT tokens
- Automatic token management
- Protected routes based on authentication
- Auto-redirect based on user role

### Customer Dashboard
- Create new reservations
- View all personal reservations
- Cancel reservations
- Date picker with validation
- Time slot selection
- Guest count input
- Real-time availability feedback

### Admin Dashboard
- View all system reservations
- Filter by date
- Filter by status (confirmed/cancelled/completed)
- Dashboard statistics
  - Total reservations
  - Today's bookings
  - Confirmed reservations
  - Total tables
- Cancel any reservation
- Comprehensive reservation details

### UI/UX Features
- Fully responsive design (mobile, tablet, desktop)
- Toast notifications for user feedback
- Loading spinners for async operations
- Form validation with error messages
- Smooth animations and transitions
- Icon-based navigation
- Clean, modern interface

## 🔐 Authentication Flow

```
┌─────────────┐
│   Landing   │
│   (Login)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌──────────────┐
│   Register  │─────▶│    Login     │
└─────────────┘      └──────┬───────┘
                            │
                ┌───────────┴──────────┐
                │                      │
                ▼                      ▼
        ┌───────────────┐      ┌──────────────┐
        │     User      │      │    Admin     │
        │   Dashboard   │      │  Dashboard   │
        └───────────────┘      └──────────────┘
```

## 🛣️ Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Redirect | Public | Redirects to /login |
| `/login` | Login | Public | User login page |
| `/register` | Register | Public | User registration page |
| `/user/dashboard` | UserDashboard | User Only | Customer reservation management |
| `/admin/dashboard` | AdminDashboard | Admin Only | Admin panel with all reservations |

## 🎯 Component Details

### App.jsx
Main application component with routing and authentication provider.


### AuthContext.jsx
Manages authentication state across the application.

**State:**
- `user` - Current user object
- `token` - JWT authentication token
- `loading` - Loading state
- `isAuthenticated` - Boolean authentication status

**Methods:**
- `login(authData)` - Store user and token
- `logout()` - Clear authentication data

**Usage:**
```jsx
import { useAuth } from '../context/AuthContext';

function Component() {
  const { user, token, login, logout, isAuthenticated } = useAuth();
  // Use auth state and methods
}
```

### ProtectedRoute.jsx
Wrapper component for protected routes.

**Props:**
- `children` - Child components to render
- `role` - Required role ("user" or "admin")

**Behavior:**
- Shows loading spinner while checking authentication
- Redirects to login if not authenticated
- Redirects to appropriate dashboard if wrong role
- Renders children if authorized

### Toast.jsx
Toast notification component for user feedback.

**Props:**
- `message` - Message to display
- `type` - "success" | "error" | "info"
- `onClose` - Callback when toast closes

**Features:**
- Auto-dismisses after 4 seconds
- Slide-in animation
- Color-coded by type
- Manual close button

### LoadingSpinner.jsx
Reusable loading indicator.


### Login.jsx
User login page.

**Features:**
- Email and password inputs
- Form validation
- Error handling
- Loading states
- Auto-redirect based on role
- Link to registration

### Register.jsx
User registration page.

**Features:**
- Name, email, password inputs
- Role selection (user/admin)
- Client-side validation
- Password strength requirement
- Success feedback
- Link to login

### UserDashboard.jsx
Customer reservation management interface.

**Features:**
- Reservation creation form
  - Date picker (today onwards)
  - Time slot dropdown
  - Guest count input
- Reservation list
  - Formatted date display
  - Time and guest details
  - Table assignment info
  - Cancel button
- Empty state when no reservations
- Logout functionality

### AdminDashboard.jsx
Administrator control panel.

**Features:**
- Statistics cards
  - Total reservations
  - Today's bookings
  - Confirmed reservations
  - Total tables
- Filter controls
  - Filter by date
  - Filter by status
  - Clear filters button
- Reservations table
  - Customer details
  - Date and time
  - Guest count
  - Table number
  - Status badges
  - Cancel action
- Empty state with filters
- Logout functionality

## 🎨 Styling

### Tailwind CSS Configuration

The application uses Tailwind CSS for styling with custom configurations:



### Color Scheme

**Login/User:**
- Primary: Blue (600-700)
- Accents: Indigo

**Register:**
- Primary: Purple (600-700)
- Accents: Pink

**Admin:**
- Primary: Indigo (600)
- Secondary: Purple (600)
- Gradient backgrounds

**Status Colors:**
- Success: Green (100/800)
- Error: Red (100/800)
- Info: Blue (100/800)
- Warning: Yellow (100/800)

## 🔌 API Integration

### Axios Configuration

```javascript
// services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});
```

### Request Interceptor
Automatically adds JWT token to requests:
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor
Handles 401 errors (expired/invalid tokens):
```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### API Calls

**Login:**
```javascript
const response = await api.post("/api/auth/login", {
  email: "user@example.com",
  password: "password123"
});
```

**Create Reservation:**
```javascript
const response = await api.post("/api/reservations", {
  date: "2025-01-20",
  timeSlot: "18:00",
  guests: 4
});
```

**Get Reservations:**
```javascript
const response = await api.get("/api/reservations");
```

**Admin - Get All Reservations:**
```javascript
const response = await api.get("/api/admin/reservations", {
  params: { date: "2025-01-20", status: "confirmed" }
});
```

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Register new user account
- [ ] Register admin account
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Verify auto-redirect based on role
- [ ] Test logout functionality

**User Dashboard:**
- [ ] Create reservation with valid data
- [ ] Try creating reservation with past date (should fail)
- [ ] Try creating reservation without filling fields
- [ ] View list of reservations
- [ ] Cancel a reservation
- [ ] Verify reservation removed after cancel

**Admin Dashboard:**
- [ ] View all reservations
- [ ] Filter reservations by date
- [ ] Filter reservations by status
- [ ] Clear filters
- [ ] View statistics
- [ ] Cancel any reservation

**Responsive Design:**
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)



## 🎓 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR. Changes reflect immediately without full page reload.


### Code Organization
- Keep components small and focused
- Use custom hooks for reusable logic
- Separate concerns (UI, logic, data fetching)
- Use PropTypes or TypeScript for type safety

### Performance
- Use React.memo for expensive components
- Implement code splitting with lazy loading
- Optimize images and assets
- Use production build for deployment

## 📝 Best Practices Implemented

1. **Component Structure:** Functional components with Hooks
2. **State Management:** Context API for global state
3. **Error Handling:** Try-catch blocks on all async operations
4. **Loading States:** Visual feedback for async operations
5. **Form Validation:** Client-side validation before submission
6. **Security:** No sensitive data in code, use environment variables
7. **Accessibility:** Semantic HTML, proper labels, keyboard navigation
8. **Responsive Design:** Mobile-first approach with Tailwind
9. **Code Reusability:** DRY principle with reusable components

## 🙏 Acknowledgments

- React Team for the amazing library
- Vite for blazing fast development
- Tailwind CSS for utility-first styling
- Lucide for beautiful icons