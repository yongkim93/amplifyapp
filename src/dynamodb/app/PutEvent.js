var AWS = require("aws-sdk");

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:c418fb81-39d1-4bae-bbd6-21cb573d5f43',
});

// AWS.config.update({
//     region: "us-east-2",
//     endpoint: "https://dynamodb.us-east-2.amazonaws.com"
// });

// AWS.config.credentials.get(function(){

//     // Credentials will be available when this function is called.
//     var accessKeyId = AWS.config.credentials.accessKeyId;
//     var secretAccessKey = AWS.config.credentials.secretAccessKey;
//     var sessionToken = AWS.config.credentials.sessionToken;

//     console.log(accessKeyId);
//     console.log(secretAccessKey);
//     console.log(sessionToken);
// });

var docClient = new AWS.DynamoDB.DocumentClient();

export default function putEvent(userId, date, type, info) {
    userId = 'yong4';
    date = 'date';
    type = 'appointment'; 
    info = {start: 12, end: 21};
    
    var params = {
        TableName: userId,
        Item: {
            "date": date,
            "type": type,
            "info": info
        }
    };

    console.log("Adding a new item...");

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

}
