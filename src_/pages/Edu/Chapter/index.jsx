import React, { Component, hook } from "react";
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import { getChapterList } from './redux'

import "./index.less";

dayjs.extend(relativeTime);

@connect(
  (state) => ({
    chapterList: state.chapterList.chapterList
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
  }), { getChapterList }

)
class Chapter extends Component {

  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
  };

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state;
    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        //
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: "查看视频",
        dataIndex: "free",
        //
        render: record => {
          if (record.isFree) {
            return <Button>预览</Button>
          }
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          if ("free" in data) {
            return (
              <div>
                <Tooltip title="查看详情">
                  <Button>
                    <SettingOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="更新章节">
                  <Button type="primary" style={{ margin: "0 10px" }}>
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="删除章节">
                  <Button type="danger">
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </div>
            );
          }
        },
      },
    ];


    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList}
            rowKey="_id"
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Chapter;