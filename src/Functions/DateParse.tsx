import DateController from "./DateController"

class DateParse {
    static today(format?: string, dateStr?: string) {
        const date = new DateController(dateStr)

        if (format) return date.replace(format)

        const { Y, m, d } = date.value
        return `${Y}-${m}-${d}`
    }

    static to(format: string, dateStr?: string) {
        const date = new DateController(dateStr)
        return date.replace(format)
    }
}

export default DateParse
