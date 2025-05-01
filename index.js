#!/usr/bin/env node
const vm = require('vm')
const fs = require('fs')
const Readscript = require('./lib/parse')

const isolationJS = (path) => {
  const readscript = Readscript(path)
  vm.runInThisContext(readscript)
}

const fileExecuteable = process.argv.pop()

if(fileExecuteable.split(".").pop() !== "docx") {
  throw new Error("Only docx extension to running this!")
}
if(!fs.existsSync(fileExecuteable)) {
  throw new Error("This file has not found!")
}
if(!fs.lstatSync(fileExecuteable).isFile()) {
  throw new Error("This path is not file docs!")
}

isolationJS(fileExecuteable)