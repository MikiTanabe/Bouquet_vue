import { db, storage } from '@/firebase/firestore'

export const getSnapShot = ( id, callback ) => {
  db.collection('pictures').doc(id)
  .onSnapshot(query => {
    if (query.exists) {
      callback(query.data().img)
    } else {
      callback([])
    }
  })
}

export const uploadSalonImgs = async ( id, imgList ) => {
  imgList.forEach(async (img) => {
    await storage.child(`salon-Image/${id}/salon-img1.jpg`).put(img)
  })
}

export const uploadEventImgs = async ( id, imgList ) => {
  console.log('イベント画像UP', id)
  imgList.forEach(async (img) => {
    await storage.child(`events/${id}/event-img1.jpg`).put(img)
  })
  return storage.child(`events/${id}/event-img1.jpg`).getDownloadURL().then( url =>{
    console.log(url)
    return url
  })
}

export const uploadProfileImgs = async ( id, imgList ) => {
  await imgList.forEach(async ( img )  => {
    await storage.child(`profile/${id}/profile-img1.jpg`).put(img)
  })
  return storage.child(`profile/${id}/profile-img1.jpg`).getDownloadURL().then( url =>{
    return url
  })
}

export async function getSalonImgUrl ( id ) {
    return storage.child('salon-Image/' + id + '/salon-img1.jpg').getDownloadURL().then( url => {
                return url
            })
            .catch( () => {
                return storage.child('salon-Image/salon-no-image.jpg').getDownloadURL().then( noImgUrl => {
                        return noImgUrl
                    })
            })
}

export async function getEventImgUrl ( id ) {
  return storage.child('events/' + id + '/event-img1.jpg').getDownloadURL().then( url => {
    return url
  }).catch( () => {
    return storage.child('events/event-no-image.jpg').getDownloadURL().then( noImgUrl => {
      return noImgUrl
    })
  })
}

export async function getProfileImgUrl ( id ) {
  console.log( 'GetstartProfImg: ', id )
  return storage.child('profile/' + id + '/profile-img1.jpg').getDownloadURL().then( url => {
    console.log('GetProfileURL: ', url)
    return url
  }).catch( () => {
    return storage.child('profile/profile-no-image.jpg').getDownloadURL().then( noImgUrl => {
      console.log('GetProfileURL Failed: ', noImgUrl)
      return noImgUrl
    })
  })
}