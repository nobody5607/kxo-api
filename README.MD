<h2>Get Brands</h2>
<pre>
let axios = require('axios');
let token = 'token login';
let config = {
    method: 'get',
    url: 'http://localhost:3000/api/kate-check/brand',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
};

axios(config)
.then(function (response) {
console.log(JSON.stringify(response.data));
})
.catch(function (error) {
console.log(error);
});

</pre>
<h2>Output</h2>
<pre>
  [
    {
        "_id": "623c79e95e447cb020b2f39d",
        "brandName": "Hermes",
        "slug": "hermes",
        "__v": 0,
        "createdAt": "2022-03-24T14:02:18.031Z",
        "updatedAt": "2022-03-24T14:02:18.031Z"
    },
    {
        "_id": "623c79e95e447cb020b2f39e",
        "brandName": "Chanel",
        "slug": "chanel",
        "__v": 0,
        "createdAt": "2022-03-24T14:02:18.032Z",
        "updatedAt": "2022-03-24T14:02:18.032Z"
    },
    {
        "_id": "623c79e95e447cb020b2f39f",
        "brandName": "Louis Vuitton",
        "slug": "louis-vuitton",
        "__v": 0,
        "createdAt": "2022-03-24T14:02:18.032Z",
        "updatedAt": "2022-03-24T14:02:18.032Z"
    },
    {
        "_id": "623c79e95e447cb020b2f3a3",
        "brandName": "Celine",
        "slug": "celine",
        "__v": 0,
        "createdAt": "2022-03-24T14:02:18.032Z",
        "updatedAt": "2022-03-24T14:02:18.032Z"
    }
]
</pre>

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
