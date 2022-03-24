<h2>Add Order</h2>
 
<p>
  <pre>
  let axios = require('axios');
  let data = new FormData();
  let dataOrder = {
    "userID":5,
    "brand":"623c79e95e447cb020b2f39e",
    "orderItems":[
        {"name":"แบรนด์ CHANEL","qty":1,"price":4500},
        {"name":"MAILED AUTHENTICITY CARD บริการออกใบรับรองโดย ENTRUPHY","qty":1,"price":500
        },
        {"name":"SPA บริการทำสปากระเป๋า","qty":1,"price":3000}
    ],  
    "paymentMethod":"ATM",
    "paymentResult":{
        "resultCode":"",
        "amount":"",
        "referenceNo":"",
        "gbpReferenceNo":"",
        "statusText":"",
        "imageSlip":""
    },
    "totalPrice":10000.5
}
data.append('data',JSON.stringify(dataOrder))
data.append('files', 'fileImage');
let token = 'token login';
  let config = {
    method: 'post',
    url: 'http://localhost:3000/api/kate-check/order',
    headers: {
    'Authorization': `Bearer ${token}`,
  },
    data : data
  };
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
</pre>

</p>
