// google client api の設定
//var fs = require( 'fs' )
//var readline = require( 'readline' )
//var { google } = require( 'googleapis' )

import { GoogleApis } from 'googleapis'
//import  fs, { fchmod, readlink } from 'fs'

//var OAuth2 = GoogleApis.auth.OAuth2
var OAUTH2_CLIENT_ID = '262845546413-a9onka0roveh2ablmikf4mms6f90spsh.apps.googleusercontent.com'
var OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/youtube'
]
/* 2020.11.28 再開につきコメントアウト
var SCOPES = [ 'https://www.googleapis.com/auth/youtube.readonly' ]
var TOKEN_DIR = ( process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE ) + '/.credentials'
var TOKEN_PATH = TOKEN_DIR + 'youtube-uploads.json'
*/

/* 2020.11.28 再開につきコメントアウト
fs.readFile( 'client_secret.json', function processClientSecrets( err, content ) {
    if( err ) {
        console.log( 'Err loading client secret file: ' + err )
        return
    }
    authorize( JSON.parse( content ), getCHannel )
} )
*/

/* 2020.11.28 再開につきコメントアウト
function authorize( credentials, callback ) {
    var clientSecret = credentials.installed.client_secret
    var clientId = credentials.installed.client_id
    var redirectUrl = credentials.installed.redirect_uris[0]
    var oauth2Client = new OAuth2( clientId, clientSecret, redirectUrl )

    fchmod.readFile( TOKEN_PATH, function( err, token ) {
        if ( err ) {
            getNewToken( oauth2Client, callback )
        } else {
            oauth2Client.credentials = JSON.parse( token )
            callbask( oauth2Client )
        }
    } )
}
*/

/* 2020.11.28 再開につきコメントアウト
function getNewToken( oauth2Client, callback ) {
    var authUrl = oauth2Client.generalAuthUrl( {
        access_type: 'offline',
        scope: SCOPES
    })
    console.log( 'Authorize this app by visiting this url: ', authUrl )
    var rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdout
    })
    rl.
}
*/
export function googleApiClientReady() {
    GoogleApis.auth.init(function() {
        window.setTimeout(checkAuth, 1)
    })
}

function checkAuth() {
    GoogleApis.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
    }, handleAuthResult)
}

function handleAuthResult( authResult ) {
    if ( authResult && !authResult.error ) {
        //$( 'pre-auth' ).hide()
        //$( 'post-auth' ).show()
        loadAPIClientInterfaces()
    } else {
        //$( '#login-link' ).click( function () {
            GoogleApis.auth.authorize( {
                client_id: OAUTH2_CLIENT_ID,
                scope: OAUTH2_SCOPES,
                immediate: false
            }, handleAuthResult)
        //})
    }
}

function loadAPIClientInterfaces() {
    GoogleApis.client.load( 'youtube', 'v3', function() {
        handleAPILoaded()
    })
}
