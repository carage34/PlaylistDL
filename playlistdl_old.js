const fs = require('fs')
const ytdl = require('ytdl-core')
const cheerio = require('cheerio')
const rp = require('request-promise')
const request = require('request')
const readline = require('readline')
const ffmpeg = require('fluent-ffmpeg')
const exec = require('child_process').exec
var ids = []
var names = []
// AIzaSyDg7hI5nUIKQyuLvuBjadiXScpEG5QAe9I
function parsePage () {
  return new Promise((resolve, reject) => {
    const options = {
      uri: 'https://www.youtube.com/playlist?list=PLVL1kMU8cgSN-w_QzrhYEb8ry8wNb4vvi',
      transform: function (body) {
        // console.log(body)
        return cheerio.load(body)
      }
    }
    rp(options)
      .then(($) => {
        var list = $('.video-title')
        console.log($(list).length)
        $(list).each(function (index) {
          //console.log($(this).children().attr('class'))
          var id = $(this).attr('title')
          var nom = $(this).attr('href')
          ids.push(id)
          names.push(nom)
          resolve()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
let id = 'sDLsSQf3Hc0'

/* let stream = ytdl(id, {
  filter: 'audioonly'
}) */

/* let start = Date.now();
ffmpeg(stream)
  .audioBitrate(128)
  .save(`${__dirname}/${id}.mp3`)
  .on('progress', (p) => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${p.targetSize}kb downloaded`);
  })
  .on('end', () => {
    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
  }); */

parsePage().then(function () {
  /* ytdl('https://www.youtube.com/watch?v=' + 'BgfcToAjfdc', { filter: 'audioonly' })
    .pipe(fs.createWriteStream('zzz' + '.mp3')) */
  /* ytdl.getBasicInfo('https://www.youtube.com/watch?v=BgfcToAjfdc', function (err, info) {
    if (err) throw err
  }) */
}).catch(function (error) {
  console.log(error)
})

/* parsePage().then(  function() {
						//ytdl('https://www.youtube.com/watch?v='+'BgfcToAjfdc', {filter: 'audioonly'})
  //.pipe(fs.createWriteStream("sqsqd"+'.mp3'));
  console.log(ids[50]);
	for(var i=0;i<ids.length;i++) {
		//console.log(command)
		var name1 = names[i].replace(/[^a-zA-Z] /g, "")
		var name2 = name1.replace(/ /g,"_");
		ytdl.getBasicInfo("https://www.youtube.com/watch?v="+ids[i], function (err, info) {
			if(err) {
				console.log(err)
			} else {
				let start = Date.now();
				ffmpeg(stream)
				.audioBitrate(128)
				.save(`${__dirname}/${name2}.mp3`)
				.on('progress', (p) => {
					readline.cursorTo(process.stdout, 0);
					process.stdout.write(`${p.targetSize}kb downloaded`);
				})
				.on('end', () => {
					console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
				})
			}
		})
	}
}) */

parsePage().then(function () {
  // ytdl('https://www.youtube.com/watch?v='+'BgfcToAjfdc', {filter: 'audioonly'})
  // .pipe(fs.createWriteStream("sqsqd"+'.mp3'));
   console.log(ids[50])
  for (var i = 0; i < ids.length; i++) {
    var command = 'ytdl https://www.youtube.com/watch?v=' + ids[i] + ' | ffmpeg -i pipe:0 -b:a 192k -vn ' + names[i] + '.mp3'
    // console.log(command)
    console.log(names[i])
    var name1 = names[i].replace(/[^a-zA-Z] /g, '')
    var name2 = name1.replace(/ /g, '_')
    console.log(name2)
    var command = 'ytdl https://www.youtube.com/watch?v=' + ids[i] + ' | ffmpeg -i pipe:0 -b:a 192k -vn ' + name2 + '.mp3'
    exec(command, function (error, stdout, stderr) {
      console.log('done')
      console.log(command)
      // console.log('stderr:', stderr);
    })
  } 
})
