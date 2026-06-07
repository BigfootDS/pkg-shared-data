/**
 * Error used when controller-level request validation fails.
 *
 * The message and `bdsCode` are user-facing, so callers can safely expose them
 * in API responses or validation summaries.
 */
export class DataValidationRequestFailure extends Error {
	/**
	 * HTTP status code that should be returned with this error.
	 */
	httpStatus: number;

	/**
	 * Stable BigfootDS error identifier for controller-level validation failures.
	 */
	bdsCode: string;

	/**
	 * Creates a request-validation error with an optional user-facing message.
	 */
	constructor(message = "Provided data was not suitable for this request.") {
		super(message);

		this.message = message;
		this.name = this.constructor.name;
		this.httpStatus = 400;
		this.bdsCode = "BDS-DVF-01";

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Error used when database-level validation rejects otherwise well-formed request data.
 *
 * Use this when the controller accepted the request shape, but persistence rules
 * or database constraints make the operation invalid.
 */
export class DataValidationDatabaseFailure extends Error {
	/**
	 * HTTP status code that should be returned with this error.
	 */
	httpStatus: number;

	/**
	 * Stable BigfootDS error identifier for database-level validation failures.
	 */
	bdsCode: string;

	/**
	 * Creates a database-validation error with an optional user-facing message.
	 */
	constructor(message = "Provided data was not suitable for this database operation.") {
		super(message);

		this.message = message;
		this.name = this.constructor.name;
		this.httpStatus = 400;
		this.bdsCode = "BDS-DVF-02";

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Error used when a login attempt references a user that does not exist.
 */
export class LoginFailureNoUser extends Error {
	/**
	 * HTTP status code that should be returned with this error.
	 */
	httpStatus: number;

	/**
	 * Stable BigfootDS error identifier for missing-user login failures.
	 */
	bdsCode: string;

	/**
	 * Creates a missing-user login error with an optional user-facing message.
	 */
	constructor(message = "Invalid user attempted to login.") {
		super(message);

		this.message = message;
		this.name = this.constructor.name;
		this.httpStatus = 401;
		this.bdsCode = "BDS-LFU-01";

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Error used when a valid user attempts to log in with invalid credentials.
 */
export class LoginFailureWrongCredentials extends Error {
	/**
	 * HTTP status code that should be returned with this error.
	 */
	httpStatus: number;

	/**
	 * Stable BigfootDS error identifier for invalid-credential login failures.
	 */
	bdsCode: string;

	/**
	 * Creates an invalid-credential login error with an optional user-facing message.
	 */
	constructor(message = "Invalid credentials used to login.") {
		super(message);

		this.message = message;
		this.name = this.constructor.name;
		this.httpStatus = 401;
		this.bdsCode = "BDS-LFU-02";

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Error used when a valid request cannot find the requested data.
 */
export class DataRetrievalFailure extends Error {
	/**
	 * HTTP status code that should be returned with this error.
	 */
	httpStatus: number;

	/**
	 * Stable BigfootDS error identifier for data-not-found failures.
	 */
	bdsCode: string;

	/**
	 * Creates a data-retrieval error with an optional user-facing message.
	 */
	constructor(message = "Requested data was not found.") {
		super(message);

		this.message = message;
		this.name = this.constructor.name;
		this.httpStatus = 404;
		this.bdsCode = "BDS-DRF-01";

		Error.captureStackTrace(this, this.constructor);
	}
}
