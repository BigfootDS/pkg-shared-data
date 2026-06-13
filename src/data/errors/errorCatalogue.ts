import { clientError, serverError } from "../httpStatusCodes";

type ObjectValue<T> = T[keyof T];

/**
 * HTTP status codes used by the global error catalogue.
 */
export type GlobalErrorHttpStatusCode =
	ObjectValue<typeof clientError> | ObjectValue<typeof serverError>;

/**
 * Owner areas responsible for first-pass global error codes.
 */
export const ERROR_OWNER_AREAS = {
	MS_AUTH: "ms-auth",
	MS_ECOMMERCE: "ms-ecommerce",
	MS_USERRELATIONS: "ms-userrelations",
	PLATFORM: "platform"
} as const;

/**
 * Type-safe union of global error owner areas.
 */
export type ErrorOwnerArea = typeof ERROR_OWNER_AREAS[keyof typeof ERROR_OWNER_AREAS];

/**
 * Canonical flat `snake_case` BigfootDS error codes.
 */
export const ERROR_CODES = {
	AUTH_USER_BANNED: "auth_user_banned",
	FRIEND_CAPACITY_FULL: "friend_capacity_full",
	FRIEND_REQUEST_COOLDOWN: "friend_request_cooldown",
	FRIEND_REQUEST_UNAVAILABLE: "friend_request_unavailable",
	INTERNAL_ERROR: "internal_error",
	INVENTORY_INSUFFICIENT_QUANTITY: "inventory_insufficient_quantity",
	NOT_FOUND: "not_found",
	PROVIDER_EVENT_UNKNOWN_SKU: "provider_event_unknown_sku",
	RATE_LIMITED: "rate_limited",
	SERVICE_FORBIDDEN: "service_forbidden",
	SERVICE_TOKEN_INVALID: "service_token_invalid",
	SERVICE_TOKEN_MISSING: "service_token_missing",
	UNAUTHORIZED: "unauthorized",
	VALIDATION_FAILED: "validation_failed"
} as const;

/**
 * Type-safe union of canonical BigfootDS global error codes.
 */
export type GlobalErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

/**
 * Static metadata for a globally known BigfootDS error code.
 */
export interface ErrorCodeDefinition {
	/**
	 * Flat `snake_case` runtime value emitted in JSON responses, logs, and durable records.
	 */
	readonly code: GlobalErrorCode;

	/**
	 * Service, domain, or platform area responsible for the code.
	 */
	readonly ownerArea: ErrorOwnerArea;

	/**
	 * Default HTTP status to use when the code is returned through an API response.
	 */
	readonly defaultHttpStatus: GlobalErrorHttpStatusCode;

	/**
	 * Safe fallback message that can be returned to clients.
	 */
	readonly defaultMessage: string;
}

/**
 * Standard data shape for a BigfootDS API error payload.
 *
 * Runtime constructors and serializers belong in `pkg-service-utils`; this
 * package only owns the shared vocabulary and payload shape.
 */
export interface SharedErrorData {
	/**
	 * Stable global error code.
	 */
	readonly code: GlobalErrorCode;

	/**
	 * Safe client-facing message for this specific response.
	 */
	readonly message: string;

	/**
	 * Optional request correlation ID supplied by a consuming service.
	 */
	readonly requestId?: string;

	/**
	 * Optional structured context safe for the intended caller.
	 */
	readonly details?: unknown;
}

/**
 * Standard JSON wrapper for service errors.
 */
export interface SharedErrorResponse {
	readonly error: SharedErrorData;
}

/**
 * Stable ordered global error-code catalogue.
 */
export const GLOBAL_ERROR_CATALOGUE = [
	{
		code: ERROR_CODES.VALIDATION_FAILED,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: clientError.BAD_REQUEST,
		defaultMessage: "The request could not be validated."
	},
	{
		code: ERROR_CODES.UNAUTHORIZED,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: clientError.UNAUTHORIZED,
		defaultMessage: "Authentication is required for this request."
	},
	{
		code: ERROR_CODES.SERVICE_TOKEN_MISSING,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: clientError.UNAUTHORIZED,
		defaultMessage: "A service token is required for this request."
	},
	{
		code: ERROR_CODES.SERVICE_TOKEN_INVALID,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: clientError.UNAUTHORIZED,
		defaultMessage: "The service token is invalid."
	},
	{
		code: ERROR_CODES.SERVICE_FORBIDDEN,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: clientError.FORBIDDEN,
		defaultMessage: "This service is not allowed to perform that action."
	},
	{
		code: ERROR_CODES.NOT_FOUND,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: clientError.NOT_FOUND,
		defaultMessage: "The requested resource was not found."
	},
	{
		code: ERROR_CODES.RATE_LIMITED,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: clientError.TOO_MANY_REQUESTS,
		defaultMessage: "Too many requests. Try again later."
	},
	{
		code: ERROR_CODES.INTERNAL_ERROR,
		ownerArea: ERROR_OWNER_AREAS.PLATFORM,
		defaultHttpStatus: serverError.INTERNAL_SERVER_ERROR,
		defaultMessage: "Something went wrong."
	},
	{
		code: ERROR_CODES.AUTH_USER_BANNED,
		ownerArea: ERROR_OWNER_AREAS.MS_AUTH,
		defaultHttpStatus: clientError.FORBIDDEN,
		defaultMessage: "This account cannot be used."
	},
	{
		code: ERROR_CODES.FRIEND_CAPACITY_FULL,
		ownerArea: ERROR_OWNER_AREAS.MS_USERRELATIONS,
		defaultHttpStatus: clientError.CONFLICT,
		defaultMessage: "Your friends list is full."
	},
	{
		code: ERROR_CODES.FRIEND_REQUEST_COOLDOWN,
		ownerArea: ERROR_OWNER_AREAS.MS_USERRELATIONS,
		defaultHttpStatus: clientError.CONFLICT,
		defaultMessage: "You cannot send another friend request to this user yet."
	},
	{
		code: ERROR_CODES.FRIEND_REQUEST_UNAVAILABLE,
		ownerArea: ERROR_OWNER_AREAS.MS_USERRELATIONS,
		defaultHttpStatus: clientError.FORBIDDEN,
		defaultMessage: "You cannot send a friend request to this user."
	},
	{
		code: ERROR_CODES.INVENTORY_INSUFFICIENT_QUANTITY,
		ownerArea: ERROR_OWNER_AREAS.MS_ECOMMERCE,
		defaultHttpStatus: clientError.CONFLICT,
		defaultMessage: "There is not enough inventory for this action."
	},
	{
		code: ERROR_CODES.PROVIDER_EVENT_UNKNOWN_SKU,
		ownerArea: ERROR_OWNER_AREAS.MS_ECOMMERCE,
		defaultHttpStatus: clientError.UNPROCESSABLE_ENTITY,
		defaultMessage: "The provider event references an unknown product."
	}
] as const satisfies readonly ErrorCodeDefinition[];

function buildErrorCodeMap(
	definitions: readonly ErrorCodeDefinition[]
): Readonly<Record<GlobalErrorCode, ErrorCodeDefinition>> {
	const entries = definitions.map((definition) => [definition.code, definition] as const);
	return Object.freeze(Object.fromEntries(entries)) as Readonly<Record<GlobalErrorCode, ErrorCodeDefinition>>;
}

/**
 * Read-only lookup map keyed by global error code.
 */
export const GLOBAL_ERROR_CATALOGUE_BY_CODE = buildErrorCodeMap(GLOBAL_ERROR_CATALOGUE);

/**
 * Returns a global error-code definition, or `undefined` when the code is unknown.
 */
export function getErrorCodeDefinition(code: string): ErrorCodeDefinition | undefined {
	return GLOBAL_ERROR_CATALOGUE_BY_CODE[code as GlobalErrorCode];
}

/**
 * Checks whether a raw string is a known BigfootDS global error code.
 */
export function isKnownErrorCode(code: string): code is GlobalErrorCode {
	return getErrorCodeDefinition(code) !== undefined;
}
