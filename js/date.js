$(document).ready(function($) {
    var date={
        init:function(data,flog){
            var date=$(data);
            this.flog=flog;
            this.getInputPosition(date,flog)

        },
        getInputPosition:function(date){
            var self=this;
            date.click(function(){
                var date_x=date.offset().left;
                var date_y=date.offset().top;
                var date_h=date.height();
                date.after('<div class="data_box"></div>');
                $('.data_box').css({'position':'absolute','top':(date_y+date_h),'left':date_x})
                date_content='<div class="date_top">'+
                                '<div class="year_moth">'+
                                '<span class="up_span"><</span>'+
                                 '<span class="year_num"></span>'+
                                '<span>-</span>'+
                                '<span class="month_num"></span>'+
                                '<span class="down_span">></span>'+
                                '</div>'+
                              '</div>'+
                              '<div class="date_content">'+
                                  '<div class="date_week">'+
                                     '<ul>'+
                                     '<li>S</li>'+
                                     '<li>M</li>'+
                                     '<li>T</li>'+
                                     '<li>W</li>'+
                                     '<li>T</li>'+
                                     '<li>F</li>'+
                                     '<li>S</li>'+
                                     '</ul>'+
                                  '</div>'+
                                  '<div class="date_day"></div>'
                              '</div>'
                $('.data_box').append(date_content);
                self.getTime();
                self.nextmonth();
                self.beformonth();
                
            })
           
        },
        getTime:function(){
           var mydate = new Date();
           var year=mydate.getFullYear(); //获取完整的年份(4位,1970-????)
           var month=mydate.getMonth(); //获取当前月份(0-11,0代表1月)
           var day=mydate.getDate(); //获取当前日(1-31)
        
           var weekdate=new Date(year,month,1);

           var week=weekdate.getDay(); //获取当前星期X(0-6,0代表星期天)
           var thismonth=month+1
           $('.year_num').html(year)
           $('.month_num').html(thismonth)
           this.writetime(year,thismonth,week);
        },
        writetime:function(year,month,week){
          
           $('.date_day').html('');
           var mydate = new Date();
           var thisyear=mydate.getFullYear(); //获取完整的年份(4位,1970-????)
           var thismonth=mydate.getMonth(); //获取当前月份(0-11,0代表1月)
           var thisday=mydate.getDate(); //获取当前日(1-31)

           var dates=new Date(year,month,0);
           var daycount = dates.getDate();
           var befordates=new Date(year,month-1,0);
           var befordaycount = befordates.getDate();
            
           for(var i=1;i<=week;i++){
               var agriculture=this.agriculture(year,month-1,befordaycount-week+i);

                $('.date_day').append('<li class="day_befor"><span>'+(befordaycount-week+i)+'</span><i>'+agriculture+'</i></li>')
           }
           for(var i=0;i<daycount;i++){
               var agriculture=this.agriculture(year,month,i+1);
                $('.date_day').append('<li class="day_'+(i+1)+'"><span>'+(i+1)+'</span><i>'+agriculture+'</i></li>')
           }
        
           if(thisyear==year){
                if((thismonth+1)==month){
                    $('.day_'+thisday).find('span').css({'background':'pink'})
                }
                
           }
           this.clickday();
        },
        nextmonth:function(){
            var self=this;
            $(".up_span").click(function(){
                var year=$('.year_num').html();
                var month=$('.month_num').html();
                var upyear=parseInt(year);
                var upmonth=parseInt(month);
                if(upmonth==1){
                    upmonth=12
                    upyear=upyear-1
                    $('.year_num').html(upyear);
                    $('.month_num').html(upmonth);
                }else{
                    upmonth=(upmonth-1)
                    $('.month_num').html(upmonth);
                }

                var weekdate=new Date(upyear,upmonth-1,1);
                var week=weekdate.getDay(); //获取当前星期X(0-6,0代表星期天)

                self.writetime(year,upmonth,week)
            })

        },
        beformonth:function(){
            var self=this;
            $(".down_span").click(function(){
                var year=$('.year_num').html();
                var month=$('.month_num').html();
                var upyear=parseInt(year);
                var upmonth=parseInt(month);
                if(upmonth==12){
                    upmonth=1
                    $('.year_num').html(upyear+1);
                    $('.month_num').html(upmonth);
                }else{
                    upmonth=upmonth+1
                    $('.month_num').html(upmonth);
                }
                var weekdate=new Date(upyear,upmonth-1,1);
                var week=weekdate.getDay(); //获取当前星期X(0-6,0代表星期天)
                self.writetime(year,upmonth,week)
            })
        },
        clickday:function(){
            var self=this;
            $('.date_day li span').click(function(){
                if($(this).hasClass('click_day')){
                    $(this).removeClass('click_day')
                }else{
                    $(this).addClass('click_day');
                    if(self.flog){
                        self.clicksection()
                    }
                }
            })
        },
        clicksection:function(){
            var clickday=$(".date_day").find('.click_day');
            if(clickday.length>1){
                var arr=[];
                clickday.each(function(){
                        arr.push(parseInt($(this).html()))
                })
                arr=arr.sort(function(a,b){
                    if(a<b){
                        return -1;
                    }
                    if(a>b){
                        return 1;
                    }
                    return 0;
                });
                for(var i=arr[0];i<=arr[arr.length-1];i++){
                    $('.day_'+i).find('span').addClass('click_day')
                }
            }
        },
        agriculture:function(year,month,day) {
            var CalendarData = new Array(100);
            var madd = new Array(12);
            var tgString = "甲乙丙丁戊己庚辛壬癸";
            var dzString = "子丑寅卯辰巳午未申酉戌亥";
            var numString = "一二三四五六七八九十";
            var monString = "正二三四五六七八九十冬腊";
            var weekString = "日一二三四五六";
            var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
            var cYear, cMonth, cDay, TheDate;
            CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
            madd[0] = 0;
            madd[1] = 31;
            madd[2] = 59;
            madd[3] = 90;
            madd[4] = 120;
            madd[5] = 151;
            madd[6] = 181;
            madd[7] = 212;
            madd[8] = 243;
            madd[9] = 273;
            madd[10] = 304;
            madd[11] = 334;
            function GetBit(m, n) {
                return (m >> n) & 1;
            }
            function e2c() {
                TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
                var total, m, n, k;
                var isEnd = false;
                var tmp = TheDate.getYear();
                if (tmp < 1900) {
                    tmp += 1900;
                }
                total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
                if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
                    total++;
                }
                for (m = 0; ; m++) {
                    k = (CalendarData[m] < 0xfff) ? 11 : 12;
                    for (n = k; n >= 0; n--) {
                        if (total <= 29 + GetBit(CalendarData[m], n)) {
                            isEnd = true;
                            break;
                        }
                        total = total - 29 - GetBit(CalendarData[m], n);
                    }
                    if (isEnd) break;
                }
                cYear = 1921 + m;
                cMonth = k - n + 1;
                cDay = total;
                if (k == 12) {
                    if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                        cMonth = 1 - cMonth;
                    }
                    if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                        cMonth--;
                    }
                }
            }

            function GetcDateString() {
                var tmp = "";
                tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
                if (cDay % 10 != 0 || cDay == 10) {
                    tmp += numString.charAt((cDay - 1) % 10);
                }
                return tmp;
            }
            function GetLunarDay(solarYear, solarMonth, solarDay) {
                if (solarYear < 1921 || solarYear > 2020) {
                    return "";
                } else {
                    solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
                    e2c(solarYear, solarMonth, solarDay);
                    return GetcDateString();
                }
            }
            return GetLunarDay(year,month,day);
        }
    };
    date.init('#date',true);
    //false 单选  true 多选
});
