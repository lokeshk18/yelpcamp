const mongoose=require('mongoose');
const Campground =require('../models/campground');
const cities=require('./cities');
const {descriptors,places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpcamp',);

const db=mongoose.connection;
db.on("error",()=>console.log("connection error:"));
db.once("open",()=>{
    console.log("Database Connected");    
});

const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
    await Campground.deleteMany({});
        for(let i=0;i<300;i++){
            const price = Math.floor(Math.random()*2000)+10;
            const rand1000=Math.floor(Math.random()*1000);
            const camp=new Campground({
                author:'62f63410ac06b99297a9514d',
                location:`${cities[rand1000].city},${cities[rand1000].state}`,
                title:`${sample(descriptors)}${sample(places)}`,
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae temporibus animi earum fugiat commodi, dolores sequi fugit nobis eos, molestias aspernatur maiores. Tempore nobis, dolorum dolorem fuga voluptatum ratione quidem?',
                price,
                geometry: {
                    type: "Point",
                    coordinates: [
                        cities[rand1000].longitude,
                        cities[rand1000].latitude,
                    ]
                },
                images: [
                    {
                        url: 'https://res.cloudinary.com/djylwtcvn/image/upload/v1660466750/YelpCamp/hf5deuta56vhwka7kigw.png',
                        filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                    },
                    {
                        url: 'https://res.cloudinary.com/djylwtcvn/image/upload/v1660843985/YelpCamp/olejh2f3fnbuly8adczm.jpg',
                        filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                    }
                ]
            })
            await camp.save();
        }
    };
seedDB().then(()=>{
    mongoose.connection.close();
});
