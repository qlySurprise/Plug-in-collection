
                        <#--修改手机号-->
                        <div class="cli">
                            <div class="list-block">

                                <li class="register">
                                    <div class="item-content middle">
                                        <div class="item-media"><i class="iconfont icon-yanzhengma "></i></div>
                                        <div class="item-inner">
                                        <#-- <div class="item-title label" style="width:30%;">手机号</div>-->
                                            <div class="item-input">
                                            <#-- <input type="text" placeholder="手机号" name="mobile" id="mobile" value="${mobile!''}">-->
                                                <input type="text" placeholder="请输入手机号" name="mobile" id="mobile" >
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="register">
                                    <div class="item-content">
                                        <div class="item-media"><i class="iconfont icon-ecurityCode"></i></div>
                                        <div class="item-inner">
                                            <div class="item-input" style="width: 40%">
                                                <input type="text" placeholder="验证码" name="smsCode" id="smsCode">
                                            </div>
                                            <a id="code-btn" href="#" onclick="sendCode()" class="button" style="font-size: 0.75em">获取验证码</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="last" style="display: none">
                                    <span class="last_left"><input type="checkbox"><span>自动登录</span></span>
                                    <span class="last_right"><a href="">忘记密码</a></span>
                                </li>
                                <div class="content-block">
                                    <div class="row">
                                    <div class="col-50 danger" ><a href="#" onclick="fn()" class="button button-big button-red">取消</a></div>
                                        <div class="col-50 register"><a href="#" onclick="doRegister()" class="button button-big button-fill ">确定</a></div>
                                    </div>
                                </div>

                            </div>
                        </div>




 //修改手机号逻辑


    $('#code-btn').bind('click',function(){
        var _$this = $(this);
        setTime(_$this);
    })

    var countdown=30;
    function setTime(_$that) {
        var mobile = $('#mobile').val();
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(mobile)) {
            $.toast('请输入正确的手机号码');
            return false;
        }

        if (countdown == 0 || mobile.trim() == '' || !myreg.test(mobile)) {
            _$that.removeClass('disabled');
            _$that.html("获取验证码");
            countdown = 30;
            return ;
        } else {
            _$that.addClass('disabled');
            _$that.html("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
            setTime(_$that)
        },1000)
    }

    function doRegister(value){
//            var userName = $('#userName').val();
//            if (userName.trim() == '') {
//                $.toast('用户名不能为空', 500, 'error top');
//                return;
//            }
        var mobile = $('#mobile').val();
        if (mobile.trim() == '') {
            $.toast('手机号不能为空', 500, 'error top');
            return;
        }
        if(mobile==value){
                     $.toast('手机号码相同');
                     return false;
                 }

                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(mobile)) {
                    $.toast('请输入正确的手机号码');
                    return false;
                }
        var smsCode = $('#smsCode').val();
        if (smsCode.trim() == '') {
            $.toast('请输入短信验证码', 500, 'error top');
            return;
        }
        $.showPreloader('正在提交信息。。。');
        $.ajax({
            url: '/idl/auth/register/do',
            type: 'POST',
            data: { mobile: mobile, smsCode: smsCode},
            success: function(result){
                $.hidePreloader();
                if(result.code == 200){
                    $.toast('修改成功', 1000, 'success top');
//                        window.location.href="/idl/auth/user/center/userInfo";
                }else{
                    $.toast(result.msg, 1000, 'error top');
                }
            }
        })
    }

    function doEdit(){
        $('.edit').hide();
        $('.register').show();
    }

    function sendCode(){
        var mobile = $('#mobile').val();
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (mobile.trim() == '') {
//            $.toast('手机号不能为空', 500, 'error top');

            return false;
        }else if(!myreg.test(mobile)){
            $.toast('请输入正确的手机号码');
            return false;
        }
//
//        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
//        if (!myreg.test(mobile)) {
//            $.toast('请输入正确的手机号码');
//            return false;
//        }

        if('' == mobile || !myreg.test(mobile)){

            return;
        }
        $.ajax({
            url: '/idl/auth/register/sendCode?mobile=' + mobile,
            type: 'GET',
            success: function(result){
                if(result.code == 200){
                    $.toast('发送成功', 1000, 'success top');
                }else{
                    $.toast(result.msg, 1000, 'error top');
                }
            }
        })
    };



