'use strict'
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var mongourl = process.env.MongodbURL;


module.exports = {
  findHighData: function(){
    return MongoClient.connect(mongourl).then(function(db){
      let collection = db.collection('highscore');
      let query = {"name":"none"};
      return collection.find(query).toArray();
    }).then (function(items){
      let obj = {"total":0,"win":0,"loss":0};
      obj.total = items[0].Total;
      obj.win = items[0].Win;
      obj.loss = items[0].Loss;
      return obj;
    });
  },
  findNameData: function(){
    return MongoClient.connect(mongourl).then(function(db){
      let collection = db.collection('players');
       return collection.find().sort({"Percentage":-1}).limit(5).toArray();
  }).then (function(items){
      //console.log(items);
      let answer = [];
      for (let i=0;i<5;i++){
      let obj = {"name":null,"total":0,"win":0,"loss":0};
      obj.name = items[i].name;
      obj.total = items[i].Total;
      obj.win = items[i].Win;
      obj.loss = items[i].Loss;
      answer.push(obj);
      }
      console.log(answer);
      return answer;
  });
  }
};

