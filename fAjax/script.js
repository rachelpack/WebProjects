const url = "http://Rachel&Tamar";

const arrItems = [
    {name:"bread", price:6.5, weihgt:"750 gram", amount:0},
    {name:"milk", price:5, weihgt:"1 liter", amount:0},
    {name:"chocolate", price:12, weihgt:"100 gram", amount:0},
    {name:"cheese", price:24, weihgt:"850 gram", amount:0},
    {name:"eggs", price:35.99, weihgt:"30 units", amount:0}
];

//get the pages from the htmll
const logIn = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const shoppingCart = document.getElementById("shoppingCart");

//get the buttons from the html
const signUpB = document.getElementById("signUpB");
const logInB = document.getElementById("logInB");
const logOutB = document.getElementById("logOutB");
const newshopping = document.getElementById("newshopping");
const saveB = document.getElementById("saveB");
const deleteB = document.getElementById("deleteB");
const shoppingCartSubmit = document.getElementById("shoppingCartSubmit");
const signUpToShopping = document.getElementById("signUpToShopping");
const productsList = document.getElementById("productsList");
const productsList2 = document.getElementById("productsList2");
const signOutB = document.getElementById("signOutB");

//signUp
signUpB.addEventListener("click", (event)=>{
    event.preventDefault();
    logIn.style.display = "none";
    signUp.style.display = "block";
    history.replaceState({}, 'signUp', '#signUp');
});

//logIn
logInB.addEventListener("click", (event)=>{
    event.preventDefault();        
    signUp.style.display = "none";
    logIn.style.display = "block";
    history.replaceState({}, 'logIn', '#logIn');
});

//save
saveB.addEventListener("click", (event)=>{
    event.preventDefault();
    save();
})

//logOut
logOutB.addEventListener("click", (e)=>{
    e.preventDefault();
    save()
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    alert("Your order has been received by the system❕❕");
    alert ("the total price is:" + computPrice(myUser));
    localStorage.setItem("myUser", JSON.stringify(myUser));
})

//sign out
  signOutB.addEventListener("click", (e)=>{
    e.preventDefault();      
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    const xhr = new FXMLHttpRequest();
    xhr.fOnreadystatechange = ()=>{
        if (xhr.status == 200 && xhr.readyState==4) {
            removeItemsFromTheScreen();
            localStorage.setItem("myUser", JSON.stringify(null));           
            logIn.style.display = "block";
            shoppingCart.style.display = "none";
            history.replaceState({}, 'logIn', '#logIn');
        }
    }
    xhr.open("DELETE", url, true);
    xhr.send(JSON.stringify(myUser));
  });

//delete items
deleteB.addEventListener("click", (e)=>{
    e.preventDefault();
    deleteAll();
})
 
//signUpToShopping
signUpToShopping.addEventListener("submit", (event)=>{
    event.preventDefault();    
    let nameSignUp=document.getElementById("nameSignUp").value;
    let passSignUp=document.getElementById("passSignUp").value;
    let EmailSignUp=document.getElementById("EmailSignUp").value;

    const user = {
        name:nameSignUp,
        psw:passSignUp,
        mail:EmailSignUp,
        items:[]
    };
    addU(user);
})

//the function add a new user to the db 
function addU(user){
    let xhr = new FXMLHttpRequest();
    xhr.fOnreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("welcom to our store!");
            localStorage.setItem("myUser", JSON.stringify(user));
            signUp.style.display = "none";
            shoppingCart.style.display = "block";
            history.replaceState({}, 'shoppingCart', '#shoppingCart');
        }
         else if(this.status == 305){
            const p3 = document.getElementById("p3");
            p3.innerHTML = "syntext error!!!";
        }
        else if(this.readyState > 1 && this.status != 200){
            const p3 = document.getElementById("p3");
            p3.innerHTML = "The selected username already exists!";
        }
    };
    xhr.open("POST", url ,true);
    xhr.send(JSON.stringify(user));
}


//
shoppingCartSubmit.addEventListener("submit", (event)=>{
    event.preventDefault();  
    let name = document.getElementById("name1").value;
    let psw = document.getElementById("pass1").value;
    const body = {
        name:name,
        psw:psw
    }
    getU(body);
})


//the function get the current user
function getU(body){
    let xhr = new FXMLHttpRequest();
    xhr.fOnreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myUser = JSON.parse(this.response);
            localStorage.setItem("myUser", JSON.stringify(myUser));
            logIn.style.display = "none";
            shoppingCart.style.display = "block";
            history.replaceState({}, 'shoppingCart', '#shoppingCart');
            showAllTheItemsOnScreen();
        }
        else if(this.status == 205){
            const p1 = document.getElementById("p2");
            p1.innerHTML = "wrong password!";
        }
        else if(this.status == 501){
            const p1 = document.getElementById("p1");
            p1.innerHTML = "wrong name!";
        }
    }
    xhr.open("GET", url ,true);
    xhr.send(JSON.stringify(body));
}

//function to find the specific item by item name:
function itemDetails(itemName){
    for (let i = 0; i < arrItems.length; i++) {
        if(arrItems[i].name == itemName){
            return arrItems[i];
      }
    }
    return null;
}

//addItem:getting item
//the fuction add the new item to the user item's arr;
function addItem(nameOfItem){
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    const selects=document.getElementById("productDelete");
    for (let index = 0; index < myUser.items.length; ++index) {
        if (myUser.items[index].name == nameOfItem) {
            ++myUser.items[index].amount;
            localStorage.setItem("myUser", JSON.stringify(myUser));
            changeAmountOfItem(myUser.items[index].name, myUser.items[index].amount);
            return;    
        }
    }
    myItem = itemDetails(nameOfItem);
    ++myItem.amount;
    myUser.items.push(myItem);
    localStorage.setItem("myUser", JSON.stringify(myUser));
    addNewItemOnScreen(myItem);
    for (let j = 0; j < selects.children.length; j++) {
        if(myItem.name == selects.children[j].innerHTML){
            selects.children[j].style.display="block";
            break;
        }
    }
}

//function to increase/decrease the amount of the specific item on the screen:
function changeAmountOfItem(name, amount){
    const table = document.getElementById("table");
    table.querySelector("tr#"+name).children[2].textContent = amount;
}

//getItem:getting a name of the item return the user's item details
function getItem(name){
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    
    return myUser.items[findU(user.items, name)];
}


//deleteItem:getting name of product to delete return 
//the fuction remove the item from the bascket
function deleteItem(name){
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    index = findU(myUser.items, name);
    const selects=document.getElementById("productDelete");
    
    if (myUser.items[index].amount == 1){
        for (let j = 0; j < selects.children.length; j++) {
           if(name==selects.children[j].innerHTML){
               selects.children[j].style.display="none";
           }
        } 
        --myUser.items[index].amount;
        myUser.items.splice(myUser.items[index], 1);
        removeItemFromTheScreen(name);
    }
    else{
        --myUser.items[index].amount;
        changeAmountOfItem(myUser.items[index].name, myUser.items[index].amount)
    }
    localStorage.setItem("myUser", JSON.stringify(myUser));
}

//deleteAll:not getting return 200;
//the function delete all the user's items
function deleteAll(){
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    myUser.items = [];
    arrItems.forEach((elemnt)=>{
        elemnt.amount = 0;
    })

    localStorage.setItem("myUser", JSON.stringify(myUser));
    const selects = document.getElementById("productDelete");
    for(let i=0; i<6;++i){
        selects.children[i].style.display = "none";
    }
    removeItemsFromTheScreen();
}

function removeItemsFromTheScreen(){
    const items = document.querySelectorAll("TR");
    for (let index = 1; index < items.length; index++) {
        removeItemFromTheScreen(items[index].children[3].textContent);
    }
    
}


function removeItemFromTheScreen(name){
    const table = document.getElementById("table");
    table.querySelector("tr#"+name).remove();
}

//productsList:the function add a item to the table
productsList.addEventListener("submit", (e)=>{
    e.preventDefault();
    let combo =  document.getElementById("product");
    let selected = combo.options[combo.selectedIndex].value;
    combo.selectedIndex = 0;

    addItem(selected);
})

//productsList:the function add a item to the table
productsList2.addEventListener("submit", (e)=>{
    e.preventDefault();
    let combo =  document.getElementById("productDelete");
    let selected = combo.options[combo.selectedIndex].value;
    combo.selectedIndex = 0;
    document.getElementById("submitFor").disabled = true;
    deleteItem(selected);
})

// function to show to the customer the choosen product:
function addNewItemOnScreen(item){
    let tr = document.createElement("TR");
    document.getElementById("submitForm").disabled = true;
    createTd(tr,item.weihgt);
    createTd(tr,item.price + "₪");
    createTd(tr,item.amount);
    createTd(tr,item.name);
    document.querySelector("#product_table tbody").appendChild(tr);
}


//th function show all the user details on the screen
function showAllTheItemsOnScreen(){
    const myUser = JSON.parse(localStorage.getItem("myUser"));
    for (let index = 0; index < myUser.items.length; index++) {
        addNewItemOnScreen(myUser.items[index]);
    }
}

//function to add td to the table:
  function createTd(tr,name){
    let td=document.createElement("TD");
    tr.setAttribute("id", name);
    let text = document.createTextNode(name)
    td.appendChild(text)
    tr.appendChild(td);
  }


//selectProduct: the function allow the button to choose
function selectProduct(elm) {
    const btn = document.getElementById("submitForm");
    if(elm.selectedIndex){
        // elm.options[elm.selectedIndex].value
        btn.disabled  = false;
    }
    else{
        btn.disabled  = true;
    }
}
function selectProduct2(elm) {
    const btn = document.getElementById("submitFor");
    if(elm.selectedIndex){
        btn.disabled  = false;
    }
    else{
        btn.disabled  = true;
    }
}

  

  //this function saves all the chances on the data base
  function save(){
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    const xhr = new FXMLHttpRequest();
    xhr.fOnreadystatechange = ()=>{
        if (xhr.status == 200 && xhr.readyState==4) {
          alert("your details are saved!!✔")
        }
    }
    xhr.open("PUT", url, true);
    xhr.send(JSON.stringify(myUser));
  }

  //the function comput the user total price
function computPrice(myUser){
    let sum = 0;
    myUser.items.forEach(element => {
        sum += element.price * element.amount;
    });
    return sum;
}