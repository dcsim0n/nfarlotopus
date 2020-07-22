/**
 * Link Squid link collection module
 * Dana Simmons 2020
 */
const assert = require('assert');
const logger = require('logger').createLogger();

const _default_regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

class LinkSquid{
  constructor(regex=_default_regex,rollbook={} ){
    this._URLREGEX = regex;
    this._ROLLBOOK = rollbook
    logger.info(`Initialized rollbook with ${Object.keys(this._ROLLBOOK).length}`);
  }

  parseUrlsFromMessage({author, content}){
    assert( typeof(content.match) == 'function', "Message content must be a string or have a 'match' method"); 
    const urls = content.match(this._URLREGEX);
    logger.info(`Parsed ${ urls ? urls.length : '0' } from message`);
    return urls;
  }

  linkCount(author){
    let count 0
    if(author in this._ROLLBOOK){
      count = this._ROLLBOOK[author].length
    }
    return count;
  }

  addUrlsToRollbook(author, urls){
    if( author in this._ROLLBOOK ){
      this._ROLLBOOK[author].push(...urls)
    }else{
      this._ROLLBOOK[author] = urls;
    }
    logger.info(`New count for ${author} is ${this._ROLLBOOK.length}`)
  }

  topAuthors(num_authors = 3){
    AUTHOR_NAMES = Object.keys(this._ROLLBOOK);

    const AUTHORS_BY_POSTS = AUTHOR_NAMES.sort( (poster_a, poster_b)=>{
      return this.linkCount(author_a) - this.linkCount(author_b);
    });

    const top_authors = AUTHORS_BY_POSTS.slice(0, num_authors).map( poster => {
      const poster_data = {
        name: poster,
        num_posts: POSTERS[poster].length
      }

      return poster_data;
    });

    return top_authors;
  }
}