if (!localStorage.getItem('users')) {
    localStorage.setItem('users', '[]');
}
if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', 'null');
}
if (!localStorage.getItem('i')) {
    localStorage.setItem('i', 'null');
}
let currentUser;
let index;


const messagesPas = document.getElementById("messagesPas");
const messagesName = document.getElementById("messagesName");
const messages = document.getElementById("messages");
const messagesPa = document.getElementById("messagesPa");
const span=document.querySelectorAll('.container span');

function herfGame(){
    if(JSON.parse(localStorage.getItem('currentUser'))!==null){
        document.getElementById( 'game').href="./index.html";
    }
}

function logIn() {
    const name = document.querySelectorAll('#id01 input')[0].value;
    const pasw = document.querySelectorAll('#id01 input')[1].value;
    let users = JSON.parse(localStorage.getItem('users'));
    let pas = false;
    let userName = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            userName = true;
        } if (users[i].password === pasw) {
             pas = true;
        }if(userName===true && pas===true)
        {
            currentUser=users[i];
            localStorage.setItem('currentUser', JSON.stringify(users[i]));
            localStorage.setItem('i', JSON.stringify(i));
            index=i;
        }
    }
    if (!userName) {
        span.forEach(element => {
            element.innerHTML="";
        });
        messagesName.innerHTML = 'There is a worng  in the name';
    }
    if (!pas) {
        console.log("password")
        span.forEach(element => {
            element.innerHTML="";
        });
        messagesPas.innerHTML = 'There is a worng in the password ';
    } if (!userName && !pas) {
        span.forEach(element => {
            element.innerHTML="";
        });
        messages.innerHTML = 'There is a worng in the password and in the name';
    }
    else if (userName && pas) {
        document.getElementById('id01').style.display = 'none';
    }


}

function signUp() {
    const nameCurrent = document.querySelectorAll('#id02 input')[0].value;
    const emailCurrent = document.querySelectorAll('#id02 input')[1].value;
    const pasCurrent = document.querySelectorAll('#id02 input')[2].value;
    const rePasCurrent = document.querySelectorAll('#id02 input')[3].value;

    if (pasCurrent !== rePasCurrent)
    {
        messagesPa.innerHTML = 'enter the reapet password again';
    }else{
        document.getElementById('id02').style.display = 'none';
    }
    const newUse = {
        name: nameCurrent,
        email: emailCurrent,
        password: pasCurrent,
        game: 0,
        win: 0
    }
    let is=false
    let users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === nameCurrent && users[i].password===pasCurrent && users[i].email===emailCurrent) {
            is = true;
            currentUser=users[i];
            localStorage.setItem('currentUser', JSON.stringify(users[i]));
            localStorage.setItem('i', JSON.stringify(i));
            index=i;
        } 
    }
    if(!is)
    {
        users.push(newUse);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser=newUse;
        localStorage.setItem('currentUser', JSON.stringify(newUse));
        localStorage.setItem('i', JSON.stringify(users.length));
        index=users.length;
    }

}

function logOut() {
        
    console.log
        if(currentUser===null)
        {
            alert("you didnt log in")
        }
        else{
            currentUser=null;
            localStorage.setItem('currentUser', 'null');
            localStorage.setItem('i', 'null');
            index=0;
            alert("you log out succefuly")
        }
   
}



