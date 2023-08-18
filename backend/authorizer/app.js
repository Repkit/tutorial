// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);

        const policyDocument = {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: 'arn:aws:execute-api:*:*:*/*/GET/api/chello', // allow access GET/api/hello
            },
          ],
        };

        response = {
          principalId: 'systemadmin',
          policyDocument: policyDocument,
          context: { scope: "openid profile read:circles read:admin" }
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    console.log(response);

    return response
};