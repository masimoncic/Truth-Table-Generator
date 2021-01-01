store = [];
function parseA(tokens) {
  //tokens is a 1 element array. it basically lets us act is if our string (tokens[0]) is mutable
  if (tokens[0].length === 0) {
    //A-> B | ""
    //if A -> "" then return true;
    //this means we are out of tokens, so end the function
    return true;
  }


  //get the first token and store it in token
  token = tokens[0].charAt(0);
  //remove tokens from the list of tokens(consume it)
  tokens[0] = tokens[0].substring(1);

  if (token == '(') {
    console.log(tokens);
    //if A->B, then we pass to the lower rule
    return parseB(tokens) && tokens[0].length === 0;
    //tokens.length will be false until we run out of tokens to run through parseA
    //parseB(tokens) will be true until we run out of ( and ).  
    //but i think the point of parseB is to call the function, and only the tokens[0].length is to determine the end condition?
  }

  else {
    return false;
  }
}

function parseB(tokens) {
  while (tokens[0].length > 0) {
    token = tokens[0].charAt(0);
    tokens[0] = tokens[0].substring(1);
    //set token to first char, remove it from tokens
  }

  if(token == '(') {
    //if token is (, it triggers our recursive rule)
    console.log(tokens)
    parseB(tokens);
  }

  else if (token ==')') {
    console.log('tokens')
    //if token is ), return true
    return true;
  }

  //if we get through the while loop without finding a '(' or ')' then return false
  return false;
}

  


console.log(parseA(new Array("(((())))")));

console.log(store);