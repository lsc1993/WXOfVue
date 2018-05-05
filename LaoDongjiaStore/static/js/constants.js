/** 
 * 描述：提供程序所需常量，包括正则表达式、提示语等
 * @author liushuang   
 * 2018-02-02
 */
//====================================================================================//
/**
 * 正则表达式
 */
PHONE_REG = /^1[0-9]{10}&/  //手机号正则表达式，只验证1开头
PRICE_REG = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/  //价格验证
CHINESE_REG = /[\u4e00-\u9fa5]{0,}$/  //是否包括中文验证
ACCOUNT_REG = /^[0-9a-zA-Z_]{1,}$/  //账号匹配规则，只能由数字、字母和"_"组成
PASSWORD_REG = /^[0-9a-zA-Z_]{1,}$/  //密码匹配规则，只能由数字、字母和"_"组成

/**
 * 用户名字规则与校验提示
 */
ENTER_ACCOUNT = "请输入用户名"
ACCOUNT_TOO_SHORT = "用户名长度不能低于6位"
ACCOUNT_TOO_LONG = "用户名长度不能超过16位"
ACCOUNT_CAN_NOT_CONTAIN_CHINESE = "用户名不能包括汉字"
ACCOUNT_MATCH_RULE = "用户名只能由数字英文和下划线组成"
ACCOUNT_SHORT_LENGTH = 6
ACCOUNT_LONG_LENGTH = 16

/**
 * 密码规则与校验提示
 */
ENTER_PASSWORD = "请输入密码"
PASSWORD_TOO_SHORT = "密码长度不能低于6位"
PASSWORD_TOO_LONG = "密码长度不能超过20位"
PASSWORD_MATCH_RULE = "密码只能由数字英文和下划线组成"
PASSWORD_NOT_SAME = "两次输入密码不一致"
PASSWORD_SHORT_LENGTH = 6
PASSWORD_LONG_LENGTH = 20

/**
 * 其他通用提示
 */
SUCCESS = "请求成功"
FAIL = "请求失败"
PRODUCT_STATUS_UNSALE = "下架"
PRODUCT_UNSALE_TIP = "该商品已下架"
BUY_NUMBER_LIMIT = "不能购买更多了"
PLEASE_CHOOSE_PRODUCT = "请选择商品"
CHECK_CODE_WRONG = "验证码错误"
