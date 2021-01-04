import { db } from '@/firebase/firestore'

const api_key = 'AIzaSyCzvvwMjjtjzXRrE-CZjM_ndN6C8F45Ios'

//チャンネルIDの取得
export async function getVideos(maxResults) {
        const docRef = db.collection( 'youtulist' )

        return docRef.get().then( DocumentSnapshot => {
            var arrChannelIds = []
            DocumentSnapshot.forEach( doc => {
                if( doc.id == ('idlist')){
                    arrChannelIds=doc.get('ids')
                }
            })
            var arrPlaylists = []
            var getPlaylists = []
            arrChannelIds.forEach(channelId => {
                getPlaylists.push(requestUserUploadsPlaylistId(channelId).then(playlist => arrPlaylists.concat(arrPlaylists, playlist)))
            })
            return Promise.all(getPlaylists).then(playlists => {
                return pushVideos(playlists, maxResults)
                .then( videos => sortVideoList(videos, maxResults))
            })
        })
}

//プレイリストIDの取得
function requestUserUploadsPlaylistId ( channelId ) {
    return new Promise( resolve => {
        const url = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=' + channelId + '&key=' + api_key
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = () => {
            let json = JSON.parse(xhr.responseText)
            let playlistId = json.items[0].contentDetails.relatedPlaylists.uploads
            resolve(playlistId)
        }
    })
}

//プレイリスト内の動画情報の取得
function requestVideoPlaylist(playlistId) {
    return new Promise( resolve => {
        const maxresults = 1
        const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+ maxresults +'&playlistId='+playlistId+'&key='+api_key;
        let xhr = new XMLHttpRequest()
        var arrVideos = new Array()
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = () => {
            var json = JSON.parse(xhr.responseText)
            for(var i in json.items){
                let mapVideo = {
                    thumbnail: json.items[i].snippet.thumbnails.high ? json.items[i].snippet.thumbnails.high.url : json.items[i].snippet.thumbnails.default.url,
                    title: json.items[i].snippet.title,
                    publishDate: new Date(json.items[i].snippet.publishedAt).getTime(),
                    url: 'https://www.youtube.com/watch?v=' + json.items[i].snippet.resourceId.videoId,
                    videoId: json.items[i].snippet.resourceId.videoId
                }
                arrVideos.push(mapVideo)
            }
            resolve(arrVideos)
        }
    })
}

//取得した動画のソート・カット
function sortVideoList( arrVideos, maxResults ) {
    return new Promise( resolve => {
        for(let iOrigin = 0; iOrigin < arrVideos.length -1; iOrigin++) {
            for(let i = arrVideos.length-1; i > iOrigin; i--){
                if(arrVideos[i]['publishDate'] > arrVideos[i-1]['publishDate']){
                    let tmp = arrVideos[i]
                    arrVideos[i] = arrVideos[i-1]
                    arrVideos[i-1] = tmp
                }
            }
        }
        if(arrVideos.length > maxResults){
            arrVideos.splice(maxResults)
        }
        resolve(arrVideos)
    })
}

//チャンネルから動画情報を取り出して配列に追加する
function pushVideos( playlistIds ){
    var apis = []
    var arrVideos = []

    for(let i = 0; i < playlistIds.length; i++){
        apis.push(requestVideoPlaylist(playlistIds[i]).then(videos => 
            arrVideos = arrVideos.concat(videos)
        ))
    }
    return Promise.all(apis).then(() => {
        return arrVideos
    })
}