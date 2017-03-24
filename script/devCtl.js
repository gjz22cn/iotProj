var g_devId;

function devCtlChangeSwitch(obj) {
	var uid = $api.getStorage('uid');
	var urlParam = {
		msgType: "dev_ctl",
    	userId: uid,
        devId: g_devId,
        controls: {
        },
    }
    
    if(obj.checked) {
    	urlParam.controls[obj.id] = "1";
    } else {
    	urlParam.controls[obj.id] = "0";
    }
    
    iotServerRequest("/app", 'POST', JSON.stringify(urlParam), function (ret, err) {
        if (ret) {
        	if(ret.ret == 0) {
				if (typeof(ret.commandId) != "undefined") {
				    api.showProgress({
        				title: '正在下发配置给设备...',
        				modal: false
    				});
        			setTimeout("iotGetCmdRet("+ret.commandId.toString()+","+g_devId.toString()+")", 1000);
        		} else {
        			api.alert({msg: "操作失败!\nRet:  90010\n原因:cmdId缺失！"});
        		}
        	} else {
        		api.alert({msg: "操作失败!\nRet:  "+ret.ret+"\n原因:"+ret.errStr});
        	}
        } else {
            api.alert({msg: err.msg});
        }
    });
}

function ensure() {
    var uid = $api.getStorage('uid');
    var nickname = $api.byId('nickname').value;

    var updateNickNameUrl = '/user/' + uid;
    var bodyParam = {
    	
        nickname: nickname
    }
    ajaxRequest(updateNickNameUrl, 'put', JSON.stringify(bodyParam), function (ret, err) {
        if (ret) {
            //update personal center
            api.execScript({
                name: 'setting',
                frameName: 'setting-con',
                script: 'init();'
            });

            api.execScript({
                name: 'root',
                frameName: 'user',
                script: 'updateInfo();'
            });

            setTimeout(function () {
                api.alert({
                    msg: '修改成功'
                }, function (ret, err) {
                    api.closeWin();
                });
            }, 200);

        } else {
            api.toast({msg: err.msg})
        }
    })
}

function showCtls (devData) {
	var arrayObj = new Array();
	var content = $api.byId('ctl-content');
	var tpl = $api.byId('ctl-template').text;
	var tempFn = doT.template(tpl);
	
	arrayObj.push(devData.dataModel.controls, devData.devData);
	
	$api.byId('devctl-header').innerHTML = devData.devData.name;
    var header = $api.byId('header');
    $api.fixIos7Bar(header);
	content.innerHTML = tempFn(arrayObj);
}

function getDeviceData(devId) {
	iotGetDeviceData(devId, showCtls);
}
apiready = function () {
	g_devId = api.pageParam.devId;
	 
	/*$api.byId('devctl-header').innerHTML = g_devData.devData.name;
    var header = $api.byId('header');
    $api.fixIos7Bar(header);*/
	
	getDeviceData(g_devId);

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
    	getDeviceData(g_devId);
        api.refreshHeaderLoadDone();
    });


    api.addEventListener({
        name: 'scrolltobottom'
    }, function (ret, err) {
        getDeviceData(g_devId);
    });
};