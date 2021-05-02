var AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: "AKIAW3VN7TLUB5EUY3MZ",
    secretAccessKey: "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",
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

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
