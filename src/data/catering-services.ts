import {
  Boxes,
  Building2,
  CakeSlice,
  ChefHat,
  CupSoda,
  Flame,
  Home,
  Package,
  PartyPopper,
  Soup,
  Truck,
  type LucideIcon,
} from "lucide-react";

/**
 * Editable catering content. Copy here is written for the demo catalogue and
 * should be reviewed with the kitchen before launch, exactly like menu pricing.
 */
export type CateringService = {
  slug: string;
  icon: LucideIcon;
  title: string;
  copy: string;
  highlights: string[];
};

export const cateringServices: CateringService[] = [
  {
    slug: "weddings",
    icon: PartyPopper,
    title: "Weddings & receptions",
    copy: "Multi-counter menus for sangeet, haldi, mehendi and reception evenings, planned around your run sheet.",
    highlights: ["Multi-counter menus", "Trained stewards", "Timed service"],
  },
  {
    slug: "corporate",
    icon: Building2,
    title: "Corporate & office catering",
    copy: "Breakfast counters, working lunches, townhall snacks and festive office spreads delivered on schedule.",
    highlights: ["Bulk invoicing", "Fixed slots", "Desk-friendly packing"],
  },
  {
    slug: "celebrations",
    icon: CakeSlice,
    title: "Birthdays & anniversaries",
    copy: "Relaxed house parties and milestone celebrations with a snack spread guests keep returning to.",
    highlights: ["Small-batch cooking", "Kids-friendly menu", "Setup included"],
  },
  {
    slug: "live-counters",
    icon: ChefHat,
    title: "Live chaat & snack counters",
    copy: "Our cooks assemble pav bhaji, chaat, vada pav and dabeli in front of your guests, plate by plate.",
    highlights: ["On-site cooking", "Branded counters", "Continuous service"],
  },
  {
    slug: "festivals",
    icon: Flame,
    title: "Festival & community bhoj",
    copy: "Navratri, Diwali, Ganpati and jagran catering for societies and community halls at large guest counts.",
    highlights: ["Satvik menus", "Jain options", "High-volume service"],
  },
  {
    slug: "pooja",
    icon: Home,
    title: "Housewarming & pooja gatherings",
    copy: "Griha pravesh, naming ceremonies and family poojas served warm, with no-onion-no-garlic menus on request.",
    highlights: ["No onion, no garlic", "Thali service", "Home-scale setup"],
  },
  {
    slug: "bulk-orders",
    icon: Boxes,
    title: "Bulk & packed party orders",
    copy: "Sealed boxes and trays for offices, travel, prasad distribution and gatherings that need no on-site staff.",
    highlights: [
      "Food-safe packing",
      "Scheduled delivery",
      "Per-box labelling",
    ],
  },
  {
    slug: "beverages",
    icon: CupSoda,
    title: "Beverage & mocktail counters",
    copy: "Masala chai, filter coffee, fresh lime, jaljeera and seasonal mocktails poured through the event.",
    highlights: ["Chai & coffee urns", "Mocktail bar", "Chilled service"],
  },
];

export type ServiceFormat = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

export const cateringFormats: ServiceFormat[] = [
  {
    icon: ChefHat,
    title: "Live counters",
    copy: "Cooked and plated in front of guests, so every serving reaches the table hot.",
  },
  {
    icon: Soup,
    title: "Buffet service",
    copy: "Chafing-dish spreads with staff at each station to keep the queue moving.",
  },
  {
    icon: Package,
    title: "Packed boxes & thalis",
    copy: "Individually packed meals for offices, travel, prasad and seated gatherings.",
  },
  {
    icon: Truck,
    title: "Doorstep bulk delivery",
    copy: "Trays delivered to your venue on a fixed slot when you are handling service yourself.",
  },
];

export const cateringInclusions = [
  "Menu planning and portion guidance for your guest count",
  "Pure vegetarian kitchen, with Jain and no-onion-no-garlic options",
  "Counter setup, chafing dishes, serving ware and table skirting",
  "Trained service staff, stewards and a point-of-contact captain",
  "Disposable or crockery service, depending on your venue",
  "Timed courses that follow your event schedule",
  "Pack-down and counter clean-up after service",
];

export const cateringOccasions = [
  "Sangeet & mehendi",
  "Reception dinners",
  "Engagement parties",
  "Office townhalls",
  "Product launches",
  "Society festivals",
  "Ganpati & Navratri",
  "Griha pravesh",
  "Naming ceremonies",
  "Birthday parties",
  "Kitty gatherings",
  "School & college events",
];

export const cateringProcess = [
  {
    number: "01",
    label: "Step one",
    title: "Share your brief",
    copy: "Send the date, venue, guest count and occasion using the enquiry form or a quick call.",
  },
  {
    number: "02",
    label: "Step two",
    title: "Menu & quote",
    copy: "We propose a menu and service format for your budget, then confirm per-plate or per-counter pricing in writing.",
  },
  {
    number: "03",
    label: "Step three",
    title: "Confirm & plan",
    copy: "Lock the date with an advance. We finalise timings, staff count, counter layout and dietary notes.",
  },
  {
    number: "04",
    label: "Step four",
    title: "Serve & celebrate",
    copy: "Our team arrives early, sets up, serves through your schedule and clears the counters afterwards.",
  },
];

export const cateringScales = [
  {
    guests: "20 - 50",
    title: "Intimate",
    copy: "House parties, poojas and small office teams. Delivered hot, with a compact counter setup.",
  },
  {
    guests: "50 - 250",
    title: "Celebration",
    copy: "Birthdays, sangeet evenings and society events with live counters and service staff.",
  },
  {
    guests: "250+",
    title: "Grand",
    copy: "Weddings, festivals and community bhoj with multiple counters and a dedicated captain.",
  },
];
