import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';

interface UserName {
  time: string;
  userName: string;
}

interface LoginFormProps {
  form?: any;
  onSuccess: (values: {}) => void;
  userName: UserName;
}

const LoginForm = Form.create()((props: LoginFormProps) => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const loginNameValidator = (_, value, callback) => {
    value && !/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(value) && callback('最多只能输入11位中英文、数字');
    callback();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err: boolean, values: {}) => {
      if (!err) {
        props.onSuccess(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h3 className={styles.title}>登录</h3>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名!' }, { validator: loginNameValidator }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
            maxLength={11}
            placeholder="用户名"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
            type="password"
            placeholder="密码"
          />,
        )}
      </Form.Item>
      {/* <Form.Item>
        {getFieldDecorator('isRemember')(
          <Checkbox.Group>
            <Checkbox value="isRemember">记住用户名 </Checkbox>
          </Checkbox.Group>,
        )}
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles['login-button']}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
});

export default LoginForm;
