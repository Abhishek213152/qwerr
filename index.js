const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51PcBzhD8vdk9FbZFvLQw57iFR23ZC6RaDt2eQibCe0Ny8u9jH02X1GWfFL0mzc3C9aQqXDEvpzAOEKcq2ywW0Ymm00pF3sElvn");

const app = express();
app.use(express.json()); // Make sure to parse JSON requests
app.use(cors());

app.post("/payment", async (req, res) => {
  try {
    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 8000, // Amount in the smallest currency unit (e.g., cents for USD)
      currency: "inr",
      // Optionally, you can add more parameters here
    });

    // Send the client secret to the client
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
