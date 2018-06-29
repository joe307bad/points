import { connect } from "react-redux";

import { getBaseProps } from "../../navigation/components";
import Register from "../components/register";

export function mapStateToProps(state: any) {
    return Object.assign(getBaseProps(state));
}

// export function mapDispatchToProps(dispatch: Dispatch<userActions.UserAction>) {
//     return {
//         login: (LoginState: ILoginState) => dispatch({ type: userActions.UserLoginRequest, payload: LoginState })
//     };
// }

export default connect(mapStateToProps)(Register);
