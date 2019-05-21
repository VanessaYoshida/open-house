var Cronofy = require('cronofy');

const url = 'api.cronofy.com/oauth/token';

var authorizationBasic = window.btoa('k4umJL7WB-Shu9ixWnLpMcwrMv-yPEE5' + ':' + '7_I09Welr_6ApLMG9d7OFtLL5gfOZBAd9ZQ7212EoAmgZMKUD4Na8yBRjISubPHntz1FiITExPNXu81ucrnRqw');

var request = new XMLHttpRequest();
request.open('POST', oAuth.AuthorizationServer, true);
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
request.setRequestHeader('Accept', 'application/json');
request.send("username=John&password=Smith&grant_type=password");

request.onreadystatechange = function () {
    if (request.readyState === 4) {
       alert(request.responseText);
    }
};

var client = new Cronofy({
  client_secret: "7_I09Welr_6ApLMG9d7OFtLL5gfOZBAd9ZQ7212EoAmgZMKUD4Na8yBRjISubPHntz1FiITExPNXu81ucrnRqw"
});

var options = { 'smart_invite_id': 'example-1558452409', 'recipient_email': 'dudammduarte@yahoo.com.br' };

console.log(options)

client.getSmartInvite(options)
  .then(function (response) {
    var invite = response;
  });