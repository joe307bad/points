import { connect } from "react-redux";

import { Upload } from "../components";
import { getBaseProps } from "../../navigation/components";


export function mapStateToProps() {
    return (state: any, props: any) => {
        return getBaseProps(state);
    }
}

// export function mapDispatchToProps(
//     dispatch: Dispatch<leaderboardActions.LeaderboardAction>) {
//     return {
//         getLeaderboard: () => dispatch({ type: leaderboardActions.LeaderboardRequest })
//     };
// }

export default connect(mapStateToProps)(Upload);
