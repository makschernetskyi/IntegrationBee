
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export const formatDateToString = (date) =>{
    const hours = date.getHours() + date.getTimezoneOffset()/60;
    const convertTo2PlacesString = (num) =>{
        return num>=10 ? num.toString() : '0' + num.toString()
    }
    return `${months[date.getMonth()]} ${date.getDate()}. ${date.getFullYear()} ${convertTo2PlacesString(hours)}:${convertTo2PlacesString(date.getMinutes())} CET`
}