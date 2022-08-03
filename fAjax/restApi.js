
function sendRequest(request){

    const currentRequest = JSON.parse(request);

    if (currentRequest.url != "http://Rachel&Tamar") {
        throw 404;
    }

    switch (currentRequest.method) {

        case "GET":{
            //GET: to get all the users
            if (currentRequest.body == null) {
                return JSON.stringify(getAllUsers());
            }
            //GET: to get the current user by id and psw
            else{
                let user =  JSON.parse(currentUser(JSON.stringify(currentRequest.body.name)));
                if (user == null) {
                    throw (501);
                }
                else if (user.psw != currentRequest.body.psw) {
                    throw (205);
                }
                return JSON.stringify(user);
            }
        }

        case "POST":{
            if (!checkUsername(currentRequest.body.name) || !checkEmail(currentRequest.body.mail)) {
                throw 305;
            }
            if (JSON.parse(currentUser(JSON.stringify(currentRequest.body.name))) != null) {
                throw (205);
            }
            if (addUser(JSON.stringify(currentRequest.body)) != true){
                throw (400);
            }
            break;
        }

        case "PUT":{
            if (!checkUsername(currentRequest.body.name) || !checkEmail(currentRequest.body.mail)) {
                throw 305;
            }
            if (changeUser(JSON.stringify(currentRequest.body)) != true){
                throw 400;
            }
            break;
        }
        
        case "DELETE":{
            if (deleteUser(JSON.stringify(currentRequest.body)) != true){
                throw 400;
            }
            break;      
        }

        default:{
            throw 400;
        }
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkUsername(Username){
    if (typeof(Username) == "string" && Username.length > 2) {
        return true;
    }
    return false;
}

function checkEmail(Email){
    let regu = /^\w{2,10}@(gmail[.]com|\w{2,10}[.]co[.]il)$/i;
    return regu.test(Email);
}

