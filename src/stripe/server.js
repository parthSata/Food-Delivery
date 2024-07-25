const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

import PORT from "../Config";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/seller/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Business Registration Fee",
            },
            unit_amount: 200,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${config.stripeClientUrl}/success`,
      cancel_url: `${config.stripeClientUrl}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
});

const PORT = `${PORT}` || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
