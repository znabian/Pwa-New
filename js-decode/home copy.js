var apps= [];
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
      console.log(Cookies.get("id"), "userId");
      if (app_flag && localStorage.getItem("app_list")) {
        apps = JSON.parse(localStorage.getItem("app_list"));
        showApps();
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
      Cookies.remove("RealityShowAllow");Cookies.remove("RealityShow");
      
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
    const RedCastle=["1549","1548","1547","1546","1545"];
      /*var bodyFormData = new FormData();
      bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
      bodyFormData.append("applist", true);
      bodyFormData.append(
        "data",
        JSON.stringify({
          data:
            "select * , (select count(Id) from paymentTbl as P where (select top 1 Phone from UserTbl where UserId=id)='" +
            Cookies.get("phone") +
            "' and (select Id from ProductTbl where BelongsId=A.Id)=P.AppId and Active=1 and Access=1) as Allow from AppTbl as A where Parent=0  and Active=1 order by Id DESC",
        })
      );*/
      
      Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'applist':true,
          'data':"select * , (select count(Id) from paymentTbl as P where (select top 1 Phone from UserTbl where UserId=id)='" +
            Cookies.get("phone") +
            "' and (select Id from ProductTbl where BelongsId=A.Id)=P.AppId and Active=1 and Access=1) as Allow from AppTbl as A where Parent=0  and Active=1 order by Sort,Id DESC"
        }));
      axios({
        method: "POST",
        url: "api/data",
        //data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.data.status == "200") {
            
            var a=[
         
                
              {Active : "1", Allow: "0",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/banovan.png",
                Description : "", Id:"banovan",
                Name:  "کاخ بانوان", Parent: "0",Perm : "-1",
                Price :"300000", Type : "1"}
                  ,
          
                
                {Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/jibsorkh.png",
                  Description : "", Id:"jibsorkh",
                  Name:  " جیب سرخ", Parent: "0",Perm : "-1",
                  Price :"300000", Type : "link",Link:"https://cafebazaar.ir/app/com.erfankhoshnazar.jibeto"},
                 
                  {Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/shahrsorkh.png",
                    Description : "", Id:"sharsorkh",
                    Name:  " شهر سرخ", Parent: "0",Perm : "-1",
                    Price :"300000", Type : "link",Link:"https://sorkhcity.com/"}
          ];
            apps = response.data.data;
            apps=apps.concat(a);
            apps.filter(function(obj,index) {
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
                
              });
            Cookies.set("app_flag", 1, 2592000);
            //Cookies.set("app_list", JSON.stringify(apps), 2592000);
            localStorage.setItem("app_list", JSON.stringify(apps));
            showApps();
            Swal.close();            
            btnrefersh.classList.remove('d-none');
          } else {           
            exitFromAccount();
          }
          
        })
        .catch((error) => {
	Swal.fire({
		title:(Cookies.get('name')??'')+" شرمنده",
		text:" نشد که بشه", 
		confirmButtonText: 'باشه',
		icon: "error"
		});
          console.log(error);
        });
    }
   
    function showApps()
    {
      castles.innerHTML='';
      apps.forEach(function(item){
        if(item["Id"]!=1){
         elem='<div class="col-md-5" style="/*width: 47%*/;margin: 0 auto;padding-right: 0px;padding-left: 0px;margin-top: 10px;"  onclick="goToCastle(\''+item.Id+'\','+item.Allow+')" ><div style="background: #ffffff; border-radius: 16px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);display: flex;height: 67px;padding-right: 4px;padding-left: 4px;"><img style="height: 45px;width: 45px;margin: auto 10px;border-radius: 11px;" src="'+(item.Logo??logo)+'"><div style="text-align: center;margin: auto auto;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;">'+item.Name+'</h6><small class="justify-content-start" style="font-family: \'Peyda ExtLt\';">'+item.Description+'</small></div><button class="btn btn-primary btn-sm me-1 rounded-circle"';
        elem+=' onclick="goToCastle(\''+item.Id+'\','+item.Allow+')"';
         
         elem+=' type="button" style="background: var(--bs-gray-500);border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 20px;height: 20px;padding: 0 0 0 0;box-shadow: 0px 0px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-grid mb-1" style="color: rgb(255,255,255);width: 11px;height: 11px;margin: auto auto;margin-top: 4px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 3.29289C10.6834 2.90237 11.3166 2.90237 11.7071 3.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L14.5858 11L3 11C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L10.2929 4.70711C9.90237 4.31658 9.90237 3.68342 10.2929 3.29289Z" fill="currentColor"></path></svg> </button> </div></div>';
            castles.innerHTML+=elem;
        }
      });
      showHistoris();
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
                        if (regex.test(obj['Name'])) 
                        {
                          elem='<div class="col-md-5" style="/*width: 47%;*/margin: 0 auto;padding-right: 0px;padding-left: 0px;margin-top: 10px;" onclick="goToCastle(\''+obj['Id']+'\','+obj['Allow']+')"><div style="background: #ffffff;border-radius: 16px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);display: flex;height: 67px;padding-right: 4px;padding-left: 4px;"><img style="height: 45px;width: 45px;margin: auto auto;border-radius: 11px;" src="'+(obj['Logo']??logo)+'"><div style="text-align: center;margin: auto auto;"><h4 style="font-family: \'Peyda Med\';padding-top: 0;font-size: 12px;margin-bottom: 0px;">'+obj['Name']+'</h4><small class="d-flex justify-content-start" style="font-family: \'Peyda ExtLt\';font-size: 7px;">'+obj['Description']+'</small></div><button class="btn btn-primary btn-sm me-1 rounded-circle"';
                          elem+=' onclick="goToCastle(\''+obj['Id']+'\','+obj['Allow']+')"';
                          
                          elem+=' type="button" style="background: var(--bs-gray-500);border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 20px;height: 20px;padding: 0 0 0 0;box-shadow: 0px 0px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-grid mb-1" style="color: rgb(255,255,255);width: 11px;height: 11px;margin: auto auto;margin-top: 4px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 3.29289C10.6834 2.90237 11.3166 2.90237 11.7071 3.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L14.5858 11L3 11C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L10.2929 4.70711C9.90237 4.31658 9.90237 3.68342 10.2929 3.29289Z" fill="currentColor"></path></svg> </button> </div></div>';
                              castles.innerHTML+=elem;
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