function createEmployeeRecord(array){
    //return object with: firstName, familyName, title,
    // payPerHour, timeInEvents, timeOutEvents
    const employeeRecord = {}
    employeeRecord.firstName = array[0]
    employeeRecord.familyName = array[1]
    employeeRecord.title = array[2]
    employeeRecord.payPerHour = array[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

function createEmployeeRecords(array){
    //take an array of arrays and return an array of objects
    //convert each nested array into an employee record using
    //createEmployeeRecord() and accumulate into a new array
    const employeeRecords = array.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(record, dateStamp){
    //accepts an employee record and a date stamp
    //returns the employee record
    //adds object with data to timeInEvents
    const dateAndHour = dateStamp.split(' ')
    record.timeInEvents.push({'type':'TimeIn', 'hour': parseInt(dateAndHour[1],10), 
                        'date': dateAndHour[0]})
    return record
}

function createTimeOutEvent(record, dateStamp){
    //accepts an employee record and a date stamp
    //returns the employee record
    //adds object with data to timeOutEvents
    const dateAndHour = dateStamp.split(' ')
    record.timeOutEvents.push({'type':'TimeOut', 'hour': parseInt(dateAndHour[1], 10), 
                        'date': dateAndHour[0]})
    return record
}

function hoursWorkedOnDate(record, date){
    //acceps a record and a date, returns integer of hours worked on
    //that date
    const foundTimeInRecord = record.timeInEvents.find(element => element.date = date)
    const foundTimeOutRecord = record.timeOutEvents.find(element => element.date = date)
    const hoursOnDay = parseInt((foundTimeOutRecord.hour - foundTimeInRecord.hour)/100, 10)
    return hoursOnDay
}

function wagesEarnedOnDate(record, date){
    //accepts a record and a date, returns pay owed
    //use hoursWorkedOnDate to multiply by employee's rate
    const earnedDayWages = parseInt(record.payPerHour, 10) * 
                            hoursWorkedOnDate(record, date)
    return earnedDayWages
}

function allWagesFor(record){
    //accepts employee record, returns pay owed for all dates
    let allHours = []
    for(let i=0; i<record.timeInEvents.length; i++){
        allHours.push((parseInt(record.timeOutEvents[i].hour, 10) - parseInt(record.timeInEvents[i].hour, 10))/100)
    }
    const sumAllHours = allHours.reduce((pVal, cVal) => pVal + cVal)
    return sumAllHours * record.payPerHour
}

function calculatePayroll(arrayOfEmployees){
    //accept array of employee records, returns sum of pay owed to all
    //employees for all dates as a number
    const sumAllEmployeeWages = []
    arrayOfEmployees.forEach(employee => {
        sumAllEmployeeWages.push(allWagesFor(employee))
    })
    return sumAllEmployeeWages.reduce((pVal, cVal)=>pVal+cVal)
}