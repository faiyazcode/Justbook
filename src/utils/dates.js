const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrus', 'Fri', 'Sat']

export const getYMDFormat = (date) => {
    const currentDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const currentMonth = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    return `${date.getFullYear()}-${currentMonth}-${currentDate}`
}

export const convertedDate = (date, action) => {
    const newDate = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const newMonth = months[new Date(date).getMonth()]
    const newYear = new Date(date).getFullYear()
    const newDay = week[new Date(date).getDay()]
    const newHour = new Date(date).getHours() <10 ? `0${new Date(date).getHours()}` :new Date(date).getHours()
    const newMinute = new Date(date).getMinutes() <10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()


    switch (action) {
        case 'dateWithDay':
            return `${newDay} ${newDate} ${newMonth} ${newYear}`

        case 'date':
            return `${newDate} ${newMonth} ${newYear}`

        case 'time':
            return `${newHour} : ${newMinute}`

        default:
            return date
    }
}