const assert = require('assert')
const axios = require('axios')

const message = (title, message) => {
  return {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": message
      },
      "card": {
        "content": message,
        "title": title,
        "type": "Simple"
      },
      "shouldEndSession": true
    },
    "sessionAttributes": {}
  }
}

module.exports.message = (event, context, callback) => {
  try {
    assert(event.session)
    assert(event.session.application)
    assert(event.request)
    assert(event.request.intent)
    console.log('intent name:' + event.request.intent.name);
    assert(event.request.intent.name.toLowerCase() === 'messageintent');
    assert(process.env.SONOS_API_SERVER);
    assert(process.env.AUTH_USERNAME);
    assert(process.env.AUTH_PASSWORD);

  } catch (e) {
    console.log(e);
    callback(null, message(
      "Invalid request",
      "Sorry, but I cannot handle your request"
    ))
  }
  const SONOS_API_SERVER = process.env.SONOS_API_SERVER;
  const AUTH_USERNAME = process.env.AUTH_USERNAME;
  const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

  let auth = {
      username: AUTH_USERNAME,
      password: AUTH_PASSWORD
  };

  let options = {
      auth: auth
  };

  let slots = event.request.intent.slots;
  let messageContent = slots.MessageContent.value;
  let sonosZone = slots.room_name.value;
  console.log("message - " + messageContent);
  console.log("sonosZone - " + sonosZone);

  console.log("ready to call sonos api");
  axios.get(`${SONOS_API_SERVER}/${sonosZone}/say/${messageContent}`, options)
      .then(response => {
          console.log("SUCCESS: broadcasted message.");
          callback(null, message(
            "SUCESS",
            'Sonos message, ' + messageContent + ', successfully sent to, ' + sonosZone
          ))
      })
      .catch(err => {
          console.log("ERROR sending message")
          console.error(err);
          callback(null, message(
            "Error",
            "Check error logs for more information"
          ))
      });
}
