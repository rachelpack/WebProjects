class FXMLHttpRequest{

    constructor(){
        this.request = null;
        this.response = null;
        this.status = 404;
        this.readyState = 0;
        this.fOnreadystatechange = null;
    }

    open(method, url, bool){
        this.request = {
            method:method,
            url:url,
            bool:bool,
            body:null
        }
        this.readyState = 1;
        this.fOnreadystatechange();
    }

    send(bodyData){
        this.readyState = 2;
        this.fOnreadystatechange();        
        
        this.request.body = JSON.parse(bodyData);
        this.readyState = 3;
        this.fOnreadystatechange();
        
        try {
            this.response = sendRequest(JSON.stringify(this.request));

            this.status = 200;
            this.readyState = 4;
            this.fOnreadystatechange();
            

        } catch (er) {
            this.status = er;
            this.fOnreadystatechange();
        }
    }
}