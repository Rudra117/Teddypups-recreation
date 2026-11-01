const { execSync } = require('child_process');
const path = require('path');
const videoDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\videos';
const outDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\video_frames';

const vids = [
  'Recording 2026-11-01 124019.mp4',
  'Recording 2026-11-01 124100.mp4',
  'Recording 2026-11-01 124241.mp4',
  'Recording 2026-11-01 124339.mp4',
  'Recording 2026-11-01 124506.mp4'
];

for (let i = 0; i < vids.length; i++) {
  const f = vids[i];
  [0.1, 0.5, 1.0].forEach(t => {
    const out = path.join(outDir, `intro_v${i+1}_${t}s.jpg`);
    try {
      execSync(`ffmpeg -y -ss ${t} -i "${path.join(videoDir, f)}" -vframes 1 -q:v 2 "${out}"`, { stdio: 'ignore' });
      console.log(`Saved intro_v${i+1}_${t}s.jpg`);
    } catch (e) {
      console.error(e.message);
    }
  });
}
console.log('Intro extraction complete.');
