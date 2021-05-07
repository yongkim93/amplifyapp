const AWS = require('aws-sdk')

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-2' // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:c418fb81-39d1-4bae-bbd6-21cb573d5f43'
})

const docClient = new AWS.DynamoDB.DocumentClient()

export default function ReadEvents (tableName, partitionKey, sortKey, map) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: '#userId = :guest',
    ExpressionAttributeNames: {
      '#userId': 'userId'
    },
    ExpressionAttributeValues: {
      ':guest': partitionKey
    }
  }

  return docClient.query(params).promise().then(data => {
    // let appointments = new Map();

    console.log('Query succeeded.')
    data.Items.forEach(item => map.set(item.appointmentId, item))

    // return appointments;
  })
}
