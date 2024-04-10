import { FC, memo, useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import type { ChartData } from "chart.js"
import GraphData from "../Functions/App/GraphData"
import { Spinner } from "react-bootstrap"

const graphData = new GraphData()

const Graph: FC<GraphC> = ({ setOfEggs }) => {
    const [data, setData] = useState<ChartData<"bar">>(graphData.default)
    const [empty, setEmpty] = useState(graphData.empty)

    useEffect(() => {
        if (!setOfEggs) return

        graphData.value = setOfEggs
        setData(graphData.value)
        setEmpty(graphData.empty)
    }, [setOfEggs])

    return (
        <>
            {empty && (
                <div className="position-absolute start-50 top-50 translate-middle">
                    <Spinner className="fs-2" />
                </div>
            )}

            <Bar
                data={data}
                className={empty ? "invisible" : ""}
                id="eggs-graph"
            />
        </>
    )
}

export default memo(Graph)
