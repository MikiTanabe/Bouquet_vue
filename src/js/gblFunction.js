export function FormatDate ( date, strDigit ) {
    var rtnDate = ''
    var tYear = date.getFullYear()
    var tMonth = date.getMonth() + 1
    var tDate = date.getDate()
    rtnDate = tYear + strDigit + tMonth + strDigit + tDate
    return rtnDate
}