const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://m.sa24.co/topic5.html'; 
const url2 = 'https://www.filgoal.com/matches/?date='; 


const getNews = async (req, res) => {
    try {
        // جلب البيانات من الموقع
        const { data } = await axios.get(url);
        // console.log('Data received:', data); 
    
        // تحميل HTML في cheerio
        const $ = cheerio.load(data);
        const articles = [];
    
        // تحديد العناصر وجمع المعلومات
        $('div.main_newsz').each((index, element) => {
            const titleElement = $(element).find('div.main_title_textz a');
            const title = titleElement.text().trim();
            const link = titleElement.attr('href');
            const date = $(element).find('span.time').attr('title').trim();
            const img = $(element).find('img.main_img').attr('src'); // استخرج رابط الصورة
            const source = $(element).find('div.sour a[rel="credits"]').text().trim();
            const category = $(element).find('div.sour a[rel="webcat"]').text().trim();

            // دفع المعلومات إلى المصفوفة
            articles.push({ title, link, date, img, source, category });
        });
        
        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}

const getHouresSport = async (req, res) => {
    try {
        // جلب البيانات من الموقع
        const { data } = await axios.get(url);
        // console.log('Data received:', data); 
    
        // تحميل HTML في cheerio
        const $ = cheerio.load(data);
        const articles = [];
    
        // تحديد العناصر وجمع المعلومات
        $('div.rights_body').each((index, element) => {
            const titleElement = $(element).find('h5.rtitle a');
            const title = titleElement.text().trim();
            const link = titleElement.attr('href');
            const date = $(element).find('span.timeago').attr('title').trim();
            const source = $(element).find('div.ni_source a').text().trim();
            const img = $(element).find('img').attr('src'); // Assuming there might be an img element

            // دفع المعلومات إلى المصفوفة
            articles.push({ title, link, date, source, img });
        });
        
        return res.status(201).json(articles);
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
        console.log(url2+formattedDate);
        
        const { data } = await axios.get(url2+formattedDate);
        
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

module.exports = { getNews,getHouresSport,getMatches};