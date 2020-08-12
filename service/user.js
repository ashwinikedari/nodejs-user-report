const request = require('request');
const database = require('../db/index')

createReport = async()=>{
    
    let pipeline = [
        {
          '$project': {
            'age': '$dob.age', 
            'nationality': '$nat', 
            'gender': 1, 
            '_id': 0
          }
        }, {
          '$facet': {
            'Male': [
              {
                '$match': {
                  'gender': 'male'
                }
              }, {
                '$group': {
                  '_id': '$nationality', 
                  '0-30': {
                    '$sum': {
                      '$cond': [
                        {
                          '$and': [
                            {
                              '$gte': [
                                '$age', 0
                              ]
                            }, {
                              '$lt': [
                                '$age', 30
                              ]
                            }
                          ]
                        }, 1, 0
                      ]
                    }
                  }, 
                  '30-50': {
                    '$sum': {
                      '$cond': [
                        {
                          '$and': [
                            {
                              '$gte': [
                                '$age', 30
                              ]
                            }, {
                              '$lt': [
                                '$age', 50
                              ]
                            }
                          ]
                        }, 1, 0
                      ]
                    }
                  }, 
                  '50 and above': {
                    '$sum': {
                      '$cond': [
                        {
                          '$gte': [
                            '$age', 50
                          ]
                        }, 1, 0
                      ]
                    }
                  }
                }
              }, {
                '$project': {
                  'nationality': '$_id', 
                  '0-30': 1, 
                  '30-50': 1, 
                  '50 and above': 1, 
                  '_id': 0
                }
              }
            ], 
            'Female': [
              {
                '$match': {
                  'gender': 'female'
                }
              }, {
                '$group': {
                  '_id': '$nationality', 
                  '0-30': {
                    '$sum': {
                      '$cond': [
                        {
                          '$and': [
                            {
                              '$gte': [
                                '$age', 0
                              ]
                            }, {
                              '$lt': [
                                '$age', 30
                              ]
                            }
                          ]
                        }, 1, 0
                      ]
                    }
                  }, 
                  '30-50': {
                    '$sum': {
                      '$cond': [
                        {
                          '$and': [
                            {
                              '$gte': [
                                '$age', 30
                              ]
                            }, {
                              '$lt': [
                                '$age', 50
                              ]
                            }
                          ]
                        }, 1, 0
                      ]
                    }
                  }, 
                  '50 and above': {
                    '$sum': {
                      '$cond': [
                        {
                          '$gte': [
                            '$age', 50
                          ]
                        }, 1, 0
                      ]
                    }
                  }
                }
              }, {
                '$project': {
                  'nationality': '$_id', 
                  '0-30': 1, 
                  '30-50': 1, 
                  '50 and above': 1, 
                  '_id': 0
                }
              }
            ]
          }
        }
      ];

      let db = await database.get();
      let result = await db.collection('user').aggregate(pipeline).toArray().then(resultarray=>resultarray);  
    return result   
}

exports.getUser = async()=>{
    return new Promise((resolve, reject) => {
   request('https://randomuser.me/api/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let userData = JSON.parse(body);
        //  console.log("response", userData['results'][0]);
        let db = database.get();
            db.collection('user').insert(userData['results'][0])
          .then(async(result)=>{
            let datatosend = await createReport();
        console.log(datatosend);

        resolve(datatosend);
          })
          .catch(error => console.error(error))
        } else {
          reject ("error while getting data");
        }
      })
    });
}

