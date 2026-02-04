# How to Deploy to GitHub Pages

1. **Create a GitHub Repository**: Create a new repository on GitHub (e.g., `my-blog`).
2. **Push Code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YourUsername/my-blog.git
   git push -u origin main
   ```
3. **Configure Settings**:
   - Go to your Repository **Settings** > **Pages**.
   - Under **Build and deployment**, select **GitHub Actions**.
   - The workflow created in `.github/workflows/jekyll.yml` will automatically pick this up.

## Configuration
Edit `_config.yml` to match your URL:
- **baseurl**: If your site is at `username.github.io/my-blog`, set this to `/my-blog`. If it is at `username.github.io`, set this to `""` (empty string).
- **url**: Set this to `https://username.github.io`.

## Local Development
(See previous instructions for Docker/Ruby)
