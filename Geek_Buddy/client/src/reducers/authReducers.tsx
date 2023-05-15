interface SignInState {
  userToken: string | null;
}
type SignInAction = {
  type: "UPDATE_SIGN_IN";
  payload: { userToken: string | null };
};

export const SignInReducer = (
  state: SignInState,
  action: SignInAction
): SignInState => {
  switch (action.type) {
    case "UPDATE_SIGN_IN":
      return {
        userToken: action.payload.userToken,
      };
    default:
      return state;
  }
};
