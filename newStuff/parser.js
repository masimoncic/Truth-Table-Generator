/* 
B (U "s" U) *
U ("~" U
   | P)
P prop | "(" 
*/

let lexer = new PropositionalLogicLexer();
//lexer.tokenAll(str);


//we get an array of tokesn from lexer

let parser = {
  binarySyms : ['&', '|', '->', '=='],
  unarySyms : ['~'],
  parenthesis: ['(', ')'],

  binary(arr) {
    
    for (let i = 0; i < arr.length; i++) {
      if (this.binarySyms.includes(arr[i].value)) {
        //store the binary 
        b = [i-1, i, i+1];
        //store the unary
        u = arr.slice(0,i);
        //call binary on the right hand side of the array
        this.binary(arr.slice(i+1))

        // return u?
      }
    }
  }
}