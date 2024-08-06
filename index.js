const express = require('express');
const swaggerDocs = require('./swagger/swaggerConfig');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/news', require('./routes/newsRouter'));
app.use('/api/sport', require('./routes/sportRoute')); 
app.use('/api/medical', require('./routes/medicalRoute')); 
app.use('/api/entertainment', require('./routes/entertainmentRoute')); 
app.use('/api/art', require('./routes/artRoute')); 
app.use('/api/article', require('./routes/articalRoute')); 
app.use('/api/technology', require('./routes/technologyRoute')); 

// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
