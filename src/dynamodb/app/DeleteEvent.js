import docClient from "./AWS";

export default function deleteEvent(tableName, userId, appointmentId) {
  var params = {
    TableName: tableName,
    Key: {
      userId,
      appointmentId
    },
  };

  console.log("Attempting a conditional delete...");
  return docClient.delete(params).promise();
  //   docClient.delete(params, function (err, data) {
  //     if (err) {
  //       console.error(
  //         "Unable to delete item. Error JSON:",
  //         JSON.stringify(err, null, 2)
  //       );
  //     } else {
  //       console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
  //     }
  //   });
}
