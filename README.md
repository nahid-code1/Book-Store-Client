# Book Courier - Library Management System

A comprehensive book delivery and management platform built with React, Firebase, and modern web technologies. This system allows users to browse books, place orders, and manage deliveries with role-based access control.

## 🚀 Live Demo

- **Frontend**: [Book Courier Live](https://your-deployment-url.com)
- **Backend API**: [API Documentation](https://book-courier-server-woad.vercel.app)

## ✨ Features

### 🏠 **Landing Page**
- **Hero Section**: Interactive slider with call-to-action buttons
- **Features Section**: Highlighting key service benefits
- **Services Section**: Detailed service offerings
- **Coverage Map**: Interactive map showing delivery areas
- **Why Choose Us**: Compelling reasons to use Book Courier
- **How It Works**: Step-by-step process explanation
- **Testimonials**: Customer reviews and ratings
- **Statistics**: Key performance metrics
- **FAQ Section**: Common questions and answers
- **Newsletter**: Subscription with email validation
- **Call to Action**: Final conversion section

### 🔐 **Authentication System**
- **Email/Password Registration & Login**
- **Google OAuth Integration**
- **Demo Login Buttons** (User, Librarian, Admin)
- **Form Validation** with error handling
- **Password Strength Requirements**
- **Responsive Design**

### 📚 **Book Management**
- **Browse Books**: Grid layout with search and filters
- **Advanced Filtering**: By price range, author, title
- **Sorting Options**: Price and alphabetical sorting
- **Pagination**: Efficient data loading
- **Book Details**: Comprehensive book information
- **Order Placement**: Secure order processing

### 🎯 **Role-Based Dashboard**

#### **User Dashboard**
- Overview with order statistics
- My Orders management
- Payment history and invoices
- Profile management
- Order tracking

#### **Librarian Dashboard**
- Book management (Add, Edit, Publish/Unpublish)
- Order management for their books
- Sales analytics
- Customer communication

#### **Admin Dashboard**
- User management (Role assignments)
- All books oversight
- System analytics
- Platform administration

### 💳 **Payment System**
- **Stripe Integration** for secure payments
- **Multiple Payment Methods**
- **Order Tracking** with status updates
- **Invoice Generation**
- **Payment History**

### 🎨 **UI/UX Features**
- **Dark/Light Mode** with persistent theme
- **Responsive Design** (Mobile-first approach)
- **Loading Skeletons** for better UX
- **Toast Notifications** for user feedback
- **Smooth Animations** and transitions
- **Consistent Design System**

## 🛠️ Technology Stack

### **Frontend**
- **React 19.2.3** - Modern React with latest features
- **Vite 7.2.4** - Fast build tool and dev server
- **React Router 7.11.0** - Client-side routing
- **TanStack React Query 5.90.12** - Server state management
- **React Hook Form 7.68.0** - Form handling and validation

### **Styling**
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **DaisyUI 5.5.14** - Component library for Tailwind
- **React Icons 5.5.0** - Icon library

### **Authentication & Backend**
- **Firebase 12.7.0** - Authentication and hosting
- **Axios 1.13.2** - HTTP client with interceptors
- **JWT Tokens** - Secure API authentication

### **Additional Libraries**
- **SweetAlert2 11.26.10** - Beautiful alerts and modals
- **Swiper 12.0.3** - Touch slider for hero section
- **React Leaflet 5.0.0** - Interactive maps
- **Stripe 20.1.0** - Payment processing

## 📁 Project Structure

```
src/
├── assets/
│   ├── hooks/
│   │   ├── useAuth.jsx          # Authentication hook
│   │   ├── useAxiosSecure.jsx   # Axios with auth interceptors
│   │   └── useRole.jsx          # User role management
│   └── [images]
├── Contexts/
│   └── AuthContext/
│       ├── AuthContext.jsx      # Auth context definition
│       └── AuthProvider.jsx     # Auth state provider
├── Layout/
│   ├── AuthLayout.jsx           # Layout for auth pages
│   ├── DashboardLayout.jsx      # Dashboard layout with sidebar
│   └── RootLayout.jsx           # Main app layout
├── pages/
│   ├── About/                   # About page
│   ├── Auth/                    # Login & Register pages
│   ├── Books/                   # Book listing & details
│   ├── Contact/                 # Contact form page
│   ├── Dashboard/               # All dashboard pages
│   ├── HomePage/                # Landing page sections
│   └── Shared/                  # Shared components
├── routes/
│   ├── PrivateRoute.jsx         # Protected route wrapper
│   ├── AdminRoute.jsx           # Admin-only routes
│   ├── LibrarianRoute.jsx       # Librarian-only routes
│   └── router.jsx               # Main routing configuration
└── main.jsx                     # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book-courier.git
   cd book-courier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password and Google)
3. Set up Firestore database
4. Configure hosting (optional)

### Backend API
The project uses a separate backend API. Ensure the following endpoints are available:

**Authentication:**
- `POST /users` - Create user
- `GET /users/:email/role` - Get user role

**Books:**
- `GET /books?status=published` - Get published books
- `GET /books/:id` - Get book details
- `POST /books` - Add book (librarian)
- `PATCH /books/:id` - Update book

**Orders:**
- `POST /orders` - Create order
- `GET /orders?email=:email` - Get user orders
- `PATCH /orders/:id/status` - Update order status

**Payments:**
- `POST /create-checkout-session` - Create Stripe session
- `PATCH /payment-success` - Confirm payment

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Secondary**: Green (#10b981)
- **Accent**: Amber (#f59e0b)
- **Neutral**: Gray shades

### Typography
- **Font Family**: Urbanist (Google Fonts)
- **Headings**: Bold weights (600-900)
- **Body**: Regular weight (400)

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Multiple variants with hover states
- **Forms**: Validation states and error handling
- **Modals**: Centered with backdrop blur

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Grid System**: CSS Grid and Flexbox
- **Touch Friendly**: Large tap targets

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Route Protection**: Role-based access control
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS Only**: Secure data transmission

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables
4. Set up custom domain (optional)

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## 📊 Performance Optimization

- **Code Splitting**: Dynamic imports for routes
- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Components and images
- **Caching**: Service worker for offline support
- **Bundle Analysis**: Webpack bundle analyzer

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: [Your Name]
- **Backend Developer**: [Backend Dev Name]
- **UI/UX Designer**: [Designer Name]

## 📞 Support

For support, email support@bookcourier.com or join our Slack channel.

## 🙏 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [DaisyUI](https://daisyui.com/) for beautiful components
- [Firebase](https://firebase.google.com/) for backend services
- [Vercel](https://vercel.com/) for hosting platform

---

**Made with ❤️ by the Book Courier Team**