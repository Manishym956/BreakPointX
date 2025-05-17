// server.js (ES Module syntax)
import { server } from './backend-service.js';

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Interactive Code Debugger backend running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log('WebSocket server running at ws://localhost:3001');
  console.log('Press Ctrl+C to stop the server');
});