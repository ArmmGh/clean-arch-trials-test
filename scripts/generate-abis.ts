import * as fs from 'fs'
import * as path from 'path'

// Configure these paths according to your project structure
const ARTIFACTS_DIR = '../core/artifacts/contracts'
const WEBSITE_ABI_DIR = './src/abi'

// Helper function to convert contract name to kebab case for the output file
const toKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// Helper function to convert contract name to camelCase
const toCamelCase = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

function copyABIs() {
  if (!fs.existsSync(WEBSITE_ABI_DIR)) {
    fs.mkdirSync(WEBSITE_ABI_DIR, { recursive: true })
  }

  // Get all items in the artifacts/contracts directory
  const items = fs.readdirSync(ARTIFACTS_DIR)

  items.forEach((item) => {
    const fullPath = path.join(ARTIFACTS_DIR, item)
    const stat = fs.statSync(fullPath)

    // Only process directories that end with .sol
    if (stat.isDirectory() && item.endsWith('.sol')) {
      const jsonFiles = fs.readdirSync(fullPath)
      const mainArtifact = jsonFiles.find((f) => f.endsWith('.json') && !f.endsWith('.dbg.json'))

      if (mainArtifact) {
        const artifactPath = path.join(fullPath, mainArtifact)
        const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'))

        if (artifact._format === 'hh-sol-artifact-1' && artifact.abi) {
          // Get contract name and create output filename
          const contractName = artifact.contractName
          const outputFileName = `${toKebabCase(contractName)}-abi.ts`
          const exportName = `${toCamelCase(contractName)}Abi`
          const outputPath = path.join(WEBSITE_ABI_DIR, outputFileName)

          // Create the TypeScript content
          const tsContent = `export const ${exportName} = ${JSON.stringify(artifact.abi, null, 2)} as const;\n`

          // Write the TypeScript file
          fs.writeFileSync(outputPath, tsContent)

          console.log(`✓ Generated ${outputFileName}`)
        }
      }
    }
  })

  console.log('\nABI generation complete!')
}

// Run the script
try {
  copyABIs()
} catch (error) {
  console.error('Error generating ABIs:', error)
  process.exit(1)
}
