parenthesisParser = {
  findParenthesisIndices(str) {
    let leftIndices = [];
    let rightIndices = [];
    for (let i = 0; i < str.length; i++) {
      if(str[i] === '(') {
        leftIndices.push(i);
      }
      if(str[i] === ')') {
        rightIndices.push(i);
      }
    }
    return [leftIndices, rightIndices];
  },

  getPairs (indices) {
    let pairs = [];
    let leftIndices = indices[0];
    let rightIndices = indices[1];
    if (leftIndices.length !== rightIndices.length) {
      return null;
    }
    let rightPaired = new Array(rightIndices.length).fill(false);
    let leftPaired = new Array(rightIndices.length).fill(false);
    for(let i = 0; i < rightIndices.length; i++) {
        for(let j = leftIndices.length -1; j >= 0; j--) {
            if((leftIndices[j] < rightIndices[i]) && !rightPaired[i] && !leftPaired[j]) {
                pairs.push([leftIndices[j], rightIndices[i]]);
                rightPaired[i] = true;
                leftPaired[j] = true;
            }
        }
    } return pairs;
  },

  pairs (str) {
    this.getPairs(this.findParenthesisIndices(str));
  },
}

console.log(parenthesisParser.pairs('((a))'));
console.log(parenthesisParser.pairs('a'));
console.log(parenthesisParser.pairs('((@(('));
console.log(parenthesisParser.pairs('a@(b@c)@(d@e)((@))'));
console.log(parenthesisParser.pairs('(a@((((b@c)@(d@e))@f)@g))'));


