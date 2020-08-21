import {
  reqGetSubject,
  reqGetSecSubject,
  reqSubjectUpdate,
  reqSubjectDel
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
} from "./constants";
/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

// 获取一级数据
export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.total;
    });
  };
};

const getSecSubjectListSync = (list) => ({
  type: GET_SEC_SUBJECT_LIST,
  data: list,
});
// 获取二级数据
export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response.total;
    });
  };
}


// 二级数据更新
const updateSubjectListSync = (data) => ({
  type: UPDATE_SUBJECT,
  data,
});
export const updateSubjectList = (id, title) => {
  return (dispatch) => {
    return reqSubjectUpdate(id, title).then((response) => {
      dispatch(updateSubjectListSync({ id, title }));
      return response.total;
    });
  };
}


// 删除数据
const delSubjectListSync = (data) => ({
  type: DELETE_SUBJECT,
  data
});
export const delSubjectList = (id) => {
  return (dispatch) => {
    return reqSubjectDel(id).then((response) => {
      console.log(id)
      console.log('进入action')
      dispatch(delSubjectListSync(id));
      return response.total;
    });
  };
}