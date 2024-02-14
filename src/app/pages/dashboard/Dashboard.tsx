import { useRef } from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {

    //useRef - has a way to store data without calling a rerender
    const counterRef = useRef({ counter: 0 });

    return (
        <div>
            <p>Dashboard</p>

            <p>Clicks Count: {counterRef.current.counter}</p>
            <button onClick={() => counterRef.current.counter++}>
                Add up
            </button>
            <br /><br /><br />

            <Link to="/login">Login</Link>
        </div>
    );
}