/**
 * Header names populated by `@bigfootds/bigfoot-fetcher` when values are available.
 */
export const BIGFOOT_FETCHER_HEADER_NAMES = [
	"productName",
	"productVersion",
	"browserName",
	"browserVersion",
	"browserEngineName",
	"browserEngineVersion",
	"osName",
	"osVersion",
	"osVersionName",
	"platformType",
	"platformName"
] as const;

export type BigfootFetcherHeaderName = typeof BIGFOOT_FETCHER_HEADER_NAMES[number];

/**
 * Environment variable names checked for the platform type header value.
 */
export const BIGFOOT_FETCHER_PLATFORM_TYPE_ENV_KEYS = [
	"npm_package_config_bigfootds_platformType",
	"npm_package_platformType",
	"platformType",
	"PLATFORMTYPE",
	"PLATFORM_TYPE",
	"REACT_APP_PLATFORM_TYPE",
	"REACT_APP_PLATFORMTYPE",
	"VITE_PLATFORM_TYPE",
	"VITE_PLATFORMTYPE"
] as const;

/**
 * Environment variable names checked for the platform name header value.
 */
export const BIGFOOT_FETCHER_PLATFORM_NAME_ENV_KEYS = [
	"npm_package_config_bigfootds_platformName",
	"npm_package_platformName",
	"platformName",
	"PLATFORMNAME",
	"PLATFORM_NAME",
	"REACT_APP_PLATFORM_NAME",
	"REACT_APP_PLATFORMNAME",
	"VITE_PLATFORM_NAME",
	"VITE_PLATFORMNAME"
] as const;

/**
 * Environment variable names checked for the product name header value.
 */
export const BIGFOOT_FETCHER_PRODUCT_NAME_ENV_KEYS = [
	"npm_package_config_bigfootds_productName",
	"npm_package_productName",
	"productName",
	"PRODUCTNAME",
	"PRODUCT_NAME",
	"REACT_APP_PRODUCT_NAME",
	"REACT_APP_PRODUCTNAME",
	"VITE_PRODUCT_NAME",
	"VITE_PRODUCTNAME"
] as const;

/**
 * Environment variable names checked for the product version header value.
 */
export const BIGFOOT_FETCHER_PRODUCT_VERSION_ENV_KEYS = [
	"npm_package_config_bigfootds_productVersion",
	"npm_package_productVersion",
	"productVersion",
	"PRODUCTVERSION",
	"PRODUCT_VERSION",
	"REACT_APP_PRODUCT_VERSION",
	"REACT_APP_PRODUCTVERSION",
	"VITE_PRODUCT_VERSION",
	"VITE_PRODUCTVERSION",
	"npm_package_version"
] as const;

export const BIGFOOT_FETCHER_ENV_KEYS = {
	platformName: BIGFOOT_FETCHER_PLATFORM_NAME_ENV_KEYS,
	platformType: BIGFOOT_FETCHER_PLATFORM_TYPE_ENV_KEYS,
	productName: BIGFOOT_FETCHER_PRODUCT_NAME_ENV_KEYS,
	productVersion: BIGFOOT_FETCHER_PRODUCT_VERSION_ENV_KEYS
} as const;

export type BigfootFetcherEnvKey =
	(typeof BIGFOOT_FETCHER_ENV_KEYS)[keyof typeof BIGFOOT_FETCHER_ENV_KEYS][number];

/**
 * Node `process.platform` values mapped to OS names used by fetcher headers.
 */
export const BIGFOOT_FETCHER_NODE_OS_NAMES: Record<string, string> = {
	aix: "AIX",
	darwin: "Darwin",
	freebsd: "FreeBSD",
	linux: "Linux",
	openbsd: "OpenBSD",
	sunos: "SunOS",
	win32: "Windows_NT"
};

/**
 * Config values that can be sent as Bigfoot Fetcher headers.
 */
export interface BigfootDSConfig {
	productName?: string;
	productVersion?: string;
	browserName?: string;
	browserVersion?: string;
	browserEngineName?: string;
	browserEngineVersion?: string;
	osName?: string;
	osVersion?: string;
	osVersionName?: string;
	platformType?: string;
	platformName?: string;
}
