import { auth } from '@/firebase/firestore'

export function getUser () {
    let userID = ''
    if (auth.currentUser.uid) {
        userID = auth.currentUser.uid
    }
    return userID
}


