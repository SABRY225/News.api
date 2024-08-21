const express = require('express');
const swaggerDocs = require('./swagger/swaggerConfig');
const dotenv = require('dotenv');
const cors = require('cors');
const { getChatResponse } = require('./services/openaiTitleService');
// Load environment variables
dotenv.config();

const { app, server } = require('./Socket/socket');
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/news', require('./routes/newsRouter'));
app.use('/api/sport', require('./routes/sportRoute')); 
app.use('/api/medical', require('./routes/medicalRoute')); 
app.use('/api/elsob7', require('./routes/elsob7Router')); 
app.use('/api/mhtwyat', require('./routes/mhtwyatRoute')); 
app.use('/api/article', require('./routes/articalRoute')); 
app.use('/api/technology', require('./routes/technologyRoute')); 
app.use('/api/takeitright', require('./routes/takeitrightRoute')); 
app.use('/api/baldNews', require('./routes/baldNewsRoute')); 
app.use('/api/arabiaweather', require('./routes/arabiaweatherRouter')); 
app.use('/api/misr', require('./routes/misrRouter')); 

// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
