const express = require("express")





const app = express()


app.use(express.json())
app.set('port',3000)
app.use ((req, res, next)  => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
})


const MongoClient = require('mongodb').MongoClient;

let db;



MongoClient.connect('mongodb+srv://sahl97:Sahl0497@cluster0.gxigz3k.mongodb.net/', (err, client) => {

db = client.db('webstore')
})


app.listen(3000, () => {
    console.log('Express.js server running at localhost:3000')
})

app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/messages')
})
app.param('products', (req, res, next, products
    ) => {
    req.collection = db.collection(products)

    return next()
})

app.get('/collection/:products', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})




app.post('/collection/:products', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
        if (e) return next (e)
        res.send(results.ops)
    })
    })

    const ObjectId = require('mongodb').ObjectID;
    app.get('/collection/:products/:id'
    , (req, res, next) => {
    req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, resulst) => {
        if (e) return next(e)
        res.send(result)
    })
    })

app.put('/collection /:products/:id', (req, res, next) => {
    req.collection.update(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false},
        (e, result) => {
            if (e) return next (e)
            res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
        }) 
        })
    
app.delete('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne(
        { _id: ObjectID(req.params.id) },(e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ?
        {msg: 'success'} : {msg: 'error'})
    })
})

const port = process.env.port || 3000
app.listen (port)
