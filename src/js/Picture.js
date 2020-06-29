import { db, storage } from '@/firebase/firestore'

export const getSnapShot = ( id, callback ) => {  // 6
  db.collection('pictures').doc(id)
  .onSnapshot(query => {
    if (query.exists) {
      callback(query.data().img)
    } else {
      callback([])
    }
  })
}

export const uploadImgs = async ( id, imgList ) => {
  imgList.forEach(async (img) => {
    await storage.child(`${id}/salon-img1.jpg`).put(img)  // 7
  })
}

export async function getSalonImgUrl ( id ) {
    console.log('受け取りID: ' + id)
    return storage.child(id + '/salon-img1.jpg').getDownloadURL().then( url => {
                //console.log('画像URL: ' + url)
                return url
            })
            .catch( e => {
                console.error('noImage: ' + e.message)
                return storage.child('salon-Image/salon-no-image.jpg').getDownloadURL().then( noImgUrl => {
                        //console.log('画像無しURL: ' + noImgUrl)
                        return noImgUrl
                    })
            })
}