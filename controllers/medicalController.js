
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://royanews.tv/section/17/'; 
const getNews = async (req, res) => {
    try {
        const { data } = await axios.get(url);

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        const newsArticles = [];

        // Select and gather information
        $('div.news_card_small').each((index, element) => {
            const titleElement = $(element).find('div.news_card_small_title a');
            const title = titleElement.text().trim();
            const link = 'https://royanews.tv'+titleElement.attr('href');
            const date = $(element).find('div.news_card_small_pub_date').text().trim();
            const categoryElement = $(element).find('div.news_card_small_pub_category a');
            const img = $(element).find('div.main_image img').attr('src');

            newsArticles.push({
                title,
                link,
                date,
                img
            });
        });

        return res.status(201).json(newsArticles);
    } catch (error) {
        console.error(`Error fetching the news articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the news articles' });
    }
};


module.exports = { getNews};
