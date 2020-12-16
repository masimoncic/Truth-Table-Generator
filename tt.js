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
let complexPropHolder = [];
let complexProps = [];
let allProps = [];
let numRows;

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







// test
//htmlNewInputFunction();
//addInputsToArray(htmlInputButtonCount);

//placeholder functions



function addBasicPropsToArray(n) {

    for (i=0; i<inputProps.length; i++) {
        basicProps.push(inputProps[i]);
    }
}


//placeholder





//let allProps = basicProps.concat(complexProps);
//let numRows = Math.pow(2, basicProps.length);




function createPropColumn(i) {
    let th = document.createElement('th');
    th.innerHTML = allProps[i]
    th.id = `col${i+1}`;
    htmlTHeadRow.appendChild(th);
}

function createAllPropColumns(n) {
    for (i=0; i<allProps.length; i++) {
        createPropColumn(i);
    }
}




function createRows() {  
    for (i=1; i<= numRows; i++) {
        let row = document.createElement('tr');
        row.id = `row${i}`
        htmlTBody.appendChild(row);
    }

}


function getRow(rowNum) {
    return document.getElementById(`row${rowNum}`)

}

function createTd (c, r, val) {
    td = document.createElement('td')
    td.innerHTML = val;
    td.id = `td${c}${r}`;
    getRow(r).appendChild(td);

}

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


function getTd(c, r) {
    return document.getElementById(`td${c}${r}`)
}
function evalConj(td1, td2) {
    if (td1.innerHTML * td2.innerHTML === 1) {
        return 1;
    } else {
        return 0;
    }
}

function htmlGenerateTableListener () {
    addInputsToArray(htmlInputButtonCount);
    addBasicPropsToArray(inputProps.length);
    numRows = Math.pow(2, basicProps.length);
    //placeholder
    allProps = basicProps;
    createRows();
    createAllPropColumns(basicProps.length);
    fillAllBasicPropRows(basicProps.length);
}

htmlGenerateTableId.addEventListener('click', htmlGenerateTableListener);
/*
function fillRowsConj(c1, c2, c3) {
    for (i=1; i<=numRows; i++) {
            td1 = getTd(c1, i);
            td2 = getTd(c2, i);
            td = document.createElement('td');
            tdVal = evalConj(td1, td2);
            td.innerHTML = tdVal;
            td.id = `td${c3}${i}`;
            getRow(i).appendChild(td);

        }
}
fillRowsConj(1,2,6); 
fillRowsConj(6, 3, 7);
fillRowsConj(7, 4, 8); */