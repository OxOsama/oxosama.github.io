export interface Post {
    id: string; // The permalink/URL from Jekyll
    title: string;
    description: string;
    date: string;
    readTime: string;
    tags: string[];
    category: string;
    imageUrl?: string;
    content: string; // HTML content from Jekyll
}

export interface TimelineItem {
    year: string;
    role: string;
    company: string;
    description: string;
}

export interface Skill {
    name: string;
    color: string;
}
