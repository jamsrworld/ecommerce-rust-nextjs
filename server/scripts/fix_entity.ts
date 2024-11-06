import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import path from "path";

async function main() {
  console.log("fixing all files in folder..");

  const targetFolder = path.resolve(__dirname, "../db/live_entity/src"); // Adjust the folder path as needed
  const files = getAllFiles(targetFolder, ".rs"); // Collect all .ts files
  console.log(`Fixing... ${files.length} files found`);
  files.forEach((file) => {
    const data = readFileSync(file, "utf8");
    const lines = data.split("\n");
    const newLines = lines.map((line) => {
      // replace date type
      if (line.includes("DateTimeWithTimeZone")) {
        return line.replace(
          "DateTimeWithTimeZone",
          `chrono::DateTime<chrono::FixedOffset>`
        );
      }
      // replace schema with name
      const fileNameInPascalCase = path
        .basename(file)
        .replace(".rs", "")
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
      if (line.includes("pub struct Model")) {
        return `#[schema(as = ${fileNameInPascalCase})]\n${line}`;
      }
      return line;
    });

    writeFileSync(file, newLines.join("\n"));
  });
  console.log(`Fix succeeded`);
}

// Helper function to recursively get all files in a directory
function getAllFiles(
  dirPath: string,
  fileExtension: string,
  arrayOfFiles: string[] = []
) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, fileExtension, arrayOfFiles);
    } else if (file.endsWith(fileExtension)) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

main();
