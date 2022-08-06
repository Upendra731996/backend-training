let days=new Date()
let day=days.getDate()
let months=days.getMonth()+1
 
function printCurrentDate(){
    console.log("today date " , day)
}
function printCurrentMonth(){
    console.log("month ",months)
}
function getBatchInfo(){
    console.log(" Plutonium, W3D5, the topic for today is Nodejs module system")
}
module.exports.printCurrentDate=printCurrentDate
module.exports.printCurrentMonth=printCurrentMonth
module.exports.getBatchInfo=getBatchInfo