import { Card, Col, Row, Table } from "react-bootstrap"
import Navbar from "./Partials/Navbar"
import Icon from "./Components/Icon"
import Graph from "./App/Graph"
import { useCallback, useEffect, useState } from "react"
import { onValue, ref } from "firebase/database"
import { db } from "./Database/Firebase"
import Spinner from "./Components/Spinner"
import Api from "./Functions/Api"
import Body from "./Functions/Body"
import DateParse from "./Functions/DateParse"

const App = () => {
    const [eggs, setEggs] = useState<Eggs>({
        rottenEgg: 0,
        smallEgg: 0,
        mediumEgg: 0,
        largeEgg: 0
    })
    const [total, setTotal] = useState(0)
    const [setOfEggs, setSetOfEggs] = useState<Record<string, number>[]>()
    const [today, setToday] = useState(DateParse.today("Y-n-j"))

    const getTotalEggToday = useCallback(() => {
        return Object.values(eggs).reduce((curr, accu) => curr + accu)
    }, [eggs])

    useEffect(() => {
        const todayInterval = setInterval(() => {
            const today = DateParse.today("Y-n-j")
            setToday(today)
        }, 60000)

        const unsubscribe = onValue(ref(db, today), async (dataSnapshot) => {
            if (dataSnapshot.exists()) {
                const eggs = dataSnapshot.val()
                setEggs(eggs)

                const body = Body.fromObject({
                    ...eggs,
                    date: DateParse.today()
                })
                await Api.request("egg", { body })
            }

            const setOfEggs = await Api.request("egg")
            if (setOfEggs) {
                setSetOfEggs(setOfEggs.eggs)
                setTotal(setOfEggs.total)
            }
        })

        return () => {
            unsubscribe()
            clearInterval(todayInterval)
        }
    }, [today])

    return (
        <>
            <Navbar />

            <div className="container my-3">
                <h4>Dashboard</h4>

                {!eggs && <Spinner />}

                {eggs && (
                    <>
                        <Row xs={1} lg={3} className="mt-4 g-3">
                            <Col>
                                <Card.Body className="p-3 px-4 rounded-4 shadow-sm">
                                    <Row xs={2}>
                                        <Col
                                            className="fs-1 bg-success d-flex justify-content-center align-items-center rounded-2 text-light py-3"
                                            xs={3}
                                        >
                                            <Icon icon="egg-fill" />
                                        </Col>
                                        <Col>
                                            <p className="fs-4 mb-3 text-secondary fst-italic">
                                                Total Telur
                                            </p>
                                            <h5 className="fw-bold">{total}</h5>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Col>
                            <Col>
                                <Card.Body className="p-3 px-4 rounded-4 shadow-sm">
                                    <Row xs={2}>
                                        <Col
                                            className="fs-1 bg-warning d-flex justify-content-center align-items-center rounded-2 text-light py-3"
                                            xs={3}
                                        >
                                            <Icon icon="egg-fill" />
                                        </Col>
                                        <Col>
                                            <p className="fs-4 mb-3 text-secondary fst-italic">
                                                Produksi Telur
                                            </p>
                                            <h5 className="fw-bold">
                                                {getTotalEggToday()}/hari ini
                                            </h5>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Col>
                        </Row>

                        <Row className="mt-5 g-3" lg={2}>
                            <Col lg="8">
                                <Card.Body className="p-4 rounded-4 shadow-sm position-relative">
                                    <Graph setOfEggs={setOfEggs} />
                                </Card.Body>
                            </Col>

                            <Col lg="4">
                                <Card.Body className="p-4 rounded-4 shadow-sm">
                                    <h4>Telur Hari Ini</h4>

                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Telur Busuk</th>
                                                <td>{eggs.rottenEgg}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Telur Kecil</th>
                                                <td>{eggs.smallEgg}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    Telur Sedang
                                                </th>
                                                <td>{eggs.mediumEgg}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Telur Besar</th>
                                                <td>{eggs.largeEgg}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </>
    )
}

export default App
