import Gun from "gun/gun";
import "gun/sea"; // Optional, for cryptographic features

const gun = Gun({
  peers: ["http://localhost:8765/gun"] // Replace with your Gun.js server URL if different
});

export default gun;
