
import open = require("node:fs")
import type nodeFs = require("node:fs")
import process = require("node:process")
import readline = require("node:readline")
import {Scanner} from "./scanner"
import { Token } from "./types"







function runFile(filename: nodeFs.PathLike){
  let input = open.readFileSync(filename).toString()
  run(input)
}

function runPrompt(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question("> ", (line) =>{
    if (line.trim() === "") {
      rl.close()
      return;
    } else run(line)
  })
}

function run(code: string){
  let scanner: Scanner = new Scanner(code);
  let tokens: Token[] = scanner.scanTokens();


  for (let token of tokens){
    console.log(token)
  }
}


function init(){
  const args = process.argv.slice(2)
  if (args.length > 2) {
    console.log("Usage: app [filename]")
    process.exit(64)
  }
  else if (args.length == 2) runFile(args[1] as string)
  else runPrompt()

}

init()