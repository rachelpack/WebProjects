let matTen = []
let matTwenty = [];
let matThirty = [];
let array = [];
let counter = 0;
let level = 10;
let flag = level;
let seconds;
const board = 8;
const buttonLevel1 = document.getElementsByClassName("level")[0]
const buttonLevel2 = document.getElementsByClassName("level")[1]
const buttonLevel3 = document.getElementsByClassName("level")[2]
let timer1 = document.getElementById('timer');
let time = 0;

//creat the matrix for level 1
for (let i = 0; i < board; i++) {
    array = []
    for (let j = 0; j < board; j++) {
        let num = { value: 0, class: "regular", cheaked: false }
        array.push(num);
    }
    matTen.push(array);

}
//creat the matrix for level 2
for (let i = 0; i < board * 2; i++) {
    array = []
    for (let j = 0; j < board * 2; j++) {
        let num = { value: 0, class: "regular", cheaked: false }
        array.push(num);
    }
    matTwenty.push(array);

}
//creat the matrix for level 3
for (let i = 0; i < board * 2; i++) {
    array = []
    for (let j = 0; j < board * 4 - 4; j++) {
        let num = { value: 0, class: "regular", cheaked: false }
        array.push(num);
    }
    matThirty.push(array);

}
//the timer function
let timer = setTimeout(function myTimer() {
    time++;
    timer1.innerHTML = `<p>⏰time: ${Math.floor(time/60)}:${time%60} </p>`;
    timer = setTimeout(myTimer, 1000);
}, 1000);

//start game in first time
function startGame() {
    cheakLevel();
    randomBomb(matTen, board, board);
    creatTable(matTen, board, board);
}
//start the game after the win or fail
function startAgain(mat, row, column) {
    let modal = document.querySelectorAll('main>div')[0];
    // console.log(document.querySelector('div'))
    modal.style.display = 'none';
    let modal2 = document.querySelector('main span');
    modal2.style.display = 'none';
    flag = level;
    counter = 0;
    removeMat(mat, row, column);
    randomBomb(mat, row, column);
    creatTable(mat, row, column);
}
//call to the function with the suitable mat and board 
function cheakLevel() {
    // let buttonLevel1
    buttonLevel1.addEventListener('click', () => {
        level = 10;
        flag = level;
        counter = 0;
        removeMat(matTen, board, board);
        randomBomb(matTen, board, board);
        creatTable(matTen, board, board);
    });
    buttonLevel1.classList = "level";
    document.querySelector('footer').appendChild(buttonLevel1);
    // let buttonLevel2
    buttonLevel2.addEventListener('click', () => {
        level = 40;
        flag = level;
        counter = 0;
        removeMat(matTwenty, board * 2, board * 2);
        randomBomb(matTwenty, board * 2, board * 2);
        creatTable(matTwenty, board * 2, board * 2);
    })
    buttonLevel2.classList = "level";
    document.querySelector('footer').appendChild(buttonLevel2);
    // let buttonLevel3
    buttonLevel3.addEventListener('click', () => {
        level = 99;
        flag = level;
        counter = 0;
        removeMat(matThirty, board * 2, board * 4 - 4);
        randomBomb(matThirty, board * 2, board * 4 - 4);
        creatTable(matThirty, board * 2, board * 4 - 4);
    })
    buttonLevel3.classList = "level";
    document.querySelector('footer').appendChild(buttonLevel3);

}

//write the play you played and the game you won and e pesent of secces
function write() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let add = document.querySelectorAll('aside>p')
    add[0].innerHTML = `number of game you play: ${currentUser.game}`
    add[1].innerHTML = `number of game you win: ${currentUser.win}`
    add[2].innerHTML = `persent of secces: ${Math.floor((currentUser.win * 100) / currentUser.game)}%`
}
//refresh he mat and remove the table
function removeMat(mat, row, column) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < column; j++) {
            mat[i][j].value = 0;
            mat[i][j].class = "regular";
        }
    }
    document.querySelector('main').removeChild(document.getElementById('game'));

}

//function random bomb and change the value to -1
//and call to the set value function
function randomBomb(mat, row1, column1) {
    let row;
    let column;
    for (let i = 0; i < level; i++) {
        row = Math.floor(Math.random() * row1);
        column = Math.floor(Math.random() * column1);
        if (mat[row][column].value !== -1) {
            mat[row][column].value = -1;
            mat[row][column].class = "bomb";
            setValue(mat, row, column, row1, column1);
        } else {
            i--;
        }
    }
}

//function increes the value in the td near the bomb
function setValue(mat, i, j, row, column) {
    if (i !== 0) {
        if (mat[i - 1][j].value !== -1) {
            ++mat[i - 1][j].value;
        }
        if (j !== 0) {
            if (mat[i - 1][j - 1].value !== -1) {
                ++mat[i - 1][j - 1].value;
            }
        }
        if (j !== (column - 1)) {
            if (mat[i - 1][j + 1].value !== -1) {
                ++mat[i - 1][j + 1].value;
            }
        }
    }
    if (i !== (row - 1)) {
        if (mat[i + 1][j].value !== -1) {
            ++mat[i + 1][j].value;
        }
        if (j !== 0) {
            if (mat[i + 1][j - 1].value !== -1) {
                ++mat[i + 1][j - 1].value;
            }
        }
        if (j !== (column - 1)) {
            if (mat[i + 1][j + 1].value !== -1) {
                ++mat[i + 1][j + 1].value;
            }
        }
    }
    if (j !== 0 && mat[i][j - 1].value !== -1) {
        ++mat[i][j - 1].value;
    }
    if (j !== (column - 1) && mat[i][j + 1].value !== -1) {
        ++mat[i][j + 1].value;
    }

}

//the function creat table in the suitable size
function creatTable(mat, row, column) {
    timer1.innerHTML = `<p>⏰time: ${time} </p>`;
    time = 0;
    let table = document.createElement('table');
    table.id = "game";
    for (let i = 0; i < row; ++i) {
        let tr = document.createElement('tr');
        for (let j = 0; j < column; ++j) {
            let td = document.createElement('td');
            let img = document.createElement('img');
            img.src = "../img/MS.GIF"
            img.style.width = "50px";
            img.addEventListener('click', (event) => changeImg(mat, event, i, j, row, column));
            img.addEventListener('contextmenu', (event) => putFlag(mat, event, i, j, row, column));
            td.appendChild(img);
            td.classList = mat[i][j].class;
            td.classList += " td"
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.querySelector('main').appendChild(table);
    let sumFlags = document.getElementById("flags");
    sumFlags.innerHTML = `<p>🚩flags: ${flag} </p>`;
    write()
}

//open the numbers or bomb
function changeImg(mat, event, i, j, row, column) {
    document.querySelector('#one').play();
    if (mat[i][j].class === "regular") {
        switch (mat[i][j].value) {
            case 0: {
                // findZeroToOpen(mat,i,j)
                mat[i][j].class = "num0"
                event.target.src = "../img/0.png"
                break;
            }
            case 1: {
                mat[i][j].class = "num1"
                event.target.src = "../img/1.png"
                break;
            }
            case 2: {
                mat[i][j].class = "num2"
                event.target.src = "../img/2.png"
                break;
            }
            case 3: {
                mat[i][j].class = "num3"
                event.target.src = "../img/3.png"
                break;
            }
            case 4: {
                mat[i][j].class = "num4"
                event.target.src = "../img/4.png"
                break;
            }
            case 5: {
                mat[i][j].class = "num5"
                event.target.src = "../img/5.png"
                break;
            }
            case 6: {
                mat[i][j].class = "num6"
                event.target.src = "../img/6.png"
                break;
            }
            case 7: {
                mat[i][j].class = "num7"
                event.target.src = "../img/7.png"
                break;
            }
            case 8: {
                mat[i][j].class = "num8"
                event.target.src = "../img/8.png"
                break;
            }
        }
        //open all the bomb
    } else if (mat[i][j].class === "bomb") {
        document.querySelectorAll('.bomb').forEach(ele => {
            ele.className="b"
            ele.children[0].src = "../img/bomb.png";
        });
        failGame(mat, row, column);
    }
}

//put flags and remove flags
function putFlag(mat, event, i, j, row, column) {
    document.querySelector('#two').play();
    event.preventDefault(event);
    if (mat[i][j].class === "bomb" || mat[i][j].class === "regular") {
        if (mat[i][j].class === "bomb") {
            counter++;
            if (counter >= level) {
                winGame(mat, row, column);
            }
        }
        mat[i][j].class = "flag"
        event.target.src = "../img/flag.png"
        flag--;
    } else if (mat[i][j].class === "flag") {
        mat[i][j].class = "bomb"
        flag++;
        event.target.src = "../img/MS.GIF";
        counter--;
    } else if (mat[i][j].class === "flag") {
        mat[i][j].class = "regular"
        event.target.src = "../img/MS.GIF"
        flag++;
    }
    let sumFlags = document.getElementById("flags");
    sumFlags.innerHTML = `<p>🚩flags: ${flag} </p>`;
}

//finish the game in event of fail 
//and update the local storge
function failGame(mat, row, column) {
    seconds = time;
    document.getElementById('button').addEventListener('click', () => startAgain(mat, row, column))
    let modal = document.querySelectorAll('main>div')[0];
    modal.style.display = 'block';
    let modal2 = document.querySelector('main span');
    modal2.style.display = 'block';
    let modal3 = document.querySelectorAll('main span p');
    modal3[0].innerHTML = `<p>your time is: ${Math.floor(seconds/60)}:${seconds%60} </p>`;
    modal3[1].innerHTML = `<p>you fail </p>`;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let i = JSON.parse(localStorage.getItem('i'));
    let users = JSON.parse(localStorage.getItem('users'));
    currentUser.game += 1;
    users.pop(users[i]);
    users.push(currentUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('i', JSON.stringify(users.length));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    i = users.length - 1;

}
//finish the game in event of win
//and update the local storge
function winGame(mat, row, column) {
    seconds = time;
    document.getElementById('button').addEventListener('click', () => startAgain(mat, row, column))
    // console.log(document.querySelectorAll('main>div')[2])
    let modal = document.querySelectorAll('main>div')[0];
    modal.style.display = 'block';
    let modal2 = document.querySelector('main span');
    modal2.style.display = 'block';
    let modal3 = document.querySelectorAll('main span p');
    modal3[0].innerHTML = `<p>your time is: ${Math.floor(seconds/60)}:${seconds%60}</p>`;
    // modal3[2].style.display='none'
    modal3[2].innerHTML = `<p>you win </p>`;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let i = JSON.parse(localStorage.getItem('i'));
    let users = JSON.parse(localStorage.getItem('users'));
    currentUser.game += 1;
    currentUser.win += 1;
    users.pop(users[i]);
    users.push(currentUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('i', JSON.stringify(users.length));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    i = users.length - 1;
}

function rul() {
    let rul = document.getElementById("ruls");
    document.addEventListener('click', () => {
        rul.style.display = "block";
    })
}
function x() {
    let rul = document.getElementById("ruls");
    document.addEventListener('click', () => {
        rul.style.display = "none";
    })
}

