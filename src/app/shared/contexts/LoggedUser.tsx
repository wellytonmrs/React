import { createContext, useCallback, useEffect, useState } from "react";

interface ILoggedUserData {
    userName: string;
    logout: () => void;
}
interface ILoggedUserProps {
    children: React.ReactNode;
}

export const LoggedUserContext = createContext<ILoggedUserData>({} as ILoggedUserData);

export const LoggedUserContextProvider: React.FC<ILoggedUserProps> = ({ children }) => {

    const handleLogged = useCallback(() => {
        console.log("Log out executed!!");
    }, []);

    const [name, setName] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setName('Wellyton Rodrigues');
        }, 600);
    });

    return (
        <LoggedUserContext.Provider value={{ userName: name, logout: handleLogged }}>
            {children}
        </LoggedUserContext.Provider>
    );
}