export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  systemPrompt: string;
  icon: string;
}

export const templates: Template[] = [
  {
    id: "startup-landing",
    name: "Startup Landing Page",
    description:
      "Modern SaaS startup landing page with hero, features, and CTA",
    category: "Business",
    icon: "🚀",
    prompt:
      "Create a modern startup landing page with a compelling hero section, feature highlights, social proof, pricing tiers, and strong call-to-action buttons",
    systemPrompt: `Create a sophisticated startup landing page with:
- Modern hero section with compelling headline, gradient text effects, and engaging CTA buttons
- Features section with 3-4 key features using modern icons and sophisticated card designs
- Social proof section with elegant testimonial cards and client logos
- Pricing section with attractive pricing cards with hover effects and highlights
- Footer with modern styling and social links
- Image placeholders (NO actual images, only styled boxes):
  * Hero background: Placeholder box showing "Hero Image\n1200x600"
  * Team section: Placeholder box showing "Team Photo\n800x400"
  * Logo placeholders: Placeholder box showing "Your Logo\n200x80"
  * Feature icons: Styled placeholder boxes showing "Icon\n64x64" or use CSS icons
- Color scheme: White/gray background, #1f2937 text, #3b82f6 accent with gradients
- Typography: Modern sans-serif with multiple font weights (300, 400, 500, 600, 700)
- Advanced elements: subtle gradients, layered shadows, modern patterns, animated elements`,
  },
  {
    id: "portfolio-creative",
    name: "Creative Portfolio",
    description: "Showcase your work with a visually stunning portfolio design",
    category: "Portfolio",
    icon: "🎨",
    prompt:
      "Design a creative portfolio website showcasing projects with an artistic layout, smooth animations, and professional presentation",
    systemPrompt: `Create a sophisticated, modern portfolio website with:
- Striking hero section with animated name/profession and modern typography (full width)
- Advanced grid-based project showcase with sophisticated hover effects and overlays (full width)
- About section with proper layout - use full container width with 2-column layout (60% content, 40% image) or single column full width
- Skills section with modern card layouts in grid format (full width)
- Contact section with elegant form and social links (full width)
- Image placeholders (NO actual images, only styled boxes):
  * Profile photo: Circular placeholder box showing "Your Photo\n300x300"
  * Project thumbnails: Placeholder boxes showing "Project Image\n400x300"
  * About section: Placeholder box showing "About Photo\n600x400"
  * Background elements: Placeholder box showing "Background Image\n1200x800"

SPECIFIC LAYOUT REQUIREMENTS FOR PORTFOLIO:
- ALL sections must use full container width (max-width: 1200px, margin: 0 auto)
- About section: Use CSS Grid or Flexbox with proper proportions - NOT 40% width
- About content should be either full width or 60/40 split with image
- Project grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Skills section: Grid layout with equal-width cards
- Ensure consistent section padding (80px top/bottom, 40px left/right)
- No narrow or cramped sections - everything should feel spacious and professional

- Color scheme: White/light gray background, #1f2937 text, #6366f1 accent with gradients
- Advanced typography with multiple font weights and modern styling
- Sophisticated animations: parallax effects, scroll animations, smooth transitions
- Modern design elements: glassmorphism cards, advanced shadows, backdrop-blur effects`,
  },
  {
    id: "restaurant-menu",
    name: "Restaurant Website",
    description:
      "Premium restaurant site with online ordering, reservations, chef specials, and customer reviews",
    category: "Food & Beverage",
    icon: "🍽️",
    prompt:
      "Build a premium restaurant website with appetizing design, interactive menu, online ordering, table reservations, chef specials, and customer testimonials",
    systemPrompt: `Design a sophisticated, premium restaurant website with:
- Stunning hero section with restaurant name, tagline, and compelling food imagery with reservation CTA
- Interactive menu section with categories (Appetizers, Mains, Desserts, Beverages), prices, dietary icons, and "Add to Cart" buttons
- Chef's specials section with rotating daily/seasonal menu highlights
- About section with restaurant story, chef biography, and culinary philosophy
- Customer reviews and testimonials with star ratings and customer photos
- Table reservation system with date/time picker and party size selection
- Online ordering section with delivery/takeout options and estimated times
- Location and hours with interactive map styling and contact information
- Events and private dining section with booking information
- Newsletter signup with special offers and updates
- Awards and certifications section showcasing accolades
- Image placeholders (NO actual images, only styled boxes):
  * Hero food image: Placeholder box showing "Signature Dish Hero\n1200x600"
  * Restaurant interior: Placeholder box showing "Restaurant Ambiance\n800x500"
  * Menu item photos: Placeholder boxes showing "Dish Photo\n300x250"
  * Chef portrait: Placeholder box showing "Head Chef Photo\n400x400"
  * Customer photos: Small placeholder boxes showing "Customer Photo\n80x80"
  * Awards/certificates: Placeholder boxes showing "Award Certificate\n200x250"
  * Private dining: Placeholder box showing "Private Dining Room\n600x400"
- Premium color scheme: Warm whites, rich golds (#d4af37), deep burgundy (#8b0000) with elegant gradients
- Sophisticated typography with serif fonts for headings and elegant sans-serif for body text
- Luxury design elements: gold accents, elegant shadows, sophisticated spacing
- Advanced interactive features: menu filtering, table booking calendar, order summary
- Mobile-optimized design with touch-friendly ordering interface`,
  },
  {
    id: "ecommerce-product",
    name: "Product Landing Page",
    description:
      "High-converting product page with pricing tiers, demos, testimonials, and social proof",
    category: "E-commerce",
    icon: "🛍️",
    prompt:
      "Create a premium product landing page optimized for conversions with interactive demos, pricing tiers, social proof, testimonials, and persuasive copy",
    systemPrompt: `Build a sophisticated, high-converting product landing page with:
- Compelling hero section with product name, unique value proposition, hero image, and primary CTA button
- Product demo section with video placeholder and "Watch Demo" button with play icon
- Key benefits section with 3-4 primary benefits using icons and compelling copy
- Feature showcase with detailed explanations, screenshots, and "Learn More" expandable sections
- Pricing tiers section with 2-3 plans (Basic, Pro, Enterprise) including feature comparison matrix
- Social proof section with customer logos, testimonials, and usage statistics
- Customer success stories with before/after case studies and specific results
- FAQ section with common objections and detailed answers
- Trust signals: money-back guarantee, security badges, awards, certifications
- Urgency elements: limited-time offers, countdown timers, stock availability
- Multiple CTAs throughout the page with different approaches (free trial, buy now, get demo)
- Footer with additional trust signals and contact information
- Image placeholders (NO actual images, only styled boxes):
  * Hero product image: Placeholder box showing "Product Hero Image\n800x600"
  * Demo video placeholder: Placeholder box showing "Product Demo Video\n700x400"
  * Feature screenshots: Placeholder boxes showing "Feature Screenshot\n600x400"
  * Customer photos: Small placeholder boxes showing "Customer Photo\n80x80"
  * Before/after images: Placeholder boxes showing "Before/After Results\n500x400"
  * Customer logos: Placeholder boxes showing "Customer Logo\n200x100"
  * Security badges: Placeholder boxes showing "Security Badge\n100x100"
  * Awards/certifications: Placeholder boxes showing "Award Badge\n150x100"
- Premium color scheme: Clean whites, professional blues (#2563eb), success greens (#059669) with subtle gradients
- Conversion-focused typography with clear hierarchy and persuasive headlines
- Advanced design elements: gradient buttons, card hover effects, progress bars, animated counters
- Mobile-optimized layout with touch-friendly buttons and easy scrolling
- Psychological triggers: scarcity, social proof, authority, reciprocity built into design
- A/B tested layout patterns for maximum conversion rates`,
  },
  {
    id: "agency-services",
    name: "Agency/Services",
    description:
      "Professional service provider showcase with portfolio and contact",
    category: "Business",
    icon: "💼",
    prompt:
      "Design a professional agency website showcasing services, team, portfolio, and client testimonials",
    systemPrompt: `Create a sophisticated, professional agency website with:
- Modern hero section with compelling value proposition and advanced styling
- Services section with elegant descriptions and professional icons
- Team/about section with sophisticated layouts and professional styling
- Portfolio or case studies with advanced grid layouts and hover effects
- Client testimonials with elegant cards and professional styling
- Contact form with modern styling and office information
- Image placeholders (NO actual images, only styled boxes):
  * Hero background: Placeholder box showing "Agency Hero\n1200x700"
  * Team photos: Placeholder boxes showing "Team Member\n300x300"
  * Portfolio images: Placeholder boxes showing "Project Image\n500x400"
  * Client logos: Placeholder boxes showing "Client Logo\n200x100"
  * Office photos: Placeholder box showing "Office Photo\n600x400"
- Professional color scheme (navy, white, accent) with gradients
- Corporate typography with multiple weights and modern styling
- Trust-building elements with sophisticated design throughout`,
  },
  {
    id: "event-conference",
    name: "Event/Conference",
    description:
      "Premium event site with live streaming, networking, workshop booking, and mobile app integration",
    category: "Events",
    icon: "🎤",
    prompt:
      "Build a premium event website with speaker lineup, workshop booking, live streaming, networking features, mobile app integration, and comprehensive event management",
    systemPrompt: `Design a sophisticated, premium event website with:
- Dynamic hero section with event name, date, location, countdown timer, and primary registration CTA
- Multi-tier ticket pricing with early bird discounts, group rates, and VIP packages
- Comprehensive speaker lineup with detailed bios, session topics, and "Meet the Speaker" booking
- Interactive event schedule with time slots, workshop booking, and calendar integration
- Live streaming section with virtual attendance options and hybrid event features
- Networking hub with attendee directory, meeting scheduler, and community features
- Workshop and breakout session details with capacity limits and booking system
- Sponsor showcase with different tier packages and interactive booth displays
- Mobile event app promotion with QR code download and feature highlights
- Venue information with interactive maps, accommodation suggestions, and travel guides
- Safety and accessibility information with COVID protocols and special needs support
- Post-event content access with session recordings and presentation downloads
- Social media integration with live feeds, hashtag displays, and sharing tools
- Exhibition hall and vendor marketplace with virtual booth tours
- Awards ceremony section with nomination process and winner showcase
- Event gallery with previous year highlights and testimonials
- FAQ section addressing common event questions and policies
- Contact and support information with live chat integration
- Image placeholders (NO actual images, only styled boxes):
  * Event hero image: Placeholder box showing "Event Hero Banner\n1200x600"
  * Speaker photos: Placeholder boxes showing "Speaker Headshot\n300x300"
  * Venue photos: Placeholder box showing "Venue Interior\n800x500"
  * Sponsor logos: Placeholder boxes showing "Sponsor Logo\n200x100"
  * Event highlights: Placeholder boxes showing "Event Highlights\n400x300"
  * Mobile app mockup: Placeholder box showing "Event App Screenshot\n300x600"
  * Virtual booth: Placeholder boxes showing "Virtual Booth\n500x400"
  * Networking area: Placeholder box showing "Networking Space\n600x400"
  * Workshop rooms: Placeholder boxes showing "Workshop Room\n400x300"
- Premium color scheme: Professional navy (#1e3a8a), energetic orange (#ea580c), clean whites with sophisticated gradients
- Event-focused typography with bold headings and clear information hierarchy
- Advanced interactive elements: countdown timers, booking calendars, live chat widgets, social feeds
- Mobile-first design with event app integration and QR code functionality
- Conversion-optimized layout with multiple registration touchpoints and urgency elements
- Accessibility features with screen reader support and inclusive design principles`,
  },
  {
    id: "blog-magazine",
    name: "Blog/Magazine",
    description:
      "Modern publishing platform with multi-author support, SEO optimization, newsletter integration, and monetization features",
    category: "Content",
    icon: "📰",
    prompt:
      "Create a premium blog/magazine website with advanced content management, multi-author support, SEO optimization, newsletter integration, social sharing, and monetization features",
    systemPrompt: `Build a sophisticated, modern publishing platform with:
- Dynamic header with logo, multi-level navigation, search bar, dark mode toggle, and social media links
- Hero section with featured articles carousel, trending topics, and breaking news banner
- Advanced article grid with category filters, sorting options (newest, popular, trending), and infinite scroll
- Multi-author support with detailed author profiles, bio pages, and author-specific article feeds
- Comprehensive sidebar with categories, tags, popular posts, recent comments, and social media feeds
- Newsletter subscription with lead magnets, email course offers, and subscriber benefits
- Article page template with estimated read time, social sharing buttons, related articles, and comment system
- SEO optimization features with meta descriptions, schema markup, and social media previews
- Content monetization with subscription tiers, premium content areas, and advertisement spaces
- Advanced search with filters by category, author, date, and content type
- Social media integration with auto-posting, share counts, and embedded social feeds
- Comment system with moderation tools, reply threading, and social login options
- Email marketing integration with automated campaigns and subscriber segmentation
- Analytics dashboard placeholder with content performance metrics
- Mobile-responsive design with AMP support and progressive web app features
- Content recommendations engine with "You might also like" and "Trending now" sections
- Editorial calendar with publishing schedule and content planning tools
- Archive pages with year/month navigation and category browsing
- Contact and about pages with team information and editorial guidelines
- Image placeholders (NO actual images, only styled boxes):
  * Logo placeholder: Placeholder box showing "Publication Logo\n250x100"
  * Featured article images: Placeholder boxes showing "Hero Article\n800x400"
  * Article thumbnails: Placeholder boxes showing "Article Thumbnail\n400x250"
  * Author photos: Placeholder boxes showing "Author Headshot\n150x150"
  * Advertisement spaces: Placeholder boxes showing "Ad Banner\n728x90"
  * Social media previews: Placeholder boxes showing "Social Preview\n600x315"
  * Newsletter graphics: Placeholder box showing "Newsletter Graphic\n500x300"
  * Team photos: Placeholder boxes showing "Team Member\n200x200"
  * Editorial calendar: Placeholder box showing "Calendar Widget\n400x300"
- Premium color scheme: Clean whites, professional grays (#374151), accent blue (#2563eb) with sophisticated gradients
- Advanced typography with multiple font weights, optimal line spacing, and reading-focused design
- Content-first layout with sophisticated spacing, visual hierarchy, and modern design elements
- Mobile-optimized with touch-friendly navigation, swipe gestures, and fast loading times
- Accessibility features with screen reader support, keyboard navigation, and inclusive design
- Dark mode support with elegant color transitions and user preference storage`,
  },
  {
    id: "fitness-gym",
    name: "Fitness/Gym",
    description:
      "Complete fitness platform with online booking, personal training, nutrition plans, progress tracking, and community features",
    category: "Health & Fitness",
    icon: "💪",
    prompt:
      "Design a comprehensive fitness website with online class booking, personal training scheduling, nutrition planning, progress tracking, virtual workouts, and community features",
    systemPrompt: `Create a sophisticated, comprehensive fitness platform with:
- Dynamic hero section with motivational messaging, member success metrics, and primary membership CTA
- Online class booking system with real-time availability, instructor info, and calendar integration
- Personal training scheduler with trainer profiles, specializations, and appointment booking
- Virtual training platform with live streaming classes, on-demand workouts, and mobile app integration
- Nutrition and meal planning section with customized diet plans, recipe database, and consultation booking
- Member portal with progress tracking, workout history, body measurements, and achievement badges
- Fitness challenges and competitions with leaderboards, team challenges, and reward systems
- Equipment reservation system for peak hours with real-time availability and booking
- Specialized programs section (weight loss, muscle building, rehabilitation, seniors, youth)
- Wellness services including massage therapy, physiotherapy, and recovery treatments
- Community features with member forums, workout buddies matching, and social sharing
- Mobile app promotion with workout tracking, check-in features, and push notifications
- Wearable device integration with fitness trackers, heart rate monitors, and progress sync
- Nutrition consultation booking with certified dietitians and meal plan customization
- Corporate wellness programs with group rates and employee fitness challenges
- Fitness blog with workout tips, nutrition advice, and success stories
- Membership tiers with detailed feature comparisons and upgrade paths
- Facility virtual tour with 360-degree views and equipment demonstrations
- Safety protocols and health guidelines with COVID-19 measures and cleanliness standards
- Success transformation gallery with before/after photos and member testimonials
- Free trial offers with guest pass booking and introductory session scheduling
- Contact and location with multiple branches, hours, and parking information
- Image placeholders (NO actual images, only styled boxes):
  * Hero workout image: Placeholder box showing "Motivational Hero\n1200x600"
  * Trainer photos: Placeholder boxes showing "Personal Trainer\n300x300"
  * Facility photos: Placeholder boxes showing "Gym Facility\n500x400"
  * Equipment photos: Placeholder boxes showing "Fitness Equipment\n400x300"
  * Success story photos: Placeholder boxes showing "Transformation\n300x400"
  * Virtual class screenshot: Placeholder box showing "Virtual Workout\n600x400"
  * Mobile app mockup: Placeholder box showing "Fitness App\n300x600"
  * Nutrition consultation: Placeholder box showing "Nutrition Session\n400x300"
  * Group class photo: Placeholder boxes showing "Group Fitness\n500x350"
  * Recovery services: Placeholder boxes showing "Wellness Treatment\n350x300"
  * Corporate wellness: Placeholder box showing "Team Fitness\n600x400"
- High-energy color scheme: Vibrant orange (#ea580c), powerful black (#111827), fresh green (#059669) with dynamic gradients
- Motivational typography with bold headings, action-oriented language, and clear hierarchy
- Interactive elements: booking calendars, progress trackers, challenge timers, social feeds
- Mobile-first design with app integration, GPS check-in, and wearable device connectivity
- Conversion-optimized layout with multiple membership touchpoints and trial offers
- Accessibility features with adaptive equipment information and inclusive fitness programs`,
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return templates.filter((template) => template.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(templates.map((template) => template.category))];
};
