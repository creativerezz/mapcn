import fs from "fs";
import path from "path";

const EXAMPLES_DIR = path.join(
  process.cwd(),
  "src/app/docs/_components/examples"
);

export function getExampleSource(filename: string): string {
  const filePath = path.join(EXAMPLES_DIR, filename);
  
  try {
    const source = fs.readFileSync(filePath, "utf-8");
    
    // Clean up the source for display:
    return source.replace(/@\/registry\/map/g, "@/components/ui/map");
  } catch (error) {
    console.error(`Failed to read example file: ${filePath}`, error);
    throw new Error(`Could not load example: ${filename}`);
  }
}
