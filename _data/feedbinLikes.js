const Cache = require("@11ty/eleventy-cache-assets");
const parser = require("xml2json");

module.exports = async function () {
    const url = "https://feedbin.com/starred/2e9e509fc5f826cb114a2375ce1d4fed.xml";

    try {
        let data = await Cache(url, {
            duration: "1d", // 1 day
            type: "text" // also supports "text" or "buffer"
        });

        const parsed = parser.toJson(data, { object: true });
        const items = parsed.rss.channel.item;
        let response = [];

        if (items.length) {
            response = items
                .map(item => ({
                    title: item.title,
                    url: item.link,
                    publication: item["dc:creator"]
                }))
                .reverse();
        }

        return response;
    } catch (error) {
        console.log(`\nFailed getting Feedbin likes\n${error}\n`);
        return [];
    }
};

// module.exports = async () => {
//     const url = "https://feedbin.com/starred/2e9e509fc5f826cb114a2375ce1d4fed.xml";

//     try {
//         const { data } = await axios.get(url);
//         const parsed = parser.toJson(data, { object: true });
//         const items = parsed.rss.channel.item;
//         let response = [];

//         if (items.length) {
//             response = items
//                 .map(item => ({
//                     title: item.title,
//                     url: item.link,
//                     publication: item["dc:creator"]
//                 }))
//                 .reverse();
//         }

//         return response;
//     } catch (ex) {
//         console.log(ex);
//         return [];
//     }
// };
