import React, { useState } from 'react';
import API from '@/api';
import { Card, Modal, Form, Table, Input, Button, Row, Col, Icon, Divider, Badge } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SetManagerModal from '@/components/Organization/SetManagerModal';
import CreateOrderModal from '@/components/Organization/CreateOrderModal';
import useTableQuery from '@/hooks/useTableQuery';
import { FormComponentProps } from 'antd/es/form';
import { Global } from '@/constants';
const FormItem = Form.Item;
const { LAYOUT_FORMITEM, GRID_COL } = Global;
const { confirm } = Modal;

interface QueryProps extends FormComponentProps {
  route: any;
}

export default Form.create()((props: QueryProps) => {
  const { route, form } = props;

  const { getFieldDecorator } = form;

  // 显示修改，更改点击的行信息
  const [record, setRecord] = useState({});

  // 查询
  const [params, setParams] = useState({});

  const { dataSource = [], loading, paginator } = useTableQuery({
    req: API.organization.managerQuery,
    params,
    formatter: data => data,
  });

  const onPageChange = (currentPage: number, pageSize?: number) => {
    setParams({ ...params, currentPage, pageSize });
  };

  const handleSearch = () => {
    setParams({ ...props.form.getFieldsValue(), currentPage: paginator.page });
  };

  // 显示/关闭信息弹窗
  const [managerModalVisible, setManagerModalVisible] = useState(false);
  const [createOrderVisible, setCreateOrderVisible] = useState(false);
  const changeModalVisible = (setVisibleFunc: Function, visible = true, record = {}) => {
    setRecord(record);
    setVisibleFunc(visible);
  }

  // 重置密码
  const resetPwd = (record) => {
    confirm({
      title: '提示',
      content: '确认要重置密码？',
      onOk() {

      },
    });
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: '1',
    }, {
      title: '手机号',
      dataIndex: '2',
    }, {
      title: '机构',
      dataIndex: '3',
    }, {
      title: '创建时间',
      dataIndex: '4',
    }, {
      title: '是否登录',
      render: () => {
        return <a>
          <Badge status="error" text="禁止" />
        </a>
      }
    }, {
      title: '操作',
      render: (_: any, record: {}) => {
        return <>
          <a onClick={() => changeModalVisible(setManagerModalVisible, true, record)}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => { resetPwd(record) }}>重置密码</a>
          <Divider type="vertical" />
          <a onClick={(record) => changeModalVisible(setCreateOrderVisible, true, record)}> 创建预约单</a>
        </>
      }
    },
  ];

  return (
    <PageHeaderWrapper route={route}>
      <Card bordered={false}>
        <Form {...LAYOUT_FORMITEM}>
          <Row>
            <Col {...GRID_COL}>
              <FormItem label="姓名">
                {getFieldDecorator('salesName')(<Input allowClear />)}
              </FormItem>
            </Col>
            <Col {...GRID_COL}>
              <FormItem label="机构">
                {getFieldDecorator('organization')(<Input allowClear />)}
              </FormItem>
            </Col>
          </Row>
          <Row className="query-btns">
            <Button type="primary" htmlType="submit" onClick={handleSearch}>
              查询
            </Button>
            <Button className="ml" type="primary" onClick={() => changeModalVisible(setManagerModalVisible)}>
              <Icon type="plus" />
              创建
            </Button>
          </Row>
        </Form>
        <Table
          className="table-center"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={(record: any) => record.key}
          pagination={{
            total: paginator.items,
            current: paginator.page,
            onChange: onPageChange,
          }}
        />
      </Card>
      <SetManagerModal
        record={record}
        visible={managerModalVisible}
        closeModal={() => changeModalVisible(setManagerModalVisible, false)}
      />
      <CreateOrderModal
        record={record}
        visible={createOrderVisible}
        closeModal={() => changeModalVisible(setCreateOrderVisible, false)}
      />
    </PageHeaderWrapper>
  );
});
