const Cache = require("@11ty/eleventy-cache-assets");
require("dotenv").config();

module.exports = async () => {

    const url = "https://api.raindrop.io/rest/v1/raindrops/0";

    try {
        const data = await Cache(url, {
            duration: "1d",
            type: "json",
            fetchOptions: {
                headers: {
                    "Authorization": `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`
                }
            }
        });

        const items = data.items;

        let response = [];

        if (items.length) {
            items.forEach(item => {
                if (item.tags.includes("private") == false) {
                    response.push({
                        title: item.title,
                        url: item.link,
                        excerpt: item.excerpt,
                        tags: items.tags
                    })
                }
            });

            return response;
        }
    } catch (error) {
        console.log(`\n${error}\n`);
        return [];
    }
}

