
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();

const URLREGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

const POSTERS = {};

client.on('ready', ( )=>{
  console.log(`Logged in as: ${client.user.tag}`);
  
  client.channels.fetch("521878912448593922")
  .then(chan =>{
    //do something in the channel
  });
});

client.on('message', (m)=>{
  const urls = m.content.match(URLREGEX);
  // If we have urls and it's not ourself talking: ie, don't track URLS that I post
  if(urls && (m.author === client.user.username )){
    if(POSTERS[m.author]){

      // If the author has posted before, append
      POSTERS[ m.author ].push(...urls);

    }else{

      // if first post, create new array
      POSTERS[ m.author ] = [ ...urls ];

    }
  }

  if (m.content === "!bigsignal"){
    POSTER_NAMES = Object.keys(POSTERS);

    const POSTERS_BY_POSTS = POSTER_NAMES.sort( (poster_a, poster_b)=>{
      return POSTERS[poster_a].length - POSTERS[poster_b].length;
    });

    const top3 = POSTERS_BY_POSTS.slice(0,2).map( poster => {
      const poster_data = {
        name: poster,
        num_posts: POSTERS[poster].length
      }

      return poster_data;
    })

    const response = `Top three posters today:
${top3[0] && top3[0].name}: posted ${top3[0] && top3[0].num_posts} URLs
${top3[1] && top3[1].name}: posted ${top3[1] && top3[1].num_posts} URLs
${top3[2] && top3[2].name}: posted ${top3[2] && top3[2].num_posts} URLs`;
    m.reply(response);
  }

  if (m.content === "!links"){
    const all_urls = [];
    for (const poster in POSTERS) {
      all_urls.push(...POSTERS[poster])
    }

    let response = "All the URLS: \n";
    all_urls.forEach( url =>{
      response = response.concat(`+ ${url}\n`);
    })
    fs.writeFileSync('./links.json',JSON.stringify(all_urls,null,2))
    m.reply(response);
  }
  
  if (m.content === "!help"){
    m.reply(`The NFARL discord bot, im really good at keeping track of links that are posted in the discord chat
!bigsignal : show who has posted the top 3 highest number of links or URLS in the chat
!links : print out a bulleted list of all the links posted recently`);
  }
})

//nfarl channel id 521878912448593922

client.login(process.env.TOKEN);