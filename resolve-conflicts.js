const fs = require("fs");
const path = require("path");

const IGNORE_DIRS = ["node_modules", ".git", "dist", "build"]; // ignore these

function resolveConflictsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  const conflictRegex = /<<<<<<< HEAD\s([\s\S]*?)=======([\s\S]*?)>>>>>>> [^\n]+\n?/g;

  if (conflictRegex.test(content)) {
    content = content.replace(conflictRegex, (match, headPart) => {
      return headPart.trimEnd();
    });

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Conflicts resolved in: ${filePath}`);
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (IGNORE_DIRS.includes(file)) continue; // skip ignored dirs

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath); // recursive scan
    } else if (/\.(js|jsx)$/.test(file)) {
      resolveConflictsInFile(fullPath);
    }
  }
}

// Run in current working directory
scanDirectory(process.cwd());
console.log("🚀 All conflicts resolved (HEAD kept, incoming removed)!");
