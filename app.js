
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

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

    // Collect last 10 messages
    msgMgr = new Discord.MessageManager(chan)
    msgMgr.fetch({limit: 10})
    .then( m =>{
      console.log(m.array().length);
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