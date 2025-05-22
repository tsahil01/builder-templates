"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Recursively scans directory for files matching extensions
 */
function scanDirectory(directory, extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.html', '.md'], ignore = ['node_modules', '.git', '.next', 'out', 'dist', 'build', 'package-lock.json', '.gitignore', 'tsconfig.tsbuildinfo', 'README.md', 'favicon.ico', 'file.svg', 'ui']) {
    const files = [];
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
        }
        else {
            files.push(itemPath);
        }
    }
    return files;
}
/**
 * Reads the content of all files
 */
function readProjectFiles(filePaths) {
    return filePaths.map(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            // We dont need relative paths for the files
            const relativePath = path.relative(path.join(__dirname, '../'), filePath);
            return {
                filePath: relativePath.replace(/\\/g, '/'), // Normalize path separators
                content
            };
        }
        catch (error) {
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
function generateExport(projectStructure) {
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
    return `export const basePrompt = \`<boltArtifact id="project-import" title="React + ShadCN + Framer Motion Project">${boltActions}
${shellCommands}
</boltArtifact>\`;`;
}
/**
 * Main function to analyze a Next.js project
 */
function analyzeNextJsProject(projectPath) {
    console.log(`Analyzing Next.js project at: ${projectPath}`);
    try {
        // Scan project directory
        const filePaths = scanDirectory(projectPath);
        console.log(`Found ${filePaths.length} relevant files`);
        // Read file contents
        const projectFiles = readProjectFiles(filePaths);
        // Generate export statement
        const projectStructure = {
            files: projectFiles
        };
        const exportStatement = generateExport(projectStructure);
        // Write the result to a file
        const outputPath = path.join("../results", 'exportStatement.js');
        fs.writeFileSync(outputPath, exportStatement);
        console.log(`Export statement successfully written to: ${outputPath}`);
    }
    catch (error) {
        console.error('Error analyzing project:', error);
    }
}
const projectPath = '../next-js';
// Run the analyzer
analyzeNextJsProject(projectPath);
