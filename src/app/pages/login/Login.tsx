import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InputLogin } from "./components/InputLogin";

export const Login = () => {

    //useRef - is a hook to get a reference of a element and that way you can manipulate it
    const inputPassRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    //useState - used when you want to save a state of a variable
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //useEffect - used when you need to call something when a given dependency is updated.
    useEffect(() => {
        console.log("email: " + email);
    }, [email]);

    useEffect(() => {
        console.log("password: " + password);
    }, [password]);

    //useCallback memorize a version of a given function to optimize execution
    const handleLogin = useCallback(() => {
        console.log(email + " - " + password);

    }, [email, password]);

    //useMemo - used to store a value linked with a dep
    const emailLength = useMemo(() => {
        return email.length;
    }, [email]);

    return (
        <div>
            <form>
                <p>Count characters in the email is: {emailLength}</p>

                <InputLogin
                    label="Email"
                    value={email}
                    onchange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPassRef.current?.focus()}
                />

                <br />

                <InputLogin
                    label="Password"
                    ref={inputPassRef}
                    value={password}
                    type="password"
                    onchange={newValue => setPassword(newValue)}
                    onPressEnter={() => buttonRef.current?.focus()}
                />

                <br />
                <button ref={buttonRef} type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
}