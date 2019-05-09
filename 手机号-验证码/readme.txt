
                        <#--�޸��ֻ���-->
                        <div class="cli">
                            <div class="list-block">

                                <li class="register">
                                    <div class="item-content middle">
                                        <div class="item-media"><i class="iconfont icon-yanzhengma "></i></div>
                                        <div class="item-inner">
                                        <#-- <div class="item-title label" style="width:30%;">�ֻ���</div>-->
                                            <div class="item-input">
                                            <#-- <input type="text" placeholder="�ֻ���" name="mobile" id="mobile" value="${mobile!''}">-->
                                                <input type="text" placeholder="�������ֻ���" name="mobile" id="mobile" >
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="register">
                                    <div class="item-content">
                                        <div class="item-media"><i class="iconfont icon-ecurityCode"></i></div>
                                        <div class="item-inner">
                                            <div class="item-input" style="width: 40%">
                                                <input type="text" placeholder="��֤��" name="smsCode" id="smsCode">
                                            </div>
                                            <a id="code-btn" href="#" onclick="sendCode()" class="button" style="font-size: 0.75em">��ȡ��֤��</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="last" style="display: none">
                                    <span class="last_left"><input type="checkbox"><span>�Զ���¼</span></span>
                                    <span class="last_right"><a href="">��������</a></span>
                                </li>
                                <div class="content-block">
                                    <div class="row">
                                    <div class="col-50 danger" ><a href="#" onclick="fn()" class="button button-big button-red">ȡ��</a></div>
                                        <div class="col-50 register"><a href="#" onclick="doRegister()" class="button button-big button-fill ">ȷ��</a></div>
                                    </div>
                                </div>

                            </div>
                        </div>




 //�޸��ֻ����߼�


    $('#code-btn').bind('click',function(){
        var _$this = $(this);
        setTime(_$this);
    })

    var countdown=30;
    function setTime(_$that) {
        var mobile = $('#mobile').val();
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(mobile)) {
            $.toast('��������ȷ���ֻ�����');
            return false;
        }

        if (countdown == 0 || mobile.trim() == '' || !myreg.test(mobile)) {
            _$that.removeClass('disabled');
            _$that.html("��ȡ��֤��");
            countdown = 30;
            return ;
        } else {
            _$that.addClass('disabled');
            _$that.html("���·���(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
            setTime(_$that)
        },1000)
    }

    function doRegister(value){
//            var userName = $('#userName').val();
//            if (userName.trim() == '') {
//                $.toast('�û�������Ϊ��', 500, 'error top');
//                return;
//            }
        var mobile = $('#mobile').val();
        if (mobile.trim() == '') {
            $.toast('�ֻ��Ų���Ϊ��', 500, 'error top');
            return;
        }
        if(mobile==value){
                     $.toast('�ֻ�������ͬ');
                     return false;
                 }

                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(mobile)) {
                    $.toast('��������ȷ���ֻ�����');
                    return false;
                }
        var smsCode = $('#smsCode').val();
        if (smsCode.trim() == '') {
            $.toast('�����������֤��', 500, 'error top');
            return;
        }
        $.showPreloader('�����ύ��Ϣ������');
        $.ajax({
            url: '/idl/auth/register/do',
            type: 'POST',
            data: { mobile: mobile, smsCode: smsCode},
            success: function(result){
                $.hidePreloader();
                if(result.code == 200){
                    $.toast('�޸ĳɹ�', 1000, 'success top');
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
//            $.toast('�ֻ��Ų���Ϊ��', 500, 'error top');

            return false;
        }else if(!myreg.test(mobile)){
            $.toast('��������ȷ���ֻ�����');
            return false;
        }
//
//        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
//        if (!myreg.test(mobile)) {
//            $.toast('��������ȷ���ֻ�����');
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
                    $.toast('���ͳɹ�', 1000, 'success top');
                }else{
                    $.toast(result.msg, 1000, 'error top');
                }
            }
        })
    };



