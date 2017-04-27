var app = require('express');
var router = app.Router();


router.post('/1', function(req, res) {

    var msg2 = {
        src: "B",
        dst: "A",
        timestamp: "",
        proofOfOrigin: ""
    };

    res.send(msg2);
});

router.post('/2', function(req, res) {

    var msg4 = {
        src: "B",
        dst: "A",
        timestamp: "",
        proofOfOrigin: ""
    };

    res.send(msg4);
});

module.exports = router;