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

    assert(event.request.intent.name.toLowerCase() === 'message')
    assert(event.request.intent.slots.item.value)
  } catch (e) {
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

  axios.get(`${SONOS_API_SERVER}/office/say/Happy Birthday!`, options)
      .then(response => {
          console.log("SUCCESS: broadcasted message.");
          this.emit(':tell', `Done.`);
          return;
      })
      .catch(err => {
          console.error(err);
          this.emit(':tell', "Error occurred broadcasting message");
          return;
      });

  var item = event.request.intent.slots.item.value

  if (item * 1 === 42) {
    callback(null, message(
      "42",
      "42 is the answer to the Ultimate Question of Life, the Universe, and Everything!"
    ))
  } else {
    callback(null, message(
      "Asked for " + item,
      "I don't know anything about " + item
    ))
  }
}
