
const axios = require('axios');
const cheerio = require('cheerio');
const getNews = async (req, res) => {
    try {
        // Fetch the page's HTML
        const { data } = await axios.get('https://www.webteb.com/articles');

        // Load HTML into cheerio
        const $ = cheerio.load(data);

        // Initialize an array to hold the extracted articles
        let articles = [];

        // Select the container that holds the article information
        $('.item-box-cotainer .item-box').each((index, element) => {
            // Extract the category name and link
            let category = $(element).find('.ib-head a.category .category-name').text().trim();
            let categoryLink = $(element).find('.ib-head a.category').attr('href');

            // Extract the article title and link
            let title = $(element).find('a.block').attr('title').trim();
            let link = $(element).find('a.block').attr('href');

            // Extract the image URL
            let imageUrl = $(element).find('.img-wrap img').attr('src');

            // Add the article details to the articles array
            articles.push({
                category,
                categoryLink,
                title,
                link,
                imageUrl
            });
        });

        // Log the extracted data
        console.log(articles);
         // Return data as JSON response
         const articlesLength = articles.length; // Corrected spelling
         return res.status(200).json({ articlesLength, articles });

    } catch (error) {
        console.error('Error fetching or processing the page:', error.message);
    }
};


module.exports = { getNews};
