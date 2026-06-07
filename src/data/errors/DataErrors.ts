import { clientError, serverError } from "../httpStatusCodes";

type ObjectValue<T> = T[keyof T];

/**
 * HTTP status codes used by BigfootDS API error classes.
 */
export type ApiErrorHttpStatusCode =
	ObjectValue<typeof clientError> | ObjectValue<typeof serverError>;

/**
 * Broad area of the API where an error occurred.
 */
export type ApiErrorCategory =
	| "authentication"
	| "authorization"
	| "data"
	| "database"
	| "rateLimit"
	| "token"
	| "validation";

/**
 * Static metadata used to construct a BigfootDS API error.
 */
export interface ApiErrorDefinition {
	/**
	 * Stable BigfootDS error identifier.
	 */
	bdsCode: string;

	/**
	 * Broad area of the API where an error occurred.
	 */
	category: ApiErrorCategory;

	/**
	 * Default message used when callers do not supply a more specific message.
	 */
	defaultMessage: string;

	/**
	 * Whether this error message is safe to expose in an API response.
	 */
	exposeMessage: boolean;

	/**
	 * HTTP status code that should be returned with this error.
	 */
	httpStatus: ApiErrorHttpStatusCode;
}

/**
 * Optional values accepted by all BigfootDS API error constructors.
 */
export interface ApiErrorOptions {
	/**
	 * Internal or structured context that helps callers log or format this error.
	 */
	details?: unknown;

	/**
	 * User-facing or log-facing message that overrides the class default.
	 */
	message?: string;

	/**
	 * Lower-level error that caused this API error.
	 */
	cause?: unknown;
}

/**
 * Backwards-compatible constructor input.
 *
 * Existing callers can still pass a plain message string. New callers can pass
 * an object when they need `details` or `cause`.
 */
export type ApiErrorInput = string | ApiErrorOptions;

/**
 * JSON-friendly representation of a BigfootDS API error.
 */
export interface ApiErrorJson {
	bdsCode: string;
	category: ApiErrorCategory;
	details?: unknown;
	httpStatus: ApiErrorHttpStatusCode;
	message: string;
	name: string;
}

/**
 * Central registry for the shared API error classes.
 */
export const dataErrorDefinitions = {
	DataValidationRequestFailure: {
		bdsCode: "BDS-DVF-01",
		category: "validation",
		defaultMessage: "Provided data was not suitable for this request.",
		exposeMessage: true,
		httpStatus: clientError.BAD_REQUEST
	},
	DataValidationDatabaseFailure: {
		bdsCode: "BDS-DVF-02",
		category: "validation",
		defaultMessage: "Provided data was not suitable for this database operation.",
		exposeMessage: true,
		httpStatus: clientError.UNPROCESSABLE_ENTITY
	},
	DataCreationFailure: {
		bdsCode: "BDS-DCR-01",
		category: "database",
		defaultMessage: "Data could not be created.",
		exposeMessage: false,
		httpStatus: serverError.INTERNAL_SERVER_ERROR
	},
	DataRetrievalFailure: {
		bdsCode: "BDS-DRF-01",
		category: "data",
		defaultMessage: "Requested data was not found.",
		exposeMessage: true,
		httpStatus: clientError.NOT_FOUND
	},
	DataUpdateFailure: {
		bdsCode: "BDS-DUP-01",
		category: "database",
		defaultMessage: "Data could not be updated.",
		exposeMessage: false,
		httpStatus: serverError.INTERNAL_SERVER_ERROR
	},
	DataDeletionFailure: {
		bdsCode: "BDS-DDE-01",
		category: "database",
		defaultMessage: "Data could not be deleted.",
		exposeMessage: false,
		httpStatus: serverError.INTERNAL_SERVER_ERROR
	},
	DataConflictFailure: {
		bdsCode: "BDS-DCO-01",
		category: "data",
		defaultMessage: "Requested data change conflicts with existing data.",
		exposeMessage: true,
		httpStatus: clientError.CONFLICT
	},
	AuthenticationRequired: {
		bdsCode: "BDS-AUT-01",
		category: "authentication",
		defaultMessage: "Authentication is required for this request.",
		exposeMessage: true,
		httpStatus: clientError.UNAUTHORIZED
	},
	ActionProhibited: {
		bdsCode: "BDS-ACT-01",
		category: "authorization",
		defaultMessage: "This action is not permitted for the current user.",
		exposeMessage: true,
		httpStatus: clientError.FORBIDDEN
	},
	LoginFailureNoUser: {
		bdsCode: "BDS-LFU-01",
		category: "authentication",
		defaultMessage: "Invalid user attempted to login.",
		exposeMessage: true,
		httpStatus: clientError.UNAUTHORIZED
	},
	LoginFailureWrongCredentials: {
		bdsCode: "BDS-LFU-02",
		category: "authentication",
		defaultMessage: "Invalid credentials used to login.",
		exposeMessage: true,
		httpStatus: clientError.UNAUTHORIZED
	},
	EmailNotSuitable: {
		bdsCode: "BDS-ENS-01",
		category: "validation",
		defaultMessage: "Provided email address is not suitable.",
		exposeMessage: true,
		httpStatus: clientError.UNPROCESSABLE_ENTITY
	},
	PasswordNotSuitable: {
		bdsCode: "BDS-PNS-01",
		category: "validation",
		defaultMessage: "Provided password is not suitable.",
		exposeMessage: true,
		httpStatus: clientError.UNPROCESSABLE_ENTITY
	},
	JWTExpired: {
		bdsCode: "BDS-JWE-01",
		category: "authentication",
		defaultMessage: "Provided authentication token has expired.",
		exposeMessage: true,
		httpStatus: clientError.UNAUTHORIZED
	},
	TokenNotFound: {
		bdsCode: "BDS-TNF-01",
		category: "token",
		defaultMessage: "Requested token was not found.",
		exposeMessage: true,
		httpStatus: clientError.NOT_FOUND
	},
	WrongTokenType: {
		bdsCode: "BDS-WTT-01",
		category: "token",
		defaultMessage: "Provided token is not suitable for this request.",
		exposeMessage: true,
		httpStatus: clientError.UNPROCESSABLE_ENTITY
	},
	RateLimitExceeded: {
		bdsCode: "BDS-RLE-01",
		category: "rateLimit",
		defaultMessage: "Too many requests were submitted.",
		exposeMessage: true,
		httpStatus: clientError.TOO_MANY_REQUESTS
	},
	DatabaseUnavailable: {
		bdsCode: "BDS-DBU-01",
		category: "database",
		defaultMessage: "Database service is unavailable.",
		exposeMessage: false,
		httpStatus: serverError.SERVICE_UNAVAILABLE
	}
} as const satisfies Record<string, ApiErrorDefinition>;

export type DataErrorName = keyof typeof dataErrorDefinitions;

function resolveApiErrorOptions(input?: ApiErrorInput): ApiErrorOptions {
	if (typeof input === "string") {
		return { message: input };
	}

	return input ?? {};
}

/**
 * Base class for BigfootDS API errors.
 */
export abstract class BigfootDSError extends Error {
	/**
	 * Stable BigfootDS error identifier.
	 */
	readonly bdsCode: string;

	/**
	 * Broad area of the API where an error occurred.
	 */
	readonly category: ApiErrorCategory;

	/**
	 * Internal or structured context that helps callers log or format this error.
	 */
	readonly details?: unknown;

	/**
	 * Whether this error message is safe to expose in an API response.
	 */
	readonly exposeMessage: boolean;

	/**
	 * HTTP status code that should be returned with this error.
	 */
	readonly httpStatus: ApiErrorHttpStatusCode;

	protected constructor(definition: ApiErrorDefinition, input?: ApiErrorInput) {
		const options = resolveApiErrorOptions(input);
		const message = options.message ?? definition.defaultMessage;
		const errorOptions = options.cause === undefined ? undefined : { cause: options.cause };

		super(message, errorOptions);

		this.name = this.constructor.name;
		this.bdsCode = definition.bdsCode;
		this.category = definition.category;
		this.exposeMessage = definition.exposeMessage;
		this.httpStatus = definition.httpStatus;

		if (options.details !== undefined) {
			this.details = options.details;
		}

		Object.setPrototypeOf(this, new.target.prototype);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}

	/**
	 * Returns the stable API payload fields for this error.
	 */
	toJSON(): ApiErrorJson {
		const json: ApiErrorJson = {
			bdsCode: this.bdsCode,
			category: this.category,
			httpStatus: this.httpStatus,
			message: this.message,
			name: this.name
		};

		if (this.details !== undefined) {
			json.details = this.details;
		}

		return json;
	}
}

/**
 * Error used when controller-level request validation fails.
 */
export class DataValidationRequestFailure extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DataValidationRequestFailure, input);
	}
}

/**
 * Error used when database-level validation rejects otherwise well-formed request data.
 */
export class DataValidationDatabaseFailure extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DataValidationDatabaseFailure, input);
	}
}

/**
 * Error used when a create operation fails after request validation has passed.
 */
export class DataCreationFailure extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DataCreationFailure, input);
	}
}

/**
 * Error used when a valid request cannot find the requested data.
 */
export class DataRetrievalFailure extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DataRetrievalFailure, input);
	}
}

/**
 * Error used when an update operation fails after request validation has passed.
 */
export class DataUpdateFailure extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DataUpdateFailure, input);
	}
}

/**
 * Error used when a delete operation fails after request validation has passed.
 */
export class DataDeletionFailure extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DataDeletionFailure, input);
	}
}

/**
 * Error used when a valid request conflicts with current data state.
 */
export class DataConflictFailure extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DataConflictFailure, input);
	}
}

/**
 * Error used when a request requires a signed-in user.
 */
export class AuthenticationRequired extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.AuthenticationRequired, input);
	}
}

/**
 * Error used when the signed-in user does not have permission for an action.
 */
export class ActionProhibited extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.ActionProhibited, input);
	}
}

/**
 * Error used when a login attempt references a user that does not exist.
 */
export class LoginFailureNoUser extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.LoginFailureNoUser, input);
	}
}

/**
 * Error used when a valid user attempts to log in with invalid credentials.
 */
export class LoginFailureWrongCredentials extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.LoginFailureWrongCredentials, input);
	}
}

/**
 * Error used when an email address fails syntax or uniqueness rules.
 */
export class EmailNotSuitable extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.EmailNotSuitable, input);
	}
}

/**
 * Error used when a password fails syntax or strength rules.
 */
export class PasswordNotSuitable extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.PasswordNotSuitable, input);
	}
}

/**
 * Error used when a provided JWT has expired.
 */
export class JWTExpired extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.JWTExpired, input);
	}
}

/**
 * Error used when no stored token matches a provided token value.
 */
export class TokenNotFound extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.TokenNotFound, input);
	}
}

/**
 * Error used when a token exists but cannot be used for the requested action.
 */
export class WrongTokenType extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.WrongTokenType, input);
	}
}

/**
 * Error used when a caller exceeds the allowed request rate.
 */
export class RateLimitExceeded extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.RateLimitExceeded, input);
	}
}

/**
 * Error used when the database dependency is unavailable.
 */
export class DatabaseUnavailable extends BigfootDSError {
	constructor(input?: ApiErrorInput) {
		super(dataErrorDefinitions.DatabaseUnavailable, input);
	}
}
