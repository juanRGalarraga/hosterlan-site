export type LoginState = {
    credentials: {
        email: string;
        password: string;
    };
    error: string;
}

type Action =
  | { type: "UPDATE_CREDENTIAL"; field: string; value: string }
  | { type: "SET_ERROR"; error: string }
  | { type: "CLEAR_ERROR" }
    | { type: "RESET" };
  
const loginReducer = (state: LoginState, action: Action): LoginState => {
  switch (action.type) {
    case "UPDATE_CREDENTIAL":
      return {
        ...state,
        credentials: {
          ...state.credentials,
          [action.field]: action.value,
        },
        error: "",
      };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "CLEAR_ERROR":
      return { ...state, error: "" };
    case "RESET":
      return { credentials: { email: "", password: "" }, error: "" };
    default:
      return state;
  }
};

export default loginReducer;