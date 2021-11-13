const router = require('express').Router(); //Direclty generate a router
const submissionService = require('../services/submissionService.js');

router.get('/', async (req, res) => {
    
    try {
        const submissions = await submissionService.getAll();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;