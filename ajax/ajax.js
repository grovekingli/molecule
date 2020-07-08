/**
 * Created by grovekingli on 2020/7/8.
 */
function MyAjax(method, url,callback) {
  var _this = this;

  this.method = method ? method : 'GET';
  this.url = url;
  this.callback = callback;

  var xhr = new XMLHttpRequest();
  xhr.open(_this.method,_this.url);
  xhr.send();

  xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
      callback(xhr);
    }
  }
}

var myAjax = new MyAjax('GET','https://www.baidu.com',function(res){
  console.log(res);
});
