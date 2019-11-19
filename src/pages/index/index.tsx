import React from 'react';
import styles from './index.less';
import { Icon } from 'antd';

export default function() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <Icon type="sound" theme="twoTone" twoToneColor="#FF9318" className={styles.icon} />
        <span>欢迎您!</span>
      </div>
    </div>
  );
}
