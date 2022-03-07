export type AmplifyDependentResourcesAttributes = {
    "storage": {
        "TDLDatabase": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "Region": "string"
        }
    },
    "function": {
        "TDLLambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "angulartaskwriter": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "tododbreader": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "auth": {
        "angulartodolist": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "TDLUserPoolGroupRole": "string"
        }
    },
    "api": {
        "ToDoList": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "tododbwriter": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "tododbreader": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}