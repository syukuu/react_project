import React from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";
import { connect } from 'react-redux'

import Layout from "./layouts";
// 国际化组件
import { IntlProvider } from 'react-intl'
// antd国际化组件
import { ConfigProvider } from 'antd'
// 引入语言包 
import { zh, en } from './locales'
// antd语言包
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'


// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App(props) {
  // 用户当前语言环境
  const locale = props.intl
  // console.log(props.intl);
  // 根据用户语言环境选择的语言包
  const messages = locale === 'en' ? en : zh
  // 根据用户当前语言环境判断antd中应用哪个语言包
  const antLocale = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      <ConfigProvider locale={antLocale}>
        <IntlProvider locale={locale} messages={messages}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default connect(state => ({ intl: state.intl }))(App)
