const axios = require("axios");
const has = require("lodash.has");
require("dotenv").config();

module.exports = async function () {

	const url = "https://getpocket.com/v3/get";

	return axios.get(url, {
		params: {
			consumer_key: process.env.POCKET_API_KEY,
			access_token: process.env.POCKET_ACCESS_TOKEN,
			sort: "newest",
			detailType: "complete",
			count: 5
		}
	})
		.then(function (response) {

			// // This works and roughly returns order of original publication date
			const responseData = response.data["list"];
			const reversedResponseKeys = Object.keys(responseData).reverse();
			const reversedResponseData = [];


			reversedResponseKeys.forEach(function (key) {
				if (has(responseData[key].tags, "private") == false) {
					reversedResponseData.push(responseData[key]);
				}
			});

			return reversedResponseData;
			// // End of working version that returns order of original publication date
		})
		.catch(function (error) {
			console.log(error);
		});
};