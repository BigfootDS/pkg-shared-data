
/**
 * @class
 * @classdesc Error containing information about a poorly-made user request, due to bad request data. This error is used when validationg a user request at the controller level.
 * @extends Error
 */
class DataValidationRequestFailure extends Error {

	/**
	 * Create a new instance of this Error.
	 * @param {string} message Preset message. Can be overriden, optionally.
	 */
	constructor(message = "Provided data was not suitable for this request."){
		super(message);

		/**
		 * Description of the error. This message IS user-facing.
		 */
		this.message = message;

		/**
		 * Name of the error object.
		 */
		this.name = this.constructor.name;

		/**
		 * HTTP status code to use or show when working with this error.
		 */
		this.httpStatus = 400;

		/**
		 * Identifier code to identify the error's general source, such as a BigfootDS API, a specific package, or some other source.
		 * 
		 * This code IS user-facing, and while multiple instances of this error can have this code, different error classes should have different codes.
		 */
		this.bdsCode = "BDS-DVF-01";


		Error.captureStackTrace(this, this.constructor);
	}
}


/**
 * @class
 * @classdesc Error containing information about a poorly-made user request, due to bad request data. This error is used when validating a user request at the database level.
 * @extends Error
 */
class DataValidationDatabaseFailure extends Error {

	/**
	 * Create a new instance of this Error.
	 * @param {string} message Preset message. Can be overriden, optionally.
	 */
	constructor(message = "Provided data was not suitable for this database operation."){
		super(message);

		/**
		 * Description of the error. This message IS user-facing.
		 */
		this.message = message;

		/**
		 * Name of the error object.
		 */
		this.name = this.constructor.name;

		/**
		 * HTTP status code to use or show when working with this error.
		 */
		this.httpStatus = 400;

		/**
		 * Identifier code to identify the error's general source, such as a BigfootDS API, a specific package, or some other source.
		 * 
		 * This code IS user-facing, and while multiple instances of this error can have this code, different error classes should have different codes.
		 */
		this.bdsCode = "BDS-DVF-02";


		Error.captureStackTrace(this, this.constructor);
	}
}



/**
 * @class
 * @classdesc Error containing information about a poorly-made user request, due to bad request data. This error is used when a user attempts to log in as a non-existent user.
 * @extends Error
 */
class LoginFailureNoUser extends Error {

	/**
	 * Create a new instance of this Error.
	 * @param {string} message Preset message. Can be overriden, optionally.
	 */
	constructor(message = "Invalid user attempted to login."){
		super(message);

		/**
		 * Description of the error. This message IS user-facing.
		 */
		this.message = message;

		/**
		 * Name of the error object.
		 */
		this.name = this.constructor.name;

		/**
		 * HTTP status code to use or show when working with this error.
		 */
		this.httpStatus = 401;

		/**
		 * Identifier code to identify the error's general source, such as a BigfootDS API, a specific package, or some other source.
		 * 
		 * This code IS user-facing, and while multiple instances of this error can have this code, different error classes should have different codes.
		 */
		this.bdsCode = "BDS-LFU-01";


		Error.captureStackTrace(this, this.constructor);
	}
}



/**
 * @class
 * @classdesc Error containing information about a poorly-made user request, due to bad request data. This error is used when a user attempts to log in as a valid user with invalid credentials.
 * @extends Error
 */
class LoginFailureWrongCredentials extends Error {

	/**
	 * Create a new instance of this Error.
	 * @param {string} message Preset message. Can be overriden, optionally.
	 */
	constructor(message = "Invalid credentials used to login."){
		super(message);

		/**
		 * Description of the error. This message IS user-facing.
		 */
		this.message = message;

		/**
		 * Name of the error object.
		 */
		this.name = this.constructor.name;

		/**
		 * HTTP status code to use or show when working with this error.
		 */
		this.httpStatus = 401;

		/**
		 * Identifier code to identify the error's general source, such as a BigfootDS API, a specific package, or some other source.
		 * 
		 * This code IS user-facing, and while multiple instances of this error can have this code, different error classes should have different codes.
		 */
		this.bdsCode = "BDS-LFU-02";


		Error.captureStackTrace(this, this.constructor);
	}
}


/**
 * @class
 * @classdesc Error to return when the request is correct, the server operates correctly, but the desired data just is not found.
 * @extends Error
 */
class DataRetrievalFailure extends Error {

	/**
	 * Create a new instance of this Error.
	 * @param {string} message Preset message. Can be overriden, optionally.
	 */
	constructor(message = "Requested data was not found."){
		super(message);

		/**
		 * Description of the error. This message IS user-facing.
		 */
		this.message = message;

		/**
		 * Name of the error object.
		 */
		this.name = this.constructor.name;

		/**
		 * HTTP status code to use or show when working with this error.
		 */
		this.httpStatus = 404;

		/**
		 * Identifier code to identify the error's general source, such as a BigfootDS API, a specific package, or some other source.
		 * 
		 * This code IS user-facing, and while multiple instances of this error can have this code, different error classes should have different codes.
		 */
		this.bdsCode = "BDS-DRF-01";


		Error.captureStackTrace(this, this.constructor);
	}
}





module.exports = {
	DataValidationRequestFailure, DataValidationDatabaseFailure,
	LoginFailureNoUser, LoginFailureWrongCredentials,
	DataRetrievalFailure
}