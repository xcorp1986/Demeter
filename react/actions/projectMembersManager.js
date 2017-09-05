// project user manager actions
import {ACTION_PROJECT_USER_ADD_ACCOUNT, ACTION_PROJECT_USER_MANAGER_CHANGE_ACCOUNT} from "../constants/actionType";


/**
 * 实时改变用户账号
 * @param account
 */
export const changeUserAccountAction = account => ({
    type: ACTION_PROJECT_USER_MANAGER_CHANGE_ACCOUNT,
    data: {
        addedAccount: account
    }
});

/**
 * 给projectId所属的项目添加账号为addedAccount的用户
 * @param uId 用户uId
 * @param projectId 当前项目Id
 * @param account 要添加的账号
 */
export const addMemberAction = (uId, projectId, account) => ({
    type: ACTION_PROJECT_USER_ADD_ACCOUNT,
    data: {
        uId: uId,
        projectId: projectId,
        account: account
    }
});

/**
 *
 * @param uId
 * @param projectId
 * @param account
 */
export const fetchMembersAction = params => ({
    type: ACTION_PROJECT_USER_ADD_ACCOUNT,
    data: {
        uId: params.uId,
        projectId: projectId,
        account: account
    }
});