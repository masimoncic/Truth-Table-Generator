function aAndB(a,b) {
    if(a && b) {
        return true;
    }
    else{
        return false;
    }
}




let basicProps = ['a','b','c','d','e'];
let complexProps = ['a&b', '(a&b)&c', '((a&b)&c)&d'];
let allProps = basicProps.concat(complexProps);
let numRows = Math.pow(2, basicProps.length);

const htmlTHeadRow = document.getElementById('htmlTHeadRow');
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

createAllPropColumns(length.allProps);
const htmlTBody = document.getElementById('htmlTBody');

function rowArrays(i) {

}
function createRows() {  
    for (i=1; i<= numRows; i++) {
        let row = document.createElement('tr');
        row.id = `row${i}`
        htmlTBody.appendChild(row);
    }

}

createRows();

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

fillAllBasicPropRows(basicProps.length);

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
fillRowsConj(7, 4, 8);