const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


// const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res){
    res.send('welcome to my hotel ')
})


// app.get('/person/:workType',async (req, res) => {
//     try{
//             const workType = req.params.workType;
//     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        
//         const response = await Person.find({work: workType});
//         console.log('response fetched');
//         res.status(200).json(response);
//     }else{
//         res.status(404).json({error: 'Invalid work type'});
//     }
// }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});

//     }
// })

// import the router files
const personRoutes = require('./routes/personRoutes');

const menuItemRoutes = require('./routes/menuItemRoutes')

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, ()=>{
    console.log('listening on port 300')
})