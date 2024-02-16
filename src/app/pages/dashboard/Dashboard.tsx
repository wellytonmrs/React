import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { LoggedUserContext } from "../../shared/contexts";

export const Dashboard = () => {

    //useRef - has a way to store data without calling a rerender
    const counterRef = useRef({ counter: 0 });

    //access a context pre-set and shared
    const loggedUserContext = useContext(LoggedUserContext);

    return (
        <div>
            <p>Dashboard</p>

            <h1>{loggedUserContext.UserName}</h1>

            <p>Clicks Count: {counterRef.current.counter}</p>
            <button onClick={() => counterRef.current.counter++}>
                Add up
            </button>
            <br /><br /><br />

            <Link to="/login">Login</Link>
        </div>
    );
}