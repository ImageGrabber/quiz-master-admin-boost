// Debug frontend session code generation
// This will help us see what's actually being generated

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
  let attempts = 0;
  const maxAttempts = 10;

  // Simulate the uniqueness check (we'll skip the actual DB check for testing)
  while (attempts < maxAttempts) {
    // In real app, this would check the database
    // For testing, we'll just generate a new code
    code = generateCode();
    attempts++;
  }

  // Fallback: use timestamp-based code if we can't find a unique random one
  // Ensure exactly 8 characters by taking the last 8 characters
  const timestampCode = Date.now().toString(36).toUpperCase();
  return timestampCode.slice(-8).padStart(8, '0');
}

console.log('Testing frontend session code generation:');
for (let i = 0; i < 10; i++) {
  const code = generateSessionCode();
  console.log(`Code ${i + 1}: "${code}" (Length: ${code.length})`);
}

// Test the timestamp fallback specifically
console.log('\nTesting timestamp fallback:');
for (let i = 0; i < 5; i++) {
  const timestampCode = Date.now().toString(36).toUpperCase();
  const result = timestampCode.slice(-8).padStart(8, '0');
  console.log(`Timestamp: ${timestampCode} -> Result: "${result}" (Length: ${result.length})`);
}
