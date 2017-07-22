// home reducer
import {ACTION_COLLAPSE_MENU, ACTION_FILL_MENU_VALUES, ACTION_GET_USER_INFO} from "../constants/actionType";
import {RES_SUCCEED} from "../../util/status";
import {isStringEmpty} from "../../util/checker";

/**
 * 获取用户信息
 * @param state
 * @param action
 */
function getUserInfo(state, action) {
    let msg = null;
    if (action.status !== RES_SUCCEED) {
        msg = action.msg;
    }

    return {
        ...state,
        alertMsg: !isStringEmpty(msg),
        errorMsg: msg,
        isLogin: isStringEmpty(msg),
        isAdmin: isStringEmpty(msg) ? action.data.isAdmin : false,
        nickName: isStringEmpty(msg) ? action.data.nickName : null,
    };
}

const initialHomeState = {
    alertMsg: false,
    isCollapsed: false,
    menuValue: null,
    menuValueIcon: null,
    subMenuValue: null,
    nickName: null,
    isAdmin: false,
    isLogin: true
};

/**
 * home reducer模块分发
 * @param state
 * @param action
 * @returns {*}
 */
export function home(state = initialHomeState, action) {
    let newState = state;
    switch (action.type) {
        case ACTION_COLLAPSE_MENU:
            newState = {
                ... state,
                isCollapsed: action.data.isCollapsed
            };
            break;
        case ACTION_FILL_MENU_VALUES:
            newState = {
                ... state,
                menuValue: action.data.menuValue,
                menuValueIcon: action.data.menuValueIcon,
                subMenuValue: action.data.subMenuValue
            };
            break;
        case ACTION_GET_USER_INFO:
            newState = getUserInfo(state, action.data);
            break;
    }
    return newState;
}