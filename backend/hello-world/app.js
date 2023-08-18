// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

const { Pool, Client } = require("pg");

const credentials = {
  user: "postgres",
  host: "host.docker.internal",
  database: "nodedemo",
  password: "yourpassword",
  port: 5432,
};
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

        const poolResult = await poolDemo();
        console.log("Time with pool: " + poolResult.rows[0]["now"]);

        const clientResult = await clientDemo();
        const now = clientResult.rows[0]["now"];
        console.log("Time with client: " + now);

        response = {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            'body': JSON.stringify({
                message: now,
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}
