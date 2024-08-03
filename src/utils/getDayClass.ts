import dayjs, { Dayjs } from 'dayjs';


function getDayClass(day: Dayjs, daySelected: Dayjs | null): string {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    
    if (nowDay === currDay) {
        return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
        return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
        return "";
    }
}

export default getDayClass;