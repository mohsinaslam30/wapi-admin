import { Building2, CreditCard, HelpCircle, Layers, Layout, MessageSquareQuote, Monitor, PhoneCall, Rocket } from "lucide-react";

export const AVAILABLE_ICONS = [
  { value: "Phone", label: "Phone (WhatsApp)" },
  { value: "Instagram", label: "Instagram" },
  { value: "MessageSquare", label: "Message Square" },
  { value: "Send", label: "Paper Plane" },
  { value: "Inbox", label: "Inbox" },
  { value: "GitBranch", label: "Git Branch" },
  { value: "ShoppingBag", label: "Shopping Bag" },
  { value: "Bot", label: "AI Bot" },
  { value: "FileText", label: "File Text" },
  { value: "CreditCard", label: "Credit Card" },
  { value: "Sparkles", label: "Sparkles" },
  { value: "Calendar", label: "Calendar" },
];

export const MEGA_MENU_TYPES = [
  { value: "Simple", label: "Simple Grid", desc: "Clean text columns" },
  { value: "Link With Image", label: "Link With Image", desc: "Displays visual icons & images" },
  { value: "Side Banner", label: "Side Banner", desc: "Sidebar banner placement" },
  { value: "Bottom Banner", label: "Bottom Banner", desc: "Promo footer strip" },
  { value: "Product Box", label: "Product Box", desc: "Highlighted items grid" },
  { value: "Blog Box", label: "Blog Box", desc: "Article preview boxes" },
];

export const BADGE_COLORS = [
  { value: "red", bg: "bg-red-500" },
  { value: "black", bg: "bg-black" },
  { value: "green", bg: "bg-emerald-500" },
  { value: "yellow", bg: "bg-amber-500" },
];
 
export const tabs = [
  {
    id: "header",
    label: "Header",
    icon: Layout,
    description: "Header & mega menu",
  },
  {
    id: "hero",
    label: "Hero",
    icon: Rocket,
    description: "Main landing header",
  },
  {
    id: "branding",
    label: "Branding",
    icon: Building2,
    description: "Trust logos & label",
  },
  {
    id: "features",
    label: "Features",
    icon: Layers,
    description: "Highlight key values",
  },
  {
    id: "platform",
    label: "Platform",
    icon: Monitor,
    description: "Showcase platform features",
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: CreditCard,
    description: "Subscription plans",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: MessageSquareQuote,
    description: "Customer feedback",
  },
  {
    id: "faq",
    label: "FAQ",
    icon: HelpCircle,
    description: "Common questions",
  },
  {
    id: "contact",
    label: "Contact",
    icon: PhoneCall,
    description: "Get in touch info",
  },
  {
    id: "footer",
    label: "Footer",
    icon: Layout,
    description: "Social links & legal",
  },
] as const;



export  const RESERVED_SLUGS = [
    "instagram",
    "whatsapp",
    "telegram",
    "facebook",
    "ai_calling",
    "appointment_booking",
    "broadcast_bulk_messages",
    "catalog",
    "product_catalog",
    "whatsapp_forms",
    "automation_builder",
    "ctwa",
    "shared_team_inbox",
  ];