Alexa skill that broadcasts messages via a Sonos system.

# Requirements

You must have a [Sonos API server](https://github.com/davidmerrick/rpi-node-sonos-http-api) running at a publicly-accessible endpoint.
I recommend using resin.io to do this with a Raspberry Pi.

# Installation

This is designed to be run on Lambda.
The AWS SDK will automatically pull credentials from environment variables, as documented
here: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html.

The [serverless framework](https://serverless.com/) is used to deploy this lambda function.  The serverless framework requires the following environment variables.  Look [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/ "Serverless AWS credentials documentation") for more details.

* AWS_ACCESS_KEY_ID -
* AWS_SECRET_ACCESS_KEY -
* AWS_REGION - This one is optional.  If not set it will default to us-east-1

In addition the lambda function requires environment variables to function properly.  Set the following variable in your local environment and serverless will set them in your lambda function.

* SONOS_API_SERVER: Publicly-accessible endpoint of your Sonos API server
* AUTH_USERNAME and AUTH_PASSWORD: Credentials to perform Basic auth on requests to that server

After all of these environment variables are in order do the following:
* npm install
* npm install -g serverless
* sls deploy

# Testing
Comming soon
