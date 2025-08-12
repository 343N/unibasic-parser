
import * as open from "node:fs"
import type fs from "node:fs"
import * as process from "node:process"
import * as readline from "node:readline"
import { Scanner } from "./scanner"
import { Token } from "./token"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function runFile(filename: fs.PathLike) {
  let input = open.readFileSync(filename).toString()
  run(input)
}

function runPrompt() {
  let input = null;
  rl.question("> ", (line) => {
    if (line.trim() === "") {
      rl.close()
      return;
    } 
    
    run(line)
    runPrompt();    
  })  
}




function run(code: string) {
  let scanner: Scanner = new Scanner(code);
  let tokens: Token[] = scanner.scanTokens();

  for (let token of tokens) {
    console.log(token.toString())
  }
}


function init() {
  const args = process.argv.slice(2)
  if (args.length > 2) {
    console.log("Usage: app [filename]")
    process.exit(64)
  }
  else if (args.length == 2) runFile(args[1] as string)
  else runPrompt()

}

init()