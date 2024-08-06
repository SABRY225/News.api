// src/services/openaiService.js
const openai = require('./openaiClient');

// src/services/openaiService.js
const getCompletion = async (prompt) => {
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens:100
      });
      return response.choices[0].text;
    } catch (error) {
      console.error('Error fetching completion:', error);
      throw error;
    }
  };
  
module.exports = {
  getCompletion,
};
