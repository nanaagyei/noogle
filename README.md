# 🔍 (N)oogle - Personal Portfolio

A Google-inspired personal portfolio website showcasing projects, experiences, and life journey. Built with Next.js and deployed on GitHub Pages.

- **🚀 Live Demo:** [princeagyeituffour.com](https://princeagyeituffour.com)

---

## 🏗️ Architecture Overview

### **Tech Stack**

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Roboto, Ropa Sans)
- **Deployment:** Vercel
- **Email Service:** AWS SES

### **Project Structure**

```
src/
├── app/
│   ├── about/                # About page
│   ├── api/mailer/          # Email API endpoint
│   ├── search/              # Search results page
│   ├── layout.js            # Root layout with fonts & meta
│   ├── page.js              # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── Header.js            # Navigation & user menu
│   ├── Footer.js            # Site footer
│   ├── SearchBar.js         # Google-inspired search
│   └── Mailer.js            # Contact form modal
├── data/
│   ├── projects.json        # Project portfolio data
│   ├── experience.json      # Work experience data
│   ├── life.json            # Life experiences data
│   └── why.json             # "Why hire me" content
└── utils/
    └── assets.js            # Asset path utilities
```

---

## ✨ Features

### **🔍 Google-Inspired Search**

- **Smart Search Interface:** Mimics Google's search experience
- **Multiple Search Categories:**
  - `nana-projects` - Portfolio projects
  - `life` - Personal experiences & adventures
  - `experience` - Professional work history
  - `why-hire-a-nana` - AI-powered overview with highlighting

### **📱 Responsive Design**

- **Mobile-First:** Optimized for all screen sizes
- **Modern UI:** Clean, Google-inspired interface
- **Dark Theme:** Purple gradient color scheme
- **Smooth Animations:** Framer Motion integration

### **🎯 Interactive Components**

- **Project Showcase:** Modal popups with detailed project info
- **Contact System:** Integrated mailer with AWS SES
- **Social Links:** GitHub, LinkedIn, Twitter, Figma, Articles
- **Dynamic Content:** JSON-driven data rendering

### **📧 Contact System**

- **AWS SES Integration:** Professional email handling
- **Form Validation:** Client & server-side validation
- **Success Feedback:** Visual confirmation system
- **Security:** Server-side credential handling

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn
- AWS account (for email functionality)

### **Installation**

```bash
# Clone repository
git clone https://github.com/nanaagyei/noogle.git
cd noogle

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your AWS credentials to .env.local

# Run development server
npm run dev
```

### **Environment Variables**

```bash
# .env.local
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
```

---

## 📊 Data Management

### **Content Structure**

All content is managed through JSON files in `/src/data/`:

**Projects (`projects.json`)**

```json
{
  "title": "Project Name",
  "alias": "project-alias",
  "headline": "Catchy headline",
  "timeline": "Date range",
  "tech": ["React", "Python"],
  "links": [{ "name": "github", "link": "url" }],
  "longDescription": "Detailed description..."
}
```

**Life Experiences (`life.json`)**

```json
{
  "title": "Experience Title",
  "alias": "experience-alias",
  "headline": "Brief description",
  "timeline": "Date",
  "searchDescription": "Search snippet",
  "longDescription": "Full story..."
}
```

### **Image Management**

- **Location:** `/public/` directory
- **Icons:** `/public/icons/` (SVG format)
- **Project Images:** Directly in `/public/` (PNG/JPG)
- **Naming Convention:** `{alias}-icon.png`, `{alias}-banner.png`

---

## 🎨 Styling & Design

### **Color Scheme**

```css
/* Primary Colors */
--dark-purple-100: #1A1625
--dark-purple-200: #2A2438
--dark-purple-300: #3A3449
--accent-color: #4A4464
--accent-text: #C48DF6
--search-blue: #8AB4F8
```

### **Typography**

- **Primary:** Ropa Sans (headings, UI)
- **Secondary:** Roboto (body text)
- **Weights:** 100, 300, 400, 500, 700, 900

### **Responsive Breakpoints**

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 🔧 Development Workflow

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Generate static export
```

### **Component Development**

- **"use client"** directive for interactive components
- **Server Components** for static content
- **CSS-in-JS** with Tailwind utilities
- **Asset Management** via utility functions

### **SEO & Analytics**

- **Meta Tags:** Open Graph, Twitter Cards
- **Google Analytics:** Configured with GTM
- **Structured Data:** JSON-LD for better indexing
- **Performance:** Optimized images & lazy loading

---


## 🔒 Security & Performance

### **Security Measures**

- ✅ **Environment Variables:** Server-side only AWS credentials
- ✅ **Input Validation:** Client & server-side form validation
- ✅ **CORS Protection:** API route security
- ✅ **No Client Secrets:** Secure credential handling

### **Performance Optimizations**

- ✅ **Static Generation:** Pre-built pages for fast loading
- ✅ **Image Optimization:** Next.js Image component
- ✅ **Code Splitting:** Automatic route-based splitting
- ✅ **Lazy Loading:** Suspense boundaries for components

---

## 📱 Browser Support

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- ✅ **Mobile Safari** iOS 14+
- ✅ **Chrome Mobile** Android 10+

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About the Developer

**Prince Agyei Tuffour** - Software QA Engineer, Mathematician & ML Engineer

- **🔗 Portfolio:** [princeagyeituffour.com](https://princeagyeituffour.com)
- **💼 LinkedIn:** [@prince-agyei-tuffour](https://linkedin.com/in/prince-agyei-tuffour)
- **🐙 GitHub:** [@nanaagyei](https://github.com/nanaagyei)
- **🐦 Twitter:** [@tkay_jnr](https://twitter.com/tkay_jnr)

---

## 🙏 Acknowledgments

- **Design Inspiration:** Google Search Interface and [Rumeza](https://github.com/rumezaa/rumoogle)
- **Icons:** Custom SVG icons
- **Hosting:** Vercel
- **Email Service:** AWS Simple Email Service (SES)

---

**⭐ Star this repo if you found it helpful!**
