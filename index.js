const express = require('express')
const bodyparser = require('body-parser')
const Razorpay = require('razorpay')
const app = express()
const port = process.env.PORT || 4000;


const razorpay = new Razorpay({
    key_id: 'rzp_test_Tlt3UfdmRsAVaB',
    key_secret: '7z7Wl7zSCyMirhdGqkLSiSbt'
})


// View Engine Setup

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
 



app.get('/', function(req, res){
    res.render('Home')
})



app.post('/order', function(req, res){
  
var options = {
    amount: 40000,
    currency:'INR',
}

razorpay.orders.create(options, function(err, order){
console.log(order)
res.json(order)
})

})


app.post('/is-order-complete', function(req, res){
razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) =>{
    if(paymentDocument.status == 'captured') {
        res.send('payment sucessfull')
    } else {
        res.redirect("/")
    }
})

})    





app.listen(port, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})