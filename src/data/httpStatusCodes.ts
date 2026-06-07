/**
 * HTTP 2xx status codes used by BigfootDS services for successful requests.
 */
export const success = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204
} as const;

/**
 * HTTP 3xx status codes used when a client should resolve a request through a different URL.
 */
export const redirect = {
	MOVED_PERMANENTLY: 301
} as const;

/**
 * HTTP 4xx status codes used when the client request cannot be completed as submitted.
 */
export const clientError = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	REQUEST_TIMEOUT: 408,
	UNPROCESSABLE_ENTITY: 422,
	UPGRADE_REQUIRED: 426,
	TOO_MANY_REQUESTS: 429,
	LOGIN_TIMEOUT: 440,
	SSL_CERT_ERROR: 495,
	SSL_CERT_REQUIRED: 496,
	SECURE_REQUEST_REQUIRED: 497,
	BLOCKED_BY_PARENTAL_CONTROLS: 450,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451
} as const;

/**
 * HTTP 5xx status codes used when a BigfootDS service or upstream dependency fails.
 */
export const serverError = {
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504
} as const;
