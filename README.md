# Neeraj Parekh - Portfolio Website

A modern, interactive portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

🌐 **Live Site:** [neeraj-parekh.github.io](https://neeraj-parekh.github.io) (via Vercel)

---

## ✨ Features

### Interactive Elements
- 🎨 **Theme Toggle** - Light, Dark, and Sepia modes
- 🔄 **Rotating Text** - Dynamic role/title display
- 📸 **Photo Gallery** - Masonry-style image grid
- ⭐ **Certificate Viewing** - Double-click skill cards to view certificates
- 📂 **Collapsible Sections** - Expandable journey/timeline sections

### Pages
| Page | Description |
|------|-------------|
| `/` | Home - Hero section, About Me, My Journey, Photo Gallery |
| `/skills` | Skills & Certifications grid |
| `/projects` | Project showcase with hex grid photos |
| `/blog` | Blog posts with Medium embeds |
| `/links` | Social links and contact |

### Analytics
- **Google Analytics** - Visitor tracking
- **Microsoft Clarity** - Heatmaps & session recordings

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Development server runs at: `http://localhost:3000` (or 3001 if 3000 is busy)

---

## 📁 Project Structure

```
neeraj-portfolio/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── skills/page.tsx    # Skills page
│   ├── projects/page.tsx  # Projects page
│   ├── blog/page.tsx      # Blog page
│   ├── links/page.tsx     # Links page
│   ├── layout.tsx         # Root layout with analytics
│   └── globals.css        # All styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── ThemeToggle.tsx
│   ├── RotatingText.tsx
│   ├── CollapsibleJourney.tsx
│   ├── CertificationGrid.tsx
│   ├── SkillCard.tsx
│   ├── PhotoGallery.tsx
│   └── ...
├── data/                  # JSON data files (edit these!)
│   ├── personal.json      # Your personal info
│   ├── skills.json        # Programming skills
│   ├── certifications.json # Skill cards with certificates
│   ├── journey.json       # Timeline configuration
│   ├── projects.json      # Project data
│   ├── blogs.json         # Blog posts
│   ├── links.json         # Social links
│   └── shots.json         # Photo gallery images
├── public/assets/         # Static files
│   ├── images/           # All images
│   ├── icons/            # Icon files
│   ├── photos/           # Project photos
│   ├── shots/            # Gallery photos
│   └── certificates/     # Certificate files
├── tools/                 # Local visual editors (backed up on GitHub)
│   ├── grid-editor.html   # Certification grid editor
│   ├── home-editor.html   # Home page editor
│   ├── skills-editor.html # Skills page editor
│   ├── projects-editor.html # Projects page editor
│   └── journey-editor.html # Journey section editor
└── HOW-TO-EDIT.md        # Detailed editing guide
```

---

## 📝 Editing Content

All content is stored in JSON files in the `/data/` folder. Edit these to update your portfolio!

### Quick Reference

| File | What it controls |
|------|------------------|
| `personal.json` | Name, bio, email, rotating texts, profile image |
| `skills.json` | Programming languages & tools list |
| `certifications.json` | Skill cards on skills page |
| `journey.json` | Collapsible timeline sections |
| `projects.json` | Project cards |
| `blogs.json` | Blog post embeds |
| `links.json` | Social media links |
| `shots.json` | Photo gallery images |

See [HOW-TO-EDIT.md](./HOW-TO-EDIT.md) for detailed instructions.

---

## 🎨 Visual Editors (Local Tools)

I've included visual editors to help you customize the layout without editing JSON manually.

### How to Use:

1. Open the HTML file directly in your browser
2. Drag, resize, and configure elements visually
3. Click "Export JSON" when done
4. Replace the corresponding JSON file in `/data/`
5. Commit and push to see changes

### Available Editors:

| Editor | File | Purpose |
|--------|------|---------|
| Grid Editor | `tools/grid-editor.html` | Certification cards layout (rows, card sizes) |
| Home Editor | `tools/home-editor.html` | Home page sections & hero content |
| Journey Editor | `tools/journey-editor.html` | Timeline/journey configuration |
| Skills Editor | `tools/skills-editor.html` | Programming skills & tools list |
| Projects Editor | `tools/projects-editor.html` | Project cards & details |

### Editor Features:
- 🖱️ **Drag & Drop** - Reorder items visually
- ✏️ **Inline Editing** - Click to edit text directly
- 📤 **Export JSON** - Generate data file for `/data/` folder
- 📂 **Import JSON** - Load existing config to continue editing
- 📋 **Copy to Clipboard** - Quick copy for pasting

> **Note:** The `/tools/` folder contains a backup copy on GitHub. The editors are standalone HTML files - just open in browser.

---

## 🔐 Environment Variables

For analytics, create a `.env.local` file:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

Or add these in Vercel Dashboard → Settings → Environment Variables.

### Getting the IDs:

1. **Google Analytics:** [analytics.google.com](https://analytics.google.com) → Create property → Get Measurement ID
2. **Microsoft Clarity:** [clarity.microsoft.com](https://clarity.microsoft.com) → New project → Get Project ID

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

Auto-deploys on every push to `main` branch.

### Manual Build

```bash
npm run build
npm start
```

---

## 🎯 Special Features

### Double-Click Certificate Viewing

On the Skills page, cards with a ⭐ gold star indicator have certificates attached. Double-click to view them in a modal.

To add a certificate to a card, edit `certifications.json`:

```json
{
  "id": "python",
  "hasCertificate": true,
  "certificate": "/assets/certificates/python-cert.pdf",
  "certificateImage": "/assets/certificates/python-cert.png"
}
```

### Collapsible Journey

The "My Journey" section on the home page is fully collapsible. Configure it in `journey.json`:

```json
{
  "title": "My Journey",
  "defaultExpanded": true,
  "items": [
    {
      "id": "about-me",
      "title": "About Me",
      "color": "#f21717",
      "content": { "type": "about", "showBio": true }
    }
  ]
}
```

### Theme System

Three themes available:
- **Light** (default)
- **Dark**
- **Sepia** (reading mode)

Theme preference is saved in localStorage.

---

## 📊 Analytics Dashboard

After setup, view your analytics at:
- **Google Analytics:** [analytics.google.com](https://analytics.google.com)
- **Microsoft Clarity:** [clarity.microsoft.com](https://clarity.microsoft.com)

Clarity provides:
- Click heatmaps
- Scroll heatmaps
- Session recordings
- Rage click detection
- Dead click detection

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS
- **Deployment:** Vercel
- **Analytics:** Google Analytics + Microsoft Clarity

---

## 📄 License

This portfolio is for personal use. Feel free to use as inspiration, but please don't copy content directly.

---

## 👤 Author

**Neeraj Parekh**
- Email: neerajparekh118@gmail.com
- Location: Pune, Maharashtra
- Profession: Junior Software Developer / ENTC Engineer

---

Made with ❤️ using Next.js
