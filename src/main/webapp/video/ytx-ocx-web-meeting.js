/**
 * Created by zhangjl 2017/07/24
 *zhangjl@yuntongxun.com
 */
 //回调
function onRequestConferenceMemberVideo_ytx(reason,conferenceId,member,type)
{
	/* 
	reason	int	错误码。
	conferenceId	string	会议ID。
	member	string	会议成员
	type	int	1：摄像头源 */

	if( typeof RL_YTX_MT._onRequestConferenceMemberVideo == "function" ) {
		RL_YTX_MT._onRequestConferenceMemberVideo(reason,conferenceId,member,type);
	}
}
function onCancelConferenceMemberVideo_ytx(reason,conferenceId,member,type)
{
	/*
	reason	int	错误码。
	conferenceId	string	会议ID。
	member	string	会议成员
	type	int	1：摄像头源
	*/
	if( typeof RL_YTX_MT._onCancelConferenceMemberVideo == "function" ) {
		RL_YTX_MT._onCancelConferenceMemberVideo(reason,conferenceId,member,type);
	}
}

function onMeetingIncoming_ytx(msg)
{
	/*
	msg	Object	会议信息
	msg.meetingType	int	会议类型。-1未知，1音频会议，2视频会议，3实时对讲，
	msg.Id	string	会议ID。
	msg.callid	string	呼叫ID。
	msg.caller	string	主叫。
	msg.nickname	string	昵称
	msg.display	string	显示号码
	*/
	if( typeof RL_YTX_MT._onMeetingIncoming == "function" ) {
		RL_YTX_MT._onMeetingIncoming(msg);
	}
}
function onReceiveInterphoneMeetingMessage_ytx(msg)
{
	/*
	msg	Object	会议信息
	msg.var	long	消息类型消息类型。
					201邀请加入实时对讲，
					202加入实时对讲，
					203退出实时对讲，
					204结束实时对讲，
					205控麦，
					206放麦，
	msg.type	long	权限1：无权限，2：有权限
	msg.receiver	string	接收者。
	msg.interphoneid	string	实时对讲接入Id
	msg.from	string	实时对讲发送端voip号码
	msg.datecreated	string	实时对讲的创建时间
	msg.state	string	状态
	msg.userdata	string	扩展字符
	msg.member	string	成员变量
	*/
	if( typeof RL_YTX_MT._onReceiveInterphoneMeetingMessage == "function" ) {
		RL_YTX_MT._onReceiveInterphoneMeetingMessage(msg);
	}
}
function onReceiveVoiceMeetingMessage_ytx(msg)
{
	/*
	msg	Object	会议消息
	msg.var	int	消息类型。，
				301加入聊天室，
				302退出聊天室，
				303删除聊天室，
				304删除聊天室成员，
				305 设置聊天室成员可听可讲
				306拒绝，
	msg.type	long	权限1：无权限，2：有权限
	msg.sender	string	发送者
	msg.receiver	string	接收者
	msg.chatroomid	string	语音群聊房间ID。
	msg.forbid	string	群聊forbid禁言禁听状态，11：可听可讲 10：可听禁言 01：禁听可讲 00：禁听禁言
	msg.state	string	状态
	msg.userdata	string	扩展字符串
	msg.member	string	成员变量
	msg.isVoIP	int	是否VoIP账号。0否，1是	
	*/
	if( typeof RL_YTX_MT._onReceiveVoiceMeetingMessage == "function" ) {
		RL_YTX_MT._onReceiveVoiceMeetingMessage(msg);
	}
}
function onReceiveVideoMeetingMessage_ytx(msg)
{
	/*
	msg	Object	会议消息
	msg.var	int	消息类型。
				601加入聊天室，
				602退出聊天室，
				603删除聊天室，
				604踢出聊天室成员，
				606 设置聊天室成员可听可讲
				607发布视频，
				608取消发布视频，
				609拒绝
	msg.type	int	权限1：无权限，2：有权限
	msg.dataState	int	1、已发布 2、未发布。
	msg.videoState	int	1、已发布 2、未发布。
	msg.sender	string	发送者
	msg.receiver	string	接收者
	msg.roomid	string	视频会议接入ID。
	msg.forbid	string	群聊forbid禁言禁听状态，11：可听可讲 10：可听禁言 01：禁听可讲 00：禁听禁言
	msg.state	string	状态
	msg.userdata	string	扩展字符串
	msg.member	string	成员变量
	msg.isVoIP	int	是否VoIP账号。0否，1是	
	*/
	if( typeof RL_YTX_MT._onReceiveVideoMeetingMessage == "function" ) {
		RL_YTX_MT._onReceiveVideoMeetingMessage(msg);
	}	
}

function onCreateMultimediaMeeting_ytx(matchKey,reason,info)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	info	Object	会议消息
	info.meetingType	long	会议类型。-1未知，1音频会议，2视频会议，3实时对讲，
	info.confirm	long	加入房间是否需要验证 1、不需要 2、需要。
	info.square	long	最大可参会人数
	info.joinedCount	long	参与人数。
	info.Id	string	会议ID
	info.name	string	房间名称
	info.creator	string	创建者
	info.keywords	string	业务属性，可选字段。	
	*/
	if( typeof RL_YTX_MT._onCreateMultimediaMeeting == "function" ) {
		RL_YTX_MT._onCreateMultimediaMeeting(matchKey,reason,info);
	}
}
function onJoinMeeting_ytx(reason,conferenceId)
{
	/*
	reason	long	200成功，其他报错
	conferenceId	string	会议ID。	
	*/
	if( typeof RL_YTX_MT._onJoinMeeting == "function" ) {
		RL_YTX_MT._onJoinMeeting(reason,conferenceId);
	}
}
function onExitMeeting_ytx(conferenceId)
{
	/*
	conferenceId	string	会议ID
	*/
	if( typeof RL_YTX_MT._onExitMeeting == "function" ) {
		RL_YTX_MT._onExitMeeting(conferenceId);
	}
}
function onDismissMultiMediaMeeting_ytx(matchKey,reason,conferenceId)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	conferenceId	string	会议ID	
	*/
	if( typeof RL_YTX_MT._onDismissMultiMediaMeeting == "function" ) {
		RL_YTX_MT._onDismissMultiMediaMeeting(matchKey,reason,conferenceId);
	}	
}
function onQueryMultiMediaMeetings_ytx(matchKey,reason,info)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	info	Object	会议消息
	info.meetingType	long	会议类型。1音频会议，2视频会议，3实时对讲，
	info.confirm	long	加入房间是否需要验证 1、不需要 2、需要。
	info.square	long	最大可参会人数
	info.joinedCount	long	参与人数。
	info.Id	string	会议ID
	info.name	string	房间名称
	info.creator	string	创建者
	info.keywords	string	业务属性，可选字段。	
	*/
	if( typeof RL_YTX_MT._onQueryMultiMediaMeetings == "function" ) {
		RL_YTX_MT._onQueryMultiMediaMeetings(matchKey,reason,info);
	}	
}
function onQueryMeetingMembers_ytx(matchKey,reason,conferenceId,members)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	conferenceId	string	会议ID
	members	Array	成员对象数组
	members[0].meetingType	long	会议类型。1音频会议，2视频会议，3实时对讲，
	members[0].type	long	1、参与者  2、创建者
	members[0].videoState	long	1、已发布 2、未发布视频会议有效
	members[0].dataState	long	1、已发布 2、未发布
	members[0].forbid	string	11,10,01,00分别对应可听可讲
	members[0].member	string	成员ID
	members[0].state	string	状态
	members[0].userdata	string	自定义数据
	members[0].isVoIP	long	是否VoIP账号。0否，1是。
	members[0].isOnline	long	实时对讲中有效 1未加入实时对讲中 2已加入实时对讲中
	members[0].isMic	long	实时对讲中有效 1未控麦 2已控麦
	*/
	if( typeof RL_YTX_MT._onQueryMeetingMembers == "function" ) {
		RL_YTX_MT._onQueryMeetingMembers(matchKey,reason,conferenceId,members);
	}	
}
function onDeleteMemberMultiMediaMeeting_ytx(matchKey,reason,info)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	info	Object	会议消息
	info.meetingType	long	会议类型。1音频会议，2视频会议，3实时对讲，
	info.Id	string	会议ID
	info.member	string	成员
	info.isVoIP	long	是否VoIP账号。0否，1是。
	*/
	if( typeof RL_YTX_MT._onDeleteMemberMultiMediaMeeting == "function" ) {
		RL_YTX_MT._onDeleteMemberMultiMediaMeeting(matchKey,reason,info);
	}		
}
function onInviteJoinMultiMediaMeeting_ytx(matchKey,reason,info)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	info	Object	会议消息
	info.Id	string	会议ID
	info.members	Array	成员数组
	info.members[0]	string	成员
	info.userdata	string	自定义数据。
	info.isSpeak	long	0不可讲 1可讲
	info.isListen	long	0不可听 1可听
	*/
	if( typeof RL_YTX_MT._onInviteJoinMultiMediaMeeting == "function" ) {
		RL_YTX_MT._onInviteJoinMultiMediaMeeting(matchKey,reason,info);
	}	
}
function onSetMeetingMemberState_ytx(matchKey,reason,info)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	info	Object	设置会议成员权限状态
	info.meetingType	int	会议类型。1音频会议，2视频会议，3实时对讲 
	info.Id	string	会议ID。
	info. member	string	成员。
	info. authority	int	主叫。
	info. isVoIP	bool	是否voip
	info. state	string	自定义数据
	*/
	if( typeof RL_YTX_MT._onSetMeetingMemberState == "function" ) {
		RL_YTX_MT._onSetMeetingMemberState(matchKey,reason,info);
	}	
}
function onSetMeetingSpeakListen_ytx(matchKey,reason,info)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	info	Object	设置会议成员听讲状态
	info.meetingType	int	会议类型。1音频会议，2视频会议，3实时对讲 
	info.Id	string	会议ID。
	info. member	string	成员。
	info. speaklisen	int	1、禁言 2、可讲 3、禁听 4、可听。
	info. isVoIP	bool	是否voip
	*/
	if( typeof RL_YTX_MT._onSetMeetingSpeakListen == "function" ) {
		RL_YTX_MT._onSetMeetingSpeakListen(matchKey,reason,info);
	}	
}
function onPublishVideo_ytx(matchKey,reason,conferenceId)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	conferenceId	string	会议ID
	*/
	if( typeof RL_YTX_MT._onPublishVideo == "function" ) {
		RL_YTX_MT._onPublishVideo(matchKey,reason,conferenceId);
	}		
}
function onUnpublishVideo_ytx(matchKey,reason,conferenceId)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	conferenceId	string	会议ID
	*/	
	if( typeof RL_YTX_MT._onUnpublishVideo == "function" ) {
		RL_YTX_MT._onUnpublishVideo(matchKey,reason,conferenceId);
	}	
}

function onCreateInterphoneMeeting_ytx(matchKey,reason,interphoneId)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	interphoneId	string	实时对讲ID
	*/
	if( typeof RL_YTX_MT._onCreateInterphoneMeeting == "function" ) {
		RL_YTX_MT._onCreateInterphoneMeeting(matchKey,reason,interphoneId);
	}	
}
function onControlInterphoneMic_ytx(matchKey,reason,controller,interphoneId,requestIsControl)
{
	/*
	matchKey	long	匹配主调Key值
	reason	long	200成功，其他报错
	controller	string	当前控麦成员
	interphoneId	string	实时对讲ID
	requestIsControl	bool	缓存用户主调发起的操作，是抢麦还是放麦
	*/
	if( typeof RL_YTX_MT._onControlInterphoneMic == "function" ) {
		RL_YTX_MT._onControlInterphoneMic(matchKey,reason,controller,interphoneId,requestIsControl);
	}	
}


(function() {
    window.RL_YTX_MT = window.RL_YTX_MT || {
        _onRequestConferenceMemberVideo : null,//请求会议成员视频数据事件
        _onCancelConferenceMemberVideo : null,//取消会议成员视频数据响应事件
        _onMeetingIncoming : null,//收到会议邀请事件
        _onReceiveInterphoneMeetingMessage : null,//收到实时对讲通知事件
        _onReceiveVoiceMeetingMessage : null,//收到视频会议的通知事件
        _onReceiveVideoMeetingMessage : null,//收到视频会议的通知事件
        _onCreateMultimediaMeeting :null,//创建会议事件
        _onJoinMeeting : null,//加入会议事件
        _onExitMeeting : null,//退出会议事件
		_onDismissMultiMediaMeeting : null,//解散会议事件
		_onQueryMultiMediaMeetings :null,//查询会议事件
        _onQueryMeetingMembers : null,//查询会议成员事件     
        _onDeleteMemberMultiMediaMeeting : null,//踢出成员事件
        _onInviteJoinMultiMediaMeeting : null,//邀请加入会议事件
		_onSetMeetingMemberState : null,//设置会议成员权限状态事件
		_onSetMeetingSpeakListen : null,//设置会议成员听讲状态事件
		_onPublishVideo : null,//发布视频事件
		_onUnpublishVideo : null,//取消视频事件
		_onCreateInterphoneMeeting: null,//创建实时对讲事件
		_onControlInterphoneMic: null,//实时对讲控麦事件
		
		//通知：
        onMeetingIncomingListener: function(callback) {
            this._onMeetingIncoming = callback
        },
        onReceiveInterphoneMeetingMessageListener: function(callback) {
            this._onReceiveInterphoneMeetingMessage = callback;
        },
        onReceiveVoiceMeetingMessageListener : function(callback){
            this._onReceiveVoiceMeetingMessage = callback;
        },
        onReceiveVideoMeetingMessageListener : function(callback){
            this._onReceiveVideoMeetingMessage = callback;
        },
		
		//主调：
		RegisterMeetingCallBack: function() {
		 //注册OCX事件
			this.RegisterCallBack(ECSDK, "onRequestConferenceMemberVideo", onRequestConferenceMemberVideo_ytx);
			this.RegisterCallBack(ECSDK, "onCancelConferenceMemberVideo", onCancelConferenceMemberVideo_ytx);
			this.RegisterCallBack(ECSDK, "onMeetingIncoming", onMeetingIncoming_ytx);
			this.RegisterCallBack(ECSDK, "onReceiveInterphoneMeetingMessage", onReceiveInterphoneMeetingMessage_ytx);
			this.RegisterCallBack(ECSDK, "onReceiveVoiceMeetingMessage", onReceiveVoiceMeetingMessage_ytx);
			this.RegisterCallBack(ECSDK, "onReceiveVideoMeetingMessage", onReceiveVideoMeetingMessage_ytx);
			this.RegisterCallBack(ECSDK, "onCreateMultimediaMeeting", onCreateMultimediaMeeting_ytx);
			this.RegisterCallBack(ECSDK, "onJoinMeeting", onJoinMeeting_ytx);
			this.RegisterCallBack(ECSDK, "onExitMeeting", onExitMeeting_ytx);
			this.RegisterCallBack(ECSDK, "onDismissMultiMediaMeeting", onDismissMultiMediaMeeting_ytx);
			this.RegisterCallBack(ECSDK, "onQueryMultiMediaMeetings", onQueryMultiMediaMeetings_ytx);
			this.RegisterCallBack(ECSDK, "onQueryMeetingMembers", onQueryMeetingMembers_ytx);
			this.RegisterCallBack(ECSDK, "onDeleteMemberMultiMediaMeeting", onDeleteMemberMultiMediaMeeting_ytx);
			this.RegisterCallBack(ECSDK, "onInviteJoinMultiMediaMeeting", onInviteJoinMultiMediaMeeting_ytx);
			this.RegisterCallBack(ECSDK, "onSetMeetingMemberState", onSetMeetingMemberState_ytx);
			this.RegisterCallBack(ECSDK, "onSetMeetingSpeakListen", onSetMeetingSpeakListen_ytx);
			this.RegisterCallBack(ECSDK, "onPublishVideo", onPublishVideo_ytx);
			this.RegisterCallBack(ECSDK, "onUnpublishVideo", onUnpublishVideo_ytx);
			this.RegisterCallBack(ECSDK, "onCreateInterphoneMeeting", onCreateInterphoneMeeting_ytx);
			this.RegisterCallBack(ECSDK, "onControlInterphoneMic", onControlInterphoneMic_ytx);			
			return ;   
		},  
        //多路视频		
        RequestConferenceMemberVideo: function(conferenceId, conferencePassword, member, videoWindow, type,callback) {
			/*
			功能：请求视频会议成员视频数据。
			参数：
			参数名 	类型 	描述 
			conferenceId	string	会议ID
			conferencePwd	string	会议密码
			member	string	请求远端用户的VoIP号
			videoWindow	int	视频窗口
			type	int	1：摄像头源
			返回值：成功 0 失败 -1(remoteSipNo为NULL) -2(videoWindow为NULL) -3(conferenceId为NULL) -4(confPasswd为NULL) -5(自己的sip号为NULL) -6(会议服务器的ip为NULL) -7(该账户的视频已经成功请求) -8(正在停止当前用户视频流，需要等待)
			触发事件：
			事件	说明
			onRequestConferenceMemberVideo(reason,conferenceId,member,type)	视频会议数据

			调用说明：异步
			*/
            this._onRequestConferenceMemberVideo = callback;
            var result = ECSDK.RequestConferenceMemberVideo(conferenceId, conferencePassword, member, videoWindow, type);
            return result;
        },
        CancelMemberVideo: function(conferenceId, conferencePassword,member, type,callback) {
			/*
			功能：视频会议中停止某一远端视频。
			参数：
			参数名 	类型 	描述 
			conferenceId	string	会议ID
			conferencePwd	string	会议密码，可选
			member	string	请求远端用户的VoIP号
			type	int	1：摄像头源
			返回值：成功 0 失败 -1(remoteSipNo为NULL) -3(conferenceId为NULL) -4(confPasswd为NULL) -5(自己的sip号为NULL) -6(会议服务器的ip为NULL) -7(该账户的视频没有成功请求)
			触发事件：
			事件	说明
			onCancelConferenceMemberVideo(reason,conferenceId,member,type)	取消会议成员视频

			调用说明：异步
			*/
            this._onCancelConferenceMemberVideo = callback;
            var result = ECSDK.CancelMemberVideo(conferenceId, conferencePassword, member, type);
            return result;
        },
        ResetVideoConfWindow: function(conferenceId, member, newWindow, type) {
			/*
			功能：视频会议中重置窗体
			参数：
			参数名 	类型 	描述 
			conferenceId	string	会议ID
			member	string	需要调整的成员
			newWindow	int	新窗口
			type	int	1：摄像头源
			返回值：成功 0 失败 -1(不支持视频) -2(sip号为NULL) -3(newWindow为NULL) -4(找不到该sip号相关的资料)
			触发事件：无
			调用说明：同步
			*/
            var result = ECSDK.ResetVideoConfWindow(conferenceId, member, newWindow, type);
            return result;
        },
		//会议管理
        CreateMultimediaMeeting: function(matchKey,CreateMeetingBuilder, callback) {
			/*
			功能：创建会议。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			meetingType	long	视频会议或音频会议：1：音频会议
			2：视频会议
			3：实时对讲
			meetingName	string	会议名称
			password	string	会议密码
			keywords	string	会议关键字
			voiceMode	long	会议背景音模式 1：无提示音有背景音；2：有提示音有背景音；3：无提示音无背景音
			square	long	会议方数
			bAutoJoin	bool	创建者创建会议成功后，是否自动加入
			autoClose	bool	创建者退出后，是否自动关闭
			autoDelete	bool	所有人退出后，是否自动解散
			callbackmode	long	回调通知类型 默认0
			serverUserData	string	服务端自定义数据
			reservation	string	预留字段
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onCreateMultimediaMeeting(matchKey,reason,info)	创建会议
			调用说明：异步
			*/
			if(typeof localView!="undefined"){
				ECSDK.SetVideoView(0, localView.HWND);//localView，这个object需要加到页面里
			}
            this._onCreateMultimediaMeeting = callback;
			var result = ECSDK.CreateMultimediaMeeting(matchKey,
									CreateMeetingBuilder.getMeetingType(),
									CreateMeetingBuilder.getMeetingName(),
									CreateMeetingBuilder.getPassword(),
									CreateMeetingBuilder.getKeywords(),
									CreateMeetingBuilder.getVoiceMode(),
									CreateMeetingBuilder.getSquare(),
									CreateMeetingBuilder.getAutoJoin(),
									CreateMeetingBuilder.getAutoClose(),
									CreateMeetingBuilder.getAutoDelete(),
									CreateMeetingBuilder.getCallbackmode(),
									CreateMeetingBuilder.getServerUserData(),
									CreateMeetingBuilder.getReservation());
            return result;
        },
		JoinMeeting: function(meetingType, conferenceId, password, callback) {
			/*
			功能：加入会议。
			参数：
			参数名 	类型 	描述 
			meetingType	long	 1：音频会议
			2：视频会议
			3：实时对讲
			conferenceId	string	会议ID
			password	string	会议密码
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onJoinMeeting(reason,conferenceId)	加入会议
			调用说明：异步
			*/
			if(typeof localView!="undefined"){
				ECSDK.SetVideoView(0, localView.HWND);//localView，这个object需要加到页面里
			}
			this._onJoinMeeting = callback;
            var result = ECSDK.JoinMeeting(meetingType, conferenceId, password);
            return result;
        },
		AcceptMeeting: function(msg, callback) {
			/*
			功能：会议来电后应答。
			参数：

			名称	类型	说明
			Info	Object	会议来电信息
			Info.meetingType	long	会议类型。1音频会议，2视频会议，3实时对讲 
			Info.Id	string	会议ID。
			Info.callid	string	呼叫ID。
			Info.caller	string	主叫。
			Info.nickname	string	昵称
			Info.display	string	显示号码
			Info.sdkUserData	string	扩展

			返回值：0成功，非0失败
			调用示例：

			触发事件：
			事件	说明
			onJoinMeeting	会议加入成功

			调用说明：异步
			*/
			if(typeof localView!="undefined"){
				ECSDK.SetVideoView(0, localView.HWND);//localView，这个object需要加到页面里
			}
			this._onJoinMeeting = callback;		
            var result = ECSDK.AcceptMeeting(msg);
            return result;
        },
		ExitMeeting: function(conferenceId, callback) {
			/*
			功能：退出会议。
			参数：
			参数名 	类型 	描述 
			conferenceId	string	会议ID
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onExitMeeting(conferenceId)	退出会议
			调用说明：异步
			*/
			this._onExitMeeting = callback;
            var result = ECSDK.ExitMeeting(conferenceId);
            return result;
        },
		DismissMultiMediaMeeting: function(matchKey,meetingType, conferenceId, callback) {
			/*
			功能：解散会议。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			meetingType	long	视频会议或音频会议：1音频会议，2视频会议，3实时对讲 
			conferenceId	string	会议ID
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onDismissMultiMediaMeeting(matchKey,reason,conferenceId)	解散会议
			调用说明：异步
			*/
			this._onDismissMultiMediaMeeting = callback;
            var result = ECSDK.DismissMultiMediaMeeting(matchKey,meetingType, conferenceId);
            return result;
        },	
		QueryMultiMediaMeetings: function(matchKey,meetingType, keywords, callback) {
			/*
			功能：获取会议列表。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			meetingType	long	视频会议或音频会议：1音频会议，2视频会议，3实时对讲 
			keywords	string	会议关键字，搜索与关键字相关的会议列表
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onQueryMultiMediaMeetings(matchKey,reason,info)	查询会议
			调用说明：异步
			*/
			this._onQueryMultiMediaMeetings = callback;
            var result = ECSDK.QueryMultiMediaMeetings(matchKey,meetingType, keywords);
            return result;
        },		
		QueryMeetingMembers: function(matchKey,meetingType, conferenceId, callback) {
			/*
			功能：查询会议成员。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			meetingType	long	视频会议或音频会议：1音频会议，2视频会议，3实时对讲 
			conferenceId	string	会议ID
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onQueryMeetingMembers(matchKey,reason,conferenceId,members)	查询会议成员
			调用说明：异步
			*/
			this._onQueryMeetingMembers = callback;
            var result = ECSDK.QueryMeetingMembers(matchKey,meetingType, conferenceId);
            return result;
        },		
		DeleteMemberMultiMediaMeeting: function(matchKey,meetingType, conferenceId, member, isVoIP,callback) {
			/*
			功能：踢出成员。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			meetingType	long	1音频会议，2视频会议，3实时对讲 
			conferenceId	string	会议ID
			member	string	成员
			isVoIP	bool	是否VoIP账号
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onDeleteMemberMultiMediaMeeting(matchKey,reason,info)	踢出成员
			调用说明：异步
			*/
			this._onDeleteMemberMultiMediaMeeting = callback;
            var result = ECSDK.DeleteMemberMultiMediaMeeting(matchKey,meetingType, conferenceId,member, isVoIP);
            return result;
        },		
        InviteJoinMultiMediaMeeting: function(matchKey,InviteJoinMeetingBuilder, callback) {
			/*
			功能：邀请加入会议。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			conferenceId	string	会议ID
			members	Array	成员数组
			members[0]	string	邀请成员
			blanding	bool	是否是落地邀请
			isSpeak	bool	是否可讲。false禁言，true可讲默认true
			isListen	bool	是否可听。false禁听，true可听默认true
			disNumber	string	显示号码
			userdata	string	自定义数据
			serverUserData	string	服务端自定义数据
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onInviteJoinMultiMediaMeeting(matchKey,reason,info)	邀请加入会议
			调用说明：异步
			*/
            this._onInviteJoinMultiMediaMeeting = callback;
			var result = ECSDK.InviteJoinMultiMediaMeeting(matchKey,
									InviteJoinMeetingBuilder.getMeetingId(),
									InviteJoinMeetingBuilder.getMemberArray(),
									InviteJoinMeetingBuilder.getLanding(),
									InviteJoinMeetingBuilder.getSpeak(),
									InviteJoinMeetingBuilder.getListen(),
									InviteJoinMeetingBuilder.getDisNumber(),
									InviteJoinMeetingBuilder.getUserData(),
									InviteJoinMeetingBuilder.getServerUserData());
            return result;
        },
        SetMeetingMemberState: function(matchKey,MeetingMemberStateBuilder, callback) {
			/*
			功能：设置会议成员权限状态。
			参数：

			名称	类型	说明
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			meetingType	long	会议类型。1音频会议，2视频会议，3实时对讲， 
			meetingId	string	会议ID。
			authority,	long	权限设置 1.无操作权限 2.有操作权限。
			member	string	设置的成员账号。
			isVoIP	bool	是否VoIP账号
			state	string	用户状态 （业务自行定义）
			userdata	string	扩展数据 暂时不用

			返回值：0成功，非0失败
			调用示例：

			触发事件：
			事件	说明
			onSetMeetingMemberState	设置成员权限状态成功

			调用说明：异步
			*/
            this._onSetMeetingMemberState = callback;
			var result = ECSDK.SetMeetingMemberState(matchKey,
									MeetingMemberStateBuilder.getMeetingType(),
									MeetingMemberStateBuilder.getMeetingId(),
									MeetingMemberStateBuilder.getAuthority(),
									MeetingMemberStateBuilder.getMember(),
									MeetingMemberStateBuilder.getIsVoIP(),
									MeetingMemberStateBuilder.getState(),
									MeetingMemberStateBuilder.getUserData());
            return result;
        },
        SetMeetingSpeakListen: function(matchKey,MeetingSpeakListenBuilder, callback) {
			/*
			功能：设置会议成员听讲状态。
			参数：

			名称	类型	说明
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			meetingType	long	会议类型。1音频会议，2视频会议，3实时对讲， 
			meetingId	string	会议ID。
			member	string	设置的成员账号。
			isVoIP	bool	是否VoIP账号
			option	long	1、禁言 2、可讲 3、禁听 4、可听

			返回值：0成功，非0失败
			调用示例：

			触发事件：
			事件	说明
			onSetMeetingSpeakListen	设置会议成员听讲状态成功

			调用说明：异步
			*/
            this._onSetMeetingSpeakListen = callback;
			var result = ECSDK.SetMeetingSpeakListen(matchKey,
									MeetingSpeakListenBuilder.getMeetingType(),
									MeetingSpeakListenBuilder.getMeetingId(),
									MeetingSpeakListenBuilder.getMember(),
									MeetingSpeakListenBuilder.getIsVoIP(),
									MeetingSpeakListenBuilder.getOption());
            return result;
        },		
		PublishVideo: function(matchKey,conferenceId, callback) {
			/*
			功能：发布视频。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			conferenceId	string	会议ID
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onPublishVideo (matchKey,reason,conferenceId)	发布视频
			调用说明：异步
			*/
			this._onPublishVideo = callback;
            var result = ECSDK.PublishVideo(matchKey,conferenceId);
            return result;
        },	
		UnpublishVideo: function(matchKey,conferenceId, callback) {
			/*
			功能：取消发布视频。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			conferenceId	string	会议ID
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onUnpublishVideo(matchKey,reason,conferenceId)	取消发布视频
			调用说明：异步
			*/
			this._onUnpublishVideo = callback;
            var result = ECSDK.UnpublishVideo(matchKey,conferenceId);
            return result;
        },		
		CreateInterphoneMeeting: function(matchKey,memberArray, voiceMode, callback) {
			/*
			功能：创建实时对讲。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			members	Array	成员数组
			members[0]	string	成员
			voiceMode	long	1、没有提示音有背景音 2、全部提示音 3、无提示音无背景音 缺省2
			*/
			this._onCreateInterphoneMeeting = callback;
            var result = ECSDK.CreateInterphoneMeeting(matchKey,memberArray, voiceMode);
            return result;
        },	
		ControlInterphoneMic: function(matchKey,isControl, interphoneId, callback) {
			/*
			功能：控麦。
			参数：
			参数名 	类型 	描述 
			matchKey	Object	回写参数，开发者匹配请求和结果回调。返回值会回写在matchKey.value中。
			isControl	bool	是否控麦
			interphoneId	string	会议ID
			返回值：是否成功 0：成功；非0失败
			触发事件：
			事件	说明
			onControlInterphoneMic(matchKey,reason,controller,interphoneId,requestIsControl)	控麦
			调用说明：异步
			*/
			this._onControlInterphoneMic = callback;
            var result = ECSDK.ControlInterphoneMic(matchKey,isControl, interphoneId);
            return result;
        },		
		//内部函数：
		RegisterCallBack : function(obj, name, proc) {
			RL_YTX.RegisterCallBack(obj, name, proc);
        },

        CreateMeetingBuilder: function(meetingType, meetingName, password, keywords, voiceMode, square, bAutoJoin, autoClose, autoDelete, callbackmode, serverUserData, reservation) {			
		    this._meetingType = meetingType;
            this._meetingName = meetingName;
            this._password = password;
            this._keywords = keywords;
            this._voiceMode = voiceMode;
            this._square = square;
            this._bAutoJoin = bAutoJoin;
			this._autoClose = autoClose;
            this._autoDelete = autoDelete;
            this._callbackmode = callbackmode;
            this._serverUserData = serverUserData;
			this._reservation = reservation; 
			
            this.setMeetingType = function(meetingType) {
                this._meetingType = meetingType
            };
            this.setMeetingName = function(meetingName) {
                this._meetingName = meetingName
            };
            this.setPassword = function(password) {
                this._password = password
            };
            this.setKeywords = function(keywords) {
                this._keywords = keywords
            };
            this.setVoiceMode = function(voiceMode) {
                this._voiceMode = voiceMode
            };
            this.setSquare = function(square) {
                this._square = square
            };
            this.setAutoJoin = function(bAutoJoin){
                this._bAutoJoin = bAutoJoin;
            };
            this.setAutoClose = function(autoClose){
                this._autoClose = autoClose;
            };			
            this.setAutoDelete = function(autoDelete){
                this._autoDelete = autoDelete;
            };
            this.setCallbackmode = function(callbackmode){
                this._callbackmode = callbackmode;
            };
            this.setServerUserData = function(serverUserData){
                this._serverUserData = serverUserData;
            };
			this.setReservation = function(reservation){
                this._reservation = reservation;
            };
			
            this.getMeetingType = function() {
                return this._meetingType
            };
            this.getMeetingName = function() {
                return this._meetingName
            };
            this.getPassword= function() {
                return this._password
            };
            this.getKeywords = function() {
                return this._keywords
            };
            this.getVoiceMode = function() {
                return this._voiceMode;
            };
            this.getSquare = function() {
                return this._square
            };
            this.getAutoJoin = function(){
                return this._bAutoJoin;
            };
            this.getAutoClose = function(){
                return this._autoClose;
            };
            this.getAutoDelete = function(){
                return this._autoDelete;
            };
            this.getCallbackmode = function(){
                return this.callbackmode;
            };
            this.getServerUserData = function(){
                return this._serverUserData;
            };
			this.getReservation = function(){
                return this._reservation;
            };			
        }, 
        InviteJoinMeetingBuilder: function(meetingId, memberArray,bLanding, isSpeak, isListen,disNumber,userData,serverUserData) {

            this._meetingId = meetingId;
			this._memberArray = memberArray;
            this._bLanding = bLanding;
            this._isSpeak = isSpeak;
            this._isListen= isListen;
            this._disNumber= disNumber;			
			this._userData= userData;
			this._serverUserData= serverUserData;

            this.setMeetingId = function(meetingId) {
                this._meetingId = meetingId
            };
			this.setMemberArray = function(memberArray) {
                this._memberArray = memberArray
            };
            this.setLanding = function(bLanding) {
                this._bLanding = bLanding
            };
            this.setSpeak = function(isSpeak) {
                this._isSpeak = isSpeak
            };
            this.setListen = function(isListen) {
                this._isListen= isListen
            };
            this.setDisNumber = function(disNumber) {
                this._disNumber= disNumber
            };
            this.setUserData = function(userData) {
                this._userData= userData
            };
            this.setServerUserData = function(serverUserData) {
                this._serverUserData= serverUserData
            };			

            this.getMeetingId = function() {
                return this._meetingId
            };
            this.getMemberArray = function() {
                return this._memberArray
            };			
            this.getLanding = function() {
                return this._bLanding
            };
            this.getSpeak = function() {
                return this._isSpeak;
            };
            this.getListen = function() {
                return this._isListen
            };	
            this.getDisNumber = function() {
                return this._disNumber
            };
            this.getUserData = function() {
                return this._userData
            };
            this.getServerUserData = function() {
                return this._serverUserData
            };			
        }, 		
        MeetingMemberStateBuilder: function(meetingType, meetingId, authority,member, isVoIP, state,userData) {

            this._meetingType = meetingType;
            this._meetingId = meetingId;
			this._authority = authority;
            this._member = member;
            this._isVoIP = isVoIP;
            this._state= state;
            this._userData= userData;			
			
            this.setMeetingType = function(meetingType) {
                this._meetingType = meetingType
            };
            this.setMeetingId = function(meetingId) {
                this._meetingId = meetingId
            };
			this.setAuthority = function(authority) {
                this._authority = authority
            };
            this.setMember = function(member) {
                this._member = member
            };
            this.setIsVoIP = function(isVoIP) {
                this._isVoIP = isVoIP
            };
            this.setState = function(state) {
                this._state= state
            };
            this.setUserData = function(userData) {
                this._userData= userData
            };
			
            this.getMeetingType = function() {
                return this._meetingType
            };
            this.getMeetingId = function() {
                return this._meetingId
            };
            this.getAuthority = function() {
                return this._authority
            };			
            this.getMember = function() {
                return this._member
            };
            this.getIsVoIP = function() {
                return this._isVoIP;
            };
            this.getState = function() {
                return this._state
            };	
            this.getUserData = function() {
                return this._userData
            };
        }, 		
        MeetingSpeakListenBuilder: function(meetingType, meetingId, member, isVoIP, option) {

            this._meetingType = meetingType;
            this._meetingId = meetingId;
            this._member = member;
            this._isVoIP = isVoIP;
            this._option= option;
			
            this.setMeetingType = function(meetingType) {
                this._meetingType = meetingType
            };
            this.setMeetingId = function(meetingId) {
                this._meetingId = meetingId
            };
            this.setMember = function(member) {
                this._member = member
            };
            this.setIsVoIP = function(isVoIP) {
                this._isVoIP = isVoIP
            };
            this.setOption = function(option) {
                this._option= option
            };
			
            this.getMeetingType = function() {
                return this._meetingType
            };
            this.getMeetingId = function() {
                return this._meetingId
            };
            this.getMember = function() {
                return this._member
            };
            this.getIsVoIP = function() {
                return this._isVoIP;
            };
            this.getOption = function() {
                return this._option
            };	
        } 

    };
})();
