const axios = require('axios');
async function getChatArticlesResponse(content,title) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: 'user', content: `Write an article in Arabic titled: ${title}, taking into account the rules of grammar, deleting any site name, removing symbols, and placing section titles inside the <h2> tag and section text inside the <p> tag, but reduce the number of words in the article to 600.` }]
                    // max_tokens: 550
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const message = response.data.choices[0].message.content;
        return message
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}
module.exports = { getChatArticlesResponse }
