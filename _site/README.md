# How to Run the Blog

## Option 1: Using Docker (Recommended)
1. Ensure **Docker Desktop** is running.
2. Open a terminal in this directory.
3. Run:
   ```powershell
   docker-compose up
   ```
4. Open your browser to [http://localhost:4000](http://localhost:4000).

## Option 2: Using Ruby (Native)
1. Install **Ruby+Devkit** from [rubyinstaller.org](https://rubyinstaller.org/downloads/).
2. Open a new terminal.
3. Install Jekyll and Bundler:
   ```powershell
   gem install jekyll bundler
   ```
4. Install dependencies:
   ```powershell
   bundle install
   ```
5. Run the server:
   ```powershell
   bundle exec jekyll serve
   ```
6. Open your browser to [http://localhost:4000](http://localhost:4000).
