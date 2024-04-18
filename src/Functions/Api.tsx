class Api {
    private static baseApi = "https://iot-mona.000webhostapp.com"

    static async request(
        path: string,
        init?: RequestInit
    ): Promise<any | undefined> {
        const method = init?.body ? "POST" : "GET"

        init = {
            ...init,
            method
        }

        try {
            const response = await fetch(`${this.baseApi}/${path}`, init)
            const result = await response.json()
            return result
        } catch (error: any) {
            console.info({ error })
        }
    }
}

export default Api
