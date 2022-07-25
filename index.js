import express from 'express';
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Mongo DB connection
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb connected!");
    return client;
}
export const client = await createConnection();


app.get("/", (request, response) => {
    response.send("Hello World...");
})



app.listen(PORT, () => console.log("App is started in ", PORT));