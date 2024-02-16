import { DefineRoutes } from "./routes";
import { LoggedUserContextProvider } from "./shared/contexts";

export const App = () => {
  return (
    <LoggedUserContextProvider>
      <DefineRoutes />
    </LoggedUserContextProvider>

  );
}
