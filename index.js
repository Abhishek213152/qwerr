const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PcBzhD8vdk9FbZFvLQw57iFR23ZC6RaDt2eQibCe0Ny8u9jH02X1GWfFL0mzc3C9aQqXDEvpzAOEKcq2ywW0Ymm00pF3sElvn"
);

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/payment", async (req, res) => {
  const { amount } = req.body; // Get the amount from the request body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Set the amount from the request
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json({
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
