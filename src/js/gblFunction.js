export function FormatDate ( date, strDigit ) {
    var rtnDate = ''
    var tYear = date.getFullYear()
    var tMonth = date.getMonth() + 1
    tMonth = '0' + tMonth
    tMonth = tMonth.slice(-2)
    var tDate = date.getDate()
    tDate = '0' + tDate
    tDate = tDate.slice(-2)
    rtnDate = tYear + strDigit + tMonth + strDigit + tDate
    return rtnDate
}