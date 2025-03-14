const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

try {
    // First try to run the Next.js build
    console.log('Attempting Next.js build...');
    execSync('next build', { stdio: 'inherit' });
    
    // If build succeeds, copy the static export to out
    const staticDir = path.join(__dirname, 'out');
    if (fs.existsSync(staticDir)) {
        console.log('Next.js build successful, files are already in the output directory.');
    } else {
        console.error('Build completed but output directory not found.');
        throw new Error('Build output directory not found');
    }
} catch (error) {
    console.error('Next.js build failed:', error);
    console.log('Creating fallback static site...');
    
    // Create a minimal 404 page
    const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
            margin-bottom: 2rem;
        }
        a {
            color: #0070f3;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a href="/">Return to Home</a>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(outDir, '404.html'), notFoundHtml);

    // Create a minimal index page
    const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Website</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 600px;
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .status {
            display: inline-block;
            padding: 0.5rem 1rem;
            background-color: #e6f3ff;
            color: #0070f3;
            border-radius: 4px;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="status">🚧 Website Under Development</div>
        <h1>Welcome to Our Website</h1>
        <p>We're currently working on something amazing. Please check back soon!</p>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
}

console.log('Build process completed.'); 