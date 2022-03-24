<h2>Add Order</h2>
<p>var axios = require('axios');</p>
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('data', '{\n    "userID":5,\n    "brand":"623c79e95e447cb020b2f39e",\n    "orderItems":[\n        {"name":"แบรนด์ CHANEL","qty":1,"price":4500},\n        {"name":"MAILED AUTHENTICITY CARD บริการออกใบรับรองโดย ENTRUPHY","qty":1,"price":500\n        },\n        {"name":"SPA บริการทำสปากระเป๋า","qty":1,"price":3000}\n    ],  \n    "paymentMethod":"ATM",\n    "paymentResult":{\n        "resultCode":"",\n        "amount":"",\n        "referenceNo":"",\n        "gbpReferenceNo":"",\n        "statusText":"",\n        "imageSlip":""\n    },\n    "totalPrice":10000.5\n}');
data.append('files', fs.createReadStream('/C:/Users/Admins/Pictures/background/9.jpg'));

var config = {
method: 'post',
url: 'http://localhost:3000/api/kate-check/order',
headers: {
'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW50IjoiMWQiLCJkYXRhIjp7ImlkIjo1LCJ1c2VybmFtZSI6ImFkbWluIiwibmlja25hbWUiOiJhZG1pbiIsImZpcnN0bmFtZSI6Im51dHRhcG9uIiwibGFzdG5hbWUiOiJjaGFucGFuIiwiZW1haWwiOiJjaGFucGFuLm51dHRhcGhvbjE5OTNAZ21haWwuY29tIiwiYWRkcmVzcyI6IiIsImNyZWF0ZV9kYXRlIjoiMjAyMS0wNS0xMFQwMzowNzozMC4wMDBaIiwidXBkYXRlX2RhdGUiOm51bGwsInVzZXJfaW1nIjoiZnJvbnRfMjAyMjAxMTExODMxMTNkaHY2ei5qcGciLCJwZXJtaXNzaW9uIjoiYWRtaW4iLCJ1c2VyX3N0YXR1cyI6MSwibGFzdF9sb2dpbiI6bnVsbCwic29jaWFsX2lkIjpudWxsLCJwcm92aWRlciI6bnVsbCwiYmlydGhkYXkiOiIxOTkzLTA4LTA2VDE3OjAwOjAwLjAwMFoiLCJkaXNwbGF5X25hbWUiOm51bGwsImt4b191c2VyX2xldmVsIjpudWxsLCJwaG9uZSI6bnVsbH0sImlhdCI6MTY0NTgyMjg3OH0.FIR9zNtBr1SO81kVH50SjnBFT8O8WUOJfhzWR2hqpc0',
...data.getHeaders()
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
