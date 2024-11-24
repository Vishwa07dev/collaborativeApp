const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let drawing = false;

// Handle mouse events
canvas.addEventListener('mousedown', () => {
    drawing = true;
    ctx.beginPath(); // Start a new path
  });
  
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath(); // Close the current path
  });
  
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
  
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';
  
    ctx.lineTo(x, y);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(x, y);
  
    // Emit drawing data to the server
    socket.emit('drawing', { x, y });
  });
  
  // Socket.IO integration
const socket = io();
  
  // Listen for drawing events from other users
socket.on('drawing', (data) => {
    const { x, y } = data;
  
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
  
    ctx.lineTo(x, y);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(x, y);
  });