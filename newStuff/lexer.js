
class PropositionalLogicLexer {
  constructor () {

    this.pos = 0;
    this.buf = '';
    this.buflen = 0;
    this.endPos = 0;

    this.logicalSymbolsSingle = {
      '~' : 'NEGATION',
      '&' : 'CONJUNCTION',
      '|' : 'DISJUNCTION',
      '(' : 'L_PAREN',
      ')' : 'R_PAREN',
    }

    this.logicalSymbolsDouble = {
      '->' : 'CONDITIONAL',
      '==' : 'BICONDITIONAL',
    }

  }

  input (str) {
    this.pos = 0;
    this.buf = str;
    this.buflen = str.length;
  }

  token() { 
    //first check that there are still characters left
    if (this.pos > this.buflen) {
      return null;
    }

    let c = this.buf[this.pos];
    let sym = this.logicalSymbolsSingle[c];
    let cPlus = this.buf.slice(this.pos, this.pos+2);
    let symPlus = this.logicalSymbolsDouble[cPlus];
    if (sym !== undefined) {
      this.pos ++;
      return {
        name: sym,
        value: c,
        pos: this.pos
        }
      }
    else if (symPlus !== undefined) {
      let tempPos = this.pos +1;
      this.pos += 2;
      return {
        name: symPlus,
        value: cPlus,
        pos: tempPos,
        }
      }
    //not a logical symbol
    else {
      //getEndPos defined below
      this.endPos = this.getEndPos(this.pos);
      let prop = this.buf.slice(this.pos, this.endPos);
      let tempPos = this.pos +1;
      this.pos = this.endPos;
      return {
        name:'PROPOSITION',
        value: prop,
        pos: tempPos
      }
    };
  }

  getEndPos (startPos) {
    let logicalSyms = ['~', '&', '|', '(', ')', '-', '='];
    let endPos = startPos +1;
    while(endPos < this.buflen) {
      let c = this.buf[endPos];
      if (logicalSyms.includes(c)) {
        if (!((c === '-' && this.buf[endPos+1] !== '>') || (c === '=' && this.buf[endPos+1] !== '='))) {
          return endPos;}
        else {endPos++;}
      }
      else {
        endPos++;
      }

    }
    return endPos;
  }

  tokenAll (str) {
    let tokenArr = [];
    this.input(str);
    while (this.pos < this.buflen) {
      tokenArr.push(this.token());
    }
    return tokenArr;
  }


}

console.log(lexer.tokenAll('~ab(@s-d=a==3||->a~b&2d'));