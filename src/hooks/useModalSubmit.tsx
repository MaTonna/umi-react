import { useState, useEffect } from 'react';

type Params = { [key: string]: any }

interface ModalProps {
  req: Function;
  params: Params;
  successCb: (data?: {}) => any;
  failCb?: (data?: {}) => any;
}

interface States {
  loading: boolean;
}

/** 弹窗Hook，点击提交，返回loading */
const useModalSubmit = (props: ModalProps): States => {
  const [loading, setLoading] = useState(false);
  const { params, successCb } = props;
  const queryData = (params: Params) => {
    console.log(params)
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      successCb();
    }, 2000);
  }

  useEffect(() => {
    params && queryData(params);
  }, [params]);

  return {
    loading,
  }
}
export default useModalSubmit;
