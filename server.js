const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser')
const app = express();
const port = 1234;

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Get Items
 */
app.get('/api/getItems/', async (req, res) => {
    let data = await readFile();
    console.log(data);
    if(data.err) res.send('error');
    res.send(JSON.stringify(data));
})

app.post('/api/UpdateItems/', async (req, res) => {
    let data = await updateFile(req.body);
    if(data.err) res.send('error');
    res.send(JSON.stringify(data));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Helper Functions
const readFile = async () => {
    let data = [];
    try {
        data = await fs.readJson('./items.json')
    } catch (err) {
        console.log(err);
        data = {"err":err}
    }finally{
        return data
    }
}

const updateFile = async (jsonData) => {
    let data = [];
    try {
        await fs.writeJson('./items.json', jsonData)
        data = jsonData;
    } catch (err) {
        console.log(err);
        data = {"err":err}
    }finally{
        return data
    }
}
