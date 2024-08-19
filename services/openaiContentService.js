const axios = require('axios');
async function getChatContentResponse(content) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o',
                messages: [{
                    role: 'user', content: `The code is improved and any links are removed, without adding any other codes to it, This is the code ${content}` }]
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
module.exports = { getChatContentResponse }
