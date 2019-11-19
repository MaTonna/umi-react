/*
 * @Description: 创建预约单弹窗
 * @Author: xiaoya
 * @Date: 2019-11-18 17:17:06
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-11-19 10:32:57
 */
import React, { useState } from 'react';
import API from '@/api';
import { Select, Form, Input, Modal, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import useModalSubmit from '@/hooks/useModalSubmit';
import moment from 'moment';
import { Global, Rule } from '@/constants';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
const { LAYOUT_MODAL_FORM } = Global;
const { getRequiredRule } = Rule;

interface ModalProps extends FormComponentProps {
  record?: any;
  visible: boolean;
  closeModal: Function;
}

export default Form.create()((props: ModalProps) => {
  const { record, visible, form: { getFieldDecorator, validateFields, resetFields } } = props;
  // 设置表单参数
  const [params, setParams] = useState();
  const setFormParams = () => {
    validateFields((err, values) => {
      if (err) return;
      values['id'] = record.id;
      values['createGmt'] = values['createGmt'].format('YYYY-MM-DD HH:mm:ss');
      setParams(values);
    })
  }

  // 关闭弹窗
  const closeModal = () => {
    props.closeModal();
    resetFields();
  }

  // 提交表单、获取loading
  const { loading } = useModalSubmit({
    req: API.organization.managerQuery,
    params,
    successCb: closeModal
  })
  return (
    <Modal
      visible={visible}
      title="创建预约单"
      confirmLoading={loading}
      onOk={setFormParams}
      onCancel={closeModal}
    >
      <Form {...LAYOUT_MODAL_FORM}>
        <FormItem label="美丽总监" >
          风行
        </FormItem>
        <FormItem label="客户昵称">
          {getFieldDecorator('3', getRequiredRule('请选择客户昵称'))(
            <Select>
              <Option value="lucy">Lucy</Option>
              <Option value="lucy1">Lucy2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="预约时间">
          {getFieldDecorator('createGmt', {
            ...getRequiredRule('请选择预约时间', {}, 'object'),
            initialValue: moment()
          })(
            <DatePicker
              showTime
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm:ss"
            />,
          )}
        </FormItem>
        <FormItem label="备注">
          {getFieldDecorator('2', getRequiredRule('请填写备注'))(
            <TextArea allowClear rows={5} />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
})
