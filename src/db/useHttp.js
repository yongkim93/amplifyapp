import useAWS from './useAWS'

const useHttp = () => {
  const { docClient } = useAWS()

  const putEvent = (
    tableName,
    userId,
    uuid,
    startTime,
    endTime,
    info
  ) => {
    tableName = tableName || 'yongshine_appointment'
    userId = userId || 'guest'
    // date = 'date';
    // type = 'appointment';
    // info = {start: 12, end: 21};

    const params = {
      TableName: tableName,
      Item: {
        userId,
        uuid, // epoch of appointment dateTime
        startTime,
        endTime,
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

  const readEvents = (tableName, partitionKey, sortKey) => {
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

    return docClient.query(params).promise()
    // .then((data) => {
    //   // let appointments = new Map();

    //   console.log("Query succeeded.");
    //   data.Items.forEach((item) => map.set(item.appointmentId, item));

    //   // return appointments;
    // });
  }

  return { putEvent, readEvents }
}

export default useHttp
