const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Person saved:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('All persons fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching persons:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET persons by workType
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase();
        const validWorkTypes = ['chef', 'manager', 'waiter'];

        if (validWorkTypes.includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log(`${workType}s fetched`);
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error fetching by workType:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req,res) =>{
    try{
        // extract the id from the url parameter
        const personId = req.params.id;
        // updated data for the person
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            // return the updated document
            new: true,
            // run mongoose validation
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        
        console.log('Data updated');
        res.status(200).json(response)

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
});

router.delete('/:id', async (req, res) =>{
    try{
         const personId = req.params.id;
         const response = await Person.findByIdAndDelete(personId);

         if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data delete');
        res.status(200).json({message:'person delete Successfully'});

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})
module.exports = router;
