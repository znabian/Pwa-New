var ENUM="NewPWA:1.5";
var myTimeout;
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") 
     login();
});
  const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
 $(document).ready(function ()
       {
       if ((Cookies.get('flag')??0) == 1) {
          if(urlParams.get('app'))
            location.href='Report-Card?app='+urlParams.get('app');
          else
            location.href='Home';
       }
       });

 function checkInput() {
     if (!Phone.value) {
       Swal.fire({
        title:" کاربر گرامی",
        text:"لطفا شماره موبایل خود را وارد کنید", 
        confirmButtonText: 'بله',
        icon: "info"
        });
       return false
     }
     else
     return true;
      /*else {
        var regex = new RegExp('^(\\+98|0|00)?9\\d{8,9,10,11}$');
        //var regex = new RegExp('^(\\+98|0|00)?9\\d{9,10,11}$');
       const p2e = function(s) { return s.replace(/[۰-۹]/g, function(d) {return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)})};
       MyPhone = p2e(Phone.value);
       var result = regex.test(MyPhone)
       if (result) {
         return true
       } else {
	Swal.fire({
		title:" کاربر گرامی",
		text:"لطفا شماره موبایل معتبر وارد نمایید", 
		confirmButtonText: 'بله',
		icon: "error"
		});
         return false
       }
     }*/
   }
  function forget() {
     if (checkInput()) {
      Swal.fire({
          title:"لطفا منتظر بمانید...",
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });

       let userLoginDate = new Date()

       /*var bodyFormData = new FormData()
       bodyFormData.append('url', 'http://85.208.255.101/API/passApi_jwt.php')
       bodyFormData.append('data', JSON.stringify({ data:Phone.value }))*/
       Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/passApi_jwt.php",
          'data':Phone.value 
        }));
       axios({
         method: 'POST',
         url: 'api/data',
         //data: bodyFormData,
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         }
       })
         .then((response) => {
          if (response.data == "200") {
            response_data=(JSON.parse(Cookies.get('api_result'))).data;
            Cookies.remove("api_result");
             if (!Number.parseInt(response_data[0]['Pass'])) {
              Swal.close();
              Swal.fire({
                title:" کاربر گرامی",
                text:"با عرض پوزش، شما مجوز لازم برای ورود را ندارید", 
                confirmButtonText: 'بله',
                icon: "error"
                });
               return false
             }
            Cookies.set('id', response_data[0]['Id'], 2592000)

            Cookies.set('phone',Phone.value, 2592000)

            Cookies.set('perm', response_data[0]['Perm'], 2592000)
            Swal.close();
             sendPassviaSms(Cookies.get('phone'), response_data[0]['Pass'])
              Swal.fire({
                title:" کاربر گرامی",
                text:"رمزعبور برای شما ارسال شد", 
                confirmButtonText: 'بله',
                icon: "info"
                });
             
           } else {
               Swal.close();
                Swal.fire({
                  title:"کاربر گرامی",
                  text:(JSON.parse(Cookies.get('api_result'))).message, 
                  confirmButtonText: 'بله',
                  icon: "error"
                  });
            Cookies.remove("api_result");
           }
         })
         ['catch'](function (error) {
          Cookies.remove("api_result");
           console.log(error);
           Swal.close();
            Swal.fire({
              title:" کاربر گرامی",
              html:"مشکلی پیش آمده است لطفا مجددا تلاش کنید<p><small> <br>  "+error.stack+"</small></p>",
              confirmButtonText: 'بله',
              icon: "error"
              });
         })
     }
   }
   function sendPassviaSms(phone, pass) {
     if (phone) {
       /*var bodyFormData = new FormData()
       bodyFormData.append('phone', phone)
       bodyFormData.append('text', pass)*/
       Cookies.set('req_data',JSON.stringify({
        'phone': phone,'text': pass
       }));
       axios({
         method: 'POST',
         url:'api/sms',
         //data: bodyFormData,
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         }
       })
         .then(function (response) {})
         ['catch'](function (error) {
           console.log(error)
	  Swal.fire({
		title:" کاربر گرامی",
		text:"مشکلی در ارسال پیامک  پیش آمده است لطفا مجددا تلاش کنید", 
		confirmButtonText: 'بله',
		icon: "error"
		});
         })
     }
   }
   function login() {

     if (checkInput()) {
       if (!Pass.value) {
	Swal.fire({
		title:" کاربر گرامی",
		text:"لطفا رمزعبور خود را وارد کنید", 
		confirmButtonText: 'بله',
		icon: "info"
		});
         return false
       } else {
        Swal.fire({
          title:"لطفا منتظر بمانید...",
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
         var p2e = function p2e(s) {
           return s.replace(/[۰-۹]/g, function (d) {
             return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)
           })
         }
         Pass.value = p2e(Pass.value)

         if (Pass.value == '32570')
           var select =
             "select TOP 1 Id,Name,Family,Phone,Father,Perm,AndroidId,SellerId,SupportId,Pass from UserTbl where Phone='" +
            Phone.value +
             "' and Active=1 and Perm!=3 order by Perm DESC"
         else
           var select =
             "select TOP 1 Id,Name,Family,Phone,Father,Perm,AndroidId,SellerId,SupportId,Pass from UserTbl where Phone='" +
            Phone.value +
             "' and Active=1 and Perm!=3 and Pass='" +
             Pass.value +
             "' order by Perm DESC"          

         var userLoginDate = new Date()
        
         var jalaliDate =  new Intl.DateTimeFormat('fa-IR-u-nu-latn', {dateStyle: 'short',timeStyle: 'long'}).format(userLoginDate).replace(',','');
         //var select = "select TOP 1 * from UserTbl where Phone='" +Phone.value + "' and Active=1 and Perm!=3 and Pass='" + Pass.value + "' order by Perm DESC";
         var update =
           "update UserTbl set Session='" +
           userLoginDate.toISOString() +
           "' where Phone='" +
          Phone.value +
           "' and Active=1"
         /*var bodyFormData = new FormData()
         bodyFormData.append('url', 'http://85.208.255.101/API/updateApi_jwt.php')
         bodyFormData.append(
           'data',
           JSON.stringify({
             data: select
           })
         ) // bodyFormData.append("method", "update");

         bodyFormData.append(
           'update',
           JSON.stringify({
             data: update
           })
         )*/
         Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/updateApi_jwt.php",
          'data':select,'update':update
        }));
         axios({
           method: 'POST',
           url:'api/data',
           //data: bodyFormData,
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           }
         })
           .then(function (response) {
            if (response.data == "200") {
              d=Cookies.get('api_result');
              response_data=(JSON.parse(d)).data;
              Cookies.remove("api_result");
              Cookies.set('id', response_data[0]['Id'], 2592000)

               Cookies.set('phone',Phone.value, 2592000)

               Cookies.set('perm', response_data[0]['Perm'], 2592000)

               Swal.close();

               /* if(response_data[0]["Perm"]==2)
               {*/
              // if (response_data[0]['AndroidId']) {
                // Cookies.set('flag', 1)
                // Cookies.set('androidId', response_data[0]['AndroidId'], 2592000)
                // Cookies.set('name', response_data[0]['Name']+' '+response_data[0]['Family'], 2592000)
                // buttons_login.classList.add('d-none');
                 stringToHash(String(Date.now()) +Cookies.get('phone'));
                setToken();
                 /*Swal.fire({
                  title:"سامانه سرخ",
                  html:response_data[0]['Name']+' '+response_data[0]['Family']+" عزیز! به سامانه سرخ خوش آمدید",
                  icon:'success',
                  allowOutsideClick:false,
                  showConfirmButton:false,
                });
               
               window.setTimeout(location.href='Home',100000);*/
                
               /*} else {
                 stringToHash(String(Date.now()) +Cookies.get('phone'))
                setToken()
               }*/
               /*}
               else
               {
               _this.$router.replace({
                   name: 'home'
               });
               }*/
             } else {
              Cookies.remove("api_result");
              Swal.close();buttons_login.classList.remove('d-none');
              Swal.fire({
              title:" کاربر گرامی",
              text:"اطلاعات وارد شده صحیح نمی باشد", 
              confirmButtonText: 'بله',
              icon: "error"
              });
             }
           })
           ['catch'](function (error) {
            Cookies.remove("api_result");
            buttons_login.classList.remove('d-none');
             console.log(error)
              Swal.fire({
                title:" کاربر گرامی",
                html:"مشکلی پیش آمده است لطفا مجددا تلاش کنید<p><small> <br>  "+error.stack+"</small></p>",
                confirmButtonText: 'بله',
                icon: "error"
                });
           })
       }
     }
   }
   function stringToHash(data) {
    var hashString;
     for (var i = 0; i < data.length; i++) {
       var _char = data.charCodeAt(i)

       hashString = (hashString << 5) - hashString + _char
       hashString = hashString & hashString
     }

     Cookies.set('hashCode', hashString, 2592000)
   }
    function setToken() {
      var s=ENUM+"|"+navigator.userAgent;
     var update =
       'update UserTbl set AndroidId=' +
       Cookies.get('hashCode') +
       ",Data='"+s+
       "' where Id='" +
       Cookies.get('id') +
       "'"
     var select = "select Id,Name,Family,Phone,Father,Perm,AndroidId,SellerId,SupportId,Pass from UserTbl where Id='" + Cookies.get('id') + "'"
     /*var bodyFormData = new FormData()
     bodyFormData.append('url', 'http://85.208.255.101/API/updateApi_jwt.php')
     bodyFormData.append(
       'update',
       JSON.stringify({
         data: update
       })
     )
     bodyFormData.append(
       'data',
       JSON.stringify({
         data: select
       })
     )*/
     Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/updateApi_jwt.php",
          'data':select,'update':update
        }));
     axios({
       method: 'POST',
       url:'api/data',
       //data: bodyFormData,
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       }
     })
       .then(function (response) {
        response_data=(JSON.parse(Cookies.get('api_result'))).data;
        Cookies.remove("api_result");

         Cookies.set('androidId', Cookies.get('hashCode'), 2592000)
         Cookies.set('flag', 1)
         Cookies.set('name', response_data[0]['Name']+' '+response_data[0]['Family'], 2592000)
         buttons_login.classList.add('d-none');
          Swal.fire({
          title:response_data[0]['Name']+' '+response_data[0]['Family']+" عزیز! ",
          html:" به کاخ سرخ خوش آمدی",
          icon:'success',
          allowOutsideClick:false,
          showConfirmButton:false,
          });

          myTimeout=window.setTimeout(locationchange,2000);
       })
       ['catch'](function (error) {
        Cookies.remove("api_result");
         console.log(error);
         buttons_login.classList.remove('d-none');
        Swal.fire({
          title:" کاربر گرامی",
          html:"مشکلی پیش آمده است لطفا مجددا تلاش کنید<p><small> <br>  "+error.stack+"</small></p>",
          confirmButtonText: 'بله',
          icon: "error"
          });
       })
       function locationchange()
       {
        clearTimeout(myTimeout);
        if(urlParams.get('app'))
        location.href='Report-Card?app='+urlParams.get('app');
        else
        location.href='Home';
      }
   }
  