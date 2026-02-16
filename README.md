# Sanatan Spirituality Foundation Website

A modern, responsive website for the Sanatan Spirituality Foundation, built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Pages
- **Home**: Hero section with animated logo, four pillars of Sanatan Dharma, services grid, Shiv Festival section, and Santon ki Vani
- **What We've Done**: Timeline of achievements, statistics counters, photo gallery with lightbox, and testimonials
- **Upcoming Events**: Event cards with filtering by category, featured event highlight, and newsletter subscription
- **Team**: Hierarchical team member layout with founder, core team, and volunteers sections

### Design Features
- Deep orange (#FF6B00) and black (#000000) color scheme
- Traditional Indian patterns and sacred geometry motifs
- Trishul-Om logo throughout the site
- Smooth scroll animations and transitions
- Responsive design for all devices
- Devanagari typography for Sanskrit/Hindi text

### Integrations
- **Supabase Database**: Dynamic content management for events, team members, gallery, testimonials, and statistics
- **WhatsApp Integration**: QR code and click-to-chat functionality
- **Social Media**: Links to Facebook, Instagram, and YouTube
- **Newsletter**: Email subscription system

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Fonts**: Inter (main), Noto Sans Devanagari (Sanskrit/Hindi)

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Sticky navigation header
│   └── Footer.tsx          # Footer with social links and QR code
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── WhatWeDone.tsx      # Past achievements and gallery
│   ├── UpcomingEvents.tsx  # Events listing and filtering
│   └── Team.tsx            # Team member profiles
├── lib/
│   └── supabase.ts         # Supabase client configuration
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main app component with routing
├── main.tsx                # App entry point
└── index.css               # Global styles

public/
└── photo_5807747553699761768_y.jpg  # Brand logo/QR code
```

## Database Schema

The application uses Supabase with the following tables:

- **events**: Upcoming and past events with full details
- **team_members**: Team profiles with hierarchy levels
- **gallery**: Photo gallery items
- **testimonials**: User testimonials and reviews
- **statistics**: Dynamic counters (members, events, impact)
- **newsletter_subscribers**: Email subscription list

All tables have Row Level Security (RLS) enabled with public read access and authenticated write access.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Key Features Implemented

### Responsive Design
- Mobile-first approach with breakpoints for tablets and desktop
- Hamburger menu for mobile navigation
- Optimized layouts for all screen sizes

### Animations
- Fade-in-up animations for cards and sections
- Smooth scroll behavior throughout
- Hover effects on interactive elements
- Pulse animations on key elements

### SEO Optimization
- Semantic HTML structure
- Meta tags for social sharing
- Descriptive titles and descriptions
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags

### Performance
- Lazy loading for images
- Code splitting with React Router
- Optimized asset loading
- Production build optimization

### Accessibility
- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast ratios for text

## Social Media Links

- Facebook: [facebook.com/ssfconnect](https://facebook.com/ssfconnect)
- Instagram: [instagram.com/ssfconnect](https://instagram.com/ssfconnect)
- YouTube: [youtube.com/@abhiyogishow](https://youtube.com/@abhiyogishow)
- Website: [www.sanatanspirituality.org](https://www.sanatanspirituality.org)

## Contact

- Email: info@sanatanspirituality.org
- Phone: +91 98765 43210
- WhatsApp: Scan QR code in footer

## License

© 2026 Sanatan Spirituality Foundation. All rights reserved.

---

Built with devotion and dedication for the preservation and promotion of Sanatan Dharma wisdom.
