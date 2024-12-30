const fs = require('fs');
const path = require('path');

function createFolderStructure(input, baseDir = '.') {
  const parts = input.split('>');
  let currentPaths = [baseDir];

  parts.forEach(part => {
    const match = part.match(/^([a-zA-Z0-9+_-]+)(\*(\d+))?$/); 
    if (match) {
      const folderGroup = match[1]; 
      const repeatCount = match[3] ? parseInt(match[3]) : 1;

      const newPaths = [];

      currentPaths.forEach(parentPath => {
        for (let i = 0; i < repeatCount; i++) {
          const siblingFolders = folderGroup.split('+');

          siblingFolders.forEach(sibling => {
            const folderName = repeatCount > 1 ? `${sibling}_${i + 1}` : sibling;
            const folderPath = path.join(parentPath, folderName);

            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Created: ${folderPath}`);
            newPaths.push(folderPath); 
          });
        }
      });

      currentPaths = newPaths;
    }
  });
}


const emmetInput = 'folder1>subfolder2*3>subsubfolder+Minhaj';
createFolderStructure(emmetInput);
