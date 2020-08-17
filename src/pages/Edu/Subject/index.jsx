import React, { Component } from "react";
import { Button, Table, Tooltip, Pagination } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from 'react-redux'
import { getSubjectList, getSecSubjectList } from './redux'

import "./index.less";





const columns = [
  { title: "分类名称", dataIndex: "title", key: "name" },
  {
    title: "操作 ",
    dataIndex: "",
    key: "x",
    render: () => (
      <div>
        <Tooltip title="修改">
          <Button type="primary" style={{ marginRight: 20 }}>
            <FormOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="删除">
          <Button type="danger">
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </div>
    ),
    width: 200,
  },
];

const data = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
  },
];

// 使用修饰器语法，传入展示组件可以不写
@connect(state => ({ subjectList: state.subjectList }), { getSubjectList, getSecSubjectList})

class Subject extends Component {
  componentDidMount() {
    // 组件挂载时调用异步action
    this.props.getSubjectList(1, 5)
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
      console.log(this.props)
      this.props.getSecSubjectList(record._id)
    }
  }



  render() {

    return (
      <div className="Subject">
        <Button type="primary" size="large" className="addClass">
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
