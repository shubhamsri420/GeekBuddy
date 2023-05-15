import { createContext, ReactNode, useReducer } from "react";
import { SignInReducer } from "../reducers/authReducers";

interface SignInState {
  userToken: string | null;
}

interface SignInContextProps {
  signedIn: SignInState;
  dispatchSignedIn: React.Dispatch<any>;
}

interface SignInContextProviderProps {
  children: ReactNode;
}

export const SignInContext = createContext<SignInContextProps>({
  signedIn: { userToken: null },
  dispatchSignedIn: () => {},
});
export const SignInContextProvider = (props: SignInContextProviderProps) => {
  const [signedIn, dispatchSignedIn] = useReducer(SignInReducer, {
    userToken: null,
  });

  return (
    <SignInContext.Provider value={{ signedIn, dispatchSignedIn }}>
      {props.children}
    </SignInContext.Provider>
  );
};
