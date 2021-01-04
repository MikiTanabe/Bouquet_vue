import { GoogleApis } from 'googleapis'

let playlistId

function handleAPILoaded() {
    requestUserUploadsPlaylistId()
}

//プレイリストIDの取得
function requestUserUploadsPlaylistId() {
    let request = GoogleApis.client.youtube.channels.list({
        mine: true,
        part: 'contentDetails'
    })
    request.execute(function(response) {
        playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads
        requestVideoPlaylist(playlistId)
    })
}

//プレイリスト内の動画情報の取得
function requestVideoPlaylist(playlistId, pageToken) {
    let requestOptions = {
        playlistId: playlistId,
        part: 'snippet',
        maxResults: 10
    }
    let request = GoogleApis.client.youtube.playlistItems.list(requestOptions)
    request.execute(function(response) {
        let playlistItems = response.result.items
        if (playlistItems) {
            var Videos = []
            $.each(playlistItems, function(index, item) {
                displayResult(item.snippet)
            })
        } else {
            console.log('We have no videos')
        }
    })
}

//取得した動画のリストを作成
function displayResult(videosnippet) {
    let videoInfo = {
        title: videosnippet,
        videoId: videosnippet.resourceId.videoId
    }
}




