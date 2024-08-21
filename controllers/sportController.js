const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');
const { getChatContentResponse } = require('../services/openaiContentService');
const url2 = 'https://www.filgoal.com/matches/?date=';


const getNews = async (req, res) => {
    try {
        // جلب البيانات من الموقع
        const { data } = await axios.get('https://www.youm7.com/Section/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9/298/1');

        // تحميل HTML في cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // تحديد العناصر وجمع المعلومات
        const elements = $('div.col-xs-12.bigOneSec').toArray();

        // معالجة كل عنصر باستخدام map مع async/await
        const articlePromises = elements.map(async (element) => {
            let title = $(element).find('h3 a').text().trim();

            if (title && title.length > 0) {
                const link = 'https://www.youm7.com'+$(element).find('h3 a').attr('href');
                const img = $(element).find('a.bigOneImg img').attr('src');
                const date = $(element).attr('data-id').trim();

                // Fetch the response from OpenAI API
                // try {
                //     const responseMessage = await getChatResponse(title);
                //     if (responseMessage) {
                //         title = responseMessage;
                //     } else {
                //         title = 'No response from the API.';
                //     }
                // } catch (error) {
                //     console.error('Error getting chat response:', error.message);
                //     title = 'Error in generating title';
                // }

                // إرجاع المقالة ككائن
                return { title, link, date, img };
            }
        });

        // انتظار جميع المقالات
        articles = await Promise.all(articlePromises);

        const filteredArticles = articles.filter(article => article); // إزالة القيم الفارغة
        const articlesLength = filteredArticles.length;
        return res.status(201).json(filteredArticles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}

const getMatches = async (req, res) => {
    try {
        // Create a new Date object for the current date and time
        const currentDate = new Date();

        // Extract the year, month, and day from the Date object
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Format the date as yyyy-mm-dd
        const formattedDate = `${year}-${month}-${day}`;
        // Fetch data from the website
        // console.log(url2+formattedDate);

        const { data } = await axios.get(url2 + formattedDate);

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        const matches = [];

        // Select and gather information
        $('#match-list-viewer .mc-block').each((index, element) => {
            const championship = $(element).find('h6 span').text().trim();
            const matchesInBlock = [];

            $(element).find('.cin_cntnr').each((idx, el) => {
                const matchLink = $(el).find('.c-i-next > a').attr('href');
                const team1 = $(el).find('.f strong').text().trim();
                const team1Logo = $(el).find('.f img').attr('data-src');
                const team2 = $(el).find('.s strong').text().trim();
                const team2Logo = $(el).find('.s img').attr('data-src');
                const status = $(el).find('.m .status').text().trim();
                const stadium = $(el).find('.match-aux span:nth-child(1)').text().trim();
                const date = $(el).find('.match-aux span:nth-child(2)').text().trim();

                matchesInBlock.push({
                    matchLink,
                    team1,
                    team1Logo,
                    team2,
                    team2Logo,
                    status,
                    stadium,
                    date
                });
            });

            matches.push({ championship, matches: matchesInBlock });
        });

        return res.status(201).json(matches);
    } catch (error) {
        console.error(`Error fetching the matches: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the matches' });
    }
};

module.exports = { getNews, getMatches };