// var distance = require('distance-matrix-api');
import distance from 'distance-matrix-api';
import  Order  from "../models/orderSchema.js";

import express from 'express';
const router = express.Router();

router.route('/test').get( async(req, res) => {
   
//     const { pick_up_address,delivery_address} = req.body;

// //    const schema =  await Order.find({ pick_up_address:pick_up_address },{delivery_address:delivery_address});
//     distance.key(process.env.DISTANCE_API_KEY);
//    distance.units('imperial');
// //    if(schema){
//    distance.matrix(pick_up_address, delivery_address, function (err, distances) {
//     if (distances) {
//         console.log(distances);
//         res.status(200).send(distances);
//     }
//    else{
//     res.status(400).send(err);
    
//    }

// })
// //    }
// })

var origins = ['San Francisco CA'];
var destinations = ['New York NY', '41.8337329,-87.7321554'];
 
distance.matrix(origins, destinations, function (err, distances) {
    if (!err){
        console.log(distances);
        res.status(200).send(distances);
    }else{
        console.log(err);
        res.send(err);
    }
       
})

})

export const distanceRouter = router;