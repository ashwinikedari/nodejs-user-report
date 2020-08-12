var express = require('express');
var router = express.Router();
const userService = require('../service/user')

router.get("/", async (req, res) => {
    try {
        const result = await userService.getUser();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;