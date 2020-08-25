import {
  GET_ALL_COURSE, GET_ALL_CHAPTER, GET_ALL_LESSON, REMOVE_LESSONS,
  REMOVE_CHAPTERS
} from './contants'
const initChapter = {
  allCourseList: [],
  chapterList: []
}
export default function chapterList(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      return {
        ...prevState,
        allCourseList: action.data
      }
    case GET_ALL_CHAPTER:
      // console.log('reducer', action.data.items)
      action.data.items.forEach(item => {
        item.children = []
      })
      return {
        ...prevState,
        chapterList: action.data.items
      }
    case GET_ALL_LESSON:
      const newItems = [...prevState.chapterList]
      newItems.forEach(item => {
        if (item._id === action.data.chapterId) {
          item.children = action.data.res
        }
      })
      return {
        ...prevState,
        chapterList: newItems
      }
    case REMOVE_CHAPTERS:
      // 获取章节列表
      const chapterList = [...prevState.chapterList]
      // 要删除的章节的id
      const delChapterListId = action.data
      // 遍历章节列表，过滤出匹配删除id的章节
      const newChapterList = chapterList.filter(item => {
        if (delChapterListId.indexOf(item._id) > -1) {
          return false
        }
        return true
      })
      return {
        ...prevState,
        chapterList: newChapterList
      }

    case REMOVE_LESSONS:
      // 获取章节列表
      const chapterLists = [...prevState.chapterList]
      // 要删除的课时的id
      const delLessonListId = action.data
      // 遍历章节列表
      chapterLists.forEach(item => {
        // 过滤章节的课时数据,把过滤后的数据重新赋值给children
        item.children = item.children.filter(lessonItem => {
          if (delLessonListId.indexOf(lessonItem._id) > -1) {
            return false
          }
          return true
        })
      })
      return {
        ...prevState,
        chapterList: chapterLists
      }

    default:
      return prevState
  }
}
