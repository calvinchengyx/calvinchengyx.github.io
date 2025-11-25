Deployment Guide for calvinchengyx.github.io

Since you are managing this locally in a folder named calvinchengyx.github.io, we will turn that folder into a modern React application powered by Vite.

Phase 1: Local Setup

1. Backup your existing site
Before deleting anything, make a copy of your current folder contents to a safe place (e.g., a _backup folder on your desktop), just in case you want to reference old files later.

2. Clean the folder
Delete the old files in your calvinchengyx.github.io folder (except the .git folder if it exists, to keep your git history linked).

3. Initialize the Project
Open your terminal/command prompt inside the calvinchengyx.github.io folder and run:

# Initialize a new React project with TypeScript
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install the specific libraries we used in your code
npm install lucide-react

# Install and initialize Tailwind CSS (We specify version 3 for compatibility)
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p


Troubleshooting: If you previously installed Tailwind without the @3 tag, you might have version 4, which causes the "could not determine executable" error. Run npm uninstall tailwindcss first, then run the command above with tailwindcss@3.

4. Configure Tailwind

Open the newly created tailwind.config.js and replace its content with the configuration provided previously (the one defining content paths, theme, and plugins).

Open src/index.css and replace its entire content with these three lines:

@tailwind base;
@tailwind components;
@tailwind utilities;


5. Add Your Code

Open src/App.tsx.

Paste the entire code for the React application into src/App.tsx.

Delete src/App.css (we don't need it as we use Tailwind).

6. Add Your Photo

Take your calvin_linkedin.jpg file.

Place it inside the public/ folder in your project root.

Note: In the code, the image src is set to "calvin_linkedin.jpg". Files in the public folder are served at the root URL, so this will work automatically.

7. Test Locally
Run this command to check if it works on your computer:

npm run dev


Open the localhost link provided to verify the site looks correct.

Phase 2: Deployment to GitHub

We will use the gh-pages package to automate deployment. This keeps your source code in the main branch and your built website in a separate gh-pages branch.

1. Install Deploy Tool
In your terminal, run:

npm install gh-pages --save-dev


2. Update package.json
Open your package.json file.

Add a homepage field at the top level.

Add a deploy script and a predeploy script in the "scripts" section.

It should look roughly like this (focus on the added lines):

{
  "name": "calvinchengyx.github.io",
  "private": true,
  "version": "0.0.0",
  "homepage": "[https://calvinchengyx.github.io/](https://calvinchengyx.github.io/)", 
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "predeploy": "npm run build", 
    "deploy": "gh-pages -d dist" 
  },
  ...
}


3. Push Source Code to GitHub (and re-link if needed)
If git status failed previously, run the git setup commands again:

git init
git remote add origin [https://github.com/calvinchengyx/calvinchengyx.github.io.git](https://github.com/calvinchengyx/calvinchengyx.github.io.git)


Then commit and push your source code:

git add .
git commit -m "Setup React website"
git push origin main


4. Deploy!
Run this command to build the site and send it to GitHub:

npm run deploy


Phase 3: Configure GitHub Settings

Go to your repository page on GitHub (https://github.com/calvinchengyx/calvinchengyx.github.io).

Click Settings > Pages (in the left sidebar).

Under Build and deployment > Source, ensure "Deploy from a branch" is selected.

Under Branch, select gh-pages as the branch and / (root) as the folder.

Click Save.

Wait about 1-2 minutes for the site to go live.

Phase 4: Ongoing Maintenance

This section details the steps for making changes to your live website after the initial setup.

1. Updating Content (News, Publications, etc.)

All your content is stored directly within the main component file.

Open src/App.tsx.

Scroll down to the data blocks near the top of the file, marked with comments like: // *** UPDATE INSTRUCTIONS: NEWS ***.

Modify the arrays (NEWS_DATA, PUBLICATIONS_DATA, AWARD_DATA, etc.) directly.

2. Configuring the Resume PDF Download

To make the "PDF" button on the Resume page download your CV:

Ensure your CV file (cv_cheng.pdf) is placed inside the public/ folder of your local project.

Open src/App.tsx.

Find the button element for the PDF download within the <ResumeSection> component and ensure its onClick handler is set to the correct path, which is relative to the public folder:

// Ensure the button looks like this:
<button 
    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
    onClick={() => window.open('/cv_cheng.pdf', '_blank')} 
>
    <Download size={16} /> PDF
</button>


3. Deploying Maintenance Changes

After saving any local changes (content, PDF link, etc.):

Stage and Commit your source code changes (optional, but highly recommended):

git add .
git commit -m "Updated content and pushed source changes" 
git push origin main


Build and Deploy the final static website:

npm run deploy


This command rebuilds the dist folder and pushes the new files to the gh-pages branch, updating your live site.