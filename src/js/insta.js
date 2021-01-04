import { db } from '@/firebase/firestore'

const token = 'EAAyjCzdEQl4BAIE5lmVZAxtLXusjuZCR7ovsJ5mWTgZAhz5M4VItnzpNAEgwhq9Wt518BOi5k2W9RfPHemiWr2rTFZBjkmVAwrYx2lwZCQ5pTWfnNKa8dBmaRVtxaFH1ntG8bMh3fbdZAvh6gpvHZBZB7F9uebUthW6PkQkrhLr9ZCFvz7vhXITIK'
const bId = '17841445204240813'
var arrMedias = []

export function getInsta(maxResults){
    const docRef = db.collection( 'instaList' )
    return docRef.get().then( DocumentSnapshot => {
        var igUserlist = []
        DocumentSnapshot.forEach( doc => {
            if( doc.id == ('igNames')){
                igUserlist=doc.get('names')
            }
        })
        var getMedias = []
        var medias = []
        igUserlist.forEach(igId => {
            getMedias.push(getMedia(igId).then(media => medias.push(media)))
        })
        return Promise.all(getMedias).then(() => {
            return medias
        }).then(medias => {
            arrMedias = medias
            quickSort(0, arrMedias.length-1)
            return arrMedias.slice(0, maxResults)
        })
    })
}

function getMedia(username){
    let query = 'business_discovery.username(' + username + ')'
    let url = 'https://graph.facebook.com/v5.0/' + bId + '?fields='
    + query + '{media.limit(1){id,media_type,media_url,thumbnaiUrl,timestamp,caption}}' + '&access_token=' + token
    return new Promise( resolve => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = () => {
            let json = JSON.parse(xhr.responseText)
            let media = {
                id: json.business_discovery.media.data[0].id,
                mediaType: json.business_discovery.media.data[0].media_type,
                mediaUrl: json.business_discovery.media.data[0].media_url,
                thumbnailUrl: json.business_discovery.media.data[0].thumbnailUrl,
                caption: json.business_discovery.media.data[0].caption,
                publishDate: new Date(json.business_discovery.media.data[0].timestamp).getTime()
            }
            resolve(media)
        }
    })
}

function quickSort(startId, endId){
    var pivot = arrMedias[Math.floor((startId + endId)/2)]
    var left = startId
    var right = endId
    let bool = true

    while(bool){
        while(arrMedias[left].publishDate > pivot.publishDate){
            left++
        }
        while(pivot.publishDate > arrMedias[right].publishDate){
            right--
        }
        if(right <= left){
            break
        }
        var tmp = JSON.stringify(arrMedias[left])
        arrMedias[left] = arrMedias[right]
        arrMedias[right] = JSON.parse(tmp)
        left++
        right--
    }

    if(startId < left -1){
        quickSort(startId, left -1)
    }

    if(right +1 < endId){
        quickSort(right +1, endId)
    }
}
