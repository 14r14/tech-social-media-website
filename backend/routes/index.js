let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.send({msg: "Hello World!"});
});

module.exports = router;