---
title: Web前端：在光标处插入内容
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:24:47'
categories:
  - 2.3 Frontend
---
参考：<https://www.cnblogs.com/yeminglong/p/3914386.html>

```js
$(function(){
	//给jquery对象添加成员变量insertAtCaret
    $.fn.extend({
        insertAtCaret : function (myValue) {
            var $t = $(this)[0];
			//傻逼IE
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            }else//现代浏览器
                if ($t.selectionStart || $t.selectionStart == '0') {
					//没有选中的时候，startPos和endPos相等，指的是光标之前有多少字符
					//选中部分文本时，startPos指的是选中的文本之前有多少字符，endPos指的是选中的文本之前字符数量和选中文本字符数量 
                    var startPos = $t.selectionStart;
                    var endPos = $t.selectionEnd;
					//垂直偏移的像素值
                    var scrollTop = $t.scrollTop;
					//将插入字符串插入到原字符串的里面
                    $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
					//使得输入框成为焦点
                    this.focus();
					//光标停留在插入字符串的后面
                    $t.selectionStart = startPos + myValue.length;
                    $t.selectionEnd = startPos + myValue.length;
					//保持垂直偏移
                    $t.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
        }
    })
});
```
