var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "time-frame"
});

router.get('/inprogress', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM start_stop WHERE stop = ""`, function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });
});

router.post('/start', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        const currentTime = req.body.currentTime;
        const event = req.body.event;

        let sql = `INSERT INTO start_stop (event, start) VALUES ('${event}', '${currentTime}')`;
        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(sql);
            console.log(result);
            res.json({success: true});
        });
    });
});

router.post('/stop', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
//TODO
        const event = req.body.event;
        const currentTime = req.body.currentTime;
        let sql = `UPDATE start_stop SET stop = '${currentTime}' WHERE event = '${event}' AND stop = ""`;
        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(sql);
            console.log(result);
            res.json({success: true});
        });
    });
});
module.exports = router;
