const router = require('express').Router(); //Direclty generate a router

router.get('/', (req, res) => {
    let obj = {type:'string', number:5};
    //console.log(req.body);
    console.log(req.query);
    res.json(obj);
})

module.exports = router;