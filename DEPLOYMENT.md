# Vercel Deployment Guide for SRI JAI HARI Frontend

## 🚀 Quick Deployment Steps

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project folder**
   ```bash
   vercel
   ```

4. **Follow the setup prompts:**
   - Set up and deploy? → **Yes**
   - Which scope? → Select your account
   - Link to existing project? → **No**
   - Project name → `sri-jai-hari-frontend`
   - Directory → `./`
   - Override settings? → **No**

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration (Recommended for teams)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Configure:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://sri-jai-hari-backend.vercel.app`
   - Add: `VITE_APP_NAME` = `SRI JAI HARI Engineering Solutions`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 3: Drag & Drop (Simple)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)

3. **Drag & Drop**
   - Drag the `dist` folder to the dashboard
   - Vercel will deploy automatically

## ⚙️ Configuration Details

### Build Settings
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x

### Environment Variables
```
VITE_API_BASE_URL=https://sri-jai-hari-backend.vercel.app
VITE_APP_NAME=SRI JAI HARI Engineering Solutions
```

### Domain Settings
- Vercel will provide a free domain: `your-project.vercel.app`
- You can add a custom domain in Project Settings → Domains

## 🔧 Post-Deployment Checklist

- [ ] Test the live URL
- [ ] Verify all pages load correctly
- [ ] Check image galleries work
- [ ] Test enquiry form submission
- [ ] Verify admin login works
- [ ] Check mobile responsiveness
- [ ] Test dark/light theme toggle

## 🚨 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

### Images Not Loading
- Verify image URLs are correct
- Check CORS settings on backend
- Ensure images are accessible

### API Errors
- Verify `VITE_API_BASE_URL` is correct
- Check backend is running
- Verify CORS configuration

### Routing Issues
- Ensure `vercel.json` is in root directory
- Check rewrite rules are correct

## 📊 Performance Monitoring

After deployment, monitor:
- **Core Web Vitals**: Use Vercel Analytics
- **Build Times**: Check build logs
- **Error Rates**: Monitor function logs
- **Traffic**: Use Vercel Analytics dashboard

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch = Production deployment
- Every pull request = Preview deployment
- Automatic deployments for all changes

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run build && npm run preview`
4. Contact Vercel support if needed

---

**Your SRI JAI HARI frontend is now ready for production! 🎉**
