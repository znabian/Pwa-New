var apps=Master_App= app_All=MyApps=MyMaster= [];
var sub={
  30:["65","66","64","1545","1546","1547","1548","1549","1550"],//میکرو کاخ سرخ
  31:["65","66","64","1545","1546","1547","1548","1549","1550","463","1451","1563"],//کاخ سرخ
  32:["1","64","65","66","183","215","376","424","463","714","779","1510","1441","1451","1543","1544","1545","1546","1547","1548","1549","1550","1563","jibsorkh","sharsorkh","1651","1441","1682","1683"],//کاخ سرخ پلاس
  33:["1451","64","215","714","376","1441","1510","463","1451","1544","1573","1092","1441","1682","1683"],//کاخ نوجوان
  34:["1651","183","424"],//کاخ خانواده  
  35:["64","215", "714", "544","1441","1510","1544","1441","1682","1683","1671"],//سرخ مدرن
  27:[],//سرخ فمیلی
  38:["1652"],//general
  39:["1652"],//vvip
  40:["1652"],//vip
  41:["1652"],//pro
  42:["1651","64","1682","215","376"],//بانوان
  46:["1682"],//کار در خانه
  47:["1683"],//لینکداین
  48:["1","64","65","66","183","215","376","463","714","1441","1451","1510","1544","1682","1683","jibsorkh","sharsorkh"],//اشتراک کاخ سرخ
  49:["64","215","376","714","1092","1441","1451","1510","1544","1682","1683"],//اشتراک کاخ نوجوان

};
var lock=[];//"1441","1683","1682"
var HidenApps=["1543","779","1718","1719"];//sorkh family,old micro sorkh,subscript sorkh,subscript nojavan
var pass=sub[34];
var is_subscript=["48","49"];
const RedCastle=["1549","1548","1547","1546","1545"];
   var app_flag= Cookies.get("app_flag") == 1 ? true : false;
   var buttonClicked= false;
  var logo="./public/img/brands/logo.png";
  $(document).ready(function () {
   
    if((Cookies.get("flag")??0)==0)
    window.location.assign("Login");
    else
    {
      Cookies.remove("chosenCatData");
      Cookies.remove("chosenCatName");
      Cookies.remove("tabs");
      Cookies.remove("field");
      Cookies.remove("Castle_show");

      console.log(Cookies.get("id"), "userId");
      if (app_flag && localStorage.getItem("app_list"))
       {
        apps = JSON.parse(localStorage.getItem("app_list"));
        if(typeof Cookies.get('AllowBefore')== 'undefined' || (typeof JSON.parse(localStorage.getItem('app_list'))[0].Sort== 'undefined') || typeof Cookies.get('is_sorkhsubscript')== 'undefined' )
        {
          localStorage.removeItem("app_list");
          apps=[];
          refereshData();
        }
        else if(Cookies.get('is_sorkhsubscript')==1 && (Cookies.get('sorkhsubscript')??0)!=new Date().toISOString().slice(0, 10))
        {
          localStorage.removeItem("app_list");
          apps=[];
          refereshData();
        }
        else if(in_array(apps,'Id',RedCastle[0])['Result'])
        {
          localStorage.removeItem("app_list");
          apps=[];
          refereshData();
        }
        else
        {
          MyMaster=JSON.parse(localStorage.getItem("MyMaster"))??[];
          showApps();
        }
      } else {
        Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
        //var bodyFormData = new FormData();
        //bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
        if (Cookies.get("perm") == 0) {
          data="select TOP 1 Id from UserTbl where Phone='" +
                Cookies.get("phone") +
                "' and Active=1 order by Perm DESC";
            
         /* bodyFormData.append(
            "data",
            JSON.stringify({
              data:
                "select TOP 1 Id from UserTbl where Phone='" +
                Cookies.get("phone") +
                "' and Active=1 order by Perm DESC",
            })
          );*/
        } else {
          data=
                "select TOP 1 Id from UserTbl where Phone='" +
                Cookies.get("phone") +
                "' and AndroidId='" +
                Cookies.get("androidId") +
                "' and Active=1 order by Perm DESC";

          /*bodyFormData.append(
            "data",
            JSON.stringify({
              data:
                "select TOP 1 Id from UserTbl where Phone='" +
                Cookies.get("phone") +
                "' and AndroidId='" +
                Cookies.get("androidId") +
                "' and Active=1 order by Perm DESC",
            })
          );*/
        }        
        Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'data':data
        }));
        axios({
          method: "POST",
          url: "api/data",
         // data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => {
            // console.log(response.data);
            if (response.data == "200") {
             response_data=(JSON.parse(Cookies.get('api_result'))).data;
             Cookies.remove("api_result");

              Cookies.set("user_id", response_data[0]["Id"], 2592000);
              getApps(response_data[0]["Id"]);
            } else {
              Cookies.remove("api_result");
              Swal.close();
              exitFromAccount();
            }
          })
          .catch((error) => {
            Cookies.remove("api_result");
            console.log(error);
          });
      }
    }    
    btnrefersh.classList.remove('d-none');

                          if ((!localStorage.getItem('PWA_popupShown') || localStorage.getItem('PWA_popupShown')<2) && localStorage.getItem('app_list'))
                            {
                                var targetDate = new Date(2024, 0, 30,19,30);
                                var currentDate = new Date();

                                if (currentDate <= targetDate) 
                                {
                                    Swal.fire({
                                        imageUrl: "./public/img/bootcamp.jpg",
                                        imageHeight: '100%',
                                        background: '#020b4c',
                                        padding:0,
                                        imageAlt: "notif",
                                        showCloseButton: true,
                                        showConfirmButton: false,
                                        focusCancel:false,
                                        focusDeny:false,
                                        focusConfirm:false,
                                        allowOutsideClick:false,
                                        });
                                        document.querySelector('.swal2-image').addEventListener('click', function() {location.href='https://erfankhoshnazar.com/boot-camp/';});
                                    localStorage.setItem('PWA_popupShown', parseInt(localStorage.getItem('PWA_popupShown')??0)+1);
                                }
                            }
  });
 function exitFromAccount() {
        Swal.fire({
        title: 'خروج از برنامه',
        text: (Cookies.get('name')??'')+"  می خوای خارج بشی؟",//"آیا از خروج از حساب کاربری خود اطمینان دارید؟",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'نه',
      }).then((result) => {
        if (result.isConfirmed) {
          Object.keys(Cookies.get()).forEach(function(cookieName) {
          Cookies.remove(cookieName);
        });
        localStorage.removeItem("app_list");
         /* Cookies.set("flag", 0, 2592000);
            Cookies.set("app_flag", 0, 2592000);
            Cookies.set("instagram_flag", 0, 2592000);*/
            window.location.assign("Login");
        }
      });
      
    }
    function closeCastle() {
      Swal.fire(
        "شما اجازه دسترسی برای ورود به کاخ را ندارید",
        "سرخ",
        "warning"
      );
    }
    function goToCastle(id, open) {      
      Cookies.remove("field");Cookies.remove("tabs");Cookies.remove("chosenCatData");
      Cookies.remove("RealityShowAllow");Cookies.remove("RealityShow");Cookies.remove("Castle_show");
      if(lock.includes(id))
      {
        Swal.fire({
          title:(Cookies.get('name')??''),
          text:" نمی تونی این کاخ رو ببینی چون هنوز فعال نشده", 
          confirmButtonText: 'باشه',
          icon: "warning"
          });
      }
      else if(pass.includes(id))
      {
        Swal.fire({
          title: (Cookies.get('name')??'')+' این کاخ قفله! ',
          input: 'password',
          inputAttributes: {
            autocapitalize: 'off',
            name:'castle'
          },
          inputLabel:'رمزش رو وارد کن',
          showCancelButton: true,
          confirmButtonText: 'بزن بریم',
          cancelButtonText: 'بیخیال',
          cancelButtonColor: '#dc3545',
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
             return login;
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            if(result.value==Cookies.get('phone').substring(7))
            {
              Swal.fire({
                title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
                html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
                icon:'info',
                allowOutsideClick:false,
                showConfirmButton:false,
              });
            if (Cookies.get("perm", 0) == 4) 
              open = 1;
            
            if(open>0)
            {        
              _castles=Cookies.get("Castles")??[];
              find=false;
              if(_castles.length>0)
              {
                _castles=JSON.parse(_castles);
              _castles.forEach(function(item,index){
                if(item==id)
                find=true;
              });
              }
              if(!find)
              {
                if(_castles.length>=3)
                _castles.shift();
              _castles.push(id);
              Cookies.set("Castles", JSON.stringify(_castles), 2592000);
              }
              
                Cookies.set("Castle_show",id,2592000);
                Swal.close();
                window.location.assign("Castle");
            }
            else 
              Swal.fire({
                title:(Cookies.get('name')??''),
                text:" نمی تونی  این کاخ رو ببینی", 
                confirmButtonText: 'باشه',
                icon: "warning"
                });
          
          }
          else
          {
            
              Swal.fire({
                title:(Cookies.get('name')??''),
                text:" رمز اشتباهه نمی تونی  این کاخ رو ببینی", 
                confirmButtonText: 'باشه',
                icon: "warning"
                });
          }
        }
        })
      }
      else
      {
          if (Cookies.get("perm", 0) == 4) {
          open = 1;
        }
        if(open>0)
        {        
          _castles=Cookies.get("Castles")??[];
          find=false;
          if(_castles.length>0)
          {
            _castles=JSON.parse(_castles);
          _castles.forEach(function(item,index){
            if(item==id)
            find=true;
          });
          }
          if(!find)
          {
            if(_castles.length>=3)
            _castles.shift();
          _castles.push(id);
          Cookies.set("Castles", JSON.stringify(_castles), 2592000);
          }
          var tpy=[{'Id':id,Type:1}];
          apps.forEach(function(item,index){
            if(item['Id']==id)
            tpy=[{'Id':id,Type:item['Type'],Link:item['Link']??0}];
          });
          if(tpy[0]['Type']=='link')
          {
            window.open(tpy[0]['Link'],'_blank');
            location.reload();
          }
          else
          {
            Cookies.set("Castle_show",id,2592000);
            window.location.assign("Castle");
          }
        }
        else 
          Swal.fire({
            title:(Cookies.get('name')??''),
            text:" نمی تونی  این کاخ رو ببینی", 
            confirmButtonText: 'باشه',
            icon: "warning"
            });
      }
      
      
    }
    function refereshData()
    {
      btnrefersh.classList.add('d-none');
      castles.innerHTML='';historyCastle.innerHTML='';
      Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
        getApps(Cookies.get('id'));
      
    }
   function  getApps(id) {
    
        Cookies.set('req_data',JSON.stringify({
          'applist':true,
          'Phone': Cookies.get("phone") 
        })); 
      axios({
        method: "POST",
        url: "api/getApps",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.data.status == "200") {
            
            var a=[
         
                
              {Active : "1", Allow: "0",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/banovan.png",
                Description : "", Id:"1651",
                Name:  "کاخ بانوان", Parent: "0",Perm : "-1",
                Price :"300000", Type : "1"}
                  ,
          
                
                {Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/jibsorkh.png",
                  Description : "", Id:"jibsorkh",Sort:12.5,
                  Name:  " جیب سرخ", Parent: "0",Perm : "-1",
                  Price :"300000", Type : "link",Link:"https://erfankhoshnazar.com/product_jibe_sorkh/"},
                 
                  {Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/shahrsorkh.png",
                    Description : "", Id:"sharsorkh",Sort:12.75,
                    Name:  " شهر سرخ", Parent: "0",Perm : "-1",
                    Price :"300000", Type : "link",Link:"https://sorkhcity.com/"}
          ];
            Master_App=response.data.MasterApp;
            app_All=response.data.All;
            app_All=app_All.concat(a);
            MyApps = response.data.MyApps;
            var minBuyDate = [response.data.minBuyDate,response.data.pm];
            if(new Date(minBuyDate[0])>=Date("2023-07-23") && minBuyDate[1]<0)
             Cookies.set('AllowBefore',1,2592000);
            else if(minBuyDate[1]==1)
              Cookies.set('AllowBefore',1,2592000);
            else
              Cookies.set('AllowBefore',0,2592000);
            /*apps.filter(function(obj,index) {
                if(obj['Id']==1543)
                apps.splice(index, 1);
                else if(obj['Id']==779)
                apps.splice(index, 1);
                else if(obj['Id']==1550)
                apps.splice(index, 1);
                else if(obj['Id']==1)
                {
                  var allow=obj['Allow'];
                  apps.splice(index, 1);
                    apps.filter(function(obj,index) {
                      if(RedCastle.includes(obj['Id']))
                        obj['Allow']=allow;
                      
                    });
                }
                
              });*/
              //apps=app_All;
              MyMaster=[];
              MyApps.filter(function(obj,index) {
                find=in_array(Master_App,'BelongsId',obj['Id']);
                if(find['Result'] && obj['Allow']>0)
                   MyMaster.push(find['Item']['Id']);                   
              });
              
              apps=[];
              redAdd=0;
              MyMaster.forEach(function(master)
              {
                if(sub[master])
                {
                app_All.filter(function(obj,index) {
                  obj['Allow']=1;
                  if(sub[master].includes(obj['Id']) && !in_array(apps,'Id',obj['Id'])['Result'])
                  {
                    if(obj['Id']==1 || RedCastle.includes(obj['Id']))
                    {
                      RedCastle.forEach(function(reditem)
                      {
                        find=in_array(app_All,'Id',reditem);
                        /*if(find['Result'] && !in_array(apps,'Id',reditem)['Result'])
                        {
                          find['Item']['Allow']=1;
                          apps.push(find['Item']);
                        }*/
                        if(find['Result'] && !redAdd)
                        {
                          redAdd=1;
                        }
                      });
                    }
                    else if(!["779","1543"].includes(obj['Id']))
                    {
                      apps.push(obj);
                    }
                  }
                }); 
                    if(is_subscript.includes(master))
                    {
                      Cookies.set('sorkhsubscript',new Date().toISOString().slice(0, 10),2592000);
                      Cookies.set('is_sorkhsubscript',1,2592000);
                    }
              }
              });
              app_All.filter(function(obj,index) {
                find=in_array(MyApps,'Id',obj['Id']);
              if(find['Result'])
                {
                  obj['Allow']=1;
                 if(find['Item']['Allow']>0)
                  if(!in_array(apps,'Id',obj['Id'])['Result'])
                  {
                    if(obj['Id']==1 || RedCastle.includes(obj['Id']))
                    {
                      RedCastle.forEach(function(reditem)
                      {
                        find=in_array(app_All,'Id',reditem);
                       /* if(find['Result'] && !in_array(apps,'Id',reditem)['Result'])
                        {
                          if(!["779","1543"].includes(obj['Id']))
                          {
                            find['Item']['Allow']=1;
                          apps.push(find['Item']);
                          }
                        }*/
                        if(find['Result'] && !redAdd)
                        {
                          redAdd=1;
                        }
                      });
                    }
                    else if(!HidenApps.includes(obj['Id']))
                        apps.push(obj);
                  }                 
                }
              });
              if(typeof Cookies.get('is_sorkhsubscript')=='undefined')
              Cookies.set('is_sorkhsubscript',0,2592000);
              apps.filter(function(obj,index)
               {
                if(obj['Id']==1543)//sorkh family
                apps.splice(index, 1);
                else if(obj['Id']==779)//old micro sorkh
                apps.splice(index, 1);
               /* else if(obj['Id']==1550)//rafiq shafiq
                apps.splice(index, 1);*/
                
              });
              if(redAdd)
              {
              apps.push({'Id':1,Name:"مجموعه کاخ ها",Sort:-1,Allow:1,Logo:'./public/img/64.png',Description:'مالی،تربیتی،اجتماعی،عاطفی و رسانه'});

              }
              var rs={Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/1550.png",
              Description : "رئالیتی شو", Id:"1550",Sort:5,
              Name:  " رفیق شفیق", Parent: "0",Perm : "-1",
              };
              if(!in_array(apps,'Id',1550)['Result'] && Cookies.get('user_id')!='155484')
              apps.push(rs);
              apps.sort((a, b) => a.Sort - b.Sort);
            Cookies.set("app_flag", 1, 2592000);
            //Cookies.set("app_list", JSON.stringify(apps), 2592000);
            localStorage.setItem("app_list", JSON.stringify(apps));
            /*localStorage.setItem("Master_App_list", JSON.stringify(Master_App));
            localStorage.setItem("AllApp_List", JSON.stringify(app_All));
            localStorage.setItem("MyApps_List", JSON.stringify(MyApps));*/
            localStorage.setItem("MyMaster", JSON.stringify(MyMaster));
            showApps();
            Swal.close();            
            btnrefersh.classList.remove('d-none');
          } else {  
              console.log(response.data.message);    
                btnrefersh.classList.remove('d-none');    
            Swal.fire({
              title:(Cookies.get('name')??'')+" متاسفم",
              html:" یه مشکل  پیش اومده <br> func getApp, "+response.data.message, 
              showDenyButton: true,
              confirmButtonText: 'دورباره سعی کن',
              denyButtonText: 'بیخیال',
              icon: "error"
              }).then((result) => {
                if (result.isConfirmed)
                btnrefersh.click()
              });
          }
          
        })
        .catch((error) => {
        Swal.fire({
          title:(Cookies.get('name')??'')+" متاسفم",
          html:" یه مشکل  پیش اومده <br> func getApp, "+error.stack, 
          confirmButtonText: 'باشه',
          icon: "error"
          });
          console.log(error);
          btnrefersh.classList.remove('d-none');  
        });
    }
   
    function showApps()
    {
      castles.innerHTML='';red=0;
      if(apps.length)
      {
        apps.forEach(function(item){
        if(item["Id"]!=1)
        {
          /*if(!RedCastle.includes(item['Id'])){*/
          elem='<div class="col-md-5" style="/*width: 47%*/;margin: 0 auto;padding-right: 0px;padding-left: 0px;margin-top: 10px;"  onclick="goToCastle(\''+item.Id+'\','+item.Allow+')" ><div style="background: #ffffff; border-radius: 16px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);display: flex;height: 67px;padding-right: 4px;padding-left: 4px;"><img style="height: 45px;width: 45px;margin: auto 10px;border-radius: 11px;" src="'+(item.Logo??logo)+'"><div class="itemsTitle" style="text-align: center;margin: auto auto;"><h6 style="font-family: \'Peyda Med\';margin-bottom: 0px;padding-top: 8px;text-align: center;">'+item.Name+'</h6><small class="justify-content-start itemsDes" style="font-family: \'Peyda ExtLt\';">'+item.Description+'</small></div><button class="btn btn-primary btn-sm me-1 rounded-circle"';
          elem+=' onclick="goToCastle(\''+item.Id+'\','+item.Allow+')"';
          
          elem+=' type="button" style="background: var(--bs-gray-500);border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 20px;height: 20px;padding: 0 0 0 0;box-shadow: 0px 0px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-grid mb-1" style="color: rgb(255,255,255);width: 11px;height: 11px;margin: auto auto;margin-top: 4px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 3.29289C10.6834 2.90237 11.3166 2.90237 11.7071 3.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L14.5858 11L3 11C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L10.2929 4.70711C9.90237 4.31658 9.90237 3.68342 10.2929 3.29289Z" fill="currentColor"></path></svg> </button> </div></div>';
              castles.innerHTML+=elem;
         
        }
          else
          {
            if(!red)
            {
            elem='<div class="col-md-11" style="margin: 0 auto;padding-right: 0px;padding-left: 0px;margin-top: 10px;" onclick="goToCastle(1,1)"><div style="background: #fff;border-radius: 16px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);display: flex;height: 67px;padding-right: 4px;padding-left: 4px;"><img style="height: 45px;width: 45px;margin: auto 10px;border-radius: 11px;" src="./public/img/64.png"><div style="text-align: center;margin: auto auto;"><h6 style="font-family: \'Peyda Med\';margin-bottom: 0px;padding-top: 8px;text-align: center;">مجموعه کاخ ها</h6><div class="collection justify-content-start" style="">';
            elem+='<span>مالی<i class="fa fa-circle-o" style="font-size: 7pt; margin-left: 2px;"></i> </span>';
            elem+='<span>تربیتی<i class="fa fa-circle-o" style="font-size: 7pt; margin-left: 2px;"></i> </span>';
            elem+='<span>اجتماعی<i class="fa fa-circle-o" style="font-size: 7pt; margin-left: 2px;"></i> </span>';
            elem+='<span>عاطفی<i class="fa fa-circle-o" style="font-size: 7pt; margin-left: 2px;"></i> </span>';
            elem+='<span>رسانه<i class="fa fa-circle-o" style="font-size: 7pt; margin-left: 2px;"></i> </span>';
              
            elem+='</div></div><button class="btn btn-primary btn-sm me-1 rounded-circle" onclick="goToCastle(1,1)" type="button" style="background: var(--bs-gray-500);border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 20px;height: 20px;padding: 0 0 0 0;box-shadow: 0px 0px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-grid mb-1" style="color: rgb(255,255,255);width: 11px;height: 11px;margin: auto auto;margin-top: 4px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 3.29289C10.6834 2.90237 11.3166 2.90237 11.7071 3.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L14.5858 11L3 11C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L10.2929 4.70711C9.90237 4.31658 9.90237 3.68342 10.2929 3.29289Z" fill="currentColor"></path></svg> </button> </div></div>';
            castles.innerHTML=elem+castles.innerHTML;
            red++;

            }

          }
        
      });
      showHistoris();
      if(MyMaster.includes("31") || MyMaster.includes("32"))
      if(!document.querySelector('.nav-link[href=Archive]'))
        master_menu.innerHTML+='<li class="nav-item"><a class="nav-link" href="Archive" style="font-family: \'Peyda ExtLt\';">آرشیو</a></li>';
      }
      else
      castles.innerHTML='<p class="alert alert-dark text-center">'+Cookies.get('name')+' به هیچ دوره ای دسترسی نداری</p>';
      
    }
    function showHistoris()
    {
      historyCastle.innerHTML='';
      if(Cookies.get('Castles'))
      {
        JSON.parse(Cookies.get('Castles')).forEach(function(item){
                apps.filter(function(obj,index) {
                        if(obj['Id']==item)
                        {
                          elem='<div onclick="goToCastle(\''+obj['Id']+'\','+obj['Allow']+')" class="col-md-4" style="cursor: pointer;text-align: center;width: 30%;margin: 0 auto;padding-right: 0px;padding-left: 0px;padding-left: 0px;"><div style="background: #ffffff;border-radius: 16px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);margin-bottom: 13px;"><div><a class="" role="button" style="box-shadow: 0px 0px;"><img style="width: 80%;height: 80%; margin: 6% 0; padding-top: 15px; " src="'+(obj['Logo']??logo)+'"></a></div><h4  style=" padding-bottom:15px; font-family: \'Peyda Med\';font-size: 14px;">';
                          elem+=obj['Name']+'</h4></div></div>';
                          historyCastle.innerHTML+=elem;
                        }
                      });
                
              });
      }
    }
    function searchCastle(input)
    {
      btnrefersh.classList.add('d-none');
      castles.innerHTML='';
      if(input)
      {
      let regex = new RegExp(input, 'i');
      apps.filter(function(obj,index) {
                      if(obj["Id"]!=1){
                        if (regex.test(obj['Name'])) 
                        {
                          elem='<div class="col-md-5" style="/*width: 47%;*/margin: 0 auto;padding-right: 0px;padding-left: 0px;margin-top: 10px;" onclick="goToCastle(\''+obj['Id']+'\','+obj['Allow']+')"><div style="background: #ffffff;border-radius: 16px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);display: flex;height: 67px;padding-right: 4px;padding-left: 4px;"><img style="height: 45px;width: 45px;margin: auto auto;border-radius: 11px;" src="'+(obj['Logo']??logo)+'"><div style="text-align: center;margin: auto auto;"><h4 style="font-family: \'Peyda Med\';padding-top: 0;font-size: 12px;margin-bottom: 0px;">'+obj['Name']+'</h4><small class="d-flex justify-content-start" style="font-family: \'Peyda ExtLt\';font-size: 7px;">'+obj['Description']+'</small></div><button class="btn btn-primary btn-sm me-1 rounded-circle"';
                          elem+=' onclick="goToCastle(\''+obj['Id']+'\','+obj['Allow']+')"';
                          
                          elem+=' type="button" style="background: var(--bs-gray-500);border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 20px;height: 20px;padding: 0 0 0 0;box-shadow: 0px 0px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-grid mb-1" style="color: rgb(255,255,255);width: 11px;height: 11px;margin: auto auto;margin-top: 4px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 3.29289C10.6834 2.90237 11.3166 2.90237 11.7071 3.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L14.5858 11L3 11C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L10.2929 4.70711C9.90237 4.31658 9.90237 3.68342 10.2929 3.29289Z" fill="currentColor"></path></svg> </button> </div></div>';
                              castles.innerHTML+=elem;
                        }
                      }
                      });
        if(castles.innerHTML=='')
        castles.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';

      }
      else
      {
        btnrefersh.classList.remove('d-none');
        showApps();
      }
      
    }
    if(localStorage.getItem('flash_message')??0)
    {
      Swal.fire({
        title:(Cookies.get('name')??''),
        text: localStorage.getItem('flash_message'), 
        confirmButtonText: 'باشه',
        icon: "warning"
        });
        localStorage.removeItem('flash_message');
    }
    const arrayColumn = (array, column) => {
      return array.map(item => item[column]);
     };
     const in_array = (array,column ,search) => {
      var find={
        Result:false,
        Index:0,
        Item:[]
      };
       array.forEach(
        function(item,index )
        {
         if(item[column]==search)
         {
          find={
              Result:true,
              Index:index,
              Item:item
            };
         }
        }
         );
         return find;
     };