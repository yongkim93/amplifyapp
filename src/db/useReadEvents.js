import useAWS from "./useAWS";

const useReadEvents = (tableName, partitionKey, sortKey) => {
  const { docClient } = useAWS();
  const params = {
    TableName: tableName,
    KeyConditionExpression: "#userId = :guest",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":guest": partitionKey,
    },
  };

  return docClient.query(params).promise();
  // .then((data) => {
  //   // let appointments = new Map();

  //   console.log("Query succeeded.");
  //   data.Items.forEach((item) => map.set(item.appointmentId, item));

  //   // return appointments;
  // });
};

export default useReadEvents;
