//Define html constants
const htmlTHeadRowId = document.getElementById('htmlTHeadRowId');
const htmlTBodyId = document.getElementById('htmlTBodyId');
const htmlPropDivId = document.getElementById('htmlPropDivId');
const htmlNewInputId = document.getElementById('htmlNewInputId');
const htmlInputConclusionId = document.getElementById('htmlInputConclusionId');
const htmlGenerateTableId = document.getElementById('htmlGenerateTableId');

//define arrays to organize propositions
let inputProps = [];
let basicProps = [];
let negationProps = [];
let conjunctionProps = [];
let disjunctionProps = [];
let conditionalProps = [];
let biconditionalProps = [];
let complexProps = [];
let complexPropsHolder = [];
let veryComplexProps = [];
let allProps = [];
let numRows;
let logicSyms = ['~','&','|','->','=='];

//define event listner for 'Enter a proposition' button

//htmlInputButtonCount used to track id of new inputs
let htmlInputButtonCount = 1;
//create new input for proposition
function htmlNewInputFunction() {
    let htmlInputVar = document.createElement('input')
    htmlInputVar.type='text';
    htmlInputVar.id=`htmlInput${htmlInputButtonCount +1}Id`;
    htmlInputVar.name=`htmlInput${htmlInputButtonCount +1}Id`;
    htmlInputVar.class ='inputProp'
    htmlInputVar.value='';
    let htmlInputVarLabel = document.createElement('label');
    htmlInputVarLabel.for=`${htmlInputVar.id}`;
    htmlInputVarLabel.class = 'inputPropLabel'
    htmlInputVarLabel.innerHTML = 'Enter a proposition';
    htmlInputButtonCount ++;
    htmlBr1 = document.createElement('br');
    htmlBr2 = document.createElement('br');
    htmlPropDivId.appendChild(htmlInputVarLabel);
    htmlPropDivId.appendChild(htmlInputVar);
    htmlPropDivId.appendChild(htmlBr1);
    htmlPropDivId.appendChild(htmlBr2);
}

//call htmlNewInputFunction to generate a new 'Enter a proposition' form whenever 'Add another proposition' is clicked
htmlNewInputId.addEventListener('click', htmlNewInputFunction);


function addInputsToArray(n) {
    for (i=1; i<=n; i++) {
        inputProps.push(document.getElementById(`htmlInput${i}Id`).value);
        console.log(inputProps);
    }
}

//after calling addInputsToArray, all props will be in inputProps
// We will be dividing props into three arrays.  basicProps (no logical symbols), complexProps(1 logical symbol) and veryComplexProps(more than 1 logical symbol)


//first we separate the basic from the non basic props.  non basic props go into complexPropsHolder, where they will be again partitioned into 2 arrays.
function checkLogicSyms (str) {
    if  (logicSyms.some(substring=>str.includes(substring))){
        complexPropsHolder.push(str);
    }
    else {
        basicProps.push(str);
    }
}

function partitionProps() {
    inputProps.forEach(element => checkLogicSyms(element));
}

//now all user-inputed basic props are in basicProps, and complex props are in complexPropHolder
//we want to break up complex props into our three arrays.  We need to add any basic props that show up in complex props (but were not input by the user themselves); 
//we also want to break down the complex props into props with only 1 logical symbol: these will go into the complexProps array.  props with more than 1 symbol will remain stored in complexPropHolder






//we will be looping breakUpComplexProps through complexPropHolder.  This function will break complex props into 3 substrings: 1. the leftmost basic prop in that complex prop. 
//2. the leftmost combination which forms a complex prop with 1 logical symbol.   
//3.  everything to the right of the first logical symbol (for negation, it will be to the right of the proposition)
//The last substring will be pushed to the end of complexPropHolder to be looped over again. 


//define slicePusher helper function
function slicePusher(strSlice1, strSlice2, strSlice3) {
    if (!basicProps.includes(strSlice1)) {
        basicProps.push(strSlice1);
    }
    if (!complexProps.includes(strSlice2)) {
        complexProps.push(strSlice2);
    }
    if (!complexPropsHolder.includes(strSlice3)) {
        if (!(strSlice3 === '')) {
            complexPropsHolder.push(strSlice3);
        }
    }
}
    
function breakUpComplexProps () {
    //check if it is a basic or complex prop.  This is needed because basic props will be added into the loop (below) as it breaks up complex props
    for (i=0; i<complexPropsHolder.length; i++) {
        str = complexPropsHolder[i];
        if (!logicSyms.some(substring => str.includes(substring))) {
            if (!basicProps.includes(str)) {
                basicProps.push(str);
            }
        } 
        //if str is not basic
        else {
            //if str is already in complexProps, do nothing
            if (!complexProps.includes(str)) {
                //now we check for negation
                //currently negation is not working as intended
                //eval negation last?
                if (str[0] === '~') {
                    let strSlice1 = str[1];
                    let strSlice2 = str.slice(0,2);
                    let strSlice3 = str.slice(1);
                    slicePusher(strSlice1, strSlice2, strSlice3);
                }
                //check &, |
                else if (str[1] === '&' || str[1] === '|') {
                    let strSlice1 = str[0];
                    let strSlice2 = str.slice(0,3);
                    let strSlice3 = str.slice(2);
                    slicePusher(strSlice1, strSlice2, strSlice3);
                }
                //check -> and ==
                else if (str.slice(1,3) === '->' || str.slice(1,3) === '==') {
                    let strSlice1 = str[0];
                    let strSlice2 = str.slice(0,4);
                    let strSlice3 = str.slice(3);
                    slicePusher(strSlice1, strSlice2, strSlice3);
                }
            }
        }  
    }         
}








//Now we need to create an array for all the complex props with more than 1 logical symbol

function createVeryComplexProps() {
    for (i=0; i<complexPropsHolder.length; i++) {
        if (!complexProps.includes(complexPropsHolder[i])  && !basicProps.includes(complexPropsHolder[i])) {
            veryComplexProps.push(complexPropsHolder[i]);
        }
    }
    veryComplexProps.sort(function (a,b) { return (a.length - b.length)});
}
    


//create columns

function createPropColumn(i) {
    let th = document.createElement('th');
    th.innerHTML = allProps[i]
    th.id = `col${i+1}`;
    htmlTHeadRow.appendChild(th);
}

function createAllPropColumns() {
    for (i=0; i<allProps.length; i++) {
        createPropColumn(i);
    }
}


//create rows

function createRows() {  
    for (i=1; i<= numRows; i++) {
        let row = document.createElement('tr');
        row.id = `row${i}`
        htmlTBody.appendChild(row);
    }

}

//define helper functions
function getRow(rowNum) {
    return document.getElementById(`row${rowNum}`)

}

function createTd (c, r, val) {
    td = document.createElement('td')
    td.innerHTML = val;
    td.id = `td${c}${r}`;
    getRow(r).appendChild(td);

}
function getTd(c, r) {
    return document.getElementById(`td${c}${r}`)
}


//start filling rows
function fillAllBasicPropRows(n) {
    for (i=1; i < n+1; i++) {
        console.log(i);
        let numDiv = Math.pow(2, n-i);
        let colNum = i;
        for (let j=0; j < numRows/Math.pow(2, n - (i-1)); j++) {
            for (let k=0; k < numDiv; k++) {
                let r1 = numDiv*j*2 + k + 1;
                let r2 = r1 + numDiv;
                createTd(colNum, r1, 1);
                createTd(colNum, r2, 0);
            }
        }
    }
}


//helper functions
function evalConj(td1, td2) {
    if (td1.innerHTML * td2.innerHTML === 1) {
        return 1;
    } else {
        return 0;
    }
}

function evalNeg(td1) {
    // td1.innerHTML === 0 doesn't work?
    if (td1.innerHTML < 1) {
        return 1;
    } else{
        return 0;
    }
}

function evalDisj(td1, td2) {
    if(td1.innerHTML + td2.innerHTML > 0) {
        return 1;
    } else {
        return 0;
    }
}

function evalCond(td1, td2) {
    if((td1.innerHTML > 0 ) && (td2.innerHTML < 1)) {
        return 0;
    } else {
        return 1;
    }
}

function evalBicond(td1, td2) {
    if(td1.innerHTML === td2.innerHTML) {
        return 1;
    }
    else {
        return 0;
    }
}

//finish filling rows
function fillComplexRows () {
    for (i=0; i<allProps.length; i++) {

        //here will need to code an else if for every symbol
        //negation
        if (allProps[i][0] === '~') {
            let temp1 = allProps[i][1];
            let p1Col = allProps.indexOf(temp1) +1;
            for (j=1; j<numRows +1; j++) {
                td1 = getTd(p1Col, j);
                td = document.createElement('td');
                tdVal = evalNeg(td1);
                td.innerHTML = tdVal;
                td.id = `td${i+1}{j}`;
                getRow(j).appendChild(td);
            }
        }

        //conjunction
        else if (allProps[i][1] === '&') {
            //temp gets the first character of the proposition, and p1Col gives its column (which will be used to find the table element by id)
            let temp1 = allProps[i][0];
            let p1Col = allProps.indexOf(temp1) +1;
            //temp 2 gives the rest of the string after the & symbol.  p2Col gives its column.
            let temp2 = allProps[i].slice(2);
            let p2Col = allProps.indexOf(temp2) + 1;
            for (j=1; j< numRows +1; j++) {
                td1 = getTd(p1Col, j);
                td2 = getTd(p2Col, j);
                td = document.createElement('td');
                tdVal = evalConj(td1, td2);
                td.innerHTML = tdVal;
                td.id = `td${i+1}${j}`
                getRow(j).appendChild(td);
            }

        }

        //disjunction
        else if (allProps[i][1] === '|') {
            let temp1 = allProps[i][0];
            let p1Col = allProps.indexOf(temp1) +1;
            let temp2 = allProps[i].slice(2);
            let p2Col = allProps.indexOf(temp2) + 1;
            for (j=1; j< numRows +1; j++) {
                td1 = getTd(p1Col, j);
                td2 = getTd(p2Col, j);
                td = document.createElement('td');
                tdVal = evalDisj(td1, td2);
                td.innerHTML = tdVal;
                td.id = `td${i+1}${j}`
                getRow(j).appendChild(td);
            }

        }

        //conditional 
        else if (allProps[i][1] === '-') {
            let temp1 = allProps[i][0];
            let p1Col = allProps.indexOf(temp1) +1;
            let temp2 = allProps[i].slice(3);
            let p2Col = allProps.indexOf(temp2) + 1;
            for (j=1; j< numRows +1; j++) {
                td1 = getTd(p1Col, j);
                td2 = getTd(p2Col, j);
                td = document.createElement('td');
                tdVal = evalCond(td1, td2);
                td.innerHTML = tdVal;
                td.id = `td${i+1}${j}`
                getRow(j).appendChild(td);
            }

        }
        //biconditional
        else if (allProps[i][1] === '=') {
            let temp1 = allProps[i][0];
            let p1Col = allProps.indexOf(temp1) +1;
            let temp2 = allProps[i].slice(3);
            let p2Col = allProps.indexOf(temp2) + 1;
            for (j=1; j< numRows +1; j++) {
                td1 = getTd(p1Col, j);
                td2 = getTd(p2Col, j);
                td = document.createElement('td');
                tdVal = evalBicond(td1, td2);
                td.innerHTML = tdVal;
                td.id = `td${i+1}${j}`
                getRow(j).appendChild(td);
            }

        }
        

    }
}






function htmlGenerateTableListener () {
    addInputsToArray(htmlInputButtonCount);
    partitionProps();
    breakUpComplexProps();
    createVeryComplexProps();
    allProps = basicProps.concat(complexProps, veryComplexProps);
    numRows = Math.pow(2, basicProps.length);
    createRows();
    createAllPropColumns(allProps.length);
    fillAllBasicPropRows(basicProps.length);
    fillComplexRows();
    
}

htmlGenerateTableId.addEventListener('click', htmlGenerateTableListener);

