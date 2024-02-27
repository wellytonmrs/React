import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Login } from "../pages";
import Learning from "../pages/learning/Learning";

export const DefineRoutes = () => {

    return (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/learn" element={<Learning/>} />

            <Route path="*" element={<Navigate to="/dashboard"/>}/>
        </Routes>
    </BrowserRouter>
    );
}