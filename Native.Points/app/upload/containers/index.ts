import { connect } from 'react-redux';
import { UploadDto } from '@points/shared';
import { Dispatch } from 'redux';

import { Upload } from '../components';
import { IBaseProps, getBaseProps } from '../../navigation/components';
import { uploadListSelector } from '../selectors';
import { IUserUpload } from '../reducers';

import * as uploadActions from '../actions';
import * as userUploadActions from '../actions/user-upload';
import * as listActions from '../actions/list';

export interface IUploadProps extends IBaseProps {
    uploadList: UploadDto[];
    getUploadList: () => void;
    upload: (userUpload: IUserUpload) => void;
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state), {
            uploadList: uploadListSelector(state.uploadReducer)
        });
    };
}

export function mapDispatchToProps(dispatch: Dispatch<uploadActions.UploadAction>) {
    return {
        getUploadList: () => dispatch({ type: listActions.UploadListRequest }),
        upload: (userUpload: IUserUpload) => dispatch({
            type: userUploadActions.UserUploadRequest,
            payload: {
                userUpload
            }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
