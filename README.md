Alexa skill that broadcasts messages via a Sonos system.

# Background

  I never met the guy, but thanks to David Merrick for sharing.  He is smarter than I.  This lambda function is based off a fork of his code that I stumbled on to [here](https://www.david-merrick.com/2017/05/17/alexa-sonos-intercom/).  David's code is pretty polished, but mine is a work in progress.  After a 6 year hiatus, I am getting back into coding.  Bear with me while I knock the rust off my keyboard.

# Requirements

You must have a [Sonos API server](https://github.com/davidmerrick/rpi-node-sonos-http-api) running at a publicly-accessible endpoint.
I recommend using resin.io to do this with a Raspberry Pi.  Good instructions for getting this up and running can be found [here](https://www.david-merrick.com/2017/05/16/setting-up-node-sonos-api/)

# Installation

This is designed to be run on Lambda and called from an Alexa skill.

The [serverless framework](https://serverless.com/) is used to deploy the lambda function.  
Serverless requires the following environment variables.  

* AWS_ACCESS_KEY_ID -
* AWS_SECRET_ACCESS_KEY -
* AWS_REGION - This one is optional.  If not set it will default to us-east-1

Look [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/ "Serverless AWS credentials documentation") for more details.

In addition, the lambda function requires it's own environment variables to function properly.  Set the following variable in your local environment and serverless will set them in your lambda function's environment.

* SONOS_API_SERVER: Publicly-accessible endpoint of your Sonos API server
* AUTH_USERNAME and AUTH_PASSWORD: Credentials to perform Basic auth on requests to that server

After all of these environment variables are in order do the following:
* npm install
* npm install -g serverless
* sls deploy

# Alexa skill
I Setup my Alexa skill like this...

**Skill Information Stuff**
- Skill Type: custom
- Invocation name: Intercom

**Interaction Model Stuff**
- Intent Schema
```
{
  "intents": [
    {
      "slots": [
        {
          "name": "room_name",
          "type": "SonosZone"
        },
        {
          "name": "MessageContent",
          "type": "AMAZON.LITERAL"
        }
      ],
      "intent": "MessageIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
}
```
I created a custom slot type named SonosZone with the following values;
```Basement, Kitchen, Master Bedroom, Office, Maecy, Henry, All, Everyone```

*You will need to change these values to reflect your sonos zone names*

- Sample Utterances
```
MessageIntent {slot value|MessageContent} to {room_name}
MessageIntent to tell {room_name} {slot value|MessageContent}
```
To invoke the skill you need to say something like...
```
Alexa, ask "Intercom" to tell "everyone" "dinner is ready"
```
or
```
Alexa, ask "Intercom" to tell "office" "dinner is ready"
```
or
```
Alexa, tell "Intercom" "dinner is ready" to "office"
```

# Testing
Comming soon
