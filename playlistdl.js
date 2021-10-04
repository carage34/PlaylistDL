const axios = require('axios');
const fs = require('fs');
const ytdl = require('ytdl-core');
const slugify = require('slugify')
videos = [];
baseUrl = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=500&playlistId=PLVL1kMU8cgSN-w_QzrhYEb8ry8wNb4vvi&key=" + process.env.API_KEY;
characterToRemove = ["/", ":", "*", "?", "\"", "<", ">", "|", "'", " " ];
function fetchVideosId(url) {
    axios.get(url)
        .then(function (response) {
            for (const property in response.data) {
                for (const property1 in response.data[property]) {
                    let snippet = response.data[property][property1]['snippet'];
                    let videoItem = {};
                    for (item in snippet) {
                        if (item === "title") {
                            videoItem.title = snippet[item];
                        }
                    }
                    let obj = response.data[property][property1]['contentDetails']
                    for (item in obj) {
                        if (item === "videoId") {
                            //console.log(obj[item]);
                            videoItem.id = obj[item];
                            videos.push(videoItem);
                        }
                    }
                }
            }
            if (response.data['nextPageToken']) {
                fetchVideosId(baseUrl + "&pageToken=" + response.data['nextPageToken']);
            } else {
                downloadMusic();
            }
        }).catch(error => {
            console.log(error);
        })
}

function downloadMusic() {

    videos.forEach(element => {
        let title = element.title;
        title=(title.replace(/[ &\/\\#,+()$~%.'|":*?<>{}]/g, "_"));
        console.log(title);
        const file = fs.createWriteStream("mp3/" + title + '.mp3');
        file.on('error', (err) => {
            console.log(err);
        })
       
            let stream = ytdl('http://www.youtube.com/watch?v=' + element.id).on('error', (err) => {console.log(err)});
            stream.pipe(fs.createWriteStream("mp3/" + title + '.mp3'));
        
       
    });
}

fetchVideosId(baseUrl);




