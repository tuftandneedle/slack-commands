const axios = require('axios');
module.exports = (req, res) => {
  let body = req.body
      regex = RegExp(/\d{5}/);

  if(regex.test(body.text)){
    let zip = regex.exec(body.text)[0];
    axios.get(`https://hubfinder.tuftandneedle.com/?zipcode=${zip}`)
      .then((response) => {
        let { code, address, address2, city, st, zip } = response.data.address
          message = `XLM-${code}:\n${[address, address2].join("\n")}\n${city}, ${st} ${zip}`;
        console.log(response.data.address);
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify({response_type: 'ephemeral', text: message}));
      })
      .catch((error) => {
        res.writehead(200, {'content-type': 'application/json'})
        res.end(json.stringify({response_type: 'ephemeral', text: 'i\'m sorry, but that doesn\'t look like a zipcode'}));
      });
  } else {
    res.writehead(200, {'content-type': 'application/json'})
    res.end(json.stringify({response_type: 'ephemeral', text: 'i\'m sorry, but that doesn\'t look like a zipcode'}));
  }
};
