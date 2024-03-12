import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Login, Learning, Rentabilidade, ChartExample } from "../pages";

export const DefineRoutes = () => {

    return (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/learn" element={<Learning/>} />
            <Route path="/rentabilidade" element={<Rentabilidade/>} />
            <Route path="/chartExample" element={<ChartExample/>} />

            <Route path="*" element={<Navigate to="/dashboard"/>}/>
        </Routes>
    </BrowserRouter>
    );
}