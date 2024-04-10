class DateController {
    private date = new Date()
    private monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ]

    constructor(dateStr?: string) {
        if (dateStr) this.date = new Date(dateStr)
    }

    private _M(index: number) {
        const monthName = this.monthNames[index]
        return monthName.slice(0, 3)
    }

    get value() {
        const _m = this.date.getMonth() + 1
        const _d = this.date.getDate()

        const date: Record<string, any> = {
            Y: this.date.getFullYear(),
            m: _m < 10 ? `0${_m}` : `${_m}`,
            M: this._M(this.date.getMonth()),
            n: _m,
            d: _d < 10 ? `0${_d}` : `${_d}`,
            j: _d
        }

        return date
    }

    replace(format: string) {
        return format.replace(/[A-Za-z]/g, (subStr) => {
            return this.value[subStr] || ""
        })
    }
}

export default DateController
