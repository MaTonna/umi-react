/**
 * 通用校验规则
 *
 * TODO:
 * [] 数字
 * [] min - max 字符限制
 */

export default class Rule {
  public static readonly getRequiredRule = (message: string, otherRules = {}, type = 'string') => {
    return {
      rules: [Object.assign({
        type,
        message,
        required: true,
      }, otherRules)]
    };
  }
}
