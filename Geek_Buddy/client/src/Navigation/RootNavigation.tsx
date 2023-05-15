import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SignInContext } from "../contexts/authContext";
import AuthStack from "./AuthStack";
import ChatStack from "./ChatStack";

const RootNavigation: React.FC = () => {
  const { signedIn } = useContext(SignInContext);
  return (
    <NavigationContainer>
      {signedIn.userToken === null ? <AuthStack /> : <ChatStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
