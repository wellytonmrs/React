import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLoggedUser } from "../../shared/hooks";

export const Dashboard = () => {

    //useRef - has a way to store data without calling a rerender
    const counterRef = useRef(0);

    //access a context pre-set and shared
    const {userName, logout} = useLoggedUser();

    return (
        <div>
            <p>Dashboard</p>

            <h1>{userName}</h1>

            <p>Clicks Count: {counterRef.current}</p>
            <button onClick={() => counterRef.current++}>
                Add up
            </button>
            <button onClick={() => console.log(counterRef.current)}>
               Log
            </button>
            <br /><br /><br />

            <Link to="/login">Login</Link>

            <button onClick={logout}>Logout</button>
        </div>
    );
}