const httpStatusCodes = require("./httpStatusCodes")

class ApplicationError extends Error {
    constructor(details = {}) {
        // Pass along the message to the NodeJS Error class.
        super(details.message);
        
        // Store provided details to be processed by other methods.
        // All getters calculate data based on whatever is in here as-needed.
        this.details = details;

        // Make sure the error at least has some core info
        if (!this.statusCode || !this.message){
            this.IncompleteErrorConstruction();
        }
    }

    IncompleteErrorConstruction (){
        // Throw an internal error if core info is missing
        throw new ApplicationError({
            message: "Missing parameters on error construction.",
            statusCode:httpStatusCodes.serverError.INTERNAL_SERVER_ERROR
        });
    }

    // Give each error a meaningful name.
    // This is hard-coded, but can be overriden by errors inheriting from this class.
    get name(){
        return "BigfootDS API Server Error";
    }

    // Standardized HTTP status code
    // This is ALWAYS a number, corresponding to some codes found here:
    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    get statusCode(){
        try {
            return this.details.statusCode;
        }
        catch (error){
            return null;
        }
    }

    // Prepend a BigfootDS identifier to the standardized error code
    // so that it can be identified on devices that have their own set of error codes.
    get bdsStatusCode(){
        return "BDS-"+this.statusCode.toString();
    }

    // String version of the object should show the stacktrace for internal debugging.
    toString(){
        return `${this.name}
${this.bdsStatusCode}
${this.statusCode}
${this.message}
Stacktrace:
    ${this.stack}`;
    }

    // JSON version of the object should NOT show the stacktrace, as this may be sent to client devices.
    toJSON(){
        return {
            name: this.name,
            bdsStatusCode: this.bdsStatusCode,
            statusCode: this.statusCode,
            message: this.message
        }
    }
}

module.exports = {
    ApplicationError
}