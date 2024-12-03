const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT =3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});
app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=5816aa168b01f33f7658a5e0c2d1521e`;
    try {
        const response = await axios.get(url);
        if (response.data.cod === 200) {
            const weather = response.data;

            const weatherText = `It's ${weather.main.temp} Degree Celsius in ${weather.name}!`;
            res.render('index', { weather: weatherText, error: null });
        } else {
            res.render('index', { weather: null, error: 'City not found, please try again' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.render('index', { weather: null, error: 'Error, please try again' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
});