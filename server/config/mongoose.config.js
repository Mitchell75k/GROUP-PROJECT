const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/SpotifyAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => 
        console.log("WE IN THE DB BABY!"))
    .catch(err => 
        console.log("NOOOO SOMETHING WENT WRONG NOOO WHYYYYY", err));
