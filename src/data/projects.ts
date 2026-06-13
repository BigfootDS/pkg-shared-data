/**
 * Closed family names used by BigfootDS ecosystem project definitions.
 */
export const PROJECT_KINDS = {
	AGENTIC: "agentic",
	ASSETS: "assets",
	DEMO: "demo",
	DOCS: "docs",
	GAME: "game",
	INFRA: "infra",
	MS: "ms",
	PKG: "pkg",
	TEMPLATE: "template",
	TOOL: "tool",
	WEB: "web"
} as const;

/**
 * Type-safe union of canonical BigfootDS project kind values.
 */
export type ProjectKind = typeof PROJECT_KINDS[keyof typeof PROJECT_KINDS];

/**
 * Canonical BigfootDS project IDs.
 *
 * Values intentionally match repository/wiki slugs.
 */
export const PROJECT_IDS = {
	AGENTIC_SKILLS: "agentic-skills",
	ASSETS_BRANDING: "assets-branding",
	ASSETS_DEFAULTASSETS: "assets-defaultassets",
	ASSETS_FLAGS: "assets-flags",
	GAME_ARBORSCULPTURA: "game-arborsculptura",
	GAME_FIDGETTOYS: "game-fidgettoys",
	GAME_GODMAKER: "game-godmaker",
	GAME_THEBESTESTBEEHIVE: "game-thebestestbeehive",
	GAME_YUMCHOOCHOO: "game-yumchoochoo",
	MS_ACCOUNTS: "ms-accounts",
	MS_AUTH: "ms-auth",
	MS_ECOMMERCE: "ms-ecommerce",
	MS_EMAIL: "ms-email",
	MS_FORUM: "ms-forum",
	MS_GAMEACTIONS: "ms-gameactions",
	MS_ISSUETRACKER: "ms-issuetracker",
	MS_LIVEOPSCONFIG: "ms-liveopsconfig",
	MS_MULTIPLAYERSESSIONBROKER: "ms-multiplayersessionbroker",
	MS_NEWS: "ms-news",
	MS_PLAYERGAMEDATA: "ms-playergamedata",
	MS_USERRELATIONS: "ms-userrelations",
	PKG_BIGFOOT_FETCHER: "pkg-bigfoot-fetcher",
	PKG_SERVICE_UTILS: "pkg-service-utils",
	PKG_SHARED_DATA: "pkg-shared-data",
	TEMPLATE_REACTJS_MULTIPLAT: "template-reactjs-multiplat",
	WEB_BIGFOOTDS: "web-bigfootds",
	WEB_BIGFOOTDS_SUPPORT: "web-bigfootds-support",
	WEB_BIGFOOTDS_WIKI: "web-bigfootds-wiki"
} as const;

/**
 * Type-safe union of canonical BigfootDS project IDs.
 */
export type ProjectId = typeof PROJECT_IDS[keyof typeof PROJECT_IDS];

/**
 * Minimal static definition for a known BigfootDS ecosystem project.
 */
export interface ProjectDefinition {
	/**
	 * Canonical Project ID. This should match the repository/wiki slug.
	 */
	readonly id: ProjectId;

	/**
	 * Human-readable display name for review surfaces and tooling.
	 */
	readonly displayName: string;

	/**
	 * Closed project family used for broad ecosystem grouping.
	 */
	readonly kind: ProjectKind;
}

/**
 * Stable ordered list of known BigfootDS ecosystem projects.
 */
export const PROJECT_DEFINITIONS = [
	{ id: PROJECT_IDS.MS_AUTH, displayName: "ms-auth", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_ACCOUNTS, displayName: "ms-accounts", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_USERRELATIONS, displayName: "ms-userrelations", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_ECOMMERCE, displayName: "ms-ecommerce", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_EMAIL, displayName: "ms-email", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_LIVEOPSCONFIG, displayName: "ms-liveopsconfig", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_GAMEACTIONS, displayName: "ms-gameactions", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_NEWS, displayName: "ms-news", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_FORUM, displayName: "ms-forum", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.MS_ISSUETRACKER, displayName: "ms-issuetracker", kind: PROJECT_KINDS.MS },
	{
		id: PROJECT_IDS.MS_MULTIPLAYERSESSIONBROKER,
		displayName: "ms-multiplayersessionbroker",
		kind: PROJECT_KINDS.MS
	},
	{ id: PROJECT_IDS.MS_PLAYERGAMEDATA, displayName: "ms-playergamedata", kind: PROJECT_KINDS.MS },
	{ id: PROJECT_IDS.WEB_BIGFOOTDS, displayName: "web-bigfootds", kind: PROJECT_KINDS.WEB },
	{
		id: PROJECT_IDS.WEB_BIGFOOTDS_SUPPORT,
		displayName: "web-bigfootds-support",
		kind: PROJECT_KINDS.WEB
	},
	{ id: PROJECT_IDS.WEB_BIGFOOTDS_WIKI, displayName: "web-bigfootds-wiki", kind: PROJECT_KINDS.DOCS },
	{ id: PROJECT_IDS.GAME_ARBORSCULPTURA, displayName: "Arbor Sculptura", kind: PROJECT_KINDS.GAME },
	{ id: PROJECT_IDS.GAME_FIDGETTOYS, displayName: "Fidget Toys", kind: PROJECT_KINDS.GAME },
	{ id: PROJECT_IDS.GAME_GODMAKER, displayName: "Godmaker", kind: PROJECT_KINDS.GAME },
	{
		id: PROJECT_IDS.GAME_THEBESTESTBEEHIVE,
		displayName: "The Bestest Beehive",
		kind: PROJECT_KINDS.GAME
	},
	{ id: PROJECT_IDS.GAME_YUMCHOOCHOO, displayName: "Yum Choo Choo", kind: PROJECT_KINDS.GAME },
	{ id: PROJECT_IDS.PKG_BIGFOOT_FETCHER, displayName: "pkg-bigfoot-fetcher", kind: PROJECT_KINDS.PKG },
	{ id: PROJECT_IDS.PKG_SERVICE_UTILS, displayName: "pkg-service-utils", kind: PROJECT_KINDS.PKG },
	{ id: PROJECT_IDS.PKG_SHARED_DATA, displayName: "pkg-shared-data", kind: PROJECT_KINDS.PKG },
	{
		id: PROJECT_IDS.TEMPLATE_REACTJS_MULTIPLAT,
		displayName: "template-reactjs-multiplat",
		kind: PROJECT_KINDS.TEMPLATE
	},
	{ id: PROJECT_IDS.ASSETS_BRANDING, displayName: "assets-branding", kind: PROJECT_KINDS.ASSETS },
	{
		id: PROJECT_IDS.ASSETS_DEFAULTASSETS,
		displayName: "assets-defaultassets",
		kind: PROJECT_KINDS.ASSETS
	},
	{ id: PROJECT_IDS.ASSETS_FLAGS, displayName: "assets-flags", kind: PROJECT_KINDS.ASSETS },
	{ id: PROJECT_IDS.AGENTIC_SKILLS, displayName: "agentic-skills", kind: PROJECT_KINDS.AGENTIC }
] as const satisfies readonly ProjectDefinition[];

function buildProjectDefinitionMap(
	definitions: readonly ProjectDefinition[]
): Readonly<Record<ProjectId, ProjectDefinition>> {
	const entries = definitions.map((definition) => [definition.id, definition] as const);
	return Object.freeze(Object.fromEntries(entries)) as Readonly<Record<ProjectId, ProjectDefinition>>;
}

/**
 * Read-only lookup map keyed by canonical Project ID.
 */
export const PROJECT_DEFINITIONS_BY_ID = buildProjectDefinitionMap(PROJECT_DEFINITIONS);

/**
 * Returns a known Project Definition, or `undefined` when the ID is not registered.
 */
export function getProjectDefinition(projectId: string): ProjectDefinition | undefined {
	return PROJECT_DEFINITIONS_BY_ID[projectId as ProjectId];
}

/**
 * Checks whether a raw string is a known BigfootDS Project ID.
 */
export function isKnownProjectId(projectId: string): projectId is ProjectId {
	return getProjectDefinition(projectId) !== undefined;
}
