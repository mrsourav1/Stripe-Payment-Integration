require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const stripe = require('stripe')(process.env.STRIPE_PREIVATE_KEY)


const storeItems = new Map([
    [1,{priceInCents:899,name:"Veg Burger"}],
    [2,{priceInCents:999,name:"Chicken Burger"}],
    [3,{priceInCents:799,name:"Egg Burger"}],
    [4,{priceInCents:1299,name:"Onion and Capsicum Pizza"}],
    [5,{priceInCents:1199,name:"Corn Pizza"}],
    [6,{priceInCents:1399,name:"Paneer Pizza"}],
    [7,{priceInCents:1099,name:"White Sauce Pasta"}],
    [8,{priceInCents:1199,name:"Mix Sauce Pasta"}],
    [9,{priceInCents:999,name:"Red Sauce Pasta"}]
])

app.post('/create-checkout-session', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          };
        }),
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
      });
  
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  

app.listen(3001,()=>{
    console.log("running at 3001")
})