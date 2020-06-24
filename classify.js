const natural = require('natural');

const data = require('./all-messages.json');

const classDocuments = require('./clasifiers.json');

const classifier = new natural.BayesClassifier();

//initialize training
classDocuments.forEach( classObj =>{
  classifier.addDocument(classObj['words'], classObj['class'] );
})

classifier.train();

// for(const msg in data){
//   console.log(`classifying ${urlData[msg]}`)
//   console.log(classifier.classify(...urlData[msg]))
// }

data.forEach((msg)=>{
  console.log("---------------------------");
  console.log("Classifying:");
  console.log(msg.content);
  console.log("-----");
  console.log(classifier.classify(msg.content));
  console.log("----------------------------");
})
