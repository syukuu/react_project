// 国际化
// 不需要发送异步请求
import { SET_INTL } from '../constants/intl'
export function setIntl(data) {
    return { type: SET_INTL, data }
}
