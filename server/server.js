const express = require("express");
const app = express();
const port=8000;  
require("./config/mongo_config");
const cors = require("cors");
app.use(express.json(), express.urlencoded({ extended: true }),cors());
//introduce your routes to the server
const NoteRoute = require("./routes/comex_routes");
const UserRoute = require("./routes/user_routes");
app.use(UserRoute);
app.use(NoteRoute);
    
app.listen(port, () => console.log("The server is all fired up on port 8000"));

//choifs
//choifism