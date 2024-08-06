const axios = require('axios');
const cheerio = require('cheerio');
const url='https://m.sa24.co/topic7.html'

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
            const source = $(element).find('div.sour a').first().text().trim(); // Use first() if there are multiple sources
            const img = $(element).find('img.main_img').attr('src'); // Select the img with class 'main_img'
    
            // دفع المعلومات إلى المصفوفة
            articles.push({ title, link, date, source, img });
        });
        
        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}
const get24hoursArticle = async (req, res) => {
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

            // دفع المعلومات إلى المصفوفة
            articles.push({ title, link, date});
        });
        
        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}


module.exports = { getNews,get24hoursArticle};