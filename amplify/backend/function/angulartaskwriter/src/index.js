const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = "TDLDatabase";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  if (event.requestContext.authorizer) {
    const claims = event.requestContext.authorizer.claims;
    username = claims["cognito:username"];
    // console.log(username);
    // console.log(event.body);
    // console.log(event.body['Description'])
    // console.log(event.body.Description)
    // console.log(typeof event.body);
    // console.log(body.Description);

    body = JSON.parse(event["body"]);

    var params = {
      TableName: tableName,
      Item: {
        Description: body.Description,
        Day: body.Day,
        Priority: body.Priority,
        ID: body.ID,
        Reminder: body.Reminder,
        Owner: username,
      },
    };
  }

  let statuscode = 0;
  let response;

  try {
    data = await dynamodb.put(params).promise();
    console.log("Status code : 200");
    statuscode = 200;
    response = data;
    console.log(data);
    return response;
  } catch (error) {
    statuscode = 400;
    response = error.stack;
    console.log("Status code : 400, Error code : ", error.stack);
  }

  //   dynamodb.put(params, function (err, data) {
  //     if (err) {
  //       console.error(
  //         "Unable to add item. Error JSON:",
  //         JSON.stringify(err, null, 2)
  //       );
  //     } else {
  //       console.log("Added item:", JSON.stringify(data, null, 2));
  //     }
  //   });

  return {
    statusCode: statuscode,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(data),
  };
};
