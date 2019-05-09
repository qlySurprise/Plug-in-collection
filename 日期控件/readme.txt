<script type='text/javascript' src='/js/date-picker.js' charset='utf-8'></script>


 <li>
                            <div class="item-link item-content">
                                <div class="item-inner">
                                    <div class="item-title">生日</div>
                                    <div  class="item-after" >
                                        <input type="text" value="${birthday!'未填写'}"                                         id="birthday" style="height: 1.4em;font-size: .65rem;text-                                         align:right;" />
                                    </div>
                                </div>
                            </div>
</li>





//修改日期
    $("#birthday").datePicker({

//        endDate:  new Date(),        //日历结束日期
        onClose: function(){


//            defaultDate:'2011-03-10',//默认日期
            var values = $("input[id='birthday']").val();
          var nvalue = values.split('-');

//            console.log(22222222222)
//            console.log(values);
            console.log(nvalue);
//        console.log(1111111111111);
//            当前日期
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
                    : nowDate.getMonth() + 1;
            var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
                    .getDate();
            var dateStr = year + "-" + month + "-" + day;

            console.log(dateStr)
//            console.log(data);
            console.log(nvalue[0]);
            console.log(year);
//            表单显示日期
            var oldYear = nvalue[0]-0;
            var newYear  = year-0;
            var oldMonth = nvalue[1]-0;
            var newMonth  = month-0;
            var oldDay = nvalue[2]-0;
            var newDay  = day-0;
//            console.log(a);
//            console.log(b);
//            console.log(oldYear===newYear);
            if(oldYear>newYear){
                $.toast('不能超过当前日期');
//                birthday = (year+"-"+month+"-"+day);
//                window.location.href="/idl/auth/user/center/index";
                return false;
            };
            if(oldYear==newYear){
                if(oldMonth>newMonth){
                    $.toast('不能超过当前日期');

                    return false;
                }
            };
            if(oldYear==newYear){
                if(oldMonth==newMonth){
                    if(oldDay>newDay){
                        $.toast('不能超过当前日期');

                        return false;
                    };
                }
            };


            birthday = (nvalue[0]+"-"+nvalue[1]+"-"+nvalue[2]);
            saveUserInfo(function(){

                window.location.href="/<#if proname??>${proname}<#else>weixin</#if>/idl/auth/user/center/index";
            });
        }
    });