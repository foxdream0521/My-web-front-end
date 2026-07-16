import { Project, JournalEntry, Stat } from './types';

export const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDKWo_cnXETUDRLLrLn7tUlsNI7ADq_32OvZp_MgT0LSAxOZh_Ek1OrhqFMZ9QuOqMbV4HEhqZsve7Z-mTmLUytoP5NHXeDoMO7SzVlrD16aUpQ8ZtmRoZQbFbwsxqUX4wlV4XzrkZ7-vV1fxU8xI61WturKSOjoj5m6pnpaedPb8Ds0xAh65vl_7-bFLXxTtApFw0H6pkzPCkYD3EOmSdLNCvYzE3w9JP3E3ePzvAuD3yWtyEPpMmCpw";
export const PORTRAIT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDpKuzhSxDNCgLAGUVE0zxIbLlg7fL6l3joGaHyqlEajd-OQ8b_pFaohI7Pa7QCxDLcaLyl7dtClEbZ-RwflQqdEfH2d3dk-B40vF47spOW8qZh-Wfpmdk2i7MrIhbiiM7dkZwtVAeLXpzf1i-h3SSJlRUsXqGuzIrlbCBx1uXAa_3aisZw5api-Dra80EyURq6z0DC6w9O95XRQNnXWA4T-1D5BZsxi0a2qdJIck9wlbFQzqhzW0UsUg";

export const PROJECTS: Project[] = [
  {
    id: "lunar-monolith",
    title: "Lunar Monolith",
    category: "VISUAL IDENTITY",
    description: "A study of form and shadow within nocturnal environments.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvygnJ5h8gZfdqpBo1OcPJeHa7RWI9Dy63En1GC8owhAjQLJvKkexBv1CGN0DqPNa7QPtkZjhMroP1vr3zDR6KN2IloHgHgSu3qxujOxCy42-Bo-ElyiUvkCBgqEYPvXImOZPgzxzNy6BdHBZR8iLgBoHJf9Z0lt1jUDmU3amRWcXUWC0zHdAB0geh2vsWGfFznRCHv4ncUnJRAMu54Nj1_nqmD5moVEmEPEW9NSv9wK8SJ4SUjPkbHQ",
    altText: "A moody, cinematic digital painting of a futuristic architectural structure illuminated by cold blue moonlight.",
    fullStory: "Lunar Monolith explores the dramatic visual contrasts found only in complete isolation. By utilizing extreme key lighting of cold blue moonlight against sharp architectural facades, the project establishes a serene yet intimidating structure. This case study demonstrates how light carve-outs define physical borders without relying on artificial ambient fills, achieving a pure expression of volumetric shadows.",
    tags: ["Form & Shadow", "3D Rendering", "Nocturnal Concept", "Minimal Architecture"],
    client: "Aether Archetypes",
    year: "2024",
    tools: ["Blender", "Unreal Engine 5", "Photoshop CC"]
  },
  {
    id: "astrum-interface",
    title: "Astrum Interface",
    category: "UI DESIGN",
    description: "Creating clarity for the explorers of the digital cosmos.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4w386cNEBfTKK49IpIi-4TDJ5n5kdDxwSxH7lw84tOdrSmDqO1BBiWMmTTeCWJXLk0CKlxwpNi-vHZ9oNEkMtAE96S7KRPNsHHBuk8zZwjlygVessCKGWs_S4j1b3cqh6yFktp9nN-hmJKThauAcjqnXDZ5_BlbhIeveLlbpCypuq2lgPpcpAJtolmHT4kulwcWZM0n_nAY5VjW9kQPuRPAPlySJs-NiXvYzmj-M7m3njk2r8e4bynA",
    altText: "A high-end UI design for a space exploration interface, featuring glassmorphic elements and silver accents.",
    fullStory: "Astrum Interface is a dashboard design crafted specifically for celestial analysis. It features advanced glassmorphism components with sub-pixel borders, providing rich data readability without obstructing the back-end starry visualization. Every layout grid line was engineered with negative space in mind to maintain a lightweight, atmospheric feel.",
    tags: ["Dashboard Design", "Glassmorphism", "Information Architecture", "UX Strategy"],
    client: "Celestial Archive",
    year: "2024",
    tools: ["Figma", "React", "D3.js", "Tailwind CSS"]
  },
  {
    id: "velvet-orbit",
    title: "Velvet Orbit",
    category: "ART DIRECTION",
    description: "The rhythmic motion of light through infinite charcoal space.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGjYVbYqoS94clvi2kDPpoUgISaufMhBvFzL9NfzazbRLU9sN1mdSbMiibAH3CgxF0s0MIYbsqRhd68DI8g3xhgoHavjdk5zoFrSBKFiR7lek_xREZ-XyFU8oFw_Y1Jd7gziM3heftTyYieXdiABEmmGbjsYsO11Evw5cYAecloocvs4e6A8sPD0RqnUqH2bFhTyOKsj1_LBYVN5YLrVh7re27NeCHodK6PIJbbjgxA9XHlVES4imCBg",
    altText: "An abstract digital art piece depicting a sequence of floating celestial spheres captured in high-speed motion.",
    fullStory: "Velvet Orbit is an experiential art-direction showcase that captures the slow, graceful choreography of orbital mechanics. Floating spheres are illustrated leaving luminous silver trails on a dark velvet background, reminding the viewer of deep cosmological rhythm. It serves as a visual metaphor for continuous, unhurried growth.",
    tags: ["Abstract Motion", "Visual Choreography", "Silver Foil Textures", "3D Artwork"],
    client: "Odyssey Art Labs",
    year: "2023",
    tools: ["Houdini", "Cinema 4D", "After Effects"]
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "entry-1",
    title: "The Quiet Hour: Designing After Midnight",
    date: "July 12, 2026",
    category: "Philosophy",
    excerpt: "Why the absence of ambient light and daily chatter reveals the most pristine creative constraints.",
    readTime: "4 min read"
  },
  {
    id: "entry-2",
    title: "Chasing Shadows: The Art of Chiaroscuro in Modern Web Layouts",
    date: "June 28, 2026",
    category: "Design System",
    excerpt: "How to use dark-themed negative space and high-contrast silver borders to build professional UI depth.",
    readTime: "6 min read"
  },
  {
    id: "entry-3",
    title: "Celestial Balance: Geometry in Minimalist Interfaces",
    date: "May 15, 2026",
    category: "Aesthetics",
    excerpt: "Exploring the mathematical perfection of perfect circles and orbital structures as functional page layouts.",
    readTime: "5 min read"
  }
];

export const STATS: Stat[] = [
  {
    id: "years-observation",
    value: "0521",
    label: "生日"
  },
  {
    id: "masterpieces",
    value: "85",
    label: "Nocturnal Masterpieces"
  }
];
