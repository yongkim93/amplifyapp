
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
  region: 'us-east-2'
  // endpoint: "http://localhost:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing movies into DynamoDB. Please wait.')

const allMovies = JSON.parse(fs.readFileSync('src/dynamodb/moviedata.json', 'utf8'))
allMovies.forEach(function(movie) {
  const params = {
    TableName: 'Movies',
    Item: {
      year: movie.year,
      title: movie.title,
      info: movie.info
    }
  }

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Unable to add movie', movie.title, '. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('PutItem succeeded:', movie.title)
    }
  })
})
