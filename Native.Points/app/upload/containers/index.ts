import { connect } from "react-redux";
import { UploadDto } from "@points/shared";
import { Dispatch } from "redux";

import { Upload } from "../components";
import { getBaseProps } from "../../navigation/components";
import { UploadAction } from '../actions';
import { uploadListSelector } from "../selectors";

import * as listActions from '../actions';
import { IBaseProps } from '../../navigation/components/index';

export interface IUploadProps extends IBaseProps {
    uploadList: UploadDto[];
    getUploadList: () => void
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state), {
            uploadList: uploadListSelector(state.uploadReducer)
        });
    }
}

export function mapDispatchToProps(dispatch: Dispatch<listActions.UploadAction>) {
    return {
        getUploadList: () => dispatch({ type: listActions.UploadListRequest })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
