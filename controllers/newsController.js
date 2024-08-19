const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');
const { getChatContentResponse } = require('../services/openaiContentService');
const getNews = async (req, res) => {
    try {
        // جلب البيانات من الموقع
        const { data } = await axios.get('https://sa.highwia.com/');

        // تحميل HTML في cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // تحديد العناصر وجمع المعلومات
        const articlePromises =$('li.post-item').map(async (index, element) => {
            var titleElement = $(element).find('h2.post-title a');
            var title = titleElement.text().trim();
            var img = $(element).find('a.post-thumb img').attr('src');
            if (title && img) {
                var link = titleElement.attr('href');
            try {
                const responseMessage = await getChatResponse(title);
                if (responseMessage) {
                    title = responseMessage;
                } else {
                    title = 'No response from the API.';
                }
            } catch (error) {
                console.error('Error getting chat response:', error.message);
                title = 'Error in generating title';
            }
                articles.push({ title, link, img });
            }
        });
         // Wait for all promises to resolve
         await Promise.all(articlePromises);
        var articlesLenth=articles.length
        return res.status(201).json({articlesLenth,articles});
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}


const getArticleNews = async (req, res) => {
    try {
        const { url } = req.params;

        // Fetch the data from the website
        const { data } = await axios.get(url);

        // Load the HTML into Cheerio
        const $ = cheerio.load(data);

        // Collect all content processing promises
        const articlePromises = $('div.entry-content.entry.clearfix').map(async (index, element) => {
            let content = $(element).html();

            try {
                const responseMessage = await getChatContentResponse(content);
                content = responseMessage || 'No response from the API.';
            } catch (error) {
                console.error('Error getting chat response:', error.message);
                content = 'Error in generating title';
            }

            return content.replace(/\n/g, ''); // Replace new lines after content is processed
        }).get(); // .get() to convert the Cheerio object to an array

        // Wait for all promises to resolve
        const articles = await Promise.all(articlePromises);

        // Return the articles array as JSON
        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};
const getPalestineRoyanews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://royanews.tv/section/8');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        
        let articles = [];

        // Debugging: Print the HTML data to check the structure
        // console.log($.html()); 

        const articlePromises = $('.news_card_small').map(async (index, element) => {
            let title = $(element).find('.news_card_small_title a').text().trim();
            let link = $(element).find('.news_card_small_title a').attr('href');
            let category = $(element).find('.news_card_small_pub_category').text().trim();
            let publicationDate = $(element).find('.news_card_small_pub_date').text().trim();
            let imageUrl = $(element).find('.main_image img').attr('src');
        
            // Add a base URL for relative links if needed
            if (link && !link.startsWith('http')) {
                link = `https://royanews.tv${link}`;
            }
        
            // Add article to the list
            if (title && link) {
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || 'No response from the API.';
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }
                return {
                    title,
                    link,
                    category,
                    publicationDate,
                    imageUrl
                };
            } else {
                return null; // Ensure null is returned only when appropriate
            }
        }).get(); // .get() to convert the Cheerio object to an array
        
        articles = await Promise.all(articlePromises);

        // Return data as JSON response
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};


const getJordanRoyanews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://royanews.tv/section/1');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        
        let articles = [];

        // Extract and process articles
        await Promise.all($('.news_card_small').map(async (index, element) => {
            let title = $(element).find('.news_card_small_title a').text().trim();
            let link = $(element).find('.news_card_small_title a').attr('href');
            let category = $(element).find('.news_card_small_pub_category').text().trim();
            let publicationDate = $(element).find('.news_card_small_pub_date').text().trim();
            let imageUrl = $(element).find('.main_image img').attr('src');

            // Add a base URL for relative links if needed
            if (link && !link.startsWith('http')) {
                link = `https://royanews.tv${link}`;
            }

            // Process the title with getChatResponse
            if (title && link) {
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || title; // Use the response or fallback to original title
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }

                // Add article to the list
                articles.push({
                    title,
                    link,
                    category,
                    publicationDate,
                    imageUrl
                });
            }
        }).get());

        // Return data as JSON response
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};


const getArabAndInternationalnews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://royanews.tv/section/9');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        
        let articles = [];

        // Extract and process articles
        await Promise.all($('.news_card_small').map(async (index, element) => {
            let title = $(element).find('.news_card_small_title a').text().trim();
            let link = $(element).find('.news_card_small_title a').attr('href');
            let category = $(element).find('.news_card_small_pub_category').text().trim();
            let publicationDate = $(element).find('.news_card_small_pub_date').text().trim();
            let imageUrl = $(element).find('.main_image img').attr('src');

            // Add a base URL for relative links if needed
            if (link && !link.startsWith('http')) {
                link = `https://royanews.tv${link}`;
            }

            // Process the title with getChatResponse
            if (title && link) {
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || title; // Use the response or fallback to original title
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }

                // Add article to the list
                articles.push({
                    title,
                    link,
                    category,
                    publicationDate,
                    imageUrl
                });
            }
        }).get());

        // Return data as JSON response
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};


const getEconomynews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://royanews.tv/section/12');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        
        let articles = [];

        // Extract and process articles
        await Promise.all($('.news_card_small').map(async (index, element) => {
            let title = $(element).find('.news_card_small_title a').text().trim();
            let link = $(element).find('.news_card_small_title a').attr('href');
            let category = $(element).find('.news_card_small_pub_category').text().trim();
            let publicationDate = $(element).find('.news_card_small_pub_date').text().trim();
            let imageUrl = $(element).find('.main_image img').attr('src');

            // Add a base URL for relative links if needed
            if (link && !link.startsWith('http')) {
                link = `https://royanews.tv${link}`;
            }

            // Process the title with getChatResponse
            if (title && link) {
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || title; // Use the response or fallback to original title
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }

                // Add article to the list
                articles.push({
                    title,
                    link,
                    category,
                    publicationDate,
                    imageUrl
                });
            }
        }).get());

        // Return data as JSON response
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};

const getSportnews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://royanews.tv/section/14');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        
        let articles = [];

        // Extract and process articles
        await Promise.all($('.news_card_small').map(async (index, element) => {
            let title = $(element).find('.news_card_small_title a').text().trim();
            let link = $(element).find('.news_card_small_title a').attr('href');
            let category = $(element).find('.news_card_small_pub_category').text().trim();
            let publicationDate = $(element).find('.news_card_small_pub_date').text().trim();
            let imageUrl = $(element).find('.main_image img').attr('src');

            // Add a base URL for relative links if needed
            if (link && !link.startsWith('http')) {
                link = `https://royanews.tv${link}`;
            }

            // Process the title with getChatResponse
            if (title && link) {
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || title; // Use the response or fallback to original title
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }

                // Add article to the list
                articles.push({
                    title,
                    link,
                    category,
                    publicationDate,
                    imageUrl
                });
            }
        }).get());

        // Return data as JSON response
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};


const getTechnologynews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://royanews.tv/section/19');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        
        let articles = [];

        // Extract and process articles
        await Promise.all($('.news_card_small').map(async (index, element) => {
            let title = $(element).find('.news_card_small_title a').text().trim();
            let link = $(element).find('.news_card_small_title a').attr('href');
            let category = $(element).find('.news_card_small_pub_category').text().trim();
            let publicationDate = $(element).find('.news_card_small_pub_date').text().trim();
            let imageUrl = $(element).find('.main_image img').attr('src');

            // Add a base URL for relative links if needed
            if (link && !link.startsWith('http')) {
                link = `https://royanews.tv${link}`;
            }

            // Process the title with getChatResponse
            if (title && link) {
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || title; // Use the response or fallback to original title
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }

                // Add article to the list
                articles.push({
                    title,
                    link,
                    category,
                    publicationDate,
                    imageUrl
                });
            }
        }).get());

        // Return data as JSON response
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};


const getHealthnews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://royanews.tv/section/17');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        
        let articles = [];

        // Extract and process articles
        await Promise.all($('.news_card_small').map(async (index, element) => {
            let title = $(element).find('.news_card_small_title a').text().trim();
            let link = $(element).find('.news_card_small_title a').attr('href');
            let category = $(element).find('.news_card_small_pub_category').text().trim();
            let publicationDate = $(element).find('.news_card_small_pub_date').text().trim();
            let imageUrl = $(element).find('.main_image img').attr('src');

            // Add a base URL for relative links if needed
            if (link && !link.startsWith('http')) {
                link = `https://royanews.tv${link}`;
            }

            // Process the title with getChatResponse
            if (title && link) {
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || title; // Use the response or fallback to original title
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }

                // Add article to the list
                articles.push({
                    title,
                    link,
                    category,
                    publicationDate,
                    imageUrl
                });
            }
        }).get());

        // Return data as JSON response
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};
module.exports = { getNews, getArticleNews,getJordanRoyanews ,getPalestineRoyanews,getArabAndInternationalnews,getEconomynews,getSportnews,getTechnologynews,getHealthnews};