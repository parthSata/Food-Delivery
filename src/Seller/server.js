// server.js (or your server file)
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51PVmy0GkQKWIkWzygytvHl7sqNdtiZNrE1CiHMaFTwJtUXR4e3vJwzgAAP8EAAyHudDZDclrMEY0iHFXZM3IOvX700pPWL5iZO"
);
const app = express();

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Business Registration Fee",
          },
          unit_amount: 5000, // amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
});

app.listen(5173, () => console.log("Running on port 5173"));
