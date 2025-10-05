// Test script to verify 8-character session code generation
// This simulates the frontend code generation

function generateSessionCode() {
  const generateCode = () => {
    // Generate exactly 8 characters using a more reliable method
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  let code = generateCode();
  return code;
}

// Test the generation
console.log('Testing 8-character session code generation:');
for (let i = 0; i < 10; i++) {
  const code = generateSessionCode();
  console.log(`Code ${i + 1}: ${code} (Length: ${code.length})`);
}

// Test the fallback method
function generateFallbackCode() {
  const timestampCode = Date.now().toString(36).toUpperCase();
  return timestampCode.slice(-8).padStart(8, '0');
}

console.log('\nTesting fallback method:');
for (let i = 0; i < 5; i++) {
  const code = generateFallbackCode();
  console.log(`Fallback ${i + 1}: ${code} (Length: ${code.length})`);
}

console.log('\n✅ All codes should be exactly 8 characters!');
