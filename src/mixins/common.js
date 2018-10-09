export default {
  	methods: {
  		//埋点请求
  		buryAjax(evtId,option){
  			let vm = this;
  			let postDate = {
  				"event": evtId,
  				"appid":vm.appId,
  				"device": window.navigator.userAgent,
  				"extra":vm.getExtraInfo(),
  				"option": 1,
				"platform": 1,
				"type": 1,
				"ua": window.navigator.userAgent,
				"url": window.location.href,
				"userid": 0,
				"version": vm.sdkVersion
  			}
  			this.$ajax.post(vm.Domain+'/api/userlogs/actionDataService/reportData?appid='+vm.appId,postDate)
  			.then((response)=>{})
  			.catch((error)=>{})
  		},
  		//中token，执行回调
  		setToken(data,backurl,type){
	        let vm = this
	        let extraInfo = vm.getExtraInfo()
	        let sdkCallBack = vm.Domain+'/api/passport/tokenService/singleSignOn?appid='+vm.appId+'&returnUrl='+encodeURIComponent(backurl)
	        this.$ajax.post(vm.Domain+'/api/passport/tokenService/cookie?appid='+this.appId,{"deviceId": "","source": vm.loginSource,"tokenId": data.data.token})
	      	.then((response)=>{
              	let data = response.data;
              	if(vm.afterLoginOrReg){
                	let loginOrRegNext = vm.afterLoginOrReg(data,backurl,type)
	                if(loginOrRegNext){
	                  	window.location.href = sdkCallBack
	                }
	                return
              	}
              	if(vm.afterRegSucess&&type=='reg'){
	                let regNext = vm.afterRegSucess(data,backurl,type)
	                if(regNext){
	                  	window.location.href = sdkCallBack
	                }
	                return
              	}
              	if(vm.afterLoginSucess&&type=='login'){
                	let LoginNext = vm.afterLoginSucess(data,backurl,type)
                	if(LoginNext){
                  		window.location.href = sdkCallBack
                	}
                	return
              	}
              	if(this.clearHistory){
                  	window.location.replace(sdkCallBack)
              	}else{
                  	window.location.href = sdkCallBack
              	}
          	})
          	.catch(error=>{console.log(error)})
      	},
	    //获取登录接口需要的额外信息
	    getExtraInfo(){
	        let extraInfo = {
	          	CookieValue:this.getCookie('CookieValue'),
	          	FlashValue:this.getCookie('FlashValue'),
	          	FpCode:this.getCookie('FpCode'),
	          	_ppdaiWaterMark:this.getCookie('_ppdaiWaterMark'),
          		FromUrl:this.getCookie('fromUrl'),
	          	UniqueId:this.getCookie('uniqueid'),
	          	UserAgent:navigator.userAgent,
	          	sourceId:this.sourceId,
	        }
	        let extraParam = this.extraParam;
	        if(extraParam){
	          Object.keys(extraParam).forEach(function(key){
	            extraInfo[key] = extraParam[key];
	          })
	        }
	        return extraInfo
	    },
	    //获取cookie值
	    getCookie(cookie){
	        let cookies = document.cookie;
	        let value = cookies.split(cookie+'=').pop().split(';').shift();
	        if(value.indexOf('=')>0){
	          value = ''
	        }
	        return value
	    },
  	}
}
