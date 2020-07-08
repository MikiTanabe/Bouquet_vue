import { db } from '@/firebase/firestore'
import { FormatDate } from '@/js/gblFunction'

export async function GetEventAlert ( uid ) {
    console.log('GetEventAlert: ', uid)
    let docRef = db.collection('events')
    let query = docRef.where('delete', 'array-contains', uid)
    return query.get().then( QuerySnapshot => {
        let arrEvents = []
        QuerySnapshot.forEach( doc => {
            var mapDeletedEvent = {}
            mapDeletedEvent[ 'id' ] = doc.id
            mapDeletedEvent[ 'title' ] = doc.get('title')
            mapDeletedEvent[ 'date' ] = FormatDate( doc.get('date').toDate(), '-')
            mapDeletedEvent[ 'status' ] = 'delete'
            arrEvents.push( mapDeletedEvent )
        })
        return arrEvents
    }).then( arrEvents => {
        query = docRef.where('preJoin', 'array-contains', uid)
        return query.get().then( QuerySnapshot => {
            QuerySnapshot.forEach( doc => {
                var mapInvitedEvent = {}
                mapInvitedEvent[ 'id' ] = doc.id
                mapInvitedEvent[ 'title' ] = doc.get('title')
                mapInvitedEvent[ 'date' ] = FormatDate( doc.get('date').toDate(), '-')
                mapInvitedEvent[ 'status' ] = 'preJoin'
                arrEvents.push( mapInvitedEvent )
            })
            return arrEvents
        })
    })
}