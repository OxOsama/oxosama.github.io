import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { glob } from 'glob';
import { format } from 'date-fns';

const POSTS_DIR = path.join(process.cwd(), '_posts');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'api');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'posts.json');

// Ensure output directory exists
fs.ensureDirSync(OUTPUT_DIR);

async function generatePosts() {
    console.log('🔍 Scanning for blog posts...');
    
    // Find all markdown files in nested folders
    const files = await glob('**/*.md', { cwd: POSTS_DIR });
    
    const posts = await Promise.all(files.map(async (file) => {
        const filePath = path.join(POSTS_DIR, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Parse date from filename (YYYY-MM-DD-title.md) if not in frontmatter
        const filename = path.basename(file);
        const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
        const dateString = data.date ? new Date(data.date) : (dateMatch ? new Date(dateMatch[1]) : new Date());

        // Calculate read time
        const words = content.split(/\s+/).length;
        const readTimeMinutes = Math.ceil(words / 180);

        // Convert Markdown to HTML
        const htmlContent = marked.parse(content);

        // Construct ID (permalink) similar to Jekyll: /year/month/day/title/
        // Or simpler: /posts/title-slug
        // For compatibility with React Router, let's use the filename slug or data.permalink
        let rawSlug = filename.replace(/^(\d{4}-\d{2}-\d{2})-/, '').replace(/.md$/, '');
        // Normalize slug: lowercase, replace spaces with dashes, ensure URL friendliness
        const slug = rawSlug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        
        const id = `/post/${slug}`;
        
        // Extract first image for thumbnail if not provided
        let imageUrl = data.image || data.imageUrl;
        if (!imageUrl) {
            const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
            if (imgMatch) imageUrl = imgMatch[1];
        }

        // Helper to normalize category
        let category = data.categories || data.category || 'General';
        if (Array.isArray(category)) {
            category = category.length > 0 ? category[0] : 'General';
        }

        // Auto-tag based on folder structure
        let tags = data.tags || [];
        const relativeFolder = path.dirname(file);
        
        // Add CTF tag for CTF folder
        if (relativeFolder.includes('CTF') || relativeFolder.includes('Write-Up')) {
            if (!tags.includes('CTF')) tags.push('CTF');
            if (category === 'General' || category === 'Write-Ups') category = 'CTF Writeups';
        }
        
        // Add Malware tag for RE folders
        if (relativeFolder.includes('reverse-engineering') || relativeFolder.includes('Tutorials-Labs')) {
             if (!tags.includes('Malware')) tags.push('Malware');
        }

        return {
            id: id, // Route to navigate to
            slug: slug,
            title: data.title || slug,
            description: data.description || data.excerpt || content.substring(0, 150) + '...',
            date: format(dateString, 'MMMM d, yyyy'),
            readTime: `${readTimeMinutes} min read`,
            tags: tags,
            category: String(category),
            imageUrl: imageUrl,
            content: htmlContent // The full HTML content
        };
    }));

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`✅ Generated API for ${posts.length} posts at ${OUTPUT_FILE}`);
}

generatePosts().catch(console.error);
