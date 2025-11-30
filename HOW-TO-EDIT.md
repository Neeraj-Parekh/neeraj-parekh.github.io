# How to Edit Your Portfolio

## Quick Start

1. **Edit content** → Modify JSON files in `/data/` folder
2. **Preview** → Run `npm run dev` and open http://localhost:3001
3. **Deploy** → Push to GitHub (auto-deploys if connected to Vercel/Netlify)

---

## Data Files Reference

All your content is stored in the `/data/` folder as JSON files:

### `personal.json`
Your personal information displayed on the home page.

```json
{
  "name": "Your Name",
  "slogan": "Your tagline",
  "email": "your@email.com",
  "location": "City, Country",
  "profession": "Your Job Title",
  "rotatingTexts": ["Text 1", "Text 2", "Text 3"],
  "profileImage": "/assets/images/your-photo.jpg",
  "bio": "Your bio paragraph...",
  "values": "Your values...",
  "hobbies": "Your hobbies...",
  "dreamJob": "Your dream job...",
  "accomplishments": "Your accomplishments...",
  "education": "Your education..."
}
```

---

### `skills.json`
Skills displayed on the Skills page.

```json
[
  {
    "title": "Category Name",
    "icon": "/assets/icons/icon.svg",
    "skills": [
      { 
        "name": "Skill Name", 
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/...", 
        "iconType": "svg" 
      }
    ]
  }
]
```

**Icon sources:**
- DevIcons CDN: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/`
- Local icons: `/assets/icons/your-icon.svg`

---

### `projects.json`
Projects displayed on the Projects page.

```json
[
  {
    "id": "unique-id",
    "title": "Project Title",
    "subtitle": "Short subtitle",
    "description": "Brief description",
    "details": [
      "Detail point 1",
      "Detail point 2"
    ],
    "link": "https://project-url.com",
    "tags": ["Tag1", "Tag2"]
  }
]
```

---

### `links.json`
Social links displayed on the Links page.

```json
[
  {
    "name": "Platform Name",
    "url": "https://your-profile-url",
    "icon": "icon-name",
    "description": "Short description"
  }
]
```

**Available icons:** `mail`, `linkedin`, `github`, `stack-overflow`, `file-text`

---

### `certifications.json`
Certifications displayed on the Skills page. **Supports double-click certificate viewing!**

```json
[
  {
    "id": "cpp",
    "column": "A1",
    "title": "CPP",
    "backgroundImage": "/assets/images/cpp.png",
    "color": "#ffffff",
    "height": "120px",
    "wide": false,
    "hasCertificate": true,
    "certificate": "/assets/certificates/cpp-certificate.pdf",
    "certificateImage": "/assets/certificates/cpp-certificate.png"
  }
]
```

**Certificate Fields:**
- `hasCertificate`: Set to `true` if you have a certificate to display
- `certificate`: Path to PDF certificate (for download link)
- `certificateImage`: Path to certificate image preview (PNG/JPG)
- Items with certificates show a gold indicator icon
- **Double-click** on items with certificates to view them in a modal
- Other cards collapse to colored pills when viewing a certificate

**Column Layout:**
- `A1`, `A2`, `A3` = First row columns
- `A4`, `A5`, `A6` = Second row columns
- `A8`, `A9` = Third row (Cloud, CAD)
- `A10` = Operating systems grid

---

### `journey.json` *(NEW)*
Timeline/journey section on the home page. **Collapsible sections!**

```json
{
  "title": "My Journey",
  "subtitle": "Timeline of my experiences and milestones",
  "defaultExpanded": true,
  "items": [
    {
      "id": "about-me",
      "title": "About Me",
      "color": "#f21717",
      "icon": "user",
      "content": {
        "type": "about",
        "showPersonalInfo": true,
        "fields": ["name", "location", "email", "profession"],
        "showBio": true
      }
    }
  ]
}
```

**Content Types:**
- `type: "about"` - Shows personal info from personal.json
- `type: "values"` - Shows values/goals sections
- `type: "history"` - Shows history/accomplishments
- `type: "favorites"` - Shows hobbies/interests

**Each item has:**
- `id`: Unique identifier
- `title`: Section title
- `color`: Indicator dot color (hex)
- `icon`: Icon name (user, target, award, heart)
- `content`: What to display (references personal.json fields)

---

### `blogs.json`
Blog posts displayed on the Blog page.

```json
[
  {
    "id": "unique-id",
    "title": "Blog Post Title",
    "excerpt": "Short description of the post",
    "platform": "Medium",
    "url": "https://link-to-full-post",
    "embedUrl": "https://embed-url-if-available",
    "date": "2025-01-15",
    "readTime": "5 min",
    "tags": ["tag1", "tag2"],
    "image": "/assets/images/blog-image.jpg"
  }
]
```

**Platform options:** `Medium`, `Dev.to`, `Hashnode`, `LinkedIn`, `Personal`

---

### `photos.json`
Photo gallery on the Projects page (hex grid).

```json
[
  "photos/photo1.jpg",
  "photos/photo2.png"
]
```

Photos should be placed in `/public/assets/photos/`

---

### `shots.json`
"My Clicks" photography gallery on the home page.

```json
[
  "1.jpg",
  "r1.jpg",
  "l2.jpg"
]
```

- Photos starting with `l` or `r` are treated as landscape
- Photos should be placed in `/public/assets/shots/`

---

## Adding New Images

1. **Profile/Project images** → Add to `/public/assets/images/`
2. **Icons** → Add to `/public/assets/icons/`
3. **Gallery photos** → Add to `/public/assets/photos/`
4. Update the corresponding JSON file with the path (e.g., `/assets/images/new-image.jpg`)

---

## Adjusting Skills Page Layout

The skills page layout can be customized by editing CSS variables in `/app/globals.css`:

### CSS Variables (find them around line 850)

```css
:root {
  /* Skills Section - Left side */
  --skills-max-width: 320px;        /* Width of skills card column */
  --skills-card-min-width: 280px;   /* Minimum width of each skill card */
  --skills-gap: 1.5rem;             /* Space between skill cards */
  
  /* Certifications Section - Right side */
  --cert-column-width: 200px;       /* Width of certification columns */
  --cert-column-wide-width: 400px;  /* Width of wide certification columns */
  --cert-card-gap: 0.75rem;         /* Space between cards in a column */
  --cert-row-gap: 1rem;             /* Space between rows */
  --cert-card-min-height: 120px;    /* Minimum height of cert cards */
}
```

### To Reorganize Certifications

Edit `/data/certifications.json` and change the `column` property:
- `A1`, `A2`, `A3` = First row columns
- `A4`, `A5`, `A6` = Second row columns  
- `A8`, `A9` = Third row (Cloud, CAD)
- `A10` = Operating systems grid

### Layout Reference

See `/data/skills-layout.json` for a reference guide to the layout structure.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |

---

## Tips

- Always use valid JSON syntax (use a JSON validator if unsure)
- Image paths start with `/assets/` (not `/public/assets/`)
- Keep backups of your data files before major edits
- Test locally with `npm run dev` before deploying

---

## Interactive Features

### Certificate Viewing (Skills Page)
- Cards with certificates show a **gold indicator icon** in the top-right corner
- **Double-click** on a card to view its certificate in a fullscreen modal
- Other cards collapse into **colored pills** showing just the name
- Click anywhere outside or the X to close
- Add certificates to `/public/assets/certificates/`

### Collapsible Journey (Home Page)
- The "My Journey" section can be **collapsed/expanded** by clicking the header
- Each individual timeline item can also be collapsed
- Content is pulled from `personal.json` based on `journey.json` configuration
- Colors and order can be customized in `journey.json`
