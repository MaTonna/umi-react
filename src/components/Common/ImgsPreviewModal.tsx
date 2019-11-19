/*
 * @Description: 图片轮播墙
 * @Author: xiaoya
 * @Date: 2019-11-05 15:50:42
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-11-19 11:39:34
 */
import React from 'react';
import { Modal, Button, Icon } from 'antd';
import Slider from "react-slick";
import styles from '@/styles/component/imgsPreviewModal.less';
console.log(styles)
interface Props {
  visible: boolean;
  closeModal: Function;
  sliderPicSrcs: any[];
  initialIndex?: number;
}

/**
 * 图片预览大图可轮播，props：visible/closeModal/sliderPicSrcs/initialIndex
 */
export default (props: Props) => {

  const closeSilderModal = () => {
    props.closeModal();
  }

  const { visible, sliderPicSrcs, initialIndex } = props;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialIndex || 0,
    prevArrow: <Icon type="left" style={{ fontSize: '30px' }} />,
    nextArrow: <Icon type="right" style={{ fontSize: '30px' }} />,
  };

  return (
    <Modal
      className={styles['slick-wrap']}
      width={500}
      visible={visible}
      onCancel={closeSilderModal}
      footer={<Button type="primary" onClick={closeSilderModal}>关闭</Button>}
    >
      <Slider {...sliderSettings}>
        {
          sliderPicSrcs.map((item: string) => {
            return <div key={item}>
              <img src={item} alt="图片预览" />
            </div>
          })
        }
      </Slider>
    </Modal>
  )
}
