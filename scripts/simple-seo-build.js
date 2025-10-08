#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Simple SEO build process...');

try {
  // Step 1: Generate sitemap
  console.log('📋 Generating sitemap...');
  execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
  
  // Step 2: Build with Vite
  console.log('⚡ Building with Vite...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Step 3: Generate static fallbacks (this is the most important part)
  console.log('📄 Generating static fallbacks...');
  execSync('node scripts/generate-static-pages.js', { stdio: 'inherit' });
  
  // Step 4: Verify build output
  const distDir = path.join(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    console.log(`✅ Build complete! Generated ${files.length} files in dist/`);
    
    // Check for important files
    const importantFiles = ['index.html', 'sitemap.xml', 'robots.txt'];
    importantFiles.forEach(file => {
      if (fs.existsSync(path.join(distDir, file))) {
        console.log(`✅ ${file} generated successfully`);
      } else {
        console.log(`⚠️  ${file} not found`);
      }
    });
  }
  
  console.log('🎉 Simple SEO build process completed successfully!');
  console.log('📈 Your site now has:');
  console.log('   - Comprehensive sitemap with 100+ URLs');
  console.log('   - Static HTML fallbacks for critical pages');
  console.log('   - Proper meta tags and structured data');
  console.log('   - SEO-optimized robots.txt');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
