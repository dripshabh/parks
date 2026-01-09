// Utility to test backend connection through proxy
export async function testBackendConnection() {
  try {
    // Test through the proxy using a simple GET endpoint
    const response = await fetch('/api/parks', {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connection successful through proxy. Found', data.length, 'parks');
      return true;
    } else {
      const errorText = await response.text();
      console.error('❌ Backend responded with error:', response.status, errorText);
      return false;
    }
  } catch (err) {
    console.error('❌ Cannot connect to backend through proxy:', err);
    console.error('Error details:', err.message);
    console.error('Make sure:');
    console.error('  1. Backend is running: cd backend && uvicorn app.main:app --reload --port 8000');
    console.error('  2. Frontend dev server is running: npm run dev');
    console.error('  3. Vite proxy is configured in vite.config.js');
    return false;
  }
}

