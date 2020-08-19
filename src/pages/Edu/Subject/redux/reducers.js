import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
} from "./constants";

const initUserList = {
  total: 0, // 总数
  items: [], // 课程分类的数据
};

export default function subjectList(prevState = initUserList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      // 给每一项结果对象，添加children属性 使每一行显示可展开按钮 +
      action.data.items.forEach(item => item.children = [])
      // console.log(action.data.items);  
      return action.data;
    case GET_SEC_SUBJECT_LIST:
      // 存储二级数据
      const secItems = action.data.items
      console.log(secItems);
      // 一级数据
      const firstItems = prevState.items
      secItems.length &&
        firstItems.forEach(item => {
          if (item._id === secItems[0].parentId) {
            item.children = secItems
          }
        })
      return {
        ...prevState,
        items: firstItems
      }
    case UPDATE_SUBJECT:
      // 根据id找到指定的课程分类,然后修改title属性
      prevState.items.forEach(item => {
        if (item._id === action.data.id) {
          item.title = action.data.title
          return
        }
        item.children.forEach(secItem => {
          if (secItem.id === action.data.id) {
            item.title = action.data.title
          }
        })
      })
      return {
        ...prevState
      }
    case DELETE_SUBJECT:
      prevState.items.forEach((item, index) => {
        console.log(item._id, action.data, '333')
        if (item._id === action.data) {
          console.log(prevState, '4444')
          delete prevState.items[index]
          return
        }
        item.children.forEach(secItem => {
          if (secItem.id === action.data.id) {

            delete item.secItem
            return
          }
        })
      })
      return {
        ...prevState
      }
    default:
      return prevState;
  }
}
