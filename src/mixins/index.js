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
  			this.$ajax.post(vm.Domain+'/api/passport/tokenService/cookie?appid='+this.appId,{"deviceId": "","source": vm.loginSource,"tokenId": data.data.token})
	        .then((response)=>{
	          	let data = response.data;
	          	vm.showLoading = false;
	          	console.log(response)
	          	if(vm.afterLoginOrReg){
	          		vm.afterLoginOrReg(data,backurl,type)
	          		return
	          	}
	          	if(vm.afterRegSucess&&type=='reg'){
	          		vm.afterRegSucess(data,backurl,type)
	          		return
	          	}
	          	if(vm.afterLoginSucess&&type=='login'){
	          		vm.afterLoginSucess(data,backurl,type)
	          		return
	          	}
	            if(this.clearHistory){
	              	window.location.replace(backurl)
	            }else{
	              	window.location.href = backurl
	            }
	        })
	        .catch(error=>{console.log(error);this.tipText='网络波动，请稍后再试';vm.showLoading = false;})
  		},
  		//手机号分割
  		splitMoble(mobile){
  			let firstPart = mobile.substring(0,3)+' ';
  			let secondPart = mobile.substring(3,7)+' ';
  			let thirdPart = mobile.substring(7,11);
  			return firstPart+secondPart+thirdPart
  		},
	  	//清除错误提示
	    clearError(arr) {
	    	if(arr.length==1){
	    		this.$data.showlabel[arr[0]] = true;
	    	}
	      	for(let i of arr){
	      		this.$data.v_error[i] = ''
	      	}
	    },
	    //校验错误提示
	  	errorTip(data,reg,regErrMsg){
	  		let val = this.$data[data]
	  		if(val.replace(/\s/g,"")==''){
	  			this.showlabel[data] = false
	  		}
	  		if(reg){
	  			if(val.replace(/\s/g,"")!=''){
		  			if(!reg.test(val)){
		  				this.$set(this.v_error,data,regErrMsg)
		  				// this.v_error[data] = regErrMsg
		  			}
	  			}
	  		}else{
		  		if(val.replace(/\s/g,"")==''){
		  			this.v_error[data] = '请输入'
		  			return
		  		}
	  		}
		},
		//整个表单验证
		async ValidateForm(dom){
			let v_input = await this.validateInput(dom)
			if(!v_input)return false
			let errDom = document.querySelectorAll('.loginsdk_h5 .error-msg')
			if(errDom.length==0){
				return true
			}else{
				return false
			}
		},
		//逐个验证
		validateInput(dom){
			let allEmpty = true
			return new Promise((resolve,reject )=>{
				let inputList = document.querySelectorAll('.loginsdk_h5 '+dom+' input')
				if(inputList.length==0){
					this.tipText = '未检测到表单节点'
					resolve(false)
					return
				}
				for(let dom of inputList){
					let mod = dom.getAttribute('name')
					if(dom.value.replace(/\s/g,"")!=''){
						allEmpty = false
					}
				}
				if(allEmpty){
					this.tipText = '请输入'
					resolve(false)
					return
				}
				for(let dom of inputList){
					let mod = dom.getAttribute('name')
					this.errorTip(mod)
				}
				setTimeout(()=>{resolve(true)},0)
			})
		},
		//获取图片验证码
	     getImgCode(loginType,level){
	        let vm = this;
	        let _dom = loginType=='pwd'?document.querySelector('.loginsdk_h5 #login_pwdimgstr'):loginType=='sms'?document.querySelector('.loginsdk_h5 #login_smsimgstr'):loginType=='email'?document.querySelector('.loginsdk_h5 #email_imgstr'):loginType=='entry'?document.querySelector('.loginsdk_h5 #main_imgstr'):document.querySelector('.loginsdk_h5 #reg_smsimgstr')
	        let tmp = Math.random();
	        let extraInfo = vm.getExtraInfo();
	        let postDate = {
	          extraInfo:extraInfo,
	          level:level||vm.imgcodeLevel
	        }
	        if(_dom){
	          this.$ajax.post(vm.Domain+'/api/passport/codeService/img?appid='+this.appId,postDate)
	          // this.$ajax.post('//passport.ppdapi.com/v2/openCodeService/img?appid=appuser',{"extraInfo":{},"level":10005})
	          .then((response)=>{
	            let data = response.data;
	            vm.ImgValidateToken = data.data.token;
	            _dom.setAttribute('src',data.data.url)
	          })
	          .catch(response=>console.log(response))
	        }

	        console.log('埋点：100016展示图形验证码')
          	// this.buryAjax(100016)
	    },
	    //获取登录接口需要的额外信息
	    getExtraInfo(){
	        let extraInfo = {
	          CookieValue:this.getCookie('CookieValue'),
	          FlashValue:this.getCookie('FlashValue'),
	          FpCode:this.getCookie('FpCode'),
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
	    //获取手机验证码
	    getMobileCode(dom,type,postdata,viewdata,actiontip){
	        let vm = this;
	        if(vm.getSmsCodeNum>=6){
	        	vm.tipText = '今日验证码发送已达上限'
	        	return
	        }
	        let getCodeDom = document.querySelector('.loginsdk_h5 '+dom);
	        let voiceDom = document.querySelector('.loginsdk_h5 '+dom+'voice');
	        if(getCodeDom.getAttribute('disabled')){
	          return
	        }
	        if(type==1){
	          getCodeDom.setAttribute('disabled',true);
	        }else if(type==2){
	          voiceDom.setAttribute('disabled',true);
	        }
	        vm.getSmsCodeNum++;
	        //发送手机验证码
	        vm.$ajax.post(vm.Domain+'/api/passport/codeService/webSms?appid='+vm.appId,postdata)
	        .then((response)=>{
	          let data = response.data;
	          if(data.ret!=0){
	            if(data.ret==10005||data.ret==10006||data.ret==10007){
	            	vm.isShowImgCode = true
	            	vm.$nextTick(function () {
		            	if(dom.indexOf('login')>=0){
		              		vm.getImgCode('sms',data.ret)
		            	}else{
		            		vm.getImgCode('reg',data.ret)
		            	}
	            	})
	            }
	            vm.tipText = data.msg
	            getCodeDom.removeAttribute('disabled');
	            return
	          }
	          if(actiontip){
	          	vm.$data[actiontip] = '验证码已发送至手机'
	          }
	          vm.sendMsg(dom,type,viewdata);
	        })
	    },
      	//获取手机验证码60秒倒计时
	    sendMsg(dom,type,viewdata){
	        var vm = this;
	        let getCodeDom = document.querySelector('.loginsdk_h5 '+dom);
	        let voiceDom = document.querySelector('.loginsdk_h5 '+dom+'voice');
	        let countNum = 60;
	        if(type==1){
	          vm.$data[viewdata] = '重发'+countNum+' 秒';
	        }
	        vm.$parent.countSec = setInterval(()=>{
	          	countNum--;
	          	if(type==1){
	            	vm.$data[viewdata] = '重发'+countNum+' 秒';
		            if(countNum==0){
		            	vm.showVoiceCode = true;
		            	clearInterval(vm.$parent.countSec);
		              	vm.$data[viewdata] = '重发验证码';
		              	getCodeDom.removeAttribute('disabled');
		            }
	          	}
	        },1000)
	    }
  	}
}
