import React, { Component } from "react";
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
import Player from 'griffith'
import screenfull from 'screenfull'

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import { getChapterList, getLessonList, delLessonList, delChapterList } from "./redux";

import "./index.less";

dayjs.extend(relativeTime);

@connect(
  (state) => ({ chapterList: state.chapterList.chapterList })
  , { getChapterList, getLessonList, delLessonList, delChapterList })
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    play_url: ''
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

  // 获取课程列表
  handleGetLesson = (expanded, record) => {
    // console.log(expanded, record);
    if (expanded) {
      this.props.getLessonList(record._id)
    }
  }

  // 跳转到添加课程页面
  handleToLesson = data => () => {
    this.props.history.push('/edu/chapter/addlesson', data)
  }

  // 点击'预览'
  handlePreviewVideo = record => () => {
    this.setState({
      previewVisible: true,
      // 点击时，把视频地址赋值给属性
      play_url: record.video
    });
  }

  // 点击批量删除
  handleBatchRemove = () => {
    // 定义章节id数组 --- 匹配到的 要删除的章节
    const chapterIdList = []
    // 遍历所有章节，看数组元素的id是否能和 selectedRowKeys的值 匹配
    this.props.chapterList.forEach(item => {
      if (this.state.selectedRowKeys.indexOf(item._id) > -1) {
        // 匹配上，就是要删除的章节
        chapterIdList.push(item._id)
      }
    })

    // 定义课时id数组 --- 匹配到的要删除的id
    // lesson在chapter的children属性中
    // item是要删除的每一项数据的id
    const lessonIdList = this.state.selectedRowKeys.filter(item => {
      if (chapterIdList.indexOf(item) > -1) {
        // id存在章节id数组， 就是要删除
        return false
      }
      return true
    })

    // delLessonList, delChapterList
    this.props.delChapterList(chapterIdList)
    this.props.delLessonList(lessonIdList)
    message.success('批量删除成功')
  }
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
        render: (isFree) => {
          // console.log(isFree)
          // 写了dataIndex之后，render函数的参数接收的就是dataIndex的值
          // 不写就是当前整行的对象
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: '视频',
        render: (record) => {
          // console.log(record)
          if (record.free) {
            return <Button onClick={this.handlePreviewVideo(record)}>预览</Button>
          }
        }
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          return (
            <div>
              <Tooltip title="新增课时">
                <Button type='primary' onClick={this.handleToLesson(data)}>
                  <PlusOutlined />
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
    const sources = {
      hd: {
        play_url: this.state.play_url,
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }

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
              <Button type="danger" style={{ marginRight: 10 }} onClick={this.handleBatchRemove}>
                <span>批量删除</span>
              </Button>
              <Tooltip title='全屏' className='course-table-btn'>
                <FullscreenOutlined
                  onClick={() => {
                    screenfull.toggle()
                  }}
                />
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
            onExpand={this.handleGetLesson}
          />
        </div>

        <Modal
          visible={previewVisible}
          title='预览课时'
          footer={null}
          onCancel={this.handleImgModal}
          // x依然播放 ==> 销毁
          destroyOnClose={true}
        >
          <Player
            sources={sources}
            id={'1'}
            cover={'http://localhost:3000/logo512.png'}
            duration={1000}
          ></Player>
        </Modal>
      </div>
    );
  }
}

export default Chapter;
