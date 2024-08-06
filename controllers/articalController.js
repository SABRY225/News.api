const axios = require('axios');
const cheerio = require('cheerio');
const url='https://m.sa24.co/topic2.html'

const getArticle= async (req, res) => {
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

            // دفع المعلومات إلى المصفوفة
            articles.push({ title, link, date, img });
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

module.exports ={getArticle,get24hoursArticle };