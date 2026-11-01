const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\video_frames';

// We can analyze the average color or check frame filenames
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && f.includes('_sec'));
console.log('Total frames:', files.length);

// Let's list some key frames from each video
['vid1', 'vid2', 'vid3', 'vid4', 'vid5'].forEach(v => {
  const vFiles = files.filter(f => f.startsWith(v));
  console.log(`${v}: ${vFiles.length} frames (${vFiles[0]} .. ${vFiles[vFiles.length - 1]})`);
});
