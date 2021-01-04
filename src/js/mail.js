import nodemailer from 'nodemailer'
//TODO: モジュールの有効化

export function sendEmail(mapMail) {
    const smtp = nodemailer.createTransport({
        host:'localhost',
        port: 25
    })
    let message = {
        from: mapMail.get('from'),
        to: 'bouquetdev@gmail.com',
        subject: mapMail.get('subject'),
        text: mapMail.get('text')
    }

    try{
        smtp.sendMail(message, function(error, info){
            //エラー時
            if(error){
                console.log('send faild: ', error.message)
                return
            }
            console.log('send succeeded: ', info.messageId)
        })
    }catch(e){
        console.log('Error: ', e)
    }
}