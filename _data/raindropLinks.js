const axios = require("axios");
require("dotenv").config();

module.exports = async () => {
    const instance = axios.create({
        baseURL: "https://api.raindrop.io/rest/v1/",
        timeout: 1000,
        headers: { "Authorization": `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}` }
    });

    try {
        const { data } = await instance.get("raindrops/0");
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
        console.log(error);
        return [];
    }
}

