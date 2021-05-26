import docClient from './AWS'

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

export default function putEvent(tableName, userId, dateTime, appointmentId, info) {
  tableName = tableName || 'yongshine-guest'
  userId = userId || 'guest'
  // date = 'date';
  // type = 'appointment';
  // info = {start: 12, end: 21};

  const params = {
    TableName: tableName,
    Item: {
      userId,
      appointmentId, // epoch of appointment dateTime
      dateTime,
      info
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
