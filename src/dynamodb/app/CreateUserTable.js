var AWS = require("aws-sdk");

AWS.config.update({
    region: 'us-east-2',
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "yong4",
    KeySchema: [
        { AttributeName: "date", KeyType: "HASH" },  //Partition key
        { AttributeName: "type", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "date", AttributeType: "S" },
        { AttributeName: "type", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});