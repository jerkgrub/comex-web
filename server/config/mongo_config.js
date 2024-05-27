const mongoose = require('mongoose');
 
// mongoose.connect('mongodb+srv://nucasajerick:5sAb73lTrLX0c6Fy@cluster0.khsbida.mongodb.net/comexconnect', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

mongoose.connect('mongodb://127.0.0.1:27017/comexconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));