
function setUsers(users){
    localStorage.setItem("users", users);
}

function getUsers(){
    const users = localStorage.getItem("users");
    return users;
}