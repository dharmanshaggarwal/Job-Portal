const express = require('express')
const app = express()
const port = 3001
const jobs = require('./posting.json')
const shortlisted = require('./shortlisted.json')
const interview = require('./interview.json')

var cors = require('cors')


// For CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/jobs', (req, res) => res.json(jobs))

app.get('/candidates', (req, res) => res.json(shortlisted))

app.get('/interviews', (req, res) => res.json(interview))

app.listen(port, () => console.log(`Job Portal app listening on port ${port}!`))
