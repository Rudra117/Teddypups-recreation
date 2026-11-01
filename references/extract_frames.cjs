const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videoDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\videos';
const outDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\video_frames';

const tasks = [
  { file: 'Recording 2026-11-01 124019.mp4', prefix: 'vid1_124019', times: [1, 3, 5, 8, 11, 14] },
  { file: 'Recording 2026-11-01 124100.mp4', prefix: 'vid2_124100', times: [1, 3, 6, 9, 12, 14] },
  { file: 'Recording 2026-11-01 124241.mp4', prefix: 'vid3_124241', times: [1, 3, 5, 8, 10, 12] },
  { file: 'Recording 2026-11-01 124339.mp4', prefix: 'vid4_124339', times: [1, 4, 8, 12, 16, 20, 22] },
  { file: 'Recording 2026-11-01 124506.mp4', prefix: 'vid5_124506', times: [1, 5, 10, 15, 20, 25, 30, 35, 38] },
  { file: 'Recording_124339_compressed (1).mp4', prefix: 'vid6_compressed', times: [2, 10, 18] },
  { file: 'Recording_124506_compressed.mp4', prefix: 'vid7_compressed', times: [2, 15, 28] }
];

for (const t of tasks) {
  const vPath = path.join(videoDir, t.file);
  console.log(`Extracting frames from: ${t.file}...`);
  for (const sec of t.times) {
    const outImg = path.join(outDir, `${t.prefix}_t${sec.toString().padStart(2, '0')}.jpg`);
    const cmd = `ffmpeg -y -ss ${sec} -i "${vPath}" -vframes 1 -q:v 2 "${outImg}"`;
    try {
      execSync(cmd, { stdio: 'ignore' });
      console.log(`  Saved ${path.basename(outImg)}`);
    } catch (e) {
      console.error(`  Error at ${sec}s for ${t.file}:`, e.message);
    }
  }
}
console.log('Frame extraction complete.');
