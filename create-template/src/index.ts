import * as fs from 'fs';
import * as path from 'path';

interface ProjectFile {
  filePath: string;
  content: string;
}

interface ProjectStructure {
  files: ProjectFile[];
}

/**
 * Recursively scans directory for files matching extensions
 */
function scanDirectory(
  directory: string, 
  extensions: string[] = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.html'],
  ignore: string[] = ['node_modules', '.git', '.next', 'out', 'dist', 'build', 'package-lock.json', '.gitignore']
): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(directory)) {
    console.error(`Directory does not exist: ${directory}`);
    return files;
  }

  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    // Skip specific files like package-lock.json
    if (ignore.includes(item)) {
      continue;
    }
    
    const itemPath = path.join(directory, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    
    if (isDirectory) {
      // Recursively scan subdirectories
      const subFiles = scanDirectory(itemPath, extensions, ignore);
      files.push(...subFiles);
    } else {
        files.push(itemPath);
    }
  }
  
  return files;
}

/**
 * Reads the content of all files
 */
function readProjectFiles(filePaths: string[]): ProjectFile[] {
  return filePaths.map(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      // Convert absolute paths to relative for better portability
      const relativePath = path.relative(process.cwd(), filePath);
      return {
        filePath: relativePath.replace(/\\/g, '/'), // Normalize path separators
        content
      };
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return {
        filePath,
        content: '// Error reading file'
      };
    }
  });
}

/**
 * Generates the export statement
 */
function generateExport(projectStructure: ProjectStructure): string {
  const boltActions = projectStructure.files.map(file => {
    return `<boltAction type="file" filePath="${file.filePath}">${file.content}</boltAction>`;
  }).join('\n');
  
  // Add installation and dev commands
  const shellCommands = `<boltAction type="shell">
npm install

</boltAction>
<boltAction type="shell">
npm run dev
</boltAction>`;

  return `export const baseReactPrompt = \`<boltArtifact id="project-import" title="Project Files">${boltActions}
${shellCommands}
</boltArtifact>\`;`;
}

/**
 * Main function to analyze a Next.js project
 */
function analyzeNextJsProject(projectPath: string): void {
  console.log(`Analyzing Next.js project at: ${projectPath}`);
  
  try {
    // Scan project directory
    const filePaths = scanDirectory(projectPath);
    console.log(`Found ${filePaths.length} relevant files`);
    
    // Read file contents
    const projectFiles = readProjectFiles(filePaths);
    
    // Generate export statement
    const projectStructure: ProjectStructure = {
      files: projectFiles
    };
    
    const exportStatement = generateExport(projectStructure);
    
    // Write the result to a file
    const outputPath = path.join(process.cwd(), 'project-export.ts');
    fs.writeFileSync(outputPath, exportStatement);
    
    console.log(`Export statement successfully written to: ${outputPath}`);
  } catch (error) {
    console.error('Error analyzing project:', error);
  }
}

const projectPath = '/home/sahil/coding/nextJSTemplate/my-app'

// Run the analyzer
analyzeNextJsProject(projectPath);