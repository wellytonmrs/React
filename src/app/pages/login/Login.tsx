import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";
import { LoggedUserContext } from "../../shared/contexts";

export const Login = () => {

    //useRef - is a hook to get a reference of a element and that way you can manipulate it
    const inputPassRef = useRef<HTMLInputElement>(null);

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

    //access a context pre-set and shared - non-structured
    const {UserName} = useContext(LoggedUserContext);

    return (
        <div>
            <form>
                <h1>{UserName}</h1>

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
                />

                <br />
                <ButtonLogin type="button" onClick={handleLogin}>
                    Children
                </ButtonLogin>
            </form>
        </div>
    );
}