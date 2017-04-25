function sendMessage(callback){
	
	callback();
}

function getMessage(callback){
	callback();
}

function addMessage(){
	
}
function scrollToBottom(ele){
		var containerHeight = $(ele).get(0).scrollHeight;
		var windowHeight = $(ele).height();
		scrollTop = containerHeight - windowHeight;
		$(ele).scrollTop(scrollTop);
}
function toast(message){
	var progress = '<div style="position: fixed;font-size:12px; background: rgba(0,0,0,0.2); top: 40%; padding: 10px 20px; border-radius: 5px; color: white; left: 35%; width: 30%;text-align: center;">asdfa</div>';
	var pro = $(progress);
	pro.text(message);
	$("body").append(pro);
	setTimeout(function(){
		//$("body").remove(pro);
		pro.remove();
	},500);
}

function getChatdata(){
	
	if(typeof localStorage.chatdata == "undefined"){
	localStorage.chatdata = '{"data":[]}';
}
	try{
		var chatdata = JSON.parse(localStorage.chatdata);
	}catch(e){
		
	}
	return chatdata;
}

function storageChatdata(dic){
	var chatdata = getChatdata();
	chatdata.data.push(dic);
	
	localStorage.chatdata = JSON.stringify(chatdata);
	
}

function emptyMessage(){
	localStorage.removeItem("chatdata");
	window.location.reload();
}



//var chatdata = [{"type":"1","message":"这是聊天记录","time":"今天 10:50"},{"type":"1","message":"这是聊天记录","time":"今天 10:50"},{"type":"2","message":"这是聊天记录","time":"今天 10:50"}];

var chatDom1 = '<li><div class="time"></div><div class="headerImgContainer"><img class="headerImg" src="../image/羽扇纶巾.png" /></div><div class="message"></div></li>';

var chatDom2 = '<li><div class="time"></div><div class="rigth-Margin"></div><div class="messageContainer"><div class="message">了了弗撒了水电费水电费了了弗xvfasfdsaf撒了水电费水电费了了弗撒了水电费水电费了了弗撒了水电费水电费了了弗撒了水电费水电费。</div></div><div class="headerImgContainer"><img class="headerImg" src="../image/羽扇纶巾.png" /></div></li>';

var chatdata = getChatdata();

	for(var i = 0; i < chatdata.data.length; i++){
	
	if(chatdata.data[i].type == "1"){
		var dom = $(chatDom1);
		dom.find(".message").text(chatdata.data[i].message);
		$("#chatContainer").append(dom);
	}
	if(chatdata.data[i].type == "2"){
		var dom = $(chatDom2);
		dom.find(".message").text(chatdata.data[i].message);
		$("#chatContainer").append(dom);
	}
}
	


$(".sendBtn").on("click",function(){
	var message = $(".messageInput").val();
	if(message.length == 0){
		toast("不能发送空消息!");
	}else{
		
		sendMessage(function(){
			
				
		var dic = {};
		dic.type = "2";
		dic.message = message;
	    storageChatdata(dic);
		var dom = $(chatDom2);
		dom.find(".message").text(message);
		$("#chatContainer").append(dom);
		$(".messageInput").val("");
		scrollToBottom("#chatContainer");
		});
		

	
	}
	
});

$(".emptyBtn").on("click",function(){
	emptyMessage();
});


