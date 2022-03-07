const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = 'TDLDatabase';
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    if (event.requestContext.authorizer) {
        const claims = event.requestContext.authorizer.claims;
        username = claims["cognito:username"];

        console.log(username);

        var params = {
            TableName: tableName, 
            IndexName: "Owner-index",
            KeyConditionExpression: "#Owner = :owner",
            ExpressionAttributeNames: {
              "#Owner": "Owner"
            },
            ExpressionAttributeValues: { 
              ":owner": username
            }
        };

        try {
            data = await dynamodb.query(params).promise();
            console.log( "Status code : 200"); 
            console.log(data);
    
            let response = 
            {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods" : "OPTIONS,POST,GET,PUT"
                 }, 
                body: JSON.stringify(data)
            }
    
            return response;
    
        } catch (error){
            console.log( "Status code : 400, Error code : ", error.stack);
        }

    }
    
    

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(data),
    };
};
