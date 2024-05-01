// const router = require("express").Router();
// const stripe = require("stripe")("sk_test_51OoJ8TSIbUq7dP8nYUxpV3GkS8PLy5WyS1RLtSj3dBWhOAjsd9mTZKm42u7SdrbdPxwIhQt5CrLgPHzL9TZkHivF001vZFUFIf");

// router.post("/payment", async(req, res) => {
//   await stripe.charges.create(
//     { 
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         console.error("Stripe Error:", stripeErr);
//         res.status(500).json({ error: "Payment processing failed", details: stripeErr.message });
//       } else {
//         console.log("Stripe Response:", stripeRes);
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// module.exports = router;



const router = require("express").Router();
const stripe = require("stripe")("sk_test_51Oh4CQSGliqMpWOvGO5CbsVmsxbNoHOITZ453wd4C4iue0VEAdm5tj2C5ZTlYNrGYysL4eCfCPLvuuD0jgFofDKQ00pyRaRQqZ");


router.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;
  const lineItems = product.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name
      },
      unit_amount: Math.floor(product.price * 100),  
    },
    quantity: product.quantity
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000",
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
