const stripe = require("stripe")(process.env.STRIPE);

exports.getSecret = async (req, res) => {
  const amount = req.body.amount * 100;
  const { name, line1, postal_code, city, state, country } = req.body.address;
  const intent = await stripe.paymentIntents.create({
    description: "Medrone Services",
    shipping: {
      name: `${name}`,
      address: {
        line1: `${line1}`,
        postal_code: `${postal_code}`,
        city: `${city}`,
        state: `${state}`,
        country: `${country}`,
      },
    },
    amount: `${amount}`,
    currency: "inr",
    metadata: { integration_check: "accept_a_payment" },
  });
  res.json({ clientSecret: intent.client_secret });
};

// exports.makepayment = async (req, res) => {
//   const products = req.body;
//   console.log(products);
//   const items = products.map((item) => {
//     return {
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//           images: [
//             "http://localhost:8000/api/product/photo/5f57f12faac8d00bb4998977",
//           ],
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: 1,
//     };
//   });
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: items,
//     mode: "payment",
//     success_url: `http://localhost:3000/success/{CHECKOUT_SESSION_ID}?success=true`,
//     cancel_url: `http://localhost:3000/failed`,
//   });
//   res.json({ id: session.id });
// };

// exports.getPaymentEvent = (request, response) => {
//   let event;
//   try {
//     event = JSON.parse(request.body);
//   } catch (err) {
//     console.log(`⚠️  Webhook error while parsing basic request.`, err.message);
//     return response.send();
//   }
//   // Handle the event
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const paymentIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case "payment_method.attached":
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }
//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// };

// exports.getSeasondata = async (req, res) => {
//   const seasonId = req.body.sessionId;
//   const session = await stripe.checkout.sessions.retrieve(`${seasonId}`);
//   console.log("BEFORE Payment" + session);
//   res.json(session);
// };

// const uuid = require("uuid/v4");
// exports.makepayment = (req, res) => {
//   const { products, token } = req.body;
//   console.log("PRODUCTS", products);

//   let amount = 0;
//   products.map((p) => {
//     amount = amount + p.price;
//   });
//   const idempotencyKey = uuid();
//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token.id,
//     })
//     .then((customer) => {
//       stripe.charges
//         .create(
//           {
//             amount: amount * 100,
//             currency: "usd",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `Purchased the product`,
//             shipping: {
//               name: token.card.name,
//               address: {
//                 line1: token.card.address_line1,
//                 line2: token.card.address_line2,
//                 city: token.card.address_city,
//                 country: token.card.address_country,
//                 postal_code: token.card.address_zip,
//               },
//             },
//           },
//           {
//             idempotencyKey,
//           }
//         )
//         .then((result) => res.status(200).json(result))
//         .catch((err) => console.log(err));
//     })
//     .catch(console.log("FAILED"));
// };
