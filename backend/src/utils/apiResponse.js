class apiResponse {
    constructor(statusCode, data, massage = "Suceess"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = massage;
        this.suceess = statusCode < 400; 
    }
}

export {apiResponse}