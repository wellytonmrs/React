import { createContext } from "react";

interface ILoggedUserData {
    UserName: string;
}
interface ILoggedUserProps {
    children: React.ReactNode;
}

export const LoggedUserContext = createContext<ILoggedUserData>({} as ILoggedUserData);

export const LoggedUserContextProvider: React.FC<ILoggedUserProps> = ({ children }) => {

    return (
        <LoggedUserContext.Provider value={{ UserName: 'Wellyton' }}>
            {children}
        </LoggedUserContext.Provider>
    );
}