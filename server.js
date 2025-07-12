const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB Atlas connection string)
mongoose.connect(const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://camprich:Mimidog322@calendar.offybal.mongodb.net/?retryWrites=true&w=majority&appName=Calendar";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'));

// Event Schema
const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  email: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

// Get Events
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Save Events
app.post('/events', async (req, res) => {
  const events = req.body;
  await Event.deleteMany({ date: { $in: events.map(e => e.date) } });
  await Event.insertMany(events);
  res.json({ message: 'Events saved' });
});

// Delete Events
app.delete('/events', async (req, res) => {
  const { dates } = req.body;
  await Event.deleteMany({ date: { $in: dates } });
  res.json({ message: 'Events deleted' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
