import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import style from './verificationCodeInput.less';

interface VerificationCodeInputState {
  value: string;
}

interface VerificationCodeInputProps {
  value?: string;
  onVerificationCodeImgChange: () => void;
  onChange?: (value: string) => void;
  size?: 'small' | 'default' | 'large';
  verificationCodeImgUrl: string;
}

class VerificationCodeInput extends Component<
  VerificationCodeInputProps,
  VerificationCodeInputState
> {
  static getDerivedStateFromProps(nextProps: VerificationCodeInputProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  constructor(props: VerificationCodeInputProps) {
    super(props);

    this.state = {
      value: props.value || '',
    };
  }

  handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  };

  triggerChange = (changedValue: string) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { size, onVerificationCodeImgChange, verificationCodeImgUrl } = this.props;
    const { value } = this.state;
    return (
      <div className={style['verification-code-box']}>
        <Input
          prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
          placeholder="验证码"
          type="text"
          size={size}
          value={value}
          onChange={this.handleCodeChange}
          style={{ flexGrow: 1 }}
        />
        <img
          onClick={onVerificationCodeImgChange}
          className={style['verification-code-img']}
          src={verificationCodeImgUrl}
          alt="验证码"
        />
        <a onClick={onVerificationCodeImgChange} className={style['remind-label']}>
          看不清？点击更新图片
        </a>
      </div>
    );
  }
}

export default VerificationCodeInput;
