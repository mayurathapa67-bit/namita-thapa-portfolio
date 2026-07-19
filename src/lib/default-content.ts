import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  nav: {
    logo: { text: "Namita Thapa", image: "" },
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Stories", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  hero: {
    title: "Namita Thapa",
    role: "Immersive Storyteller & Creative Writer",
    tagline: "Stories That Come Alive",
    eyebrow: "where words become worlds",
    subtitle:
      "I craft immersive narratives that transport readers to other worlds — one honest word at a time.",
    cta_primary: "Explore My Stories",
    cta_secondary: "Let's Create Together",
    image: "/author/namita.jpg",
  },
  about: {
    headline: "My Story",
    bio: "I grew up between two homes â€” the eucalyptus hush of Totterdell Park in Perth and the green, rain-washed hills of Mulpani, Kathmandu. Somewhere between those two skies I learned that a place is really just a feeling you return to, and that stories are the only way we keep those feelings alive.\n\nFor as long as I can remember, I have been writing: scribbled poems in the margins of schoolbooks, long letters to friends I never sent, and novels that lived mostly in my head. Over the years that private habit became a vocation. Today I write fiction, poetry, and immersive narratives that invite a reader not just to observe a world, but to step inside it.\n\nWhat I care about most is honesty. The magical only works when it is rooted in something true â€” a quiet grief, a small kindness, the particular way light falls through a window. I write to make those moments unforgettable.",
    philosophy:
      "Every story is a door to another world. My task is only to keep the hinges well-oiled, and to trust the reader to turn the handle.",
    journey: [
      {
        year: "1998",
        milestone: "The First Notebook",
        story:
          "A red school notebook, filled with poems about monsoon and mango trees. I was nine, and already certain that words could hold more than facts.",
      },
      {
        year: "2011",
        milestone: "Two Homes, Two Languages",
        story:
          "Moving between Perth and Kathmandu taught me to listen â€” to accents, silences, and the stories people tell when they think no one is writing them down.",
      },
      {
        year: "2016",
        milestone: "First Published Piece",
        story:
          "A short story about a grandmother who taught her granddaughter to read the stars. It found a small magazine and a large, unexpected kindness from strangers.",
      },
      {
        year: "2019",
        milestone: "Immersive Storytelling",
        story:
          "I began experimenting with narratives that unfold across space and medium â€” stories you walk through rather than simply read. The library became a stage.",
      },
      {
        year: "2023",
        milestone: "The Collection",
        story:
          "I gathered years of fiction, poetry, and essays into a body of work I could finally call a voice â€” warm, literary, and unafraid of wonder.",
      },
    ],
    expertise: [
      "Creative Writing",
      "Storytelling",
      "World-Building",
      "Character Development",
      "Poetry & Prose",
      "Immersive Narratives",
      "Editing & Craft",
      "Narrative Consulting",
    ],
    published_works: [
      {
        title: "The Quiet Hours",
        description:
          "A story collection about the small, luminous moments that happen when no one is watching â€” morning kitchens, late trains, the last page of a book.",
        cover: "/covers/quiet-hours.svg",
        year: "2023",
      },
      {
        title: "Letters to the Monsoon",
        description:
          "A sequence of poems addressed to the rain, to home, and to the self we leave behind when we cross an ocean.",
        cover: "/covers/letters-monsoon.svg",
        year: "2021",
      },
      {
        title: "The Library of Small Lights",
        description:
          "An immersive narrative experiment â€” a library where every book is a doorway, and every reader becomes a character.",
        cover: "/covers/library-lights.svg",
        year: "2024",
      },
    ],
    personal: {
      hobbies: [
        { hobby: "Reading", icon: "book", note: "Always midway through three books at once." },
        { hobby: "Travel", icon: "compass", note: "Chasing light between two hemispheres." },
        { hobby: "Nature", icon: "leaf", note: "Long walks, longer silences." },
        { hobby: "Coffee", icon: "cup", note: "The fuel of every first draft." },
      ],
      photos: ["/author/namita.svg", "/author/namita-2.svg", "/author/namita-3.svg"],
    },
    image: "/author/namita.svg",
    gallery: ["/author/namita-2.svg", "/author/namita-3.svg"],
  },
  services: [
    {
      title: "Creative Writing",
      description:
        "Fiction and poetry written with care â€” for publications, brands, or the simple joy of a story well told. I listen first, then write.",
      icon: "pen",
      price: "From $120 / piece",
      deliverables: [
        "Original short fiction or poetry",
        "Two rounds of gentle revisions",
        "A voice that matches your world",
      ],
    },
    {
      title: "Immersive Storytelling",
      description:
        "Interactive narratives that unfold across space and medium. We build worlds a reader can step inside, not just read about.",
      icon: "sparkles",
      price: "From $600 / project",
      deliverables: [
        "Narrative architecture & map",
        "Branching or spatial story design",
        "Words, scenes, and atmosphere",
      ],
    },
    {
      title: "Content Creation",
      description:
        "Blogs and articles with a human heartbeat. Clear, warm, and quietly unforgettable â€” never the usual corporate drone.",
      icon: "edit",
      price: "From $90 / article",
      deliverables: [
        "SEO-aware long-form writing",
        "Editorial voice development",
        "Optional ghostwritten bylines",
      ],
    },
    {
      title: "Ghostwriting",
      description:
        "Your story, your name. I disappear into your voice so completely that even you will wonder who wrote it.",
      icon: "feather",
      price: "From $1,200 / book",
      deliverables: [
        "Full manuscript in your voice",
        "Outline & chapter plan",
        "Complete confidentiality",
      ],
    },
    {
      title: "Story Consulting",
      description:
        "Stuck on a draft? I'll help you find the true shape of your story â€” structure, voice, and the courage to cut what doesn't serve.",
      icon: "compass",
      price: "From $80 / hour",
      deliverables: [
        "Manuscript read & notes",
        "Structural roadmap",
        "A kind, honest second pair of eyes",
      ],
    },
    {
      title: "Writing Workshops",
      description:
        "Small, warm groups where we write together, read aloud, and remember that everyone has a story worth telling.",
      icon: "star",
      price: "From $250 / session",
      deliverables: [
        "Live guided session",
        "Prompts & craft handouts",
        "A safe, encouraging room",
      ],
    },
  ],
  portfolio: [
    {
      slug: "the-quiet-hours",
      title: "The Quiet Hours",
      category: "Fiction",
      excerpt:
        "A grandmother keeps time by the kettle, and a granddaughter learns that love is mostly the things we do without saying.",
      content:
        "The kettle sang the same three notes every morning, and Ama kept time by it the way other women kept time by the clock.\n\nIn the quiet hours before the house woke, she moved through the kitchen like a priestess of small rituals â€” one spoon of tea, two of sugar, a breath of milk. The granddaughter watched from the doorway, too young to name what she was learning.\n\nYears later, when Ama was gone, the granddaughter would boil water and hear those three notes, and understand: love is mostly the things we do without saying. The kettle was never really about tea.",
      cover_image: "/covers/quiet-hours.svg",
      published_date: "2023-04-12",
      read_time: "6 min",
      genre: "Literary Fiction",
      tags: ["family", "memory", "quiet"],
    },
    {
      slug: "letters-to-the-monsoon",
      title: "Letters to the Monsoon",
      category: "Poetry",
      excerpt:
        "A sequence of poems addressed to the rain â€” and to the home we leave behind when we cross an ocean.",
      content:
        "Dear rain,\n\nYou arrived the night I left, as if to say\nI would be the only thing\nthat loved us both at once â€”\nthe hills of Mulpani,\nthe dry gold of Perth.\n\nI have written you from airports,\nfrom kitchens, from the in-between\nwhere the self goes soft\nand remembers everything.\n\nCome again. I am still\nlearning how to be\ntwo homes at once.",
      cover_image: "/covers/letters-monsoon.svg",
      published_date: "2021-08-03",
      read_time: "4 min",
      genre: "Poetry",
      tags: ["home", "migration", "rain"],
    },
    {
      slug: "the-library-of-small-lights",
      title: "The Library of Small Lights",
      category: "Immersive",
      excerpt:
        "An immersive tale of a library where every book is a doorway, and every reader becomes a character in someone else's story.",
      content:
        "You step into the library and the door closes behind you like a held breath.\n\nEach book on the shelf glows with a small, private light. Take one down and it opens â€” not with pages, but with a room. You walk in. You become a character. Somewhere, another reader is living the sentence you just left behind.\n\nThe library keeps no catalogue, because every visitor is the catalogue. The only rule, written in gold above the exit: be kind to the story you are given.",
      cover_image: "/covers/library-lights.svg",
      published_date: "2024-02-19",
      read_time: "8 min",
      genre: "Immersive Narrative",
      tags: ["magic", "library", "interactive"],
    },
    {
      slug: "what-the-river-kept",
      title: "What the River Kept",
      category: "Non-Fiction",
      excerpt:
        "On the Bagmati, on grief, and on the strange comfort of watching a thing carry what we cannot.",
      content:
        "The river near my grandfather's house kept everything we threw into it â€” marigolds, prayers, the occasional silence we could not name.\n\nI used to think that was a kind of loss. Now I think it was a kind of keeping. The river did not forget; it simply moved the memory downstream, where someone else might find it washed up soft and weightless on their own bank.\n\nGrief, I have decided, is a river with no mouth. We learn to live on its banks.",
      cover_image: "/covers/quiet-hours.svg",
      published_date: "2022-11-07",
      read_time: "5 min",
      genre: "Essay",
      tags: ["grief", "river", "memory"],
    },
    {
      slug: "a-recipe-for-disappearing",
      title: "A Recipe for Disappearing",
      category: "Fiction",
      excerpt:
        "Instructions, in the second person, for vanishing from a life that no longer fits â€” and the one ingredient no one mentions.",
      content:
        "Take one small apartment and empty it slowly, the way the tide takes a sandcastle â€” a mug, a postcard, a reason.\n\nAdd the silence of a phone that stops ringing. Simmer until you no longer recognize your own reflection in the window.\n\nThe recipe never tells you about the last ingredient: the person who notices. Keep them. They are the only part of the dish worth serving.",
      cover_image: "/covers/letters-monsoon.svg",
      published_date: "2023-09-30",
      read_time: "3 min",
      genre: "Flash Fiction",
      tags: ["solitude", "belonging", "warmth"],
    },
    {
      slug: "field-notes-from-the-in-between",
      title: "Field Notes from the In-Between",
      category: "Immersive",
      excerpt:
        "A walking narrative â€” read it on a phone, in a park, and let the city become the page.",
      content:
        "Look up. The building across the street has a window that has been open since March.\n\nThis is a field note from the in-between â€” the liminal hour when the working day thins and the evening has not yet arrived. Walk two blocks. Find the tree with the broken branch. That is where the story pauses.\n\nYou are the reader and the writer now. The page is the pavement. Continue, and the ending will write itself around your footsteps.",
      cover_image: "/covers/library-lights.svg",
      published_date: "2024-06-21",
      read_time: "7 min",
      genre: "Immersive Narrative",
      tags: ["urban", "walking", "liminal"],
    },
  ],
  blog: [
    {
      slug: "why-i-write-at-dawn",
      title: "Why I Write at Dawn (and You Might Too)",
      excerpt:
        "The world is quietest an hour before it expects anything of you. Here is what the dark teaches a writer.",
      content:
        "There is a particular silence at 5 a.m. that no other hour offers. The house is a held breath. The phone is innocent. The page is the only thing asking anything of you.\n\nI write at dawn because the critic is still asleep. The voice that says 'this is not good enough' wakes later, with the news and the kettle. At dawn there is only the sentence and the dark, and the dark is a kind friend.\n\nIf you have been avoiding the page, try meeting it before the world does. You may find it has been waiting for you all along.",
      category: "Writing Tips",
      featured_image: "/blog/dawn.svg",
      published_date: "2024-03-15",
      read_time: "4 min",
    },
    {
      slug: "the-courage-to-be-quiet",
      title: "The Courage to Be Quiet on the Page",
      excerpt:
        "White space is not empty. It is the room a reader needs to hear you.",
      content:
        "We are taught to fill the page. More words, more value. But the most moving sentences I know are surrounded by silence â€” a short line, then nothing, then the turn.\n\nQuiet on the page is a kind of trust. It says: I believe you are smart enough to feel this without me explaining it.\n\nTry deleting the sentence that explains the feeling. Leave the feeling. See what happens in the white space where your reader's own memory rushes in.",
      category: "Creativity",
      featured_image: "/blog/quiet.svg",
      published_date: "2024-05-02",
      read_time: "3 min",
    },
    {
      slug: "reading-the-monsoon",
      title: "Reading the Monsoon: Books That Smell of Rain",
      excerpt:
        "A small, personal shelf of books that feel like weather â€” and why we return to them.",
      content:
        "Some books you read. Some books you weather. The ones I return to all share a damp, green quality â€” the sense that the author wrote them during a long, generous rain.\n\nThere is a comfort in a book that smells of weather. It reminds you that stories, like storms, arrive from elsewhere and leave the air changed.\n\nHere is my monsoon shelf: worn paperbacks, tea-stained margins, and one novel I have never finished because finishing it would end the company.",
      category: "Book Reviews",
      featured_image: "/blog/monsoon.svg",
      published_date: "2024-06-28",
      read_time: "5 min",
    },
    {
      slug: "two-homes-one-voice",
      title: "Two Homes, One Voice",
      excerpt:
        "On writing across continents, and the strange gift of never quite belonging to one place.",
      content:
        "Belonging to two places is a kind of double vision. You see the same sunset and translate it twice â€” once into eucalyptus, once into rhododendron.\n\nFor years I thought this split was a weakness in my writing. Now I think it is the voice. The slight homesickness in every line is what makes a reader from anywhere feel at home.\n\nIf you have ever been between, write from the between. It is the most honest address you have.",
      category: "Life",
      featured_image: "/blog/homes.svg",
      published_date: "2024-08-11",
      read_time: "6 min",
    },
  ],
  testimonials: [
    {
      quote:
        "Namita wrote the story of our brand and somehow made a software company sound like a fairy tale. Our readers wept. So did we.",
      name: "Priya N.",
      role: "Founder, Lumen Labs",
      avatar: "/testimonials/priya.svg",
    },
    {
      quote:
        "I hired her to ghostwrite my mother's memoir. What came back was not a book â€” it was my mother's voice, returned to us.",
      name: "Daniel R.",
      role: "Reader & Client",
      avatar: "/testimonials/daniel.svg",
    },
    {
      quote:
        "Her workshop was the first time I ever read my own writing aloud without shame. That is a kind of magic you cannot teach.",
      name: "Mei L.",
      role: "Workshop Participant",
      avatar: "/testimonials/mei.svg",
    },
    {
      quote:
        "The immersive piece she built for our museum turned a quiet hallway into the most-visited room we have. Children refused to leave.",
      name: "Tom A.",
      role: "Curator, Perth Living Museum",
      avatar: "/testimonials/tom.svg",
    },
  ],
  contact: {
    email: "namita.writer05@gmail.com",
    phone: "+61 489 071 554",
    location: "Perth, Australia Â· Kathmandu, Nepal",
    socials: [
      { platform: "Instagram", url: "https://instagram.com/namita.writer" },
      { platform: "Goodreads", url: "https://goodreads.com/namitathapa" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/namitathapa" },
      { platform: "Substack", url: "https://namita.substack.com" },
    ],
    availability: "Currently accepting new stories â€” I usually reply within 24 hours.",
    eyebrow: "Let's write together",
    intro:
      "Whether it's a single poem or an entire immersive world, I'd love to hear about the story you're carrying. Tell me a little about it and I'll be in touch within 24 hours.",
    photo: "/author/namita.svg",
  },
};
