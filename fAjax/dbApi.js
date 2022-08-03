
//find1:getting an arr and a value
//the function return the index of the
//object that contain the name, in the arr.
const findU = (users, id)=>{
    for (let index = 0 ; index < users.length; index++){
        if (users[index].name === id) {
            return index;
        }
    }
    return null;
}

//the function add new user to the arr users
function addUser(user){
    let arrUsers = JSON.parse(getUsers());
    if (!arrUsers){
        arrUsers=[];
    }
    arrUsers.push(JSON.parse(user));
    setUsers(JSON.stringify(arrUsers));
    return true;
}

//return the current user by id
function currentUser(name){
    let arrUsers =  JSON.parse(getUsers());
    let user = null;
    if (arrUsers != null){
        const index = findU(arrUsers, JSON.parse(name));
        if (index != null)user = arrUsers[index];
    }
    return JSON.stringify(user);
}


//remove user from the users arr by id
function removeUser(name){
    let arrUsers = JSON.parse(getUsers());
    try {
        arrUsers.splice(findU(arrUsers, JSON.parse(name)),1);
        setUsers(JSON.stringify(arrUsers));
    } catch (error) {
        return error;
    }
    return true;
}


//function to update user`s details
function changeUser(user){
    const myUser = JSON.parse(user);
    let arrUsers = JSON.parse(getUsers());
    try {
        arrUsers[findU(arrUsers, myUser.name)] = myUser;
        setUsers(JSON.stringify(arrUsers));
    } catch (error) {
        return error;
    }
    return true;
}

//deleteUser
function deleteUser(user){
    myUser = JSON.parse(user);
    users = JSON.parse(getUsers());
    users.splice(findU(users, user.name), 1);
    setUsers(JSON.stringify(users));
    return true;
}