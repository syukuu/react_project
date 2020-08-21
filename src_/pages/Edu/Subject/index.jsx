import React, { Component } from "react";
import { Button, Table, Tooltip, Pagination, Input, message, Modal, } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from 'react-redux'
import { getSubjectList, getSecSubjectList, updateSubjectList, delSubjectList } from './redux'
import { reqSubjectUpdate, reqSubjectDel } from '@api/edu/subject'

import "./index.less";

// 使用修饰器语法，传入展示组件可以不写
@connect(state => ({
  subjectList: state.subjectList
}), {
  getSubjectList,
  getSecSubjectList,
  updateSubjectList,
  delSubjectList
})

class Subject extends Component {

  // 定义用来判断切换展示组件的id
  state = {
    subjectId: '',
    title: ''
  }
  componentDidMount() {
    // 组件挂载时调用异步action
    this.props.getSubjectList(1, 10)
  }

  handleChange = (page, pageNumber) => {
    // console.log('页码变化' + pageNumber);
    // 解决bug：页码和数据页数不对应
    // 解决：让当前页码显示高亮 --> 存下当前页码
    this.page = page
    this.props.getSubjectList(page, pageNumber)

  }
  handleShowSizeChange = (current, size) => {
    // console.log('条数变化' + size);
    this.props.getSubjectList(current, size)
  }

  // 点击+，发送请求获取二级列表
  handleExpand = (expanded, record) => {
    // console.log(expanded, record)
    if (expanded) {

      this.props.getSecSubjectList(record._id)
    }
  }

  // 增加
  handleToAdd = () => {
    this.props.history.push('/edu/subject/add')
  }

  // 修改
  handleUpdate = record => () => {
    // console.log(this.state);
    // console.log(record._id);
    this.setState({
      subjectId: record._id,
      title: record.title
    })

    this.title = record.title
  }

  // 更新变化
  handleUpdateChange = e => {
    this.setState({
      title: e.target.value
    })

  }

  // 取消按钮
  handleCancle = () => {
    this.setState({
      subjectId: '',
      title: ''
    })
  }

  // 修改数据，确认
  handleUpdateConfirm = async () => {
    if (!this.state.title.trim()) {
      message.warning('请输入内容')
      return
    }
    if (this.state.title === this.title) {
      message.warning('输入内容不能一致')
      return
    }
    const id = this.state.subjectId
    const title = this.state.title
    // await reqSubjectUpdate(id, title)
    await this.props.updateSubjectList(id, title)

    message.success('修改成功')
    this.setState({
      subjectId: '',
      title: ''
    })
    // this.props.getSubjectList(1, 10)
  }

  // 删除
  handleDel = record => () => {
    // reqSubjectDel(record._id) // -->  重新点击可展开+
    Modal.confirm({
      title: (
        <div>
          你确定要删除
          <span style={{ color: 'red', margin: '0 10px' }}>{record.title}</span>
          课程分类嘛?
        </div>
      ),
      onOk: async () => {
        await this.props.delSubjectList(record._id)
        message.success('数据删除成功')
        // bug---删除一条数据后，页面显示n-1条数据，补齐一页n条
        if (record.parentId === '0') {
          // bug---删除当前页>1最后一条一级数据，页面显示无数据
          if (
            this.page > 1 &&
            this.props.subjectList.items.length === 0
          ) {
            this.props.getSubjectList(this.page--, 10)
          }
          this.props.getSubjectList(this.page, 10)
        }
        

      }
    })
  }

  render() {
    // columns中的数据要动态渲染，因此要放入render函数中
    const columns = [
      {
        title: "分类名称",
        key: "name",

        render: record => {
          if (this.state.subjectId === record._id) {
            return (
              <Input
                style={{ width: 300 }}
                value={this.state.title}
                onChange={this.handleUpdateChange}
              ></Input>
            )
          }
          return record.title
        }
      },
      {
        title: "操作 ",
        key: "x",
        // 判断显示的组件
        render: record => {
          if (this.state.subjectId === record._id) {
            return (
              <>
                <Button type='primary' style={{ marginRight: 10 }} onClick={this.handleUpdateConfirm}>
                  确认
                </Button>
                <Button type='danger' onClick={this.handleCancle}>取消</Button>
              </>
            )
          } else {
            return (
              <>
                <Tooltip title="修改">
                  <Button type="primary"
                    style={{ marginRight: 20 }}
                    onClick={this.handleUpdate(record)}>
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="删除">
                  <Button type="danger" onClick={this.handleDel(record)} >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </>
            )
          }
        },
        width: 200,
      },
    ];

    return (
      <div className="Subject" >
        <Button type="primary" size="large" className="addClass" onClick={this.handleToAdd}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns}
          expandable={{
            // expandedRowRender: (record) => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // rowExpandable: (record) => record.name !== "Not Expandable",
            onExpand: this.handleExpand
          }}
          dataSource={this.props.subjectList.items}
          rowKey='_id'
          pagination={
            {
              defaultPageSize: 5,
              total: this.props.subjectList.total,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15],
              onChange: this.handleChange,
              onShowSizeChange: this.handleShowSizeChange,
              current: this.page
            }
          }
        />
      </div>
    );
  }
}


export default Subject
