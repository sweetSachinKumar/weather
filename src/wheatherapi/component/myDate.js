export  const DateWithMonth = () => {
    const myDates =  new Date()
    const month = myDates.getMonth()
    let monthName;
    const day = myDates.getDay()
    let dayName;
    switch (month){
        case 0: monthName = "jan";
        break
        case 1: monthName = "feb";
        break;
        case 2: monthName = "mar";
        break
        case 3: monthName = "apr";
        break;
        case 4: monthName = "may";
        break
        case 5: monthName = "jun";
        break;
        case 6: monthName = "jul";
        break
        case 7: monthName = "aug";
        break;
        case 8: monthName = "sep";
        break
        case 9: monthName = "oct";
        break;
        case 10: monthName = "nov";
        break
        case 11: monthName = "dec";
        break;
    }


    switch (day){
        case 0: dayName = "Sunday";
        break
        case 1: dayName = "Monday";
        break;
        case 2: dayName = "Tuesday";
        break
        case 3: dayName = "Wednesday";
        break;
        case 4: dayName = "Thursday";
        break
        case 5: dayName = "Friday";
        break;
        case 6: dayName = "Saturday";
        break
    }
    const currentDate = `  ${dayName},  ${myDates.getDate()} ${monthName}  ${myDates.getFullYear()}`

    return currentDate
}



export const formatTimeLine = (date, midnight = {am: "AM", pm:"PM"}) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const ampm = hours <= 12 ? `${midnight.am}` : `${midnight.pm}`
    let hour = hours%12 // i cound not understand how is it working ie, i don't know
    hour = hour? hour: 12 // the hour 0 should be 12
    let minute = minutes < 10 ? "0"+minutes : minutes
    hour = hour<10 ? "0"+hour : hour

    const setTime = `${hour}:${minute}  ${ampm}`

    return setTime

}