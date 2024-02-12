import { useNavigate } from "react-router-dom";


export const Login = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    }

    return (
        <div>
            Login
            <br />
            <button onClick={handleClick}>Dashboard</button>
        </div>
    );
}