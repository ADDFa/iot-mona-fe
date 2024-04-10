import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import routes from "./routes/routes.tsx"
import "chart.js/auto"

import "./Database/Firebase.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={routes} />
    </React.StrictMode>
)
