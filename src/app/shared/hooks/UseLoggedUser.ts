import { useContext } from "react"
import { LoggedUserContext } from "../contexts";

//personalize react hook, that consume a context
export const useLoggedUser = () => {
    const context = useContext(LoggedUserContext);
    return context;
}