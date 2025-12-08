import SNL from '../assets/lyrics/snl.lrc?raw';

// Function to parse LRC format
const parseLRC = (lrcText) => {
  const lines = lrcText.split('\n');
  const lyrics = [];
  
  lines.forEach(line => {
    // Updated regex to handle 2 or 3 digit milliseconds
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      // Adjust for 3-digit milliseconds
      const time = minutes * 60 + seconds + (match[3].length === 3 ? milliseconds / 1000 : milliseconds / 100);
      const text = match[4].trim();
      
      if (text) {
        lyrics.push({ time, text });
      }
    }
  });
  
  return lyrics;
};

const lyrics = {
  1: parseLRC(SNL),
};

export default lyrics;