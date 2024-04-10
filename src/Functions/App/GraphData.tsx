import type { ChartData, ChartDataset } from "chart.js"
import DateParse from "../DateParse"

class GraphData {
    private labels: string[] = []
    private datasets: ChartDataset<"bar">[] = []
    empty = true

    constructor(setOfEggs?: Record<string, any>[]) {
        if (!setOfEggs) return
        this.value = setOfEggs
    }

    private reset() {
        this.labels = []
        this.datasets = []
    }

    get value(): ChartData<"bar"> {
        return {
            labels: this.labels,
            datasets: this.datasets
        }
    }

    set value(setOfEggs: Record<string, any>[]) {
        this.reset()

        const largeEggData: number[] = []
        const mediumEggData: number[] = []
        const smallEggData: number[] = []
        const rottenEggData: number[] = []

        let lastIndex = setOfEggs.length - 1
        const endOf = lastIndex - 7
        while (lastIndex > endOf) {
            const eggs = setOfEggs[lastIndex]
            if (eggs) {
                const { large_egg, medium_egg, small_egg, rotten_egg, date } =
                    eggs
                if (date) {
                    const label = DateParse.to("j-M", date)
                    this.labels.unshift(label)
                }

                largeEggData.unshift(large_egg)
                mediumEggData.unshift(medium_egg)
                smallEggData.unshift(small_egg)
                rottenEggData.unshift(rotten_egg)
            }

            lastIndex--
        }

        this.datasets.push(
            {
                label: "Telur Busuk",
                data: rottenEggData,
                backgroundColor: "#3F423B"
            },
            {
                label: "Telur Kecil",
                data: smallEggData,
                backgroundColor: "#FFCC00"
            },
            {
                label: "Telur Sedang",
                data: mediumEggData,
                backgroundColor: "#FF8400"
            },
            {
                label: "Telur Besar",
                data: largeEggData,
                backgroundColor: "#3100C6"
            }
        )

        this.empty = false
    }

    get default(): ChartData<"bar"> {
        return {
            labels: [],
            datasets: []
        }
    }
}

export default GraphData
