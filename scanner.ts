import { Token } from "./types";

export class Scanner {

  // static hadError: Boolean = false;

  source: string

  constructor(source: string){
    this.source = source;
  }


  scanTokens(): Token[]{
    // TODO

    return [];
  }

  static error(line: number, msg: string){
    Scanner.report(line, "", msg);
  }

  static report(line: number, where: string, msg: string){
    console.log(`[Line ${line}] Error ${where}: ${msg}`)
    // Scanner.hadError = true;
  }

}