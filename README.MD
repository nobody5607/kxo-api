<h1>Install</h1>
<pre>
  git clone https://github.com/nobody5607/kxo-api.git
  cd kxo-api
  npm install
  mv .env-local .env
  config MONGO_URL in .env
  npm sttart
</pre>
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

<h2>Select Brand</h1>
<pre>
let axios = require('axios');
let token = 'token login';
var config = {
  method: 'get',
  url: 'http://localhost:3000/api/kate-check/select-brand/623c79e95e447cb020b2f39e',
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
<pre>{
    "brand": {
        "_id": "623c79e95e447cb020b2f39e",
        "brandName": "Chanel",
        "slug": "chanel",
        "__v": 0,
        "createdAt": "2022-03-24T14:02:18.032Z",
        "updatedAt": "2022-03-24T14:02:18.032Z"
    },
    "categorys": [
        {
            "_id": "623c79ec5e447cb020b2f43b",
            "categoryName": "Accessories",
            "slug": "accessories",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.419Z",
            "updatedAt": "2022-03-24T14:02:20.419Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f450",
            "categoryName": "Collectibles",
            "slug": "collectibles",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.422Z",
            "updatedAt": "2022-03-24T14:02:20.422Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f43e",
            "categoryName": "Jewelry",
            "slug": "jewelry",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.420Z",
            "updatedAt": "2022-03-24T14:02:20.420Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f442",
            "categoryName": "Kate Store",
            "slug": "kate-store",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.420Z",
            "updatedAt": "2022-03-24T14:02:20.420Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f44e",
            "categoryName": "Let's Celebrate 2022",
            "slug": "let-s-celebrate-2022",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.422Z",
            "updatedAt": "2022-03-24T14:02:20.422Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f449",
            "categoryName": "Men Accessories",
            "slug": "men-accessories",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.421Z",
            "updatedAt": "2022-03-24T14:02:20.421Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f44a",
            "categoryName": "Men Accessories",
            "slug": "men-accessories-2",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.422Z",
            "updatedAt": "2022-03-24T14:02:20.422Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f43c",
            "categoryName": "Men Bags",
            "slug": "men-bags",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.419Z",
            "updatedAt": "2022-03-24T14:02:20.419Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f447",
            "categoryName": "Men Clothes",
            "slug": "men-clothes",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.421Z",
            "updatedAt": "2022-03-24T14:02:20.421Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f448",
            "categoryName": "Men Shoes",
            "slug": "men-shoes",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.421Z",
            "updatedAt": "2022-03-24T14:02:20.421Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f445",
            "categoryName": "Owner",
            "slug": "owner",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.421Z",
            "updatedAt": "2022-03-24T14:02:20.421Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f441",
            "categoryName": "Sale Item",
            "slug": "sale-item",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.420Z",
            "updatedAt": "2022-03-24T14:02:20.420Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f444",
            "categoryName": "Test",
            "slug": "test",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.421Z",
            "updatedAt": "2022-03-24T14:02:20.421Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f446",
            "categoryName": "Thai Designer",
            "slug": "thai-designer",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.421Z",
            "updatedAt": "2022-03-24T14:02:20.421Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f44d",
            "categoryName": "Thai Designer",
            "slug": "thai-designer-2",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.422Z",
            "updatedAt": "2022-03-24T14:02:20.422Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f43f",
            "categoryName": "Vintage",
            "slug": "vintage",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.420Z",
            "updatedAt": "2022-03-24T14:02:20.420Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f43d",
            "categoryName": "Watches",
            "slug": "watches",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.419Z",
            "updatedAt": "2022-03-24T14:02:20.419Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f44c",
            "categoryName": "Women Accessories",
            "slug": "women-accessories",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.422Z",
            "updatedAt": "2022-03-24T14:02:20.422Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f443",
            "categoryName": "Women Bags",
            "slug": "women-bags",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.420Z",
            "updatedAt": "2022-03-24T14:02:20.420Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f44b",
            "categoryName": "Women Clothes",
            "slug": "women-clothes",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.422Z",
            "updatedAt": "2022-03-24T14:02:20.422Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f440",
            "categoryName": "Women Shoes",
            "slug": "women-shoes",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.420Z",
            "updatedAt": "2022-03-24T14:02:20.420Z"
        },
        {
            "_id": "623c79ec5e447cb020b2f44f",
            "categoryName": "default",
            "slug": "default",
            "__v": 0,
            "createdAt": "2022-03-24T14:02:20.422Z",
            "updatedAt": "2022-03-24T14:02:20.422Z"
        }
    ]
}</pre>
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
<h2>Output</h2>
<pre>{
    "userID": 5,
    "brand": "623c79e95e447cb020b2f39e",
    "orderItems": [
        {
            "name": "แบรนด์ CHANEL",
            "qty": 1,
            "price": 4500
        },
        {
            "name": "MAILED AUTHENTICITY CARD บริการออกใบรับรองโดย ENTRUPHY",
            "qty": 1,
            "price": 500
        },
        {
            "name": "SPA บริการทำสปากระเป๋า",
            "qty": 1,
            "price": 3000
        }
    ],
    "paymentMethod": "ATM",
    "paymentResult": {
        "resultCode": "",
        "amount": "",
        "referenceNo": "",
        "gbpReferenceNo": "",
        "statusText": "",
        "imageSlip": ""
    },
    "totalPrice": 10000.5,
    "productImages": [
        {
            "name": "kxo_20220325002737rbx51.jpg",
            "number": 1,
            "path": "http://localhost:3000/uploads/images/kxo_20220325002737rbx51.jpg"
        }
    ]
}</pre>
