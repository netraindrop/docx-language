const regexSyntax = [
  // Logging
  [/Logging\((.*)\)/g, "console.log($1)"],

  // Type Checking
  [/TypeData\((.*)\)/g, "typeof $1"],

  // Variable & Constant
  [/variable\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^\[\]\(\)\n]+)/g, "var $1 = $2"],
  [/constan\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^\[\]\(\)\n]+)/g, "const $1 = $2"],

  // Conditions
  [/if\s+([^{\n]+)\s*\{/g, "if ($1) {"],
  [/ifels\s+([^{\n]+)\s*\{/g, "else if ($1) {"],
  [/els\s*\{/g, "else {"],

  // Break & Continue
  [/\bstop;/g, "break;"],
  [/\bnext;/g, "continue;"],

  // Import
  [/import\s+([a-zA-Z0-9_]+)\s+contain\s+\{([^}]+)\}/g, "const { $2 } = require('$1')"],
  [/import\s+([a-zA-Z0-9_]+)\s+as\s+([a-zA-Z0-9_]+)/g, "const $2 = require('$1')"],
  [/import\s+([a-zA-Z0-9_]+)/g, "const $1 = require('$1')"],

  // Export
  [/export\s+\{\s*([a-zA-Z0-9_,\s]+)\}/g, "module.exports = { $1 }"],
  [/export\s+([a-zA-Z0-9_]+)/g, "module.exports = $1"],

  // Function
  [/func\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g, "function $1($2) {"],
  [/func\s+asy\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g, "async function $1($2) {"],

  // Sleep
  [/sleep\((\d+)\)/g, "await new Promise(r => setTimeout(r, $1))"],

  // Try & Except
  [/try\s*\{/g, "try {"],
  [/except\s+([a-zA-Z_][a-zA-Z0-9_]*)?\s*\{/g, "catch($1) {"]
]

function RegexDocxToNative(text) {
  let dataResource = text.replace(/“|”/g, '"').replace(/’/g, "'")

  for(let [regexCode, content] of regexSyntax) {
    dataResource = dataResource.replace(regexCode, content)
  }

  return dataResource
}

module.exports = RegexDocxToNative