import { useState, useEffect } from 'react';

interface Props {
  req: Function;
  params: { [key: string]: any };
  formatter: (data: { [key: string]: any }) => any;
}

interface States {
  loading: boolean;
  dataSource: any[];
  paginator: {
    items: number;
    itemsPerPage: number;
    page: number;
    pages: number;
  };
}

/** 查询/分页Hook，返回loading，数据，分页 */
const useTableQuery = (props: Props): States => {
  const [loading, setLoading] = useState(false);
  const [paginator, setPaginator] = useState({ page: 1, items: 0, itemsPerPage: 10, pages: 1 });
  const [dataSource, setDataSource] = useState([]);
  const { req, params, formatter } = props;
  const queryData = (params: {}) => {
    console.log(params)
    const list = [{
      key: 1,
      id: '1'
    }];
    setDataSource(list);
    // setLoading(true);
    // req(params).then((data: any) => {
    //   setLoading(false);
    //   setPaginator(data.paginator);
    //   const list = formatter(data);
    //   setDataSource(list);
    // });
  };

  useEffect(() => {
    queryData(params);
  }, [params]);

  return { loading, dataSource, paginator };
};

export default useTableQuery;
