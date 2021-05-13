const express = require("express");
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up template engine
app.use(express.static(path.join(__dirname, 'public'))); // statc filexc
app.use(express.urlencoded({
    extended: true
}));

const cityLists = ['Ajmer', 'Alwar', 'Bansware', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi',
    'Chittorgarh', 'Churu', 'Dausa', 'Dhoplur', 'Dungarpur', 'Ganganagar', 'Hanumangarh', 'Jaipur', 'Jaisalmer',
    'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand',
    'Sawai Madhopur', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'
];

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.post('/', async (req, res) => {
    if (cityLists.includes(req.body.cityName)) {
        res.redirect(`/${req.body.cityName}`);
    } else {
        res.render('404page.ejs');
    }
});

app.get('/:city', async (req, res) => {
    const {
        city
    } = req.params;

    if (cityLists.includes(city)) {
        let hospitalList = [];
        const response = await axios.get('https://api.covidbedsindia.in/v1/storages/608983ed03eef39bb4d05a77/Rajasthan');
        response.data.forEach(element => {
            if (element.DISTRICT === city)
                hospitalList.push(element);
        });
        res.render('data.ejs', {
            hospitalList
        });
    } else {
        res.render('404page.ejs');
    }
});

app.use((req, res) => {
    res.render('404page.ejs');
});

app.listen(port);