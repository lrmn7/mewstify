import fs from "node:fs";
import fse from "fs-extra";

const { copySync } = fse;

const srcDir = "./src/languages/";
const destDir = "./dist/languages/";

// To copy a folder or file, select overwrite accordingly
try {
  // Copy language package from "src" directory
  copySync(srcDir, destDir, { overwrite: true });
  console.log('Copied language from "src" directory successfully!');

  // Copy manifest from "src" directory
  fs.copyFile("./src/mewwme.xml", "./dist/mewwme.xml", (err) => {
    if (err) {
      console.error("Error Found:", err);
    } else {
      console.log('Copied mewwme.xml from "src" directory successfully!');
    }
  });
} catch (err) {
  console.error(err);
}
