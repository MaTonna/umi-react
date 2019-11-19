/**
 * 全局常量
 */
export default class Global {
  public static readonly LAYOUT_FORMITEM = {
    labelCol: {
      sm: { span: 6 },
      xl: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 18 },
      xl: { span: 16 },
    },
  };
  public static readonly LAYOUT_MODAL_FORM = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };
  public static readonly LAYOUT_FORMITEM_BUTTON = {
    labelCol: {
      sm: { span: 4 },
      xl: { span: 6 },
    },
    wrapperCol: {
      sm: { offset: 4 },
      xl: { offset: 6 },
    },
  };
  // 两栏布局 FormItem 布局
  public static readonly LAYOUT_HALF_FORMITEM = {
    labelCol: {
      sm: { span: 4 },
      xl: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 20 },
      xl: { span: 12 },
    },
  };

  // 查询表格头部搜索布局
  public static readonly GRID_COL = {
    sm: 8,
    xl: 6,
  };

  // 两栏自适应布局
  public static readonly GRID_COL_HALF = {
    sm: 24,
    xl: 12,
  };

  // Select组件默认样式
  public static readonly STYLE_SELECT = {
    width: 160,
  };

  // Input组件默认样式
  public static readonly STYLE_INPUT = {
    width: 'auto',
  };
}
