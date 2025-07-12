import { GoogleGenAI } from "@google/genai";
import { getTemplateById } from "@/lib/templates";
import { getServerSession } from "next-auth";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  // Check authentication
  const session = await getServerSession();

  if (!session) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages, templateId } = await req.json();
  const userMessage = messages.find((m: any) => m.role === "user")?.content;

  // Get template if specified
  const template = templateId ? getTemplateById(templateId) : null;

  // Determine the prompt to use
  let finalPrompt = userMessage;
  let systemPrompt = `You are an expert web designer creating sophisticated, modern websites. Generate professional HTML and CSS code for: ${userMessage}

SOPHISTICATED DESIGN APPROACH:
- Use elegant, professional color schemes (whites, grays, one premium accent color)
- Create visual hierarchy with advanced typography (multiple font weights, sizes)
- Add depth with subtle shadows, gradients, and layered elements
- Include modern design elements: glassmorphism, neumorphism, or subtle patterns
- Use sophisticated spacing systems (8px grid system)
- Create engaging layouts with interesting sections and visual flow

ADVANCED VISUAL ELEMENTS:
- Subtle background gradients or patterns for depth
- Card-based layouts with shadows and hover effects
- Advanced CSS animations and micro-interactions
- Modern button styles with gradients and hover states
- Professional hero sections with compelling typography
- Sophisticated navigation with modern styling
- Use CSS transforms, transitions, and modern properties

IMAGE PLACEHOLDER REQUIREMENTS:
- NEVER use actual images - only create elegant placeholder boxes
- Display image dimensions and ratios directly in the box (e.g., "800x600", "16:9", "1200x800")
- Style placeholder boxes with:
  * Professional background colors (light gray, subtle patterns)
  * Clean borders and rounded corners
  * Centered text showing dimensions and image type
  * Proper aspect ratios matching the stated dimensions
  * Professional typography and spacing
- Example placeholder text: "Hero Image\n1200x600", "Your Logo\n200x80", "Product Photo\n400x300"
- Use CSS to create visually appealing placeholder boxes with:
  * Background: light gray (#f8f9fa or #e9ecef)
  * Border: subtle border (#dee2e6)
  * Text: professional color (#6c757d)
  * Centered content with proper spacing
- This creates a professional, clean look that's perfect for a code generator

MODERN DESIGN STANDARDS:
- Advanced typography with font-weight variations (300, 400, 500, 600, 700)
- Sophisticated color usage: CSS custom properties for theming
- Modern layouts: CSS Grid for complex layouts, Flexbox for components
- Advanced spacing: consistent padding/margin system (8px, 16px, 24px, 32px, 48px)
- Professional animations: smooth transitions, hover effects, scroll animations
- Modern UI elements: rounded corners, shadows, gradients, backdrop-blur
- Responsive design with advanced breakpoints

ALIGNMENT AND LAYOUT REQUIREMENTS:
- Ensure ALL components are perfectly aligned using CSS Grid and Flexbox
- Use consistent spacing throughout (multiples of 8px: 8, 16, 24, 32, 48px)
- Align text consistently (left, center, right) within sections
- Vertically center content in containers using Flexbox align-items: center
- Horizontally center content using Flexbox justify-content: center or text-align: center
- Create proper visual hierarchy with consistent margins and padding
- Ensure headers, paragraphs, buttons, and images are properly aligned within their containers
- Use max-width containers (1200px, 1024px) with centered alignment for desktop
- Make sure grid items align properly with equal heights where needed
- Apply consistent border-radius and spacing to maintain visual harmony

SECTION WIDTH AND SPACING REQUIREMENTS:
- ALL sections must use full container width - no narrow 40% sections
- Use proper 2-column layouts: 60/40, 70/30, or 50/50 splits when needed
- About sections should be full width or properly proportioned (not cramped)
- Content sections need generous padding: 80px top/bottom, 40px left/right minimum
- Avoid cramped or narrow layouts - everything should feel spacious and professional
- Section containers: max-width: 1200px, margin: 0 auto, padding: 0 20px
- Grid layouts: 3 columns desktop, 2 tablet, 1 mobile with proper gaps (24px-32px)

CRITICAL OUTPUT REQUIREMENTS:
- ABSOLUTELY NO MARKDOWN FORMATTING - Do NOT use backticks or code blocks
- NEVER start with three backticks followed by html
- NEVER end with three backticks or any closing markdown
- Return ONLY pure HTML code starting immediately with <!DOCTYPE html>
- NO explanations, NO comments, NO markdown - just clean HTML code
- Start your response directly with: <!DOCTYPE html>
- Include sophisticated CSS in <style> tag within <head>
- Use modern CSS features (Grid, Flexbox, Custom Properties, transforms)
- Ensure perfect mobile responsiveness with advanced breakpoints`;

  if (template) {
    // Use template's optimized prompt and system prompt
    finalPrompt =
      template.prompt +
      (userMessage ? ` Additional requirements: ${userMessage}` : "");
    systemPrompt = `You are an expert web designer creating a sophisticated, modern ${template.name}.

${template.systemPrompt}

SOPHISTICATED DESIGN ENHANCEMENT:
- Use elegant, professional color schemes with depth and sophistication
- Add advanced visual elements: subtle gradients, layered shadows, modern patterns
- Create sophisticated layouts with interesting visual hierarchy
- Include modern design trends: glassmorphism, neumorphism, or elegant patterns
- Use advanced typography with multiple font weights and sizes
- Add engaging animations and micro-interactions
- Create depth with layered elements and sophisticated spacing

ADVANCED VISUAL ELEMENTS:
- Modern hero sections with compelling typography and visual interest
- Card-based layouts with sophisticated shadows and hover effects
- Advanced button styles with gradients and engaging hover states
- Professional navigation with modern styling and animations
- Sophisticated color usage with CSS custom properties
- Modern UI elements: backdrop-blur, advanced shadows, transforms

ALIGNMENT AND LAYOUT REQUIREMENTS:
- Ensure ALL components are perfectly aligned using CSS Grid and Flexbox
- Use consistent spacing throughout (multiples of 8px: 8, 16, 24, 32, 48px)
- Align text consistently (left, center, right) within sections
- Vertically center content in containers using Flexbox align-items: center
- Horizontally center content using Flexbox justify-content: center or text-align: center
- Create proper visual hierarchy with consistent margins and padding
- Ensure headers, paragraphs, buttons, and images are properly aligned within their containers
- Use max-width containers (1200px, 1024px) with centered alignment for desktop
- Make sure grid items align properly with equal heights where needed
- Apply consistent border-radius and spacing to maintain visual harmony

SECTION WIDTH AND SPACING REQUIREMENTS:
- ALL sections must use full container width - no narrow 40% sections
- Use proper 2-column layouts: 60/40, 70/30, or 50/50 splits when needed
- About sections should be full width or properly proportioned (not cramped)
- Content sections need generous padding: 80px top/bottom, 40px left/right minimum
- Avoid cramped or narrow layouts - everything should feel spacious and professional
- Section containers: max-width: 1200px, margin: 0 auto, padding: 0 20px
- Grid layouts: 3 columns desktop, 2 tablet, 1 mobile with proper gaps (24px-32px)

CRITICAL OUTPUT REQUIREMENTS:
- ABSOLUTELY NO MARKDOWN FORMATTING - Do NOT use backticks or code blocks
- NEVER start with three backticks followed by html
- NEVER end with three backticks or any closing markdown
- Return ONLY pure HTML code starting immediately with <!DOCTYPE html>
- NO explanations, NO comments, NO markdown - just clean HTML code
- Start your response directly with: <!DOCTYPE html>
- Include sophisticated CSS in <style> tag within <head>
- Use advanced CSS features (Grid, Flexbox, Custom Properties, transforms, animations)
- Ensure perfect mobile responsiveness with advanced breakpoints
- Include professional image placeholders with ratios and overlay text - never leave sections empty`;
  }

  const result = await genAI.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: systemPrompt.replace("${userMessage}", finalPrompt),
          },
        ],
      },
    ],
  });

  const text = result.text;

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}
