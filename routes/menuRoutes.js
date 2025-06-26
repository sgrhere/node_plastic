const express = require('express')
const router = express.Router()
const menuItem = require('./../models/menuItem')

// POST route to add a menuItem
router.post('/', async (req, res) => {
    try {
        const dataa = req.body

        // Create a new menu document using the Mongoose model
        const newMenu = new menuItem(dataa)

        //Save the new person to the database
        const response = await newMenu.save()
        console.log("data is saved successfully");
        res.status(200).json(response)


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Get method to get the person
router.get("/", async (req, res) => {
    try {
        const data = await menuItem.find()
        console.log("data fetched successfully");
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Parameterized API calls
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType // Extract the work type from the URL parameter
        if (tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour') {
            const response = await menuItem.find({ taste: tasteType });
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid taste type' })
        }
    } catch (error) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//UPDATE method
router.put('/:id', async (req,res)=>{
    try {
        const menuID = req.params.id;
        const updatedMenuData = req.body

        const response = await menuItem.findByIdAndUpdate(menuID,updatedMenuData,{
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error: 'Menu not found'})
        }
        console.log("Menu data Updated");
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// DELETE Method

router.delete('/:id', async (req, res)=>{
    try {
        const menuID = req.params.id;
        const response = await menuItem.findByIdAndDelete(menuID)
        if(!response){
            return res.status(404).json({error: 'Menu not found'})
        }
        console.log("menu deleted succesfully")
        res.status(200).json({message: 'Data deleted successful.'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router
