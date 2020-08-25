import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
import { reqAllSubjectList, reqGetSecSubject } from '@api/edu/subject'
import { reqGetAllTeacherList } from '@api/edu/teacher'

import { connect } from 'react-redux'
import { getAllCourseList } from '../redux'
// 国际化
// 导入hooks --> useIntl
import { FormattedMessage, useIntl } from 'react-intl'

import "./index.less";

const { Option } = Select;

function SearchForm(props) {
  //国际化
  const intl = useIntl()

  const [form] = Form.useForm();

  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [options, setOptions] = useState([])

  // 模拟挂载的生命周期函数
  useEffect(() => {
    async function fetchData() {
      // 获取到了课程和老师的数据 --> 渲染视图 useState
      const [subject, teacher] = await Promise.all([
        reqAllSubjectList(), reqGetAllTeacherList()
      ])
      // 渲染上面拿到的的数据
      setSubjects(subject)
      setTeachers(teacher)

      // 定义可供Cascader组件展示的数据对象
      const optionList = subject.map(item => {
        return {
          value: item._id,
          label: item.title,
          isLeaf: false
        }
      })
      // 渲染list
      setOptions(optionList)
    }
    fetchData()
  }, [])



  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  // 有子集级数据，loadData就会被触发
  const loadData = async selectedOptions => {
    // selectedOptions记录一级数据和后面子级数据
    // 获取最后一级数据，根据最后获取下一级数据
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 加载的效果
    targetOption.loading = true
    // 发送请求，获取二级数据
    const res = await reqGetSecSubject(targetOption.value)
    // 等到二级数据，关闭加载效果
    targetOption.loading = false
    // 判断，如果有二级数据，给这级数据添加children属性，存放子级数据
    if (res.items.length) {
      targetOption.children = res.items.map(item => {
        // 把数据修改为Cascader组件可以渲染的格式
        return {
          value: item._id,
          label: item.title
        }
      })
    } else {
      targetOption.isLeaf = true
    }
    setOptions([...options])
  }


  const resetForm = () => {
    form.resetFields();
  };

  const onFinish = () => {
    console.log(props)
    props.getAllCourseList()

  }

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      {/* id的值就是语言包中json文件中的属性 */}
      {/* <Form.Item name='title' label={<FormattedMessage id='title' />}></Form.Item> */}
      <Form.Item name="title" label={<FormattedMessage id='title' />}>
        <Input
          placeholder={intl.formatMessage({
            id: 'title'
          })}
          style={{
            width: 250,
            marginRight: 20
          }} />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id='teacher' />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: 'teacher'
          })}
          style={{
            width: 250,
            marginRight: 20
          }}>
          {teachers.map(item => (
            <Option value={item._id} key={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* <Form.Item name="subject" label="分类"> */}
      <Form.Item name="subject" label={<FormattedMessage id='subject' />}>

        <Cascader
          style={{
            width: 250,
            marginRight: 20
          }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          // changeOnSelect
          placeholder={intl.formatMessage({
            id: 'subject'
          })} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            margin: "0 10px 0 30px"
          }}>
          <FormattedMessage id='searchBtn' />
        </Button>
        <Button onClick={resetForm}> <FormattedMessage id='resetBtn' /> </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getAllCourseList })(SearchForm)

