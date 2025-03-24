import fs from 'fs';
import path from 'path';

export const loadLocalMarkdown = (filePath: string) => {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return fileContents;
  } catch (error: any) {
    console.error(`Error reading Markdown file: ${error.message}`);
    return ''; // 或者你可以抛出一个错误，让调用者处理
  }
};
