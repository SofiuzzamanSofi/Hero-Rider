import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

// initialized the app ---
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware --- 
app.use(cors());
app.use(express.json());


// mongodb --- 
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.zwgt8km.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const contentsCollection = client.db("redux-thunk-practice").collection("contents");



async function run() {
    try {

    }
    catch (err) {
        console.log(`error from run function under => catch section: ${err}`.bgRed);
    }
    finally {
        console.log("Finally Clg:".yellow);
    }
};
run().catch(error => {
    console.log(error.bgRed)
});




app.get("/", (req, res) => {
    res.status(200).send({
        success: true,
        data: `This is Hero Ride server. Alhamdulillah Running on port: ${port}`,
    });
});

app.listen(port, () => {
    console.log(`Hero-Rider Server Running on port: ${port}`.bgCyan);
})