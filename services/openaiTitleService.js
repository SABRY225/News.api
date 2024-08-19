const axios = require('axios');
async function getChatResponse(prompt) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o', 
                messages: [{ role: 'user', content: `Rewrite the following title without repeating words, taking into account the rules of grammar, and deleting any website name. The title is: ${prompt}. Translate it into Arabic.` }],
                max_tokens: 150
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
module.exports={getChatResponse}
