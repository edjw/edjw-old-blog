const Cache = require("@11ty/eleventy-cache-assets");
require("dotenv").config();

module.exports = async () => {

	function pushWantedItemsFromObject(response, object, key) {
		response.push({
			// storedNameforTemplatesEtc: object[key]["value_from_response"]
			resolved_title: object[key]["resolved_title"],
			resolved_url: object[key]["resolved_url"],
			excerpt: object[key]["excerpt"],
			tags: object[key]["tags"],
			item_id: object[key]["item_id"],
			authors: object[key]["authors"]
		});
	}

	const url = `https://getpocket.com/v3/get?consumer_key=${process.env.POCKET_API_KEY}&access_token=${process.env.POCKET_ACCESS_TOKEN}&sort=newest&detailType=complete`;

	try {

		const data = await Cache(url, {
			duration: "1d",
			type: "json",
		});

		const items = data.list;

		let response = [];

		Object.keys(items).forEach(item => {
			if (!("tags" in items[item])) {
				pushWantedItemsFromObject(response, items, item);
			}

			else if (!("private" in items[item]["tags"]))
				pushWantedItemsFromObject(response, items, item);
		});

		return response.reverse();

	} catch (error) {
		console.log(`\n${error}\n`);
		return [];
	}

}
