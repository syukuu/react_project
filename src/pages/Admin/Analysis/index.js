import React, { Component } from 'react';
import { Row, Col, Statistic, Progress } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

// 面积图 柱状图
import { AreaChart, ColumnChart } from 'bizcharts'
import Card from '@comps/Card';

const style = { background: '#fff' };

const RowCol = {
    xs: { span: 24 },
    md: { span: 12 },
    lg: { span: 6 }
}
// 面积图数据
const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 8 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
];

// 柱状图数据
const dataZhu = [
    {
        type: '家具家电',
        sales: 38,
    },
    {
        type: '粮油副食',
        sales: 52,
    },
    {
        type: '生鲜水果',
        sales: 61,
    },
    {
        type: '美容洗护',
        sales: 145,
    },
    {
        type: '母婴用品',
        sales: 48,
    },
    {
        type: '进口食品',
        sales: 38,
    },
    {
        type: '食品饮料',
        sales: 38,
    },
    {
        type: '家庭清洁',
        sales: 38,
    },
];


class Analysis extends Component {

    render() {
        return (
            <>
                {/* [水平方向，垂直方向]  不写就没有 */}
                <Row gutter={[16, 16]}>
                    <Col {...RowCol}>
                        <Card
                            title={<Statistic title="Active Users" value={112893} />}
                            footer={'日销售额 ￥12,423'}>
                            <span>
                                周同比 12% <CaretUpOutlined style={{ color: '#cf1322' }} />
                            </span>
                            <span style={{ marginLeft: 15 }}>
                                日同比 10% <CaretDownOutlined style={{ color: '#3f8600' }} />
                            </span>
                        </Card>
                    </Col>
                    <Col {...RowCol}>
                        <Card
                            title={<Statistic title="Active Users" value={112893} />}
                            footer={'日销售额 ￥12,423'}>
                            <AreaChart
                                data={data}
                                // title={{
                                //     visible: true,
                                //     text: '面积图',
                                // }}
                                xField='year'
                                yField='value'
                                xAxis={{ visible: false }}
                                yAxis={{ visible: false }}
                                padding='0'
                                smooth='true'
                                color={['hotpink']}
                            />
                        </Card>
                    </Col>
                    <Col {...RowCol}>
                        <Card
                            title={<Statistic title="Active Users" value={112893} />}
                            footer={'日销售额 ￥12,423'}>
                            <ColumnChart
                                data={dataZhu}
                                forceFit
                                padding='0'
                                xAxis={{ visible: false }}
                                yAxis={{ visible: false }}
                                xField='type'
                                yField='sales'
                                meta={{
                                    type: {
                                        alias: '类别',
                                    },
                                    sales: {
                                        alias: '销售额(万)',
                                    },
                                }}
                            />
                        </Card>
                    </Col>
                    <Col {...RowCol}>
                        <Card
                            title={<Statistic title="Active Users" value={112893} />}
                            footer={'日销售额 ￥12,423'}>
                            <Progress
                                strokeColor={{
                                    from: '#108ee9',
                                    to: '#87d068',
                                }}
                                percent={99.9}
                                status="active"
                            />
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Analysis;
