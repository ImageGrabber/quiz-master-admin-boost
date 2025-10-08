#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Vercel SEO build process...');

try {
  // Step 1: Generate sitemap
  console.log('📋 Generating sitemap...');
  execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
  
  // Step 2: Build with Vite
  console.log('⚡ Building with Vite...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Step 3: Pre-render with react-snap (optional, may fail in some environments)
  console.log('🔄 Pre-rendering pages...');
  try {
    execSync('react-snap', { stdio: 'inherit' });
    console.log('✅ Pre-rendering completed');
  } catch (error) {
    console.log('⚠️  Pre-rendering failed, continuing with static generation...');
    console.log('This is normal in some deployment environments');
  }
  
  // Step 4: Generate static fallbacks
  console.log('📄 Generating static fallbacks...');
  execSync('node scripts/generate-static-pages.js', { stdio: 'inherit' });
  
  // Step 5: Verify build output
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
  
  console.log('🎉 SEO build process completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
