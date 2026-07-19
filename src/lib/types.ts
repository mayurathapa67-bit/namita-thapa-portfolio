export type StoryCategory = "Fiction" | "Poetry" | "Non-Fiction" | "Immersive";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  title: string;
  role: string;
  tagline: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  image: string;
  /** Accent line shown above the role (editable handwriting) */
  eyebrow?: string;
}

export interface LogoContent {
  text: string;
  image?: string;
}

export interface JourneyMilestone {
  year: string;
  milestone: string;
  story: string;
}

export interface PublishedWork {
  title: string;
  description: string;
  cover: string;
  year: string;
}

export interface PersonalInterest {
  hobby: string;
  icon: string;
  note: string;
}

export interface AboutContent {
  headline: string;
  bio: string;
  philosophy: string;
  journey: JourneyMilestone[];
  expertise: string[];
  published_works: PublishedWork[];
  personal: {
    hobbies: PersonalInterest[];
    photos: string[];
  };
  image: string;
  /** Optional secondary gallery shown on the about page */
  gallery?: string[];
}

export interface ContactContent {
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
  availability: string;
  /** Lead-in line shown above the heading */
  eyebrow?: string;
  /** Intro paragraph shown beside the contact form */
  intro?: string;
  photo?: string;
}

export interface ServiceDeliverable {
  label: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  price: string;
  deliverables: string[];
}

export interface PortfolioItem {
  slug: string;
  title: string;
  category: StoryCategory;
  excerpt: string;
  content: string;
  cover_image: string;
  published_date: string;
  read_time: string;
  genre: string;
  tags: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string;
  published_date: string;
  read_time: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactContent {
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
  availability: string;
}

export interface SiteContent {
  nav: {
    logo: LogoContent;
    links: NavLink[];
  };
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  portfolio: PortfolioItem[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  contact: ContactContent;
}

export function isStoryCategory(value: unknown): value is StoryCategory {
  return (
    value === "Fiction" ||
    value === "Poetry" ||
    value === "Non-Fiction" ||
    value === "Immersive"
  );
}

export function isPortfolioItemArray(value: unknown): value is PortfolioItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).slug === "string" &&
        typeof (item as Record<string, unknown>).title === "string" &&
        isStoryCategory((item as Record<string, unknown>).category),
    )
  );
}

export function isBlogPostArray(value: unknown): value is BlogPost[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).slug === "string" &&
        typeof (item as Record<string, unknown>).title === "string",
    )
  );
}

export function isTestimonialArray(value: unknown): value is Testimonial[] {
  return Array.isArray(value);
}
