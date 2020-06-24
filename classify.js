const natural = require('natural');

const urlData = require('./url-messages.json');

const classDocuments = require('./clasifiers.json');

const classifier = new natural.BayesClassifier();

//initialize training
classDocuments.forEach( classObj =>{
  classifier.addDocument(classObj['words'], classObj['class'] );
})

classifier.train();

for(const msg in urlData){
  console.log(`classifying ${urlData[msg]}`)
  console.log(classifier.classify(...urlData[msg]))
}
