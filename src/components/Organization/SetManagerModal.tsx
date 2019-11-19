/*
 * @Description: 创建/修改美丽总监
 * @Author: xiaoya
 * @Date: 2019-11-18 17:16:16
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-11-19 10:31:40
 */
import React, { useState } from 'react';
import API from '@/api';
import { Select, Form, Input, Modal, Upload, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import useModalSubmit from '@/hooks/useModalSubmit';
import { Global, Rule } from '@/constants';
import regexp from '@/utils/regexp';
const FormItem = Form.Item;
const { Option } = Select;
const { LAYOUT_MODAL_FORM } = Global;
const { getRequiredRule } = Rule;

interface ModalProps extends FormComponentProps {
  record?: any;
  visible: boolean;
  closeModal: Function;
}

/** 表单回填 */
const fillBackForm = (props: ModalProps) => {
  const { record } = props;
  return {
    '1': Form.createFormField({
      value: record ? record.id : ''
    }),
  };
}

export default Form.create({
  mapPropsToFields: fillBackForm
})((props: ModalProps) => {
  const { record: { id }, visible, form: { getFieldDecorator, validateFields, resetFields } } = props;

  const titleFix = id ? '修改' : '创建';

  // 设置表单参数
  const [params, setParams] = useState();
  const setFormParams = () => {
    validateFields((err, values) => {
      if (err) return;
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

  // 处理图片
  const [imgUrl, setImgUrl] = useState();
  const [imgLoading, setImgLoading] = useState(false);
  const normFile = (e: any) => {
    return getBase64(e.file.originFileObj, (imageUrl: string) => {
      setImgUrl(imageUrl);
      setImgLoading(false);
    });
  };

  const getBase64 = (img: Blob, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    return reader.result;
  }

  const uploadChange = (e: any) => {
    if (e.file.status === 'uploading') {
      setImgLoading(true);
      return;
    }
  }

  const uploadButton = (
    <div>
      <Icon type={imgLoading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      title={"美丽总监" + titleFix}
      confirmLoading={loading}
      onOk={setFormParams}
      onCancel={closeModal}
    >
      <Form {...LAYOUT_MODAL_FORM}>
        <FormItem label="美丽总监姓名" >
          {getFieldDecorator('1', getRequiredRule('请输入美丽总监姓名'))(
            <Input allowClear />
          )}
        </FormItem>
        <FormItem label="手机号">
          {getFieldDecorator('2', getRequiredRule('请输入手机号', {
            pattern: regexp.cell,
            message: '请输入正确的手机号'
          }))(
            <Input allowClear />
          )}
        </FormItem>
        <FormItem label="所属机构">
          {getFieldDecorator('3', getRequiredRule('请选择所属机构'))(
            <Select>
              <Option value="lucy">Lucy</Option>
              <Option value="lucy1">Lucy2</Option>
            </Select>
          )}
        </FormItem>
        <Form.Item label="头像">
          {getFieldDecorator('avatar', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              onChange={uploadChange}
            >
              {imgUrl ? <img style={{ width: '100%' }} src={imgUrl} /> : uploadButton}
            </Upload>,
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
})
