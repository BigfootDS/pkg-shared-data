const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const bdsSharedData = require("@bigfootds/bigfootds-shared-data");
const projectData = require("@bigfootds/bigfootds-shared-data/data/projects");

const expectedProjectIds = [
	"ms-auth",
	"ms-accounts",
	"ms-userrelations",
	"ms-ecommerce",
	"ms-email",
	"ms-liveopsconfig",
	"ms-gameactions",
	"ms-news",
	"ms-forum",
	"ms-issuetracker",
	"ms-multiplayersessionbroker",
	"ms-playergamedata",
	"web-bigfootds",
	"web-bigfootds-support",
	"web-bigfootds-wiki",
	"game-arborsculptura",
	"game-fidgettoys",
	"game-godmaker",
	"game-thebestestbeehive",
	"game-yumchoochoo",
	"pkg-bigfoot-fetcher",
	"pkg-service-utils",
	"pkg-shared-data",
	"template-reactjs-multiplat",
	"assets-branding",
	"assets-defaultassets",
	"assets-flags",
	"agentic-skills"
];

describe("Project definition exports", () => {
	test("root and deep imports expose the same project definition data", () => {
		assert.equal(bdsSharedData.PROJECT_IDS.MS_AUTH, "ms-auth");
		assert.equal(projectData.PROJECT_IDS.MS_AUTH, "ms-auth");
		assert.equal(bdsSharedData.PROJECT_DEFINITIONS, projectData.PROJECT_DEFINITIONS);
		assert.equal(
			bdsSharedData.PROJECT_DEFINITIONS_BY_ID["game-thebestestbeehive"].displayName,
			"The Bestest Beehive"
		);
	});

	test("project definitions cover the first-pass ecosystem projects in stable order", () => {
		assert.deepEqual(
			projectData.PROJECT_DEFINITIONS.map((definition) => definition.id),
			expectedProjectIds
		);
	});

	test("project definitions stay minimal and globally unique", () => {
		const ids = projectData.PROJECT_DEFINITIONS.map((definition) => definition.id);
		assert.equal(new Set(ids).size, ids.length);

		for (const definition of projectData.PROJECT_DEFINITIONS) {
			assert.deepEqual(Object.keys(definition).sort(), ["displayName", "id", "kind"]);
			assert.equal(projectData.PROJECT_DEFINITIONS_BY_ID[definition.id], definition);
		}
	});

	test("lookup helpers distinguish known and unknown project IDs", () => {
		assert.equal(projectData.isKnownProjectId("game-godmaker"), true);
		assert.equal(projectData.isKnownProjectId("ms-projects"), false);
		assert.equal(projectData.getProjectDefinition("ms-projects"), undefined);
		assert.deepEqual(projectData.getProjectDefinition("web-bigfootds-wiki"), {
			id: "web-bigfootds-wiki",
			displayName: "web-bigfootds-wiki",
			kind: "docs"
		});
	});

	test("project kind constants include the closed first-pass kind list", () => {
		assert.deepEqual(Object.values(projectData.PROJECT_KINDS).sort(), [
			"agentic",
			"assets",
			"demo",
			"docs",
			"game",
			"infra",
			"ms",
			"pkg",
			"template",
			"tool",
			"web"
		]);
	});
});
