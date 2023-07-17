const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user name: SocialUser9064
// password:PbOPCWtWV3BXsJEM

const uri =
  "mongodb+srv://SocialUser9064:PbOPCWtWV3BXsJEM@cluster0.ufyogxa.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const postCollection = client.db("createPost").collection("post");
    const userCOllection = client.db("createPost").collection("user");

    app.get("/post", async (req, res) => {
      const query = {};
      const post = await postCollection.find(query).toArray();
      res.send(post);
    });
    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const data = req.body;
      const result = await userCOllection.insertOne(data);
      res.send(result);
    });

    app.get("/get-single-user", async (req, res) => {
      const { email } = req.query;
      const result = await userCOllection.findOne({ email: email });
      res.send(result)
    });

    app.patch("/updated-user/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const result = await userCOllection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      res.send(result)
    });
  } finally {
  }
}
run().catch(console.log("error"));

app.get("/", (req, res) => {
  res.send("Hello server");
});

app.listen(port, () => {
  console.log(`run server ${port}`);
});
