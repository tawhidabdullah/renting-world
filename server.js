const express = require("express");
const bodyparser = require("body-parser");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const Rental = require("./models/rental");





// importing the router of USERS
const usersRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const rentalRoutes = require("./routes/api/rental");
const bookingRoutes = require("./routes/api/bookings");

const app = express();

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

// Db config
const db = require("./config/keys").mongoURI;
if (db) {
    // connect to mongoDB...
    mongoose
        .connect(db)
        .then(async () => {
            const rentals = [{
                    title: "Nice view on ocean",
                    city: "San Francisco",
                    street: "Main street",
                    category: "condo",
                    image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                    bedrooms: 4,
                    shared: true,
                    description: "Very nice apartment in center of the city.",
                    dailyRate: 43
                },
                {
                    title: "Modern apartment in center",
                    city: "New York",
                    street: "Time Square",
                    category: "apartment",
                    image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                    bedrooms: 1,
                    shared: false,
                    description: "Very nice apartment in center of the city.",
                    dailyRate: 11
                },
                {
                    title: "Old house in nature",
                    city: "Spisska Nova Ves",
                    street: "Banicka 1",
                    category: "house",
                    image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                    bedrooms: 5,
                    shared: true,
                    description: "Very nice apartment in center of the city.",
                    dailyRate: 23
                }
            ];


            async function deleteAllocuments() {
                await Rental.remove({});
            };   

            function create3Documents() {
                rentals.forEach(rental => {
                    const newRentals = new Rental(rental);
                    newRentals.save();
                })
            };


            deleteAllocuments();
            create3Documents();


            console.log("mongoDB Connected !")
        })
        .catch(err => console.log(err));
}

// PASSPORT middleware
app.use(passport.initialize());

// PASSPORT CONFIG

require("./config/passport")(passport);

app.use("/api/users", usersRoutes); // use Router() =>middleware (const router = express.Router());
app.use("/api/profile", profileRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/bookings", bookingRoutes);


// if production then server statice production
if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("view/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("view", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Hey Tawhid Abdullah, server is runnig on ${port}...`);
});