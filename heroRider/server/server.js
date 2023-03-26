import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
// mongoDB ---
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
// stripe --- 
import stripe from "stripe";



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
const usersCollection = client.db("heroRider").collection("users");



async function run() {
    try {


        //Create a PaymentIntent with the order amount and currency (STRIPE)
        const stripeInstance = stripe(process.env.STRIPT_SECRET_SECRET);
        const calculateOrderAmount = (items) => {
            if (items === "Car") return 200 * 100;
            else if (items === "Motorcycle") return 100 * 100;
        }
        app.post("/create-payment-intent", async (req, res) => {
            const { items } = req.body;
            if (!items) {
                res.send({
                    success: true,
                    clientSecret: false,
                })
            }
            const paymentIntent = await stripeInstance.paymentIntents.create({
                amount: calculateOrderAmount(items),
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            res.send({
                success: true,
                data: paymentIntent.client_secret
            })
        })



        // PAYMENT SUCCESS ADD on DB - 
        app.post("/payment", async (req, res) => {
            const email = req.query.email;
            const payment_intent = req.body?.payment_intent;
            const result = await usersCollection.findOne({ email });

            if (result) {
                const query = { email, }
                const update = { $set: { payedStatus: true, trxId: payment_intent, } };
                const options = {};
                const result2 = await usersCollection.updateOne(query, update, options);

                if (result2.modifiedCount) {
                    res.send({
                        success: true,
                        message: "Successfully get all products",
                        data: result,
                    });
                }
            } else {
                res.send({
                    success: false,
                    message: "No user found on this email",
                });
            }
        })





        // create user on database --- 
        app.post("/users", async (req, res) => {
            const userInfo = req.body;
            const result = await usersCollection.insertOne(userInfo);
            if (result.acknowledged) {
                res.status(200).send({
                    success: true,
                    message: "Successfully create a user",
                    data: result,
                });
            }
        });




        //get one user --
        app.post("/user", async (req, res) => {
            const email = req.query.email;
            const result = await usersCollection.findOne({ email });
            if (result) {
                res.send({
                    success: true,
                    message: "Successfully get all products",
                    data: result,
                });
            } else {
                res.send({
                    success: false,
                    message: "No user found on this email",
                });
            }
        })






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