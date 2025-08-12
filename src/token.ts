import { TokenType } from "./types"

export class Token {
  
  type: TokenType
  lexeme: String
  literal: any
  line: Number
  column: Number

  constructor(type: TokenType, lexeme: String, literal: any, line: Number, column: Number){
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
    this.column = column;
  }

  
  toString(): string {
    return `${TokenType[this.type]} - ${this.lexeme} - ${this.literal}`
  }
}