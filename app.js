
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

const URLREGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const URLS = [];

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
      for (const msg of allMessages) {

        console.log("Checking msg id:", msg[0])

        urls = msg[1].content.match(URLREGEX);

        if(urls){
          URLS.push(...urls);
        }
      }
      console.log(URLS);
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