# 了解网络安全等高级知识以及React(高级进阶)
## XSS入门和介绍
XSS就是*在页面执行你想要的脚本*
 
### 如何防御XSS攻击


* addslashes()
  > php addslashes函数的作用是在预定义的字符前面加上反斜杠，这些预定义字符包括：
  
    > * 单引号（'）
    > * 双引号（"）
    > * 反斜杠（\）
    > * NULL

* htmlspecialchars()
  > htmlspecialchars()函数是把预定义字符转换成html实体。
    > 预定义的字符是：

    > * & （和号）成为 &
    > * " （双引号）成为 "
    > * ' （单引号）成为 '
    > * <  （大于）成为 >

* htmlspecialchars_decode()
  > 这个函数是把特殊的html实体转换回字符。
