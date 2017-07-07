
	
	
	var smsVerify = null;
	// 注册，初始化
	function register(){
		smsVerify.register(function(ret, err){
			if(ret.status){
//				api.alert({msg: '注册成功'});
//				console.log('注册成功');
			}else{
				api.alert({msg: err.code+' 注册失败'});
			}
		});
	}
	
	// 发短信验证码
	function sms(){
		var phone = document.getElementById("phone").value;
		 
		 if(!checkphonenum(phone)){
		 	api.alert({msg: '请输入正确的手机号。'});
		 	return;
		 }


		
		smsVerify.sms({
			phone:phone,
		},function(ret, err){
			if(ret.status){
//				// 新增的安卓智能验证功能
//				if( ret.smart == true ){	// 安卓版特有功能 智能验证成功
//					api.alert({msg: '智能验证成功，开发者可以为用户直接跳转到手机号验证成功之后的操作'});
//				}else{
//					api.alert({msg: '短信发送成功'});
//				}
//短信验证成功执行登陆
 				

			}else{
				api.alert({msg: err.code+' 短信发送失败'});
			}
		});
	}
	
	// 发语音验证码
	function voice(){
		var phone = document.getElementById("phone").value;
		smsVerify.voice({
			phone:phone,
		},function(ret, err){
			if(ret.status){
				api.alert({msg: '语音发送成功'});
			}else{
				api.alert({msg: err.code+' 语音发送失败'});
			}
		});
	}
	
	// 校验验证码
	function verify(){
		
		
	api.showProgress({
        title: '正在验证...',
        modal: false
    });
		
		var phone = document.getElementById("phone").value;
		var code = document.getElementById("code").value;
	    $api.setStorage("phone",phone);
		var phonenum = $api.getStorage("phone",phone);
		$(".headername").text(phonenum);
		
		smsVerify.verify({
			phone:phone,
			code:code,
		},function(ret, err){
			if(ret.status){
				
				api.hideProgress();
//				api.alert({msg: '验证成功'});
				//验证成功进行登陆
				ensure();
				 
			}else{
				
				api.hideProgress();
				api.alert({msg: err.code+' 验证失败'});
			}
		});
	}






function delWord(el) {
    var input = $api.prev(el, '.txt');
    input.value = '';
}

function login() {
    api.openWin({
        name: 'userRegister',
        url: 'userRegister.html',
        opaque: true,
        vScrollBarEnabled: false
    });
}

function ensure() {
    api.showProgress({
        title: '正在登录...',
        modal: false
    });
    var name = $api.byId('phone').value;
    var pwd = "";

    var loginUlr = '/user/login';
    var bodyParam = {
        username: name,
        password: pwd
    }
    /*ajaxRequest(loginUlr, 'post', JSON.stringify(bodyParam), function (ret, err) {*/
    iotServerRequest(loginUlr, 'post', JSON.stringify(bodyParam), function (ret, err) {
        if (ret) {
        	if(ret.ret==0) {
        		$api.setStorage('uid', ret.userId);
//      		alert(JSON.stringify(ret));
        		islogin();
            	//$api.setStorage('token', ret.id);
            	setTimeout(function () {
//              	api.closeWin();
            	}, 100);
            	
            	
            } else {
            	api.alert({
            		msg: ret.errStr
            	});
            }
        } else {
            api.alert({
                msg: err.msg
            });
        }
        api.hideProgress();
    })
}

//是否登陆
function islogin(){
	var i = $api.getStorage('uid');
	if(i){
		$("#main").hide();
		$(".haslogin").show();
		$("#mylogin").hide();
	}else{
		$("#main").show();
		$(".haslogin").hide();
		$("#mylogin").show();
	}
	
}

function logout(){
	  $api.setStorage('uid',null);
	  islogin();
}

function checkphonenum(phonenum){
	var regular = /^1\d{10}$/;
	if(regular.test(phonenum)){
		return 1;
	}else{
		return 0;
	}
}

function setbtn(){
	
	$("#codebtn").on("click",function(){

	if($(this).text() != "发送验证码"){
		return;
	}
	  sms();//发送验证码； 
	    
    		$(this).text(60);
    		var athis = $(this);
    		var i = 60;
    		var athime = setInterval(function(){
    			if(i != 0){
    				i--;
    				athis.text(i);
    			}else{
    				athis.text("发送验证码");
    				clearInterval(athime);
    			}
    			
    		},1000);
    });
    
    
$("#loginBtn").on("click",function(){
		var phone = document.getElementById("phone").value;
		var code = document.getElementById("code").value;
		 
		 if(!checkphonenum(phone)){
	
		 	api.alert({msg: '请输入正确的手机号。'});
		 	return;
		 }
		 if(code.length < 4){
		
		 	api.alert({msg: '请输入完整的验证码。'});
		 	return;
		 }
		var phone = document.getElementById("phone").value;
	    $api.setStorage("phone",phone);
		var phonenum = $api.getStorage("phone",phone);
		$(".headername").text(phonenum);
		 verify();

//		ensure();
});
    
    
    //隐藏的验证
    var loginI = 0;
    $("#mylogin").on("touchstart",function(){
    		var mytime = setInterval(function(){
    			loginI++;
    			if(loginI > 3){
    				
    		var phone = document.getElementById("phone").value;
		var code = document.getElementById("code").value;
		 
		 if(!checkphonenum(phone)){
	
		 	api.alert({msg: '请输入正确的手机号。'});
//		 	alert(loginI);
		 	loginI = 0;
		 	clearInterval(mytime);
		 	return;
		 }
		 if(code.length < 4){
		    
		 	api.alert({msg: '请输入完整的验证码。'});
//		 	alert(loginI)
		 	loginI = 0;
		 	clearInterval(mytime);
		 	return;
		 }	
    				
    				
    				ensure();
    				clearInterval(mytime);
    			}
    		},1000);
    		
    });
        //隐藏的验证
    $("#mylogin").on("touchend",function(){
    		loginI = 0;
    });
    
}//setbtn




apiready = function () {
	
    var header = $api.byId('header');
    $api.fixIos7Bar(header);
    islogin();
    setbtn();
	smsVerify = api.require('smsVerify');
    register();
    	
    	
		  //pull to refresh
		  api.setRefreshHeaderInfo({
		      visible: true,
		      // loadingImgae: 'wgt://image/refresh-white.png',
		      bgColor: '#f2f2f2',
		      textColor: '#4d4d4d',
		      textDown: '下拉刷新...',
		      textUp: '松开刷新...',
		      showTime: true
		  }, function (ret, err) {
			  islogin()
		      api.refreshHeaderLoadDone();
		  });




};