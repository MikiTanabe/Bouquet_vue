import { db } from '@/firebase/firestore'
import { getEventImgUrl } from '@/js/Picture'
import { FormatDate } from '@/js/gblFunction'

export async function GetEventData ( uid ) {
    var docRef = db.collection( 'events' )
    var query = docRef.where('uid', '==', uid )
    var arrEvents = []
    return query.get().then( DocumentSnapshot => {
        DocumentSnapshot.forEach( doc => {
            var mapEvent = {}
            mapEvent[ 'id' ] = doc.id
            mapEvent[ 'eventName' ] = doc.get( 'title' )
            mapEvent[ 'introduction' ] = doc.get( 'introduction' )
            mapEvent[ 'consultantName' ] = doc.get( 'consultantName' )
            mapEvent[ 'date' ] = FormatDate( doc.get( 'date' ).toDate(), '/' )
            mapEvent[ 'salonId' ] = doc.get( 'salonId' )
            mapEvent[ 'salonName' ] = doc.get( 'salonName' )
            mapEvent[ 'join' ] = doc.get( 'join' )
            getEventImgUrl( doc.id ).then( ImgUrl => {
                mapEvent[ 'imgUrl' ] = ImgUrl
                arrEvents.push( mapEvent )
                return arrEvents
            })
        })
        return arrEvents
    }).catch ((e) => {
        console.log('noData: ' + e.message)
        var empEvent = {}
        empEvent[ 'id' ] = 'noUser'
        empEvent[ 'eventName' ] = 'noTitle'
        empEvent[ 'introduction' ] = 'noIntroduction'
        empEvent[ 'consultantName' ] = 'noConsultantName'
        empEvent[ 'date' ] = 'noData'
        empEvent[ 'salonId' ] = 'noSalon'
        empEvent[ 'salonName' ] = 'noSalonName'
        empEvent[ 'imgUrl' ] = ''
        arrEvents.push( empEvent )
        return arrEvents
    })
}

export async function GetOneEventData(eventid) {
    if ( eventid == '' ){
        eventid = 'sample'
    }
    console.log('eventid: ' + eventid)
    var docRef = db.collection('events').doc(eventid)
    return docRef.get().then( doc => {
        if ( doc.exists ) {
            var mapEvent = {}
            mapEvent[ 'id' ] = doc.id
            mapEvent[ 'title' ] = doc.get( 'title' )
            mapEvent[ 'introduction' ] = doc.get( 'introduction' )
            mapEvent[ 'consultantName' ] = doc.get( 'consultantName' )
            mapEvent[ 'date' ] = FormatDate( doc.get( 'date' ).toDate(), '-' )
            mapEvent[ 'salonId' ] = doc.get( 'salonId' )
            mapEvent[ 'salonName' ] = doc.get( 'salonName' )
            mapEvent[ 'join' ] = doc.get( 'join' )
            getEventImgUrl( doc.id ).then( ImgUrl => {
                mapEvent[ 'imgUrl' ] = ImgUrl
                return mapEvent
            })
        }
    }).catch ( () => {
        var empEvent = {}
        empEvent[ 'id' ] = 'noUser'
        empEvent[ 'title' ] = 'noTitle'
        empEvent[ 'introduction' ] = 'noIntroduction'
        empEvent[ 'consultantName' ] = 'noConsultantName'
        empEvent[ 'date' ] = FormatDate( new Date(), '-')
        empEvent[ 'salonId' ] = 'noSalon'
        empEvent[ 'salonName' ] = 'noSalonName'
        empEvent[ 'imgUrl' ] = ''
        return empEvent
    })
}