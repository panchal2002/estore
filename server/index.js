const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")("sk_test_51JMrsCSGChm7mhTkc8X6sDNzMq8Y3lMRXaqtwXwYxOeEjtic2M8NBwgYq7S3XLBmtL71wkDpvkgcJRPiWzyrAGyD00eNGEThOH")
const bodyParser = require("body-parser")
const cors = require("cors")
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "INR",
            description: "eStore Company",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})


app.listen(port, () => {
    console.log(`Sever is listening on port ${port}`)
})