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

export async function GetOneEventData( eventid ) {
    let empEvent = {
        id: 'noEvent',
        title: 'noTitle',
        introduction: 'noIntroduction',
        consultantName: 'noConsultantName',
        date: FormatDate( new Date(), '-'),
        salonId: 'noSalon',
        salonName: 'noSalonName',
        imgUrl: '',
        blnHaveEvent: false,
        join: [''],
        preJoin: [''],
        delete: ['']
    }
    if ( eventid == '' ){
        eventid = 'sample'
    }
    var docRef = db.collection( 'events' ).doc(eventid)
    return docRef.get().then( function( doc ) {
        if (doc.exists) {
        var mapEvent = {}
            mapEvent[ 'id' ] = doc.id
            mapEvent[ 'title' ] = doc.get( 'title' )
            mapEvent[ 'introduction' ] = doc.get( 'introduction' )
            mapEvent[ 'consultantName' ] = doc.get( 'consultantName' )
            mapEvent[ 'date' ] = FormatDate( doc.get( 'date' ).toDate(), '-' )
            mapEvent[ 'salonId' ] = doc.get( 'salonId' )
            mapEvent[ 'salonName' ] = doc.get( 'salonName' )
            mapEvent[ 'join' ] = doc.get( 'join' )
            mapEvent[ 'preJoin' ] = doc.get( 'preJoin' )
            mapEvent[ 'delete' ] = doc.get( 'delete' )
            mapEvent[ 'uid' ] = doc.get( 'uid' )
            if (eventid == 'sample') {
                mapEvent[ 'blnHaveEvent' ] = false
            } else {
                mapEvent[ 'blnHaveEvent' ] = true
            }
            return getEventImgUrl( doc.id ).then( ImgUrl => {
                mapEvent[ 'imgUrl' ] = ImgUrl
                return mapEvent
            })
        } else {
            return empEvent
        }
    }).catch( function ( error ) {
        console.log('Error getting document:', error)
        return empEvent
    })
}

export async function GetConsultantName( uid ) {
    var name = 'noName'
    var docRef = db.collection( 'consultants' )
    var query = docRef.where( 'uid', '==', uid )
    return query.get().then( function( DocumentSnapshot ) {
            DocumentSnapshot.forEach( function( doc ) {
                name = doc.get( 'consulName' )
            })
        return name
    }).catch ( function( error ) {
        console.log('noSuch a Document:', error )
        return name
    })
}

export async function GetSalonName( uid ) {
    let name = 'noName'
    var docRef = db.collection( 'salons' )
    var query = docRef.where( 'userID', '==', uid )
    return query.get().then( function( DocumentSnapshot ) {
        DocumentSnapshot.forEach( function( doc ) {
            name = doc.get( 'name' )
        })
        return name
    }).catch ( function( error ) {
        console.log('noSuch a Document:', error )
        return name
    })
}

export async function GetUserList ( txtSearch ) {
    let docRef = db.collection( 'consultants' )
    var arrQuery = []
    if ( txtSearch != '' ){
        var arrSearch = txtSearch.split(/[\x20\u3000]/)
        arrSearch.forEach( name => {
            arrQuery.push( docRef.where( 'keyWords', 'array-contains', name ) )
        })
    } else {
        arrQuery.push( docRef )
    }
    const promises = []
    arrQuery.forEach( query => {
        const promise = query.get().then( DocumentSnapshot => {
            var arrUsers = []
            DocumentSnapshot.forEach( doc =>{
                var mapUser = {}
                mapUser[ 'id' ] = doc.get( 'uid' )
                mapUser[ 'name' ] = doc.get( 'consulName' )
                mapUser[ 'salon' ] = doc.get( 'salonName' )
                arrUsers.push(mapUser)
            })
            return arrUsers
        })
        promises.push(promise)
    })
    return Promise.all(promises)
}

/* コンサルタントプロフィールの取得（ユーザIDから） */
export async function GetConsultantProfile ( uid ) {

    let docRef = db.collection('consultants')
    let query = docRef.where("uid", "==", uid)
    
    return query.get().then( querySnapshot => {
        let mapConsultantProf = {
            consultantID: 'noUser',
            profileImgUrl: 'noImage',
            consulName: 'noName',
            certification: 'noCertification',
            birth: 'noBirthDay',
            introduction: 'noDescribe',
            blnShowBirth: false,
            blnHaveProfile: false
        }
        querySnapshot.forEach( doc => {
            if (doc.exists) {
                mapConsultantProf[ 'consultantID' ] = doc.id
                mapConsultantProf[ 'profileImgUrl'] = doc.get('profileImgUrl')
                mapConsultantProf[ 'consulName' ] = doc.get('consulName')
                mapConsultantProf[ 'certification' ] = doc.get('certification')
                mapConsultantProf[ 'birth' ] = FormatDate(doc.get('birth').toDate(), '-')
                mapConsultantProf[ 'introduction' ] = doc.get('introduction')
                mapConsultantProf[ 'blnShowBirth' ] = doc.get('showBirth')
                mapConsultantProf[ 'blnHaveProfile' ] = true
            }
        })
        return mapConsultantProf
    })
}