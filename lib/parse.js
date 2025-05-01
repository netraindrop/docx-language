const AdmZip = require("adm-zip")
const RegexDocxToNative = require("./regex")

function Readscript(pathscript) {
  const zip = new AdmZip(pathscript)
  const xmlEntry = zip.getEntry("word/document.xml")
  const xmlText = xmlEntry.getData().toString("utf-8")
  
  const paragraphsParse = [...xmlText.matchAll(/<w:p[\s\S]*?<\/w:p>/g)]
  
  const decodeEntities = (text) => {
    return text
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, "\"")
      .replace(/&#39;/g, "'")
  }
  const cleanParagrapExtract = (text) => {
    return text
      .split("\n").map(line => {
        let inString = false
        let quoteChar = ''
        let clean = ''
        for (let i = 0; i < line.length; i++) {
          const char = line[i]
          if (!inString && (char === '"' || char === "'")) {
            inString = true
            quoteChar = char
            clean += char
          } else if (inString && char === quoteChar) {
            inString = false
            quoteChar = ''
            clean += char
          } else if (!inString && char === '#' && (i === 0 || line[i - 1] !== '\\')) {
            break
          } else {
            clean += char
          }
        }
        return clean.trimEnd()
      }).join("\n")
      .replace(/}\s*(?=\S)/g, "} \n")
      .replace(/;(?=\S)/g, "; ")
      .replace(/##\s*(.+)/g, "\n\n## $1\n")
      .trim()
      .replace(/\n{3,}/g, "\n\n")
      // Fixed Bracket
      .replace(/([)}])\n(?=\s*[)}])/g, "$1\n")
      .replace(/([)}])\n(?=\s*[^{}#\n])/g, "$1")
  }
  
  const paragraphsResult = paragraphsParse.map(p => {
    const textMatches = [...p[0].matchAll(/<w:t[^>]*>(.*?)<\/w:t>/g)]
    return textMatches.map(t => decodeEntities(t[1])).join("")
  }).join("\n")
  
  const cleanningText = cleanParagrapExtract(paragraphsResult)
  const parseIntoNativeScript = RegexDocxToNative(cleanningText)

  return parseIntoNativeScript
}

module.exports = Readscript