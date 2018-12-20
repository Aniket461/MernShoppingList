const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');


const app =express();
// Body parser middleware

app.use(bodyParser.json());

//DB Config

const db = require('./config/keys').mongoURI;

//connect to mongo db

//mongoose
//	.connect(db)
//	.then(() => console.log('mongoDB connected....'))
//	.catch(err => console.log(err));


mongoose.connect('mongodb://Aniket:Aniket123@ds058048.mlab.com:58048/mern_shopping');
mongoose.connection.on('open', function() {
console.log('Mongoose connected');
});


//use routes

app.use('/api/items', items);


// serve static assests if in production

if(process.env.NODE_ENV === 'production'){


	app.use(express.static('client/build'));
	app.get('*', (req,res) =>{

			res.sendFile(path.reslove(__dirname, 'client', 'build', 'index.html'));

	});
}





const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`server started on port ${port}`));