
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();

const URLREGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

const URLS = {};
const MESSAGES = [];

client.on('ready', ( )=>{
  console.log(`Logged in as: ${client.user.tag}`);
  
  client.channels.fetch("521878912448593922")
  .then(chan =>{
    // Creates a Collector that can filter out messages
    // msgCollector = new Discord.MessageCollector(chan, (m)=>{
    //   return m.createdAt >= new Date("2020/06/22 20:30 EDT") ? true : false
    // });
    // msgCollector.on('collect',( m ) =>{
    //   console.log(`Found message: ${m.content}`)
    // })

    // Fetch recent messages and extract links and URLS
    msgMgr = new Discord.MessageManager(chan)
    msgMgr.fetch({limit: 100})
    .then( allMessages =>{
      // allMessages is a Collection Map 

      fs.writeFileSync('./all-messages.json', JSON.stringify(allMessages.array(),null,2));
      for (const msg of allMessages) {

        console.log("Checking msg id:", msg[0])

        urls = msg[1].content.match(URLREGEX);

        if(urls){
            
          urls.forEach( url =>{ 
            if( URLS[url] ){
              URLS[url].push(msg[1].content)
            }else{
              URLS[url] = [msg[1].content]
            }
          });
        }
      }
      console.log(URLS);
      fs.writeFileSync('./url-messages.json',JSON.stringify(URLS,null,4));
      // When complete, log out
      client.destroy();
    })
  })
});

client.on('message', (m)=>{
  if(m.content == "!ping"){
    m.channel.send("Pong");
    console.log(m.channel.id);
  }
})

//nfarl channel id 521878912448593922

client.login(process.env.TOKEN);