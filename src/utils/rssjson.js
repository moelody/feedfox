const request = require('request-promise-native')
const xml2js = require('xml2js')

const util = require('util')
const $ = require('cheerio')

const parser = json => {
  const rss = { feed: {}, items: [] }
  const { feed } = rss
  let channel = json.rss.channel

  if (util.isArray(json.rss.channel)) {
    channel = json.rss.channel[0]
  }

  if (channel.title) {
    feed.title = channel.title[0]
  }

  if (channel.description) {
    feed.description = channel.description[0]
  }

  if (channel.link) {
    feed.link = channel.link[0]
  }

  if (channel.image) {
    feed.image = channel.image[0].url
  }

  if (!feed.image && channel['itunes:image']) {
    feed.image = channel['itunes:image'][0].href
  }

  feed.image = feed.image && Array.isArray(feed.image) ? feed.image[0] : ''

  if (channel.item) {
    if (!util.isArray(channel.item)) {
      channel.item = [channel.item]
    }

    channel.item.forEach(val => {
      const obj = {}

      obj.title = !util.isNullOrUndefined(val.title) ? val.title[0] : ''
      obj.description = !util.isNullOrUndefined(val.description) ? val.description[0] : ''

      if (obj.description) {
        const des = $.load(obj.description)
        obj.content = des('p').text()
        obj.thumbnail= des('img').map(function(){
          return $(this).attr('src')
        }).get()
      }

      if (val.pubDate) {
        obj.pubDate = val.pubDate[0]
      }

      if (val.enclosure) {
        obj.enclosures = []

        if (!util.isArray(val.enclosure)) {
          val.enclosure = [val.enclosure]
        }

        val.enclosure.forEach(enclosure => {
          const enc = {}

          for (const x in enclosure) {
            enc[x] = enclosure[x][0]
          }

          obj.enclosures.push(enc)
        })
      }

      obj.guid = !util.isNullOrUndefined(val.guid) ? val.guid[0]._ : ''
      obj.link = !util.isNullOrUndefined(val.link) ? val.link[0] : ''
      obj.author = !util.isNullOrUndefined(val.author) ? val.author[0] : ''

      rss.items.push(obj)
    })
  }

  return rss
}

export default url => {
  return new Promise(async (resolve, reject) => {
    if (!url) {
      return reject(new TypeError('`url` is required'))
    }

    const res = await request({
      url,
      pool: false,
      followRedirect: true
    })

    const p = new xml2js.Parser({
      trim: false,
      normalize: false,
      mergeAttrs: false
    })

    p.parseString(res, (err, rss) => {
      if (err) {
        return reject(err)
      }

      resolve(parser(rss))
    })
  })
}
