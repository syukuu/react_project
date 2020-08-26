import React, { Component } from 'react'
import { Card, Button, DatePicker, Space } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;

const tabListNoTitle = [
    {
        key: 'Sales',
        tab: 'Sales',
    },
    {
        key: 'Visit',
        tab: 'Visit',
    }
];

const contentListNoTitle = {
    Sales: <p>Sales content</p>,
    Visit: <p>Visit content</p>,
};

export default class Sales extends Component {
    state = {
        noTitleKey: 'Sales',
        // 时间按钮
        dateFlag: 'day',
        // 日期范围
        rangTime: [moment(), moment()]
    };

    // 标签对应显示内容
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    //点击按钮显示对应的时间范围
    handleBtnClick = dateFlag => () => {
        let rangTime = []
        switch (dateFlag) {
            case 'day':
                rangTime = [moment(), moment()]
                break
            case 'week':
                rangTime = [moment(), moment().add(7, 'd')]
                break
            case 'month':
                rangTime = [moment(), moment().add(1, 'M')]
                break
            case 'year':
                rangTime = [moment(), moment().add(1, 'y')]
                break
        }
        // 渲染按钮和日期范围
        this.setState({
            dateFlag,
            rangTime
        })
    }

    render() {
        const extra = <>
            {/* 点击按钮，触发点击事件，传入day，重新渲染视图，此时dateFlag就是自己定义的day/week等 */}
            <Button type='text'
                type={this.state.dateFlag === 'day' ? 'link' : 'text'}
                onClick={this.handleBtnClick('day')} > 今日</Button>
            <Button type='text'
                type={this.state.dateFlag === 'week' ? 'link' : 'text'}
                onClick={this.handleBtnClick('week')}> 本周</Button>
            <Button type='text'
                type={this.state.dateFlag === 'month' ? 'link' : 'text'}
                onClick={this.handleBtnClick('month')} > 本月</Button>
            <Button type='text'
                type={this.state.dateFlag === 'year' ? 'link' : 'text'}
                onClick={this.handleBtnClick('year')} > 本年</Button>
            <RangePicker value={this.state.rangTime} />
        </>
        return (<>
            <Card
                style={{ width: '100%' }}
                tabList={tabListNoTitle}
                activeTabKey={this.state.noTitleKey}
                tabBarExtraContent={extra}
                onTabChange={key => {
                    this.onTabChange(key, 'noTitleKey');
                }}
            >
                {contentListNoTitle[this.state.noTitleKey]}
            </Card>
        </>)
    }
}

