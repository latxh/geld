let data = [];
let uniqueVendors = {};
let vendorMenu = [];
let categories = {"Fixed Expenses" : [], "Variable Expenses": [], "Utilities": []};
let sortedExpenses = {};
let pressed = false;



function handleFiles(files){

    if(window.FileReader){
        for (let x = 0; x<files.length; x++){
            fileFormat = files[x].name.slice(-3);
            //console.log(fileFormat);
            if (fileFormat.endsWith('csv')){
                getAsText(files[x]);
            }
            
        }
        //console.log('I can handle this');
    }else{
        alert('FileReader are not suppported in this browser.');
    }
}

function initializePage2(){
    if(data.length != 0 && !pressed){
        loadLocalSaveData();
        getUniqueTransactions(data);
        
        for (let key in categories){
            createCatButt(key);
        }
        
        createExistingSubcats();
        generateDropdownMenu();
        viewList();
        createSaveButt();
        //printData();
        pressed = true;
    }
}

function loadLocalSaveData(){
    //window.localStorage.clear();
    let categoriesUnparsed = window.localStorage.getItem('Categories');
    let uniqueVendorsUnparsed = window.localStorage.getItem('Sorted Transactions');

    if (categoriesUnparsed !== null) {
        categories = JSON.parse(categoriesUnparsed);
    }
    if (uniqueVendorsUnparsed !== null) {
        uniqueVendors = JSON.parse(uniqueVendorsUnparsed);
    }
}

function createSaveButt(){
    let saveButt = document.createElement("button");
    let t = document.createTextNode("Save");
    saveButt.appendChild(t);
    saveButt.id = "#Save";
    saveButt.addEventListener('click', saveData, false);
    document.body.appendChild(saveButt);
}

function saveData(){
    window.localStorage.clear();
    let PNLexists = document.getElementById("#PNL");
    if(PNLexists){
        PNLexists.parentNode.removeChild(PNLexists);
        sortedExpenses = {};
    }
    
    alerted = saveVendorToCatData();
    
    if (!alerted){
        window.localStorage.setItem('Categories', JSON.stringify(categories));
        window.localStorage.setItem('Sorted Transactions', JSON.stringify(uniqueVendors));
        
        createPNLButt();
    }
    //console.log(sortedExpenses);
}

function saveVendorToCatData(){
    menuValues = [];
    let alerted = false;
    for (let x = 0; x<vendorMenu.length; x++){
        let menu = vendorMenu[x];
        let menuValue = menu.options[menu.selectedIndex].text;
        if(menuValue.localeCompare("Select Category") == 0 && !alerted){
            alert("Transaction #" + (x+1) + " unsorted. Please choose a category and save again.")
            alerted = true;
        }
        menuValues.push(menuValue);
    }

    let x = 0;
    for (key in uniqueVendors){
        uniqueVendors[key] = [menuValues[x]];
        x++;
    }
    if(!alerted){
        alert("Save successful!");
    }

    return alerted;
}

function viewList(){
    let table = document.createElement("table"), row = table.insertRow();
    let x = 0;
    for(let key in uniqueVendors){
        let cell1 = row.insertCell();
        num = x+1;
        cell1.innerHTML = num.toString() + '. ';

        let cell2 = row.insertCell();
        cell2.innerHTML = key;

        let cell3 = row.insertCell();
        cell3.appendChild(vendorMenu[x]);
    
        let next = x + 1;
        if (next!=data.length) {
            row = table.insertRow();
        }
        x++
        
    }

    document.getElementById("vendorTable").appendChild(table);
}

function addsubCatToMenu(subCat){
    for (let x = 0; x<vendorMenu.length; x++){
        let menu = vendorMenu[x];
        menu.options[menu.options.length] = new Option(subCat);
    }
}

function removesubCatFromMenu(subCat){
    for (let x = 0; x<vendorMenu.length; x++){
        let menu = vendorMenu[x];
        for (let y = 0; y < menu.length; y++){
            if(menu.options[y].value == subCat){
                menu.remove(y);
            }
        }
    }
}


function generateDropdownMenu(){
    for (let key in uniqueVendors){
        let menu = document.createElement("select");
        menu.name = "Choose Category";
        menu.id = "menu" + key;
        menu.options[menu.options.length] = new Option("Select Category");
        

        for (let category in categories){
            subCatArray = categories[category];
            for (let x = 0; x<subCatArray.length; x++){
                let subCat = subCatArray[x];

                let option = document.createElement("option");
                option.value = subCat;
                option.text = subCat;
                menu.appendChild(option);
                }
        }

        if (uniqueVendors[key].length != 0){
            //console.log(uniqueVendors[key][0]);
            menu.value = uniqueVendors[key][0];
        }

        vendorMenu.push(menu);
    }
}


function createCategory(){
    if (pressed){
        let catName = prompt("Please enter the category name:")
        if(catName!= "" && catName != null){    
        
            categories[catName] = [];
            //console.log(categories);

            createCatButt(catName);
        }
    }
    
}

function createCatButt(key){

    let doesEleExist = document.getElementById("#" + key);

    if(!doesEleExist){
        let createBtn = document.createElement("button");
        let t = document.createTextNode(key);
        createBtn.appendChild(t);
        createBtn.id = "#" + key;
        createBtn.addEventListener('click', createSubcat, false);
        document.body.appendChild(createBtn);
        
        let delBtn = document.createElement("button");
        let dt = document.createTextNode("<-delete this");
        delBtn.appendChild(dt);
        delBtn.id = 'del' + key;
        delBtn.addEventListener('click', deleteCat, false);
        document.body.appendChild(delBtn);
    }
}

function deleteCat(){
    let confirmation = confirm("Delete '" + this.id.slice(3) + "' category?");

    if (confirmation){
        let btn = document.getElementById("#" + this.id.slice(3));
        //console.log(btn);
        btn.remove();
        this.remove();
        subCats = categories[this.id.slice(3)];
        removeSubCat(subCats, this.id.slice(3));
        delete categories[this.id.slice(3)];
    }
}

function createExistingSubcats(){
    for(let key in categories){
        if(categories[key].length > 0){
            for (let x = 0; x < categories[key].length; x++){
                subCatName = categories[key][x];
                viewSubCat(subCatName, key);
            }
        }
    }
}

function createSubcat(){
    let subCatName = prompt("Please enter the sub-category name:");
    let exists = false;

    for(let key in categories){
        if(categories[key].indexOf(subCatName) >= 0){
            exists = true;
        }
    }

    if(subCatName != "" && subCatName != null && !exists){
        categories[this.id.slice(1)].push(subCatName);
        addsubCatToMenu(subCatName);
        viewSubCat(subCatName, this.id.slice(1));
    }
}

function removeSubCat(subCats, key){
    
    let subCatList = document.getElementById("viewSubCats");
    for (let x = 0; x<subCats.length; x++){
        subCatList.removeChild(document.getElementById("#sub" + subCats[x])) 
        removesubCatFromMenu(subCats[x]);
    }
}

function onClickRemoveSubCat(e){
    let subCatName = this.id.slice(4);
    let confirmation = confirm("Delete " + subCatName + " sub-category?");

    if (confirmation){
        for (let key in categories){
            let subCatNameIndex = categories[key].indexOf(subCatName);
            //console.log(subCatNameIndex);
            if (subCatNameIndex >= 0){
                
                for (let x = 0; x<categories[key].length; x++){
                    //console.log("peep");
                    if (categories[key][x].localeCompare(subCatName) == 0){
                        removesubCatFromMenu(subCatName);
                        categories[key].splice(x, 1);
                        x--;
                    }
                }
            }

        }
        e.target.parentElement.removeChild(e.target);
    }
    
}

function viewSubCat(subCatName){
    let subCatList = document.getElementById("viewSubCats");
    let subCat = document.createElement("li");
    subCat.id = "#sub" + subCatName;
    subCat.onclick = onClickRemoveSubCat;
    subCat.appendChild(document.createTextNode(subCatName));
    subCatList.appendChild(subCat);
    
}


function getAsText(fileToRead) {
    let reader = new FileReader();
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    let csv = event.target.result;
    processData(csv);
}

function processData(csv) {
    let allTextLines = csv.split(/\r\n|\n/);
    let lines = [];
    for (let i=0; i<allTextLines.length; i++) {
        let row = allTextLines[i].split(',');
        if(!(row[0].endsWith("Date")) && row[0] != ""){
            let cell = [];
            for (let j=0; j<row.length; j++) {
                cell.push(row[j]);
            }
            
            lines.push(cell);
        }
    }
    //console.log(lines);
    data = data.concat(lines);
}

function getUniqueTransactions(data){
    let vendors = [];
    let regexVendorName = /[A-Z]{1,}/;
    for (let x = 0; x < data.length; x++){
        let vendorCol = 0;
        let validVendor = true;
        for (let y = 0; y < data[x].length; y++){
            if (data[x][y].endsWith("Date")){
                validVendor = false;
            }
            if (data[x][y].match(regexVendorName)){
                vendorCol = y;
                break;
            }
        }
        if (vendors.indexOf(data[x][vendorCol]) < 0 && validVendor){
            //console.log('passed');
            vendors.push(data[x][vendorCol]);
            let vendor = data[x][vendorCol];
            if (vendor != "" && !(vendor in uniqueVendors)){
                //console.log(vendor);
                uniqueVendors[vendor] = [];
            }   
        }

    }
        //console.log(vendors)

}

function createPNLButt(){
    let PNLbutt = document.createElement("button");
    let t = document.createTextNode("Create P&L statement");
    PNLbutt.appendChild(t);
    PNLbutt.id = "#PNL";
    PNLbutt.addEventListener('click', createPNLRows, false);
    document.body.appendChild(PNLbutt);
}

function findMajorCat(subCat){
    for (let cat in categories){
        //let indexOfSubCat = categories[cat].indexOf(subCat);
        //console.log(cat + ": " + categories[cat]);
        //console.log("looking for: " + subCat);
        //console.log("index" + indexOfSubCat);

        for (let x = 0; x < categories[cat].length; x++){
            if (subCat == categories[cat][x]){
                //console.log("Found: "+ cat);
                return cat;
            }
        }
    }
}

function sortData(){
    let regexVendorName = /[A-Z]{1,}/;
    

    for(let x = 0; x < data.length; x++){
        let vendorCol = 0;
        for (let y = 0; y < data[x].length; y++){
            if (data[x][y].match(regexVendorName)){
                vendorCol = y;
                break;
            }
        }
        let vendorName = data[x][vendorCol];
        let subCat = uniqueVendors[vendorName];
        let majorCat = findMajorCat(subCat);
        let expenseAmount = 0;
       
        if (data[x].slice(-2,-1) != ""){
            expenseAmount = parseFloat(data[x].slice(-2,-1));
        }

        //console.log("expense Amount: " + expenseAmount);


        if (!(sortedExpenses.hasOwnProperty(majorCat))){
            sortedExpenses[majorCat] = {};
            sortedExpenses[majorCat][subCat] = expenseAmount;
        } else if (!(sortedExpenses[majorCat].hasOwnProperty(subCat))){
            sortedExpenses[majorCat][subCat] = expenseAmount;
        } else {
            sortedExpenses[majorCat][subCat] += expenseAmount;
        }
    }


    
}

function createPNLRows(){
    sortData();
    //console.log(sortedExpenses);

    let rows = [
        ["Name of business"],
        [],
        [],
        ["STATEMENT OF OPERATIONS"],
        ["Period"],
        [],
        [],
        ["REVENUE"],
        [],
        [],
        ["COST OF SALES"],
        [],
        ["GROSS PROFIT"],
        [],
        ["OPERATING EXPENSES"]
    ];

    let majorCats = Object.keys(categories);

    for (let x = 0; x<majorCats.length; x++){
        rows.push([]);
        rows.push([majorCats[x]])
        rows.push([]);

        for (let subCat in sortedExpenses[majorCats[x]]){
            //console.log("subCat" + subCat);
            //console.log("row" + [subCat, sortedExpenses[majorCats[x]][subCat]]);
            rows.push([subCat, sortedExpenses[majorCats[x]][subCat]])
        }
    }
    exportPNL(rows);

}

function exportPNL(rows){
    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
}

function printData(){
    console.log(data);
    console.log(Object.keys(uniqueVendors));
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Cannot read file!");
    }
}
