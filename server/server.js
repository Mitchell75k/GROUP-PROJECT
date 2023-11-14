const express = require('express');
const app = express();
const port = 8000;

require("./config/mongoose.config");

// Express middleware to parse JSON requests
app.use(express.json());

// Express middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

const SpotifyAPIRoutes = require("./routes/SpotifyAPI.routes");
SpotifyAPIRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
