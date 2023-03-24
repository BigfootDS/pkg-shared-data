


const DataValidationRequestFailure = new Error("Provided data was not suitable for this request.");
DataValidationRequestFailure.status = 400;
DataValidationRequestFailure.bdsCode = "BDS-DVF-01";

const DataValidationDatabaseFailure = new Error("Provided data was not suitable for this request.");
DataValidationDatabaseFailure.status = 400;
DataValidationDatabaseFailure.bdsCode = "BDS-DVF-02";

const LoginFailureNoUser = new Error("Invalid user attempted to login.");
LoginFailureNoUser.status = 401;
LoginFailureNoUser.bdsCode = "BDS-LFU-01";

const LoginFailureWrongCredentials = new Error("Incorrect credentials used to login.");
LoginFailureWrongCredentials.status = 401;
LoginFailureWrongCredentials.bdsCode = "BDS-LFU-02";

const DataRetrievalFailure = new Error("Requested data was not found.");
DataRetrievalFailure.status = 404;
DataRetrievalFailure.bdsCode = "BDS-DRF-01";



module.exports = {
	DataValidationRequestFailure, DataValidationDatabaseFailure,
	LoginFailureNoUser, LoginFailureWrongCredentials,
	DataRetrievalFailure
}