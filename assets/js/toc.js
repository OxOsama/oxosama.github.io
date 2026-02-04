document.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.getElementById("toc-content");
    const contentContainer = document.querySelector("article");

    if (!tocContainer || !contentContainer) return;

    const headings = contentContainer.querySelectorAll("h2, h3");
    
    if (headings.length === 0) return;

    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;

        const link = document.createElement("a");
        link.href = `#${id}`;
        link.className = "group flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors cursor-pointer py-1";
        
        // Add smooth scrolling
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });

        // Highlight active link functionality could be added here using IntersectionObserver

        const spanTitle = document.createElement("span");
        spanTitle.textContent = heading.textContent.replace('#', '').trim(); // Remove leading # if present in text
        link.appendChild(spanTitle);

        if (heading.tagName === "H3") {
            link.style.paddingLeft = "1rem";
        }

        tocContainer.appendChild(link);
    });
});
