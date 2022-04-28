const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port=process.env.PORT || 5000;

const app=express();

// middleware 
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.loo8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const serviceCollection=client.db("profferNetwork").collection("service");
        // get service 
        app.get('/service',async(req,res)=>{
            const query={};
            const cursor=serviceCollection.find(query);
            const services=await cursor.toArray();
            res.send(services);
        })

        // post service 
        app.post('/service',async(req,res)=>{
            const newService=req.body;
            const result=await serviceCollection.insertOne(newService);
            res.send(result);
        })
    }
    finally{

    }
}

run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send("running proffer-network")
})

app.listen(port,()=>{
    console.log('Listening to port',port);
})