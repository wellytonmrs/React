import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Login = () => {

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
                <label>
                    <span>Email: </span>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' ? inputPassRef.current?.focus() : undefined} />
                </label>

                <br />

                <label>
                    <span>Password: </span>
                    <input ref={inputPassRef} type="password" value={password} onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' ? buttonRef.current?.focus() : undefined} />
                </label>

                <br />
                <button ref={buttonRef} type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
}