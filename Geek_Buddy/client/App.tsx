import { SignInContextProvider } from "./src/contexts/authContext";
import RootNavigation from "./src/Navigation/RootNavigation";

const App = () => {
  return (
    <SignInContextProvider>
      <RootNavigation />
    </SignInContextProvider>
  );
};

export default App;
