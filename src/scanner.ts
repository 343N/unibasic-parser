import { KEYWORDS } from "./keywords";
import { Token } from "./token";
import { TokenType } from "./types";

export class Scanner {

  // static hadError: Boolean = false;

  
  source: string
  tokens: Token[]
  start: number = 0
  current: number = 0
  line: number = 1

  constructor(source: string) {
    this.source = source;
    this.tokens = [];
  }


  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current
      this.scanToken()
    }

    this.tokens.push(new Token(TokenType.EOF, "", null, this.line, 0))

    return this.tokens;
  }

  scanToken() {
    let char: string = this.advance();
    switch (char) {
      case '\n': this.line++; break 

      // white space we dont care poggers
      case '\t': 
      case '\r':
      case  ' ':
        break;
      case '(': this.addToken(TokenType.LEFT_PAREN); break;
      case ')': this.addToken(TokenType.RIGHT_PAREN); break;
      case '<': this.addToken(TokenType.LESS); break;
      case '>': this.addToken(TokenType.GREATER); break;
      case ';': this.addToken(TokenType.COLON); break;
      case ',': this.addToken(TokenType.COMMA); break;
      case '+': 
        this.addToken(this.match("=") ? TokenType.PLUS_EQ : TokenType.PLUS); 
        break;
      case '-': 
        this.addToken(this.match("=") ? TokenType.MIN_EQ : TokenType.MINUS); 
        break;
      case '*': 
        this.addToken(this.match("=") ? TokenType.MUL_EQ : TokenType.STAR); 
        break; 
        case '/': 
        this.addToken(this.match("=") ? TokenType.DIV_EQ : TokenType.SLASH); 
        break;
      
      case "'":
      case '"':
          this.string(char); 
          break;
      
        // case '-': this.addToken(TokenType.MINUS); break;
      // case '=': this.addToken(TokenType.EQUALS); break;
      // case '*': this.addToken(TokenType.STAR); break;
      // case '^': this.addToken(TokenType.CARROT); break;

      default: 
        console.log(char)
        if (Number.isFinite(char))
          this.number()
        else if (Scanner.isIdentifierChar(char))
          this.identifier()
        else 
          Scanner.error(this.line, `Unexpected character ${char}`); break

    }
  }

  number() {
    while (Number.isFinite(this.peek())) this.advance();

    if (this.peek() == '.' && Number.isFinite(this.peek(1))) {
      this.advance()

      while (Number.isFinite(this.peek())) this.advance();
    }

    this.addToken(TokenType.NUMBER, 
      Number(this.source.substring(this.start, this.current))
    )
    

  }

  string(char: string) {
    let peekchar = this.peek()
    while (peekchar != char && !this.isAtEnd() && peekchar != "\n"){
      this.advance();
    }

    if (this.isAtEnd() || peekchar == "\n"){  
      Scanner.error(this.line, "Unterminated string.")
    }

    this.advance()

    let val: string = this.source.substring(this.start+1, this.current-1);
    this.addToken(TokenType.STRING, val)
  }

  peek(ahead: number = 0): string {
    if (this.isAtEnd()) return '\0';
    if (this.current + ahead > this.source.length) return '\0'
    return this.source.charAt(this.current + ahead)
  }

  advance() {
    return this.source.charAt(this.current++);
  }

  identifier(){
    while (Scanner.isIdentifierChar(this.peek())) this.advance()
    
    var text = this.source.substring(this.start, this.current);
    var type = KEYWORDS.get(text)

    if (type == null) type = TokenType.IDENTIFIER
    this.addToken(type)

  }

  
  match(expected: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) != expected) return false;
    
    this.current++;
    return true;
  }
  
  isAtEnd() {
    return this.current >= this.source.length
  }

  addToken(type: TokenType, literal: any = null) {
    let str = this.source.substring(this.start, this.current)
    this.tokens.push(new Token(type, str, literal, this.line, 0))
  }
  
  static isIdentifierChar(char: string){
    return char.toLowerCase() !== char.toUpperCase() || Number.isFinite(char) || char === "_"
  }

  static error(line: number, msg: string) {
    Scanner.report(line, "", msg);
  }

  static report(line: number, where: string, msg: string) {
    console.log(`[Line ${line}] Error ${where}: ${msg}`)
    // Scanner.hadError = true;
  }

}