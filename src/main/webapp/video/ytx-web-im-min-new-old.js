/**
 * Created by weijianliang on 2016/5/4.
 */
function onConnectStateListener_ytx(msg){
    if( typeof RL_YTX._onLoginListener == "function" ) {
        RL_YTX._onLoginListener(msg);
    }
}
function onReceiveMessageListener_ytx(msg)
{
    if( typeof RL_YTX._onMsgReceiveListener == "function" ) {
        RL_YTX._onMsgReceiveListener(msg);
    }
}
function onReceiveFileListener_ytx(msg)
{
    if( typeof RL_YTX._onMsgReceiveListener == "function" ) {
        RL_YTX._onMsgReceiveListener(msg);
    }
}
function onUploadVTMFileOrBuf_ytx(matchKey, reason, url){
    if( typeof RL_YTX._onUploadVTMFileOrBuf == "function" ) {
        RL_YTX._onUploadVTMFileOrBuf(matchKey, reason, url);
    }
}

function onCallEventsListener_ytx(reason, call) {
    var para = new Object();
    para.callId = call.callid;
    para.caller = call.caller;
    para.called = call.callee;
    para.callType = call.callType;
    para.state = call.eCode;
    para.reason = reason;
    para.code = reason;

    if( typeof RL_YTX._onCallMsgListener == "function" ) {
        RL_YTX._onCallMsgListener(para);
    }
}
function onCallIncomingListener_ytx(coming) {
    var para = new Object();
    para.callId = coming.callid;
    para.caller = coming.caller;
    para.state = 6;//呼叫到达

    if( typeof RL_YTX._onCallMsgListener == "function" ) {
        RL_YTX._onCallMsgListener(para);
    }
}
function onRateOfProgressAttachListener_ytx(matchKey, rateSize, fileSize, msg)
{
    if( typeof RL_YTX._onRateOfProgressAttachListener == "function" ) {
        RL_YTX._onRateOfProgressAttachListener(matchKey, rateSize, fileSize, msg);
    }
}
function onSendMediaFileListener_ytx(matchKey,reason,msg)
{
    if( typeof RL_YTX._onMsgSendListener == "function" ) {
        RL_YTX._onMsgSendListener(matchKey,reason,msg);
    }
}
function onSendTextMessageListener_ytx(matchKey,reason,msg)
{
    if( typeof RL_YTX._onMsgSendListener == "function" ) {
        RL_YTX._onMsgSendListener(matchKey,reason,msg);
    }
}

function onDownloadFileListener_ytx(matchKey,reason,msg)
{
    if( typeof RL_YTX._onDownLoadFileLisener == "function" ) {
        RL_YTX._onDownLoadFileLisener(matchKey,reason,msg);
    }
}

function onLogOutListener_ytx(msg)
{
    if( typeof RL_YTX._onLogOutListener == "function" ) {
        RL_YTX._onLogOutListener(msg);
    }
}

function onAudioMakeLisener_ytx(time, key)
{
    if( typeof RL_YTX._onAudioMakeLisener == "function" ) {
        RL_YTX._onAudioMakeLisener(time);
    }
}

function onAudioPlayLisener_ytx(key, reason)
{
    if( typeof RL_YTX._onAudioPlayLisener == "function" ) {
        RL_YTX._onAudioPlayLisener(reason);
    }
}
//设置离线拉取条数。返回值 <0 全拉；0 不拉；大于0，只拉取最新的条数
function onGetOfflineMessage_ytx()
{
    if( typeof RL_YTX._onGetOfflineMessage == "function" ) {
        return RL_YTX._onGetOfflineMessage();
    }
}
//服务器下发的群组相关通知，邀请群组成员，回调，是通知所有人，包括邀请者
function onReceiveGroupNoticeMessage_ytx(msg)
{
    if( typeof RL_YTX._onReceiveGroupNoticeMessage == "function" ) {
        RL_YTX._onReceiveGroupNoticeMessage(msg);
    }
}
//接收离线消息
function onReceiveOfflineMessage_ytx(msg)
{
    if( typeof RL_YTX._onReceiveOfflineMessage == "function" ) {
        RL_YTX._onReceiveOfflineMessage(msg);
    }
}

(function() {
    window.RL_YTX = window.RL_YTX || {
        _appid : '',
        _onLoginListener : null,//登录事件
        _onMsgReceiveListener : null,//IM接收消息事件
        _onMsgSendListener : null,//IM发送消息事件
        _onRateOfProgressAttachListener : null,//IM发送消息进度事件
        _onCallMsgListener : null,//来电事件
        _onLogOutListener : null,//登出事件
        _onDownLoadFileLisener :null,//下载文件事件
        _onAudioMakeLisener : null,//录音监听事件
        _onAudioPlayLisener : null,//放音监听事件
        _onUploadVTMFileOrBuf : null,//上传文件回调
        _onReceiveGroupNoticeMessage : null,//服务器下发的群组相关通知回调
        _onReceiveOfflineMessage : null,//获取离线消息
        _onGetOfflineMessage : null,//设置离线拉取条数
        init: function(appid, connecterIp, connecterPort, fileServerIp, fileServerPort) {
            //注册OCX事件
            //登录事件
            this.RegisterCallBack(ECSDK,"onConnectState", onConnectStateListener_ytx);
            //IM消息事件
            this.RegisterCallBack(ECSDK, "onSendTextMessage", onSendTextMessageListener_ytx);
            this.RegisterCallBack(ECSDK, "onSendMediaFile", onSendMediaFileListener_ytx);
            this.RegisterCallBack(ECSDK, "onRateOfProgressAttach", onRateOfProgressAttachListener_ytx);
            this.RegisterCallBack(ECSDK, "onReceiveMessage", onReceiveMessageListener_ytx);
            this.RegisterCallBack(ECSDK, "onReceiveFile", onReceiveFileListener_ytx);
            this.RegisterCallBack(ECSDK, "onUploadVTMFileOrBuf", onUploadVTMFileOrBuf_ytx);
            this.RegisterCallBack(ECSDK, "onGetOfflineMessage", onGetOfflineMessage_ytx);
            this.RegisterCallBack(ECSDK, "onReceiveOfflineMessage", onReceiveOfflineMessage_ytx);
            //来电事件
            this.RegisterCallBack(ECSDK, "onCallEvents", onCallEventsListener_ytx);
            this.RegisterCallBack(ECSDK, "onCallIncoming", onCallIncomingListener_ytx);
            //文件下载通知
            this.RegisterCallBack(ECSDK, "onDownloadFileComplete", onDownloadFileListener_ytx);
            //登出事件
            this.RegisterCallBack(ECSDK, "onLogOut", onLogOutListener_ytx);
            //录音监听事件
            this.RegisterCallBack(ECSDK, "onRecordingTimeOut", onAudioMakeLisener_ytx);
            //放音监听事件
            this.RegisterCallBack(ECSDK, "onFinishedPlaying", onAudioPlayLisener_ytx);
            //服务器下发的群组相关通知
            this.RegisterCallBack(ECSDK, "onReceiveGroupNoticeMessage", onReceiveGroupNoticeMessage_ytx);

            this._appid = appid;
            var result = ECSDK.Initialize();
            ECSDK.SetInternalDNS(false,"",0);//禁用dns
            ECSDK.SetVideoView(remoteView.HWND, localView.HWND);//remoteView和localView，这两个object需要加到页面里
            ECSDK.SetServerAddress(connecterIp, connecterPort, fileServerIp, fileServerPort);//初始化服务器地址和端口
            return result;
            /*ECSDK.SetTraceFlag(99, "d:\\ecsdk.log");
             ECSDK.SetCodecEnabled(7, false);*/
        },
        login: function(LoginBuilder, callback) {
            this._onLoginListener = callback;
            var loginInfo = {};
            /*loginInfo.appKey = this._appid;*/
            loginInfo.username = LoginBuilder.getUserName();
            loginInfo.userPassword = LoginBuilder.getPwd();
            loginInfo.authType = LoginBuilder.getType();
            loginInfo.timestamp = LoginBuilder.getTimestamp();
            loginInfo.appToken = LoginBuilder.getAppToken();
            loginInfo.mD5Token = LoginBuilder.getMD5Token();
            loginInfo.appKey = LoginBuilder.getAppKey();

            var result = ECSDK.Login(loginInfo);
            return result;
        },
        logout: function(callback) {
            this._onLogOutListener = callback;
            var result = ECSDK.Logout();
            return result;
        },
        destory: function() {
            var result = ECSDK.UnInitialize();
            return result;
        },
        sendMsg: function(MsgBuilder, callback, progress) {
            var matchKey = new Object();
            var msgToken = new Object();
            var result = '';

            this._onMsgSendListener = callback;
            this._onRateOfProgressAttachListener = progress;

            //发送文件 type类型
            // 0:未知类型 ;1:文本消息;2:语音消息;3:视频消息;4:图片消息;5:位置消息;6:文件,底层默认压缩;7:文件，底层不压缩; 9:群组通知
            if(1 == MsgBuilder.getType() ){//1:文本消息;
                result = ECSDK.SendTextMessage(matchKey, MsgBuilder.getReceiver(), MsgBuilder.getText(), MsgBuilder.getType(), MsgBuilder.getUserData(), msgToken);
            } else {
                //多媒体
                result = ECSDK.SendMediaMessage(matchKey,
                    MsgBuilder.getReceiver(),
                    MsgBuilder.getFile(),
                    MsgBuilder.getType(),
                    MsgBuilder.getUserData(),
                    msgToken);
            }
            return msgToken.value;
        },
        makeCall: function(MakeCallBuilder) {
            var callId = new Object();
            var result = ECSDK.MakeCall(callId, MakeCallBuilder.getCallType(), MakeCallBuilder.getCalled());
            return result;
        },
        accetpCall: function(AcceptCallBuilder,callback) {
            this._onCallMsgListener = callback;
            var result = ECSDK.AcceptCall(AcceptCallBuilder.getCallId());
            return result;
        },
        releaseCall: function(ReleaseCallBuilder) {
            var result = ECSDK.ReleaseCall(ReleaseCallBuilder.getCallId(),0);
            return result;
        },
        downloadFile : function(DownLoadFileBuilder, callback){
            this._onDownLoadFileLisener = callback;
            var matchKey = new Object();
            var result = ECSDK.DownloadFileMessage(matchKey,
                DownLoadFileBuilder.getSender(),
                DownLoadFileBuilder.getRecv(),
                DownLoadFileBuilder.getUrl(),
                DownLoadFileBuilder.getFileName(),
                DownLoadFileBuilder.getMsgId(),
                DownLoadFileBuilder.getType());

            return result;
        },
        onMsgReceiveListener: function(callback) {
            this._onMsgReceiveListener = callback
        },
        onCallMsgListener: function(callback) {
            this._onCallMsgListener = callback;
        },
        onReceiveGroupNoticeMessage : function(callback){
            this._onReceiveGroupNoticeMessage = callback;
        },
        onReceiveOfflineMessage : function(callback){
            this._onReceiveOfflineMessage = callback;
        },
        onGetOfflineMessage : function(callback){
            this._onGetOfflineMessage = callback;
        },
        RegisterCallBack : function(obj, name, proc) {
            if (typeof (proc) != "function")
                return;
            if (window.ActiveXObject || "ActiveXObject" in window) {
                if (window.ActiveXObject && obj.attachEvent) {
                    obj.detachEvent(name, proc);
                    obj.attachEvent(name, proc);
                } else {
                    this.AttachIE11Event(obj, name, proc);
                }
            } else {
                obj[name] = proc;
            }
        },
        AttachIE11Event : function(obj, _strEventId, _functionCallback) {
            var nameFromToStringRegex = /^function\s?([^\s(]*)/;
            var paramsFromToStringRegex = /\(\)|\(.+\)/;
            var params = _functionCallback.toString().match(paramsFromToStringRegex)[0];
            var functionName = _functionCallback.name || _functionCallback.toString().match(nameFromToStringRegex)[1];
            var handler;
            try {
                handler = document.createElement("script");
                handler.setAttribute("for", obj.id);
            } catch (ex) {
                handler = document.createElement('<script for="' + obj.id + '">');
            }
            handler.event = _strEventId + params;
            handler.appendChild(document.createTextNode("return " + functionName + params + ";"));
            document.body.appendChild(handler);
        },
        LoginBuilder: function(type, userName, pwd, timestamp, appToken, mD5Token, appKey) {
            this._type = type;
            this._userName = userName;
            this._pwd = pwd;
            this._appToken = appToken;
            this._mD5Token = mD5Token;
            this._timestamp = timestamp;
            this._appKey = appKey;

            this.setType = function(type) {
                this._type = type
            };
            this.setUserName = function(userName) {
                this._userName = userName
            };
            this.setPwd = function(pwd) {
                this._pwd = pwd
            };
            this.setAppToken = function(appToken) {
                this._appToken = appToken
            };
            this.setMD5Token = function(mD5Token) {
                this._mD5Token = mD5Token
            };
            this.setTimestamp = function(timestamp) {
                this._timestamp = timestamp
            };
            this.setAppKey = function(appKey){
                this._appKey = appKey;
            };
            this.getType = function() {
                return this._type
            };
            this.getUserName = function() {
                return this._userName
            };
            this.getPwd = function() {
                return this._pwd
            };
            this.getAppToken = function() {
                return this._appToken
            };
            this.getMD5Token = function() {
                return this._mD5Token;
            };
            this.getTimestamp = function() {
                return this._timestamp
            };
            this.getAppKey = function(){
                return this._appKey;
            };
        },
        MsgBuilder: function(id, text, file, type, receiver, fileName, userData) {
            this._id = id;
            this._text = text;
            this._file = file;
            this._type = ( !! type) ? type: 1;
            this._receiver = receiver;
            this._fileName = fileName;
            this._userData = userData;
            this.setId = function(id) {
                this._id = id
            };
            this.setText = function(text) {
                this._text = text
            };
            this.setFile = function(file) {
                this._file = file
            };
            this.setType = function(type) {
                this._type = type
            };
            this.setReceiver = function(receiver) {
                this._receiver = receiver
            };
            this.setFileName = function(fileName) {
                this._fileName = fileName
            };
            this.setUserData = function(userData) {
                this._userData = userData
            };
            this.getId = function() {
                return this._id
            };
            this.getText = function() {
                return this._text
            };
            this.getFile = function() {
                return this._file
            };
            this.getType = function() {
                return this._type
            };
            this.getReceiver = function() {
                return this._receiver
            };
            this.getFileName = function() {
                return this._fileName
            }
            this.getUserData = function() {
                return this._userData
            };
        },
        MakeCallBuilder: function(called, callType) {
            this._called = called;
            this._callType = ( !! callType) ? callType: 1;
            this.setCalled = function(called) {
                this._called = called
            };
            this.setCallType = function(callType) {
                this._callType = callType
            };
            this.getCalled = function() {
                return this._called
            };
            this.getCallType = function() {
                return this._callType
            }
        },
        AcceptCallBuilder: function(callId) {
            this._callId = callId;
            this.setCallId = function(callId) {
                this._callId = callId
            };
            this.getCallId = function() {
                return this._callId
            };
        },
        ReleaseCallBuilder: function(callId) {
            this._callId = callId;
            this.setCallId = function(callId) {
                this._callId = callId
            };
            this.getCallId = function() {
                return this._callId
            };
        },
        DownLoadFileBuilder: function(sender, recv, url, fileName, msgId, type) {
            this._sender = sender;
            this._recv = recv;
            this._url = url;
            this._fileName = fileName;
            this._msgId = msgId;
            this._type = type;
            this.setSender = function(sender) {
                this._sender = sender
            };
            this.setRecv = function(recv) {
                this._recv = recv
            };
            this.setUrl = function(url) {
                this._url= url
            };
            this.setFileName = function(fileName) {
                this._fileName = fileName
            };
            this.setMsgId= function(msgId) {
                this._msgId = msgId
            };
            this.setType = function(type) {
                this._type= type
            };
            this.getSender = function() {
                return this._sender
            };
            this.getRecv = function() {
                return this._recv
            };
            this.getUrl = function() {
                return this._url
            }
            this.getFileName = function() {
                return this._fileName
            };
            this.getMsgId = function() {
                return this._msgId
            };
            this.getType = function() {
                return this._type
            }
        },
        /*CmdToRestBuilder: function(matchKey, cmdid, cmdData, userData) {
            this._matchKey = matchKey;
            this._cmdid = cmdid;
            this._cmdData = cmdData;
            this._userData = userData;
            this.setMatchKey = function(matchKey) {
                this._matchKey = matchKey
            };
            this.getMatchKey = function() {
                return this._matchKey;
            };

            this.setCmdid = function(cmdid) {
                this._cmdid = cmdid;
            };
            this.getCmdid = function() {
                return this._cmdid;
            };

            this.setCmdData= function(cmdData) {
                this._cmdData = cmdData;
            };
            this.getCmdData = function() {
                return this._cmdData;
            };

            this.setUserData= function(userData) {
                this._userData = userData;
            };
            this.getUserData = function() {
                return this._userData;
            };
        },*/

        uploadVTMFile : function(companyId, companyPwd, fileName, callback){
            this._onUploadVTMFileOrBuf = callback;
            var obj = {
                result : '',
                matchKey : {}
            };
            obj.result = ECSDK.UploadVTMFile(obj.matchKey, companyId, companyPwd, fileName, '');

            return obj;
        },
        uploadVTMBuf : function(companyId, companyPwd, fileName, dataBuf, callback){
            this._onUploadVTMFileOrBuf = callback;
            var obj = {
                result : '',
                matchKey : {}
            };
            obj.result = ECSDK.UploadVTMBuf(obj.matchKey, companyId, companyPwd, fileName, dataBuf, '');
            return obj;
        },
        getCallData : function(key, valueData){

        },
        audio: {
            make: function(filename, callback) {
                RL_YTX._onAudioMakeLisener = callback;
                var result = ECSDK.StartVoiceRecording(filename, '');
                return result;
            },
            cancel: function() {
                ECSDK.StopVoiceRecording();
            },
            play : function(filename, callback){
                RL_YTX._onAudioPlayLisener = callback;
                var result = ECSDK.PlayVoiceMsg(filename, "");
                return result;
            },
            stopPlay: function() {
                ECSDK.StopVoiceMsg();
            }
        },

        photo : {
            makeLocal : function(callId){
                var obj = {
                    result : '',
                    data : {},
                    size : {},
                    width : {},
                    height : {}
                };
                obj.result = ECSDK.GetLocalVideoSnapshotEx(callId, obj.data, obj.size, obj.width, obj.height);
                return obj;
            },
            makeRemote : function(callId){
                var obj = {
                    result : '',
                    data : {},
                    size : {},
                    width : {},
                    height : {}
                };
                obj.result = ECSDK.GetRemoteVideoSnapshotEx(callId, obj.data, obj.size, obj.width, obj.height);
                return obj;
            },
            startRecordScreen : function(RecordScreenBuilder){
                var result = ECSDK.StartRecordScreen(RecordScreenBuilder.getCallId(),
                    RecordScreenBuilder.getFileName(),
                    RecordScreenBuilder.getBitrate(),
                    RecordScreenBuilder.getFps(),
                    RecordScreenBuilder.getType());
                return result;
            },
            stopRecordScreen : function(callid){
                if(!callid)
                    return "callid cannot empty";
                var result = ECSDK.StopRecordScreen(callid);
                return result;
            },
            RecordScreenBuilder: function(callId, fileName, bitrate, fps, type) {
                this._callId = callId;
                this._fileName = fileName;
                this._bitrate = bitrate;
                this._fps = fps;
                this._type = type;

                this.setCallId = function(callId) {
                    this._callId = callId
                };
                this.getCallId = function() {
                    return this._callId
                };

                this.setFileName = function(fileName) {
                    this._fileName = fileName
                };
                this.getFileName = function() {
                    return this._fileName
                };

                this.setBitrate = function(bitrate) {
                    this._bitrate = bitrate
                };
                this.getBitrate = function() {
                    return this._bitrate
                };

                this.setFps = function(fps) {
                    this._fps= fps
                };
                this.getFps = function() {
                    return this._fps
                };

                this.setType = function(type) {
                    this._type= type
                };
                this.getType = function() {
                    return this._type
                };
            }

        },
        CmdToRestDataBuilder : function(recordName, recordPath, resolution, recordSource, mixScreen, recordUrl){
            this._recordName = recordName;
            this._recordPath = recordPath;
            this._resolution = resolution;
            this._recordSource = recordSource;
            this._mixScreen = mixScreen;
            this._recordUrl = recordUrl;


            this.setRecordName = function(recordName) {
                this._recordName = recordName;
            };
            this.getRecordName = function() {
                return this._recordName;
            };

            this.setRecordPath= function(recordPath) {
                this._recordPath = recordPath;
            };
            this.getRecordPath = function() {
                return this._recordPath;
            };

            this.setResolution = function(resolution) {
                this._resolution = resolution;
            };
            this.getResolution = function() {
                return this._resolution;
            };

            this.setRecordSource = function(recordSource) {
                this._recordSource = recordSource;
            };
            this.getRecordSource = function() {
                return this._recordSource;
            };

            this.setMixScreen = function(mixScreen) {
                this._mixScreen = mixScreen;
            };
            this.getMixScreen = function() {
                return this._mixScreen;
            };

            this.setRecordUrl = function(recordUrl) {
                this._recordUrl = recordUrl;
            };
            this.getRecordUrl = function() {
                return this._recordUrl;
            };
        },
        camera : {
            getInfo: function(info) {
                var result = ECSDK.GetCameraInfo(info);
                return result;
            },
            select: function(CameraBuilder) {
                var result = ECSDK.SelectCamera(CameraBuilder.getCameraIndex(),
                    CameraBuilder.getCapabilityIndex(),
                    CameraBuilder.getFps(),
                    CameraBuilder.getRotate(),
                    CameraBuilder.getForce());
                return result;
            },
            CameraBuilder: function(cameraIndex, capabilityIndex, fps, rotate, force) {
                this._cameraIndex = cameraIndex;
                this._capabilityIndex = capabilityIndex;
                this._fps = fps;
                this._rotate = rotate;
                this._force = force;

                this.setCameraIndex= function(cameraIndex) {
                    this._cameraIndex = cameraIndex
                };
                this.getCameraIndex = function() {
                    return this._cameraIndex
                };

                this.setCapabilityIndex = function(capabilityIndex) {
                    this._capabilityIndex = capabilityIndex
                };
                this.getCapabilityIndex = function() {
                    return this._capabilityIndex
                };

                this.setFps = function(fps) {
                    this._fps= fps
                };
                this.getFps = function() {
                    return this._fps
                };

                this.setRotate = function(rotate) {
                    this._rotate= rotate
                };
                this.getRotate = function() {
                    return this._rotate
                };

                this.setForce = function(force) {
                    this._force= force
                };
                this.getForce = function() {
                    return this._force
                };
            }
        },
        microPhone : {
            getInfo: function(info) {
                var result = ECSDK.GetMicroPhoneInfo(info);
                return result;
            },
            select: function(microphoneIndex) {
                var result = ECSDK.SelectMicroPhone(microphoneIndex);
                return result;
            }
        },
        video : {
            startRecordServer : function(CmdToRestDataBuilder){
                var matchKey = new Object();
                var callSid = new Object();
                var cmdid = 3;
                ECSDK.GetCallData("servercallid", callSid);
                var cmdData = {callSid: callSid.value,
                    recordName: CmdToRestDataBuilder.getRecordName() + ".mp4",//目前只支持mp4
                    recordPath: CmdToRestDataBuilder.getRecordPath(),
                    resolution: CmdToRestDataBuilder.getResolution(),
                    recordSource: CmdToRestDataBuilder.getRecordSource(),
                    mixScreen: CmdToRestDataBuilder.getMixScreen(),
                    recordUrl: CmdToRestDataBuilder.getRecordUrl()
                };
                var result = ECSDK.SendCmdToRest(matchKey, cmdid, JSON.stringify(cmdData), '');
                return result;

            },
            stopRecordServer : function(){
                var matchKey = new Object();
                var callSid = new Object();
                var cmdid = 4;
                ECSDK.GetCallData("servercallid", callSid);
                var cmdData = {callSid: callSid.value};
                var result = ECSDK.SendCmdToRest(matchKey, cmdid, JSON.stringify(cmdData), '');
                return result;
            },
            startRecordRemote : function(VideoBuilder){
                var result = ECSDK.StartRecordRemoteVideo(VideoBuilder.getCallId(), VideoBuilder.getFileName());
                return result;
            },
            stopRecordRemote : function(callid){
                var result = ECSDK.StopRecordRemoteVideo(callid);
                return result;
            },
            startRecordLocal : function(VideoBuilder){
                var result = ECSDK.StartRecordLocalVideo(VideoBuilder.getCallId(), VideoBuilder.getFileName());
                return result;
            },
            stopRecordLocal : function(callid){
                var result = ECSDK.StopRecordLocalVideo(callid);
                return result;
            },
            VideoBuilder: function(callId, filename) {
                this._callId = callId;
                this._filename = filename;

                this.setCallId = function(callId) {
                    this._callId = callId
                };
                this.getCallId = function() {
                    return this._callId
                };

                this.setFileName = function(filename) {
                    this._filename = filename
                };
                this.getFileName = function() {
                    return this._filename
                };
            }
        }

    };
})();
