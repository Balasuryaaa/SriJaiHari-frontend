# SRI JAI HARI Engineering Solutions - Frontend

A modern React application built with Vite for SRI JAI HARI Engineering Solutions, featuring product showcases, enquiry management, and admin dashboard.

## 🚀 Features

- **Product Showcase**: Display engineering products with image galleries
- **Enquiry System**: Customer enquiry form with admin management
- **Admin Dashboard**: Product management and enquiry handling
- **Responsive Design**: Works on all devices with dark/light theme
- **Modern UI**: Built with Tailwind CSS and Framer Motion

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment on Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name: `sri-jai-hari-frontend`
   - Directory: `./`
   - Override settings? `N`

5. **Production deployment**
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Configure settings:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Method 3: Drag & Drop

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)

3. **Drag & Drop**
   - Drag the `dist` folder to the Vercel dashboard
   - Vercel will automatically deploy

## ⚙️ Environment Variables

Create a `.env` file for local development:

```env
VITE_API_BASE_URL=https://sri-jai-hari-backend.vercel.app
VITE_APP_NAME=SRI JAI HARI Engineering Solutions
```

For Vercel deployment, add these in your project settings:
- Go to Project Settings → Environment Variables
- Add the variables above

## 🔧 Configuration

The project includes optimized configurations:

- **Vite**: Optimized build with code splitting
- **Vercel**: Configured with proper rewrites and headers
- **Security**: Security headers included
- **Performance**: Asset caching and compression

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── FloatingInfo.jsx
│   ├── Footer.jsx
│   ├── ImageModal.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── lib/                # API and utilities
│   └── api.js
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   ├── Enquiry.jsx
│   ├── Home.jsx
│   └── ProductDetails.jsx
├── stores/             # State management
│   └── authStore.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser minification
- **Asset Optimization**: Image and asset optimization
- **Caching**: Proper cache headers
- **Compression**: Gzip compression

## 🔒 Security Features

- **Content Security**: X-Content-Type-Options
- **Frame Protection**: X-Frame-Options
- **XSS Protection**: X-XSS-Protection headers
- **HTTPS**: Automatic HTTPS on Vercel

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - See LICENSE file for details

## 📞 Support

For support, email: support@srijaihari.com

---

**Built with ❤️ for SRI JAI HARI Engineering Solutions**