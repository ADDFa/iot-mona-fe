class Body {
    static fromObject(data: Record<string, any>): BodyInit {
        const body = new FormData()
        for (const key in data) {
            const name = key.replace(/[A-Z]/g, (subStr) => {
                const replaceTo = `_${subStr.toLowerCase()}`
                return replaceTo
            })

            body.append(name, data[key])
        }

        return body
    }
}

export default Body
