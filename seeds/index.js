const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i = 0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6073fcd29797f305b8b817da',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quaerat perferendis, fugiat, qui odit architecto libero officia nemo eaque minus quae harum, incidunt placeat facilis aliquam similique iure tempora? Omnis',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dddfuagf9/image/upload/v1618152082/xyajpicjs2da1etuc6ad.jpg',
                    filename: 'xyajpicjs2da1etuc6ad'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})