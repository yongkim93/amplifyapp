const AWS = require('aws-sdk')

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-2' // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:c418fb81-39d1-4bae-bbd6-21cb573d5f43'
})

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

const docClient = new AWS.DynamoDB.DocumentClient()

export default function putEvent (tableName, userId, dateTime, appointmentId, info) {
  tableName = tableName || 'yongshine-guest'
  userId = userId || 'guest'
  // date = 'date';
  // type = 'appointment';
  // info = {start: 12, end: 21};

  const params = {
    TableName: tableName,
    Item: {
      userId: userId,
      appointmentId: appointmentId, // epoch of appointment dateTime
      dateTime: dateTime,
      info: info
    }
  }
  // console.log(params);

  console.log('Adding a new item...')

  return docClient.put(params).promise()
  // docClient.put(params, function (err, data) {
  //     if (err) {
  //         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  //     } else {
  //         console.log("Added item:", JSON.stringify(data, null, 2));
  //     }
  // });
}
