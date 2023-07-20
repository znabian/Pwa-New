var items=allowSeen=[];
var last_item_is_full=-1;
        var tabs;
        const apps = JSON.parse(localStorage.getItem("app_list"));
        var app;
        var category=0;
        var field='Meta';
        var logo="./public/img/brands/logo.png";
        const castleHaveSub=["64","65","66","463","1","1549","1548","1547","1546","1545"];//رایانه،ریاضی،زبان،نجوم،رسانه،عاطفی،اجتماعی،تربیتی،مالی
        const RedCastle=["1549","1548","1547","1546","1545"];
        const castleHaveSound=["183","424","1092"];
        const castleHWithoutTab=["1550","1544"];
        spop.defaults = {
          style     : 'info',
          position  : 'bottom-center',
          autoclose : 10000,     
      
        };

  $(document).ready(function () 
    {      
          if((Cookies.get("flag")??0)==0)
            window.location.assign("Login");
          if((Cookies.get("Castle_show")??0)==0)
            window.location.assign("Home");
            else
            {              
              apps.forEach(function(item,index){
                      if(item["Id"]== Cookies.get("Castle_show"))
                      app=item;
                    });
                if(app['Allow']!="1" && Cookies.get("perm")!=4)
                {
                  localStorage.setItem('flash_message', 'نمی تونی  این کاخ رو ببینی');
                  window.location.assign("Home");
                }

                castle_Description.innerHTML=app['Description'];
                castle_Title.innerHTML=app['Name'];
                castle_Image.src=app['Logo']??logo;
                if(Cookies.get("Castle_show")!="1547")
                real_show.remove();
                else
                real_show.classList.remove('d-none');
                
                if(Cookies.get("Castle_show")=="banovan")
                {
                  showWithoutTab(2279);
                }
                else if(castleHWithoutTab.includes(Cookies.get("Castle_show")))
                {
                  showWithoutTab(0);
                }
                else
                {
                if (Cookies.get("chosenCatData")) 
                {
                  field=Cookies.get('field')??field;
                  if(castleHaveSub.includes(Cookies.get("Castle_show")))
                   SubItemsList();
                  else
                  {
                    if(Cookies.get('tabs')??null)
                    {
                      tabs=JSON.parse(Cookies.get('tabs'));
                      if(allowSeen.length==0)
                      {
                        getAllowNextTabShow();
                      }
                      showTabs();
                    }
                    else
                    { 
                      tabs=[];
                      getMeta();
                    }

                  }
                  getBooks(Cookies.get('chosenCatData'));
                }
                else 
                  if(castleHaveSub.includes(Cookies.get("Castle_show")))
                   SubItemsList();
                  else
                    getMeta();            
                }
          }
    });
    function goBack() 
    {
      Cookies.remove("field");
      Cookies.remove("tabs");
      Cookies.remove("chosenCatData");
      location.href="Home";
    }
    function gotoReal() 
    {
      Cookies.set("RealityShow",true,2592000);
      allow=1;//(Cookies.get("perm")!=4)?app['Allow']:1;
      Cookies.set("RealityShowAllow",allow,2592000);
      location.href="RealityShow";
    }
    
    function getAllowNextTabShow()
     {
      if(!['1563','424'].includes(Cookies.get("Castle_show")))
      {
        sid=(RedCastle.includes(Cookies.get("Castle_show")))?1:Cookies.get("Castle_show");
        if(castleHaveSub.includes(Cookies.get("Castle_show")))            
        //dataSQL="select *,(select top 1 FullCount from ViewTbl where CId=ChallTbl.Id and AId=" + sid+ " and Type='PWA' and UserId="+Cookies.get('id')+") as FullCount  from ChallTbl where AppId in ((select Id from AppTbl where Parent in(" +arrayColumn(tabs,'Id').join(',') + ") and Active=1 order by Sort,Id))  and CourseId="+sid+" and Type in (6,8) and Active=1 order by Id Desc";
        dataSQL="select *,isnull((select top 1 FullCount from ViewTbl where CId=a.MaxId and AId="+sid+" and Type='PWA' and UserId="+Cookies.get('id')+"),0) as FullCount from(select max(Id) as MaxId,AppId from ChallTbl where AppId in((SELECT max(Id) as MaxId from AppTbl where Parent in ("+arrayColumn(tabs,'Id').join(',') +")and Active=1 GROUP BY Parent))and CourseId=" + sid+ " and Type in (6,8) and Active=1   GROUP BY AppId ) as a";
        else
        dataSQL="select *,isnull((select top 1 FullCount from ViewTbl where CId=a.MaxId and AId="+sid+" and Type='PWA' and UserId="+Cookies.get('id')+"),0) as FullCount from(SELECT max(Id) as MaxId,Sort from AppTbl where Meta in (N'"+tabs.join("',N'") +"') and Parent="+sid+" and  Sort>=0  group by Sort,Meta )  as a order by Sort";
  
        Cookies.set('req_data',JSON.stringify({
            'url':"http://85.208.255.101/API/selectApi_jwt.php",
            'applist':true,
            'data':dataSQL
          }));
          
        axios({
          method: "POST",
          url: "api/data",
        //data: dataSQL,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (res) {
          if (res.data.status == "200") 
          {
            for (var i = 0; i < res.data.data.length; i++)
              allowSeen[i]=res.data.data[i]["FullCount"];
              //localStorage.setItem("allowSeen", JSON.stringify(allowSeen));
  
          } 
          else
          {
            for (var i = 0; i < tabs.length; i++)
              allowSeen[i]=0;
          }        
          }).catch(function (error){
            for (var i = 0; i <tabs.length; i++)
              allowSeen[i]=0;
            
          });
      }
      else
      for (var i = 0; i < tabs.length; i++)
        allowSeen[i]=1;
     }
    function getBooks(data,id=-1)
     {
      if(id<0)
      tabs.forEach(function(item,index)
      {
        if(field=="Meta")
        {
        if(item==data)
        id=index;
        }
        else
        {
        if(item["Id"]==data)
        id=index;          
        }
      });

      document.getElementById("tab_"+category).classList.remove('active');
      document.getElementById("tab_"+id).classList.add('active');
      document.getElementById("tab_"+id).focus();
      location.assign("#tab_"+id);
      category=id;
      Cookies.set('chosenCatData', data);
      //Cookies.set('chosenCatName', categoryName);
      Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
        
      items = [];
      sid=(RedCastle.includes(Cookies.get("Castle_show")))?1:Cookies.get("Castle_show");
      if(castleHaveSub.includes(Cookies.get("Castle_show")) || ['1563','424'].includes(Cookies.get("Castle_show")))
      fu='';
      else
      fu=",(select top 1 FullCount from ViewTbl where CId=AppTbl.Id and AId=" + sid+ " and Type='PWA' and UserId="+Cookies.get('id')+") as FullCount ";
      if(field=="Meta")
      dataSQL= "select *"+fu+" from AppTbl where Parent=" + sid+ " and Meta=N'" + data + "' order by Sort,Id";
      else
      dataSQL= "select *"+fu+" from AppTbl where " + field+ "=" + data + " and Active=1 order by Sort,Id";
      /*var bodyFormData = new FormData();
      bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
      bodyFormData.append("applist", true);
      bodyFormData.append("data", JSON.stringify({
        data:dataSQL
      }));*/
      Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'applist':true,
          'data':dataSQL
        }));
        
      axios({
        method: "POST",
        url: "api/data",
        //data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        tabcontent.innerHTML="";

        if (response.data.status == "200") {
          count_lesson.innerHTML="تعداد "+response.data.data.length+" قسمت";
          if(field=="Meta")
          session_lesson.innerHTML=data;
          else
          session_lesson.innerHTML=tabs[id]['Name'];
          for (var i = 0; i < response.data.data.length; i++) {
            items[response.data.data[i]["Id"]]={
              id: response.data.data[i]["Id"],
              name: response.data.data[i]["Name"],
              author: response.data.data[i]["Description"],
              price: response.data.data[i]["Price"],
              logo: response.data.data[i]["Logo"],
              full:response.data.data[i]["FullCount"]??0,
              type:response.data.data[i]["Type"]??0,
              link:response.data.data[i]["Link"]??0,
            };
            if(Cookies.get("Castle_show")==424)//kakh roshd
            {
            elem='<div onclick="Roshd_showData('+response.data.data[i]["Id"]+')" class="border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><i class="fa fa-arrow-left p-1 text-white" style="font-size: 7pt;"></i></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=response.data.data[i]["Description"]??'';
              elem+='</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
              //elem+=response.data.data[i]["Description"]??'';
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            }
            else  if(castleHaveSub.includes(Cookies.get("Castle_show")))
            {
              elem='<div onclick="Zaban_SubItems('+response.data.data[i]["Id"]+')" class="border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><i class="fa fa-arrow-left p-1 text-white" style="font-size: 7pt;"></i></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=response.data.data[i]["Description"]??'';
              elem+='</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
              //elem+=response.data.data[i]["Description"]??'';
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            }
            else  if(Cookies.get("Castle_show")==1563)//kakh majazi
            {      
              if(response.data.data[i]["Type"]==5)  
              {
                elem='<div id="div_'+response.data.data[i]["Id"]+'" onclick="window.open(\''+response.data.data[i]["Link"]+'\',\'_blank\');window.focus()" class="border bg-white mb-2  d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><i class="fa fa-eye p-1 text-white" style="font-size: 7pt;"></i></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
                //elem+=response.data.data[i]["Description"]??'';
                elem+='مشاهده</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
                elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
                //elem+=app['Name'];              
                elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';

              } 
              else 
              {
                elem='<div id="div_'+response.data.data[i]["Id"]+'" onclick="showVideo_VR('+response.data.data[i]["Id"]+',0,'+response.data.data[i]["Type"]+',0,1)" class="border bg-white mb-2  d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-play-fill d-block" style="color: var(--bs-btn-color);margin: auto auto;font-size: 9.96px;"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
                //elem+=response.data.data[i]["Description"]??'';
                elem+='اجرا</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
                elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
                //elem+=app['Name'];              
                elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';

              } 
                
              
            }
            else  
            {
             /* if(id!=0)
              last_item_is_full=last_item_is_full;
              else
              {
                if(category)//not first tab
                last_item_is_full=allowSeen[category-1];
                else
                last_item_is_full=-1
              }*/
                if(category)//not first tab
                last_item_is_full=allowSeen[category-1];
                else
                last_item_is_full=-1
              last_item_is_full=(last_item_is_full>=0)?last_item_is_full:1;
                allow=((i>0)?response.data.data[i-1]["FullCount"]:last_item_is_full);
              elem='<div id="div_'+response.data.data[i]["Id"]+'" onclick="showVideo('+response.data.data[i]["Id"]+',0,0,'+allow+')" class="border bg-white mb-2  d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-play-fill d-block" style="color: var(--bs-btn-color);margin: auto auto;font-size: 9.96px;"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=response.data.data[i]["Description"]??'';
              elem+='اجرا</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
              if(response.data.data[i]["FullCount"])
              elem+="<i class='fa fa-check text-success'></i>";
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            
            }
            tabcontent.innerHTML+=elem;
        }

         Swal.close();
        } else {
          Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message, 
          confirmButtonText: 'باشه',
          icon: "error"
          });

        }
      })["catch"](function (error) {
        console.log(error);
        Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          html:"نشد که بشه<p><small>خطا: "+error+"</small></p>",
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
     }
    function getMeta()
     {
      Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
      items = [];
      sid=(RedCastle.includes(Cookies.get("Castle_show")))?1:Cookies.get("Castle_show");
       /* var bodyFormData = new FormData();
        bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
        bodyFormData.append("applist", true);
        bodyFormData.append("data", JSON.stringify({
          data: "select Meta from AppTbl where Parent=" + sid+" and  Sort>=0  group by Sort,Meta order by Sort" //+ " and Meta=N'" + data + "' order by Id"
        }));*/
        Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'applist':true,
          'data':"select Meta from AppTbl where Parent=" + sid+" and  Sort>=0  group by Sort,Meta order by Sort" //+ " and Meta=N'" + data + "' order by Id"
        }));
        axios({
          method: "POST",
          url: "api/data",
          //data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (response) {

          if (response.data.status == "200") {          
            tabs=arrayColumn(myarray_unique(response.data.data), 'Meta');
            Cookies.set('tabs',JSON.stringify(tabs));
            if(allowSeen.length==0)
            {
              getAllowNextTabShow();
            } 
            showTabs();

          Swal.close();
          } else {
          Swal.close();
          Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message, 
          confirmButtonText: 'باشه',
          icon: "error"
          });

          }
        })["catch"](function (error) {
          console.log(error);
          Swal.close();
          Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          html:"نشد که بشه<p><small>خطا: "+error+"</small></p>",
          confirmButtonText: 'باشه',
          icon: "error"
          });

        });
            
      
    }
    function showTabs()
    {
      tablist.innerHTML='';      
      if(tabs.length>1 && tabs[0]!=null && field=="Meta")
      {
        myarray_Sort(tabs);
      tabs.forEach(function(item,index)
      {
          elem='<div id="tab_'+index+'" class="text-center" onclick="getBooks(\''+item+'\','+index+')" style="background: #ffffff;border-radius: 9px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);margin: 5px;padding: 5px;display: inline-block;float: none;"><h4 style="font-family: \'Peyda Med\';font-size: 14px;margin: auto auto;padding: 5px;">';
          elem+=item;
          elem+='</h4></div>';
          tablist.innerHTML+=elem;
      }
      );
      if((Cookies.get('chosenCatData')??0)==0)
      getBooks(tabs[0],0);
      }
      else
      SubItemsList();
    }
    function Zaban_SubItems(itemid)
    {
      Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
        sid=(RedCastle.includes(Cookies.get("Castle_show")))?1:Cookies.get("Castle_show");

      dataSQL= "select *,(select top 1 FullCount from ViewTbl where CId=ChallTbl.Id and AId=" + sid+ " and Type='PWA' and UserId="+Cookies.get('id')+") as FullCount  from ChallTbl where AppId=" + itemid + " and CourseId="+sid+" and Type in (6,8) and Active=1 order by Id";
      /*var bodyFormData = new FormData();
      bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
      bodyFormData.append("applist", true);
      bodyFormData.append("data", JSON.stringify({
        data:dataSQL
      }));*/
      Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'applist':true,
          'data':dataSQL
        }));
      axios({
        method: "POST",
        url: "api/data",
        //data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        tabcontent.innerHTML="";

        if (response.data.status == "200") 
        {
          count_lesson.innerHTML="تعداد "+response.data.data.length+" قسمت";
        session_lesson.innerHTML="<span onclick='showItems()'><i  class='pull-left fa fa-arrow-left'></i>"+items[itemid]['name']+"</span>";
       
        items["subitem"]=[];

        const keys = Object.keys(items);
        if(itemid!= keys[0])
        last_item_is_full=last_item_is_full;
        else
        {
          if(category)//not first tab
          last_item_is_full=allowSeen[category-1];
          else
          last_item_is_full=-1
        }

        last_item_is_full=(last_item_is_full>=0)?last_item_is_full:1;
          for (var i = 0; i < response.data.data.length; i++)
          {
            items["subitem"][response.data.data[i]["Id"]]={
                        id:response.data.data[i]["Id"],
                        name:response.data.data[i]["Name"],
                        description: 'یک پزشک همراه',
                        logo:response.data.data[i]["Logo"],
                        type:response.data.data[i]["Type"]??0,
                        link:response.data.data[i]["Link"]??0,
                        full:response.data.data[i]["FullCount"]??0,
                    };
              elem='<div id="div_'+response.data.data[i]["Id"]+'" onclick="showVideo_VR('+response.data.data[i]["Id"]+',1,'+response.data.data[i]["Type"]+',1,'+((i>0)?response.data.data[i-1]["FullCount"]:last_item_is_full)+')" class="border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-play-fill d-block" style="color: var(--bs-btn-color);margin: auto auto;font-size: 9.96px;"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=response.data.data[i]["Description"]??'';
              elem+='اجرا</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
              if(response.data.data[i]["FullCount"])
              elem+="<i class='fa fa-check text-success'></i>";
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            tabcontent.innerHTML+=elem;
            if(i==(response.data.data.length-1))
            last_item_is_full=response.data.data[i]["FullCount"]??0;
          }
         Swal.close();
        } 
        else {
          Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message,  
          confirmButtonText: 'باشه',
          icon: "error"
          });
        }
      })["catch"](function (error) {
        console.log(error);
        Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          html:"نشد که بشه<p><small>خطا: "+error+"</small></p>",
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
    }
    function SubItemsList()
    {  
      if(!Swal.close()) 
      Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });  
      if(field=="Meta")
      {
        tabs = [];
      sid=(RedCastle.includes(Cookies.get("Castle_show")))?1:Cookies.get("Castle_show");
        data="select Name,Id from AppTbl where Parent=" + sid+ " order by Sort,Id";
         
      /*var bodyFormData = new FormData();
      bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
      
      bodyFormData.append("applist", true);
      bodyFormData.append("data", JSON.stringify({
        data: data
      }));*/
      Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'applist':true,
          'data':data
        }));
      axios({
        method: "POST",
        url: "api/data",
        //data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        if (response.data.status == "200") {
            tablist.innerHTML='';  
          for (var i = 0; i < response.data.data.length; i++) {
            tabs[i]={Id:response.data.data[i]["Id"],Name:response.data.data[i]["Name"]};    
            elem='<div id="tab_'+i+'" class="text-center" onclick="getBooks(\''+response.data.data[i]["Id"]+'\','+i+')" style="background: #ffffff;border-radius: 9px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);margin: 5px;padding: 5px;display: inline-block;float: none;"><h4 style="font-family: \'Peyda Med\';font-size: 14px;margin: auto auto;padding: 5px;">';
          elem+=response.data.data[i]["Name"];
          elem+='</h4></div>';
          tablist.innerHTML+=elem;
          }
          Cookies.set('tabs',JSON.stringify(tabs));
          Cookies.set('field',"Parent");
         Swal.close();         
         field='Parent';
          if((Cookies.get('chosenCatData')??0)==0)
          getBooks(tabs[0]["Id"],0);

          if(allowSeen.length==0)
          {
            getAllowNextTabShow();
          }

        } else {
          Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message, 
          confirmButtonText: 'باشه',
          icon: "error"
          });
        }
      })["catch"](function (error) {
        console.log(error);
        Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          html:"نشد که بشه<p><small>خطا: "+error+"</small></p>",
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
      }
      else
      {
        tablist.innerHTML=''; 
        tabs=JSON.parse(Cookies.get('tabs'));
        tabs.forEach(function(item,index)
        {
          elem='<div id="tab_'+index+'" class="text-center" onclick="getBooks(\''+item["Id"]+'\','+index+')" style="background: #ffffff;border-radius: 9px;box-shadow: 2px 4px 10px rgba(0,0,0,0.09);margin: 5px;padding: 5px;display: inline-block;float: none;"><h4 style="font-family: \'Peyda Med\';font-size: 14px;margin: auto auto;padding: 5px;">';
            elem+=item["Name"];
            elem+='</h4></div>';
            tablist.innerHTML+=elem;
        });
        if(allowSeen.length==0)
        {
          getAllowNextTabShow();
        }
      }
        
    }
    function Roshd_showData(id)
    {
      Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
       /* var bodyFormData = new FormData();
        bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
        bodyFormData.append("applist", true);
        bodyFormData.append("data", JSON.stringify({
          data:"select * from ExpertTbl where Active=1 order by Id"
        }));*/
        Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'applist':true,
          'data':"select * from ExpertTbl where Active=1 order by Id"
        }));
        axios({
          method: "POST",
          url: "api/data",
         // data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (response) {
          tabcontent.innerHTML="";

        if (response.data.status == "200") {
          count_lesson.innerHTML="تعداد "+response.data.data.length+" قسمت";
          if(field=="Meta")
          session_lesson.innerHTML=data;
          else
          session_lesson.innerHTML="<span onclick='getBooks("+Cookies.get('chosenCatData')+","+category+")'><i  class='pull-left fa fa-arrow-left'></i>"+items[id]['name']+"</span>";
          items["subitem"]=[];
          for (var i = 0; i < response.data.data.length; i++) {
            items["subitem"][response.data.data[i]["Id"]]={
                        id:response.data.data[i]["Id"],
                        name:response.data.data[i]["Name"],
                        description: 'یک پزشک همراه',
                        logo:response.data.data[i]["Logo"],
                    }
              elem='<div onclick="Roshd_showExpert('+response.data.data[i]["Id"]+','+id+')" class="border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><i class="fa fa-arrow-left p-1 text-white" style="font-size: 7pt;"></i></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
             // elem+="یک پزشک همراه";
              elem+='</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+="یک پزشک همراه";
             // elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            
            
            tabcontent.innerHTML+=elem;
            
        }
        items["subitem"]['selected']=id;
         Swal.close();
        } else {
          Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message, 
          confirmButtonText: 'باشه',
          icon: "error"
          });

        }
      })["catch"](function (error) {
        console.log(error);
        Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          html:"نشد که بشه<p><small>خطا: "+error+"</small></p>",
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
    }
    function Roshd_showExpert(id,appid)
    {
      Swal.fire({
          title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
          html:'<i class="fa fa-load-d" style="font-size: 20pt;"></i>',
          icon:'info',
          allowOutsideClick:false,
          showConfirmButton:false,
        });
     /* var bodyFormData = new FormData();
      bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
      bodyFormData.append("applist", true);
      bodyFormData.append("data", JSON.stringify({
        data:"select * from ContentTbl where BelongsId="+id+" and AppId="+appid+" order by Id"
      }));*/
      Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'applist':true,
          'data':"select * from ContentTbl where BelongsId="+id+" and AppId="+appid+" order by Id"
        }));
      axios({
        method: "POST",
        url: "api/data",
       // data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        tabcontent.innerHTML="";

        if (response.data.status == "200") {
          count_lesson.innerHTML="تعداد "+response.data.data.length+" قسمت";
          if(field=="Meta")
          session_lesson.innerHTML=data;
          else
          session_lesson.innerHTML="<span onclick='Roshd_showData("+items["subitem"]['selected']+")'><i  class='pull-left fa fa-arrow-left'></i>"+items["subitem"][id]['name']+"</span>";
          items["subitem"]['sub']=[];
          for (var i = 0; i < response.data.data.length; i++) {
            items["subitem"]['sub'][response.data.data[i]["Id"]]={
              id: response.data.data[i]["Id"],
                            name:response.data.data[i]["Name"],
                            author: response.data.data[i]["Description"],
                            logo: response.data.data[i]["Logo"],
            }
              elem='<div id="div_'+response.data.data[i]["Id"]+'" onclick="showVideo('+response.data.data[i]["Id"]+',1,0,1)" class="border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-play-fill d-block" style="color: var(--bs-btn-color);margin: auto auto;font-size: 9.96px;"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=response.data.data[i]["Description"]??'';
              elem+='</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
              //elem+=response.data.data[i]["Description"]??'';
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            
            
            tabcontent.innerHTML+=elem;
        }

         Swal.close();
        } else {
          Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message, 
          confirmButtonText: 'باشه',
          icon: "error"
          });

        }
      })["catch"](function (error) {
        console.log(error);
        Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          html:"نشد که بشه<p><small>خطا: "+error+"</small></p>",
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
    }
    function showItems()
    {
      tabcontent.innerHTML="";
      itemshow=items;
      delete itemshow['subitem'];
      count_lesson.innerHTML="تعداد "+Object.keys(itemshow).length+" قسمت";
        session_lesson.innerHTML=tabs[category]['Name'];
          itemshow.forEach(function(myitem,index) {
            if(Cookies.get("Castle_show")==424)//kakh roshd
            {
            elem='<div onclick="Roshd_showData('+myitem["id"]+')" class="border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><i class="fa fa-arrow-left p-1 text-white" style="font-size: 7pt;"></i></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=myitem["author"]??'';
              elem+='</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+myitem["name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((myitem["author"]??'')!=myitem["name"])?myitem["author"]??'':'';
              //elem+=myitem["author"]??'';
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            }
            else  if(castleHaveSub.includes(Cookies.get("Castle_show")))
            {
              elem='<div onclick="Zaban_SubItems('+myitem["id"]+')" class="border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><i class="fa fa-arrow-left p-1 text-white" style="font-size: 7pt;"></i></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=myitem["author"]??'';
              elem+='</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+myitem["name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((myitem["author"]??'')!=myitem["name"])?myitem["author"]??'':'';
              //elem+=myitem["author"]??'';
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            }
            else
            {
           
              elem='<div id="div_'+myitem["id"]+'" onclick="showVideo('+myitem["id"]+'0,0,'+((i>0)?itemshow[index-1]["full"]:1)+')" class=border bg-white mb-2 d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-play-fill d-block" style="color: var(--bs-btn-color);margin: auto auto;font-size: 9.96px;"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=myitem["author"]??'';
              elem+='اجرا</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+myitem["name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((myitem["author"]??'')!=myitem["name"])?myitem["author"]??'':'';
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            
            }
            tabcontent.innerHTML+=elem;
          });
    }
    function showVideo(id,sub=0,Rokh=0,before_Full=0)
    {
      document.getElementById('tabcontent').querySelectorAll('.border-secondary').forEach(element => 
        {
          element.classList.remove('border-secondary');
        });
        
        document.getElementById('div_'+id).classList.add('border-secondary');
      if(Rokh)
      {
        appid =Rokh;
        userid = Cookies.get("id");
        androidid = Cookies.get("androidId");
          window.location.href = "http://85.208.255.101:8012/Web/player/rokhplayer.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid 
      }
      else
      {
        if(before_Full)
        {
              if(castleHaveSound.includes(Cookies.get("Castle_show")))
                {
                  name=(sub)?items["subitem"]['sub'][id]['name']:items[id]['name'];
                  Swal.fire({
                    title:" مشاهده \n' "+name+" '",
                    text:"می خوای این قسمت  چطوری باشه؟",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'فیلم',
                    denyButtonText: "صوت",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      appid =Cookies.get('Castle_show');
                      userid = Cookies.get("id");
                      androidid = Cookies.get("androidId");
                      window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid 
                      
                    } else if (result.isDenied) {
                      format = 'mp3';
                      appid =Cookies.get('Castle_show');
                      userid = Cookies.get("id");
                      androidid = Cookies.get("androidId");
                      window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid + "&format=" + format; 
                      
                    }
                  });
                }
                else
                {
                  appid =Cookies.get('Castle_show');
                      userid = Cookies.get("id");
                      androidid = Cookies.get("androidId");
                      window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid 
                }
        }
        else
        Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:" آموزش قبلیش رو ندیدی. اول اونو ببین", 
          confirmButtonText: 'باشه',
          icon: "error"
          });
          
      }
    } 
    function showVideo_VR(id,sub=0,type,ask=1,before_Full=0)
    {
      document.getElementById('tabcontent').querySelectorAll('.border-secondary').forEach(element => 
        {
          element.classList.remove('border-secondary');
        });
        
        document.getElementById('div_'+id).classList.add('border-secondary');
        if(before_Full)
        {
          MyMaster=JSON.parse(localStorage.getItem("MyMaster"))??[];
          if(!MyMaster.includes('32'))
          {
            appid =Cookies.get('Castle_show');
            userid = Cookies.get("id");
            androidid = Cookies.get("androidId");
            window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid + "&vr=0" ; 
            
          }
          else
          {
            if(type!="6")
            {
                appid =Cookies.get('Castle_show');
                  userid = Cookies.get("id");
                  androidid = Cookies.get("androidId");
                  window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid + "&vr=0" ; 
            }
            else      
            {
                if(sub)
                {
                  if(items["subitem"]['sub'])
                  name=items["subitem"]['sub'][id]['name']
                  else if(items["subitem"])
                  name=items["subitem"][id]['name']
                  else
                  name=items[id]['name'];
                }
                  else
                  name=items[id]['name'];
                if(ask)
                {
                    Swal.fire({
                    title:" مشاهده \n' "+name+" '",
                    text:"می خوای این قسمت رو چطوری ببینی؟",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'معمولی',
                    denyButtonText: "واقعیت مجازی (VR)",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      appid =Cookies.get('Castle_show');
                      userid = Cookies.get("id");
                      androidid = Cookies.get("androidId");
                      window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid + "&vr=0" ; 
                      
                    } else if (result.isDenied) {
                      appid =Cookies.get('Castle_show');
                      userid = Cookies.get("id");
                      androidid = Cookies.get("androidId");
                      window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid + "&vr=1" ; 
                      
                    }
                });
                }
                else
                {
                  appid =Cookies.get('Castle_show');
                  userid = Cookies.get("id");
                  androidid = Cookies.get("androidId");
                  window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid + "&vr=1" ; 
                }
              
              
            }

          }
        }
        else
        Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:" آموزش قبلیش رو ندیدی. اول اونو ببین", 
          confirmButtonText: 'باشه',
          icon: "error"
          });
      
    } 
    function showWithoutTab(Rokh=0)
    {     
      Cookies.set('chosenCatData', 0);
      items = [];
      sid=(RedCastle.includes(Cookies.get("Castle_show")))?1:Cookies.get("Castle_show");
      /*var bodyFormData = new FormData();
      bodyFormData.append("url", "http://85.208.255.101/API/selectApi_jwt.php");
      bodyFormData.append("applist", true);
      bodyFormData.append("data", JSON.stringify({
        data:"select * from AppTbl where Parent=" + sid+ " and Active=1 order by Sort,Id"
      }));*/
      var fu=",(select top 1 FullCount from ViewTbl where CId=AppTbl.Id and AId=" + sid+ " and Type='PWA' and UserId="+Cookies.get('id')+") as FullCount";
      if(Rokh)
      {
      url="http://85.208.255.101/RokhAPI/selectApi_jwt.php";
        sid=Rokh;//banovan:2279
        fu="";
      }
      else
      url="http://85.208.255.101/API/selectApi_jwt.php"
      
      Cookies.set('req_data',JSON.stringify({
          'url':url,
          'applist':true,
          'data':"select *"+fu+" from AppTbl where Parent=" + sid+ " and Active=1 order by Sort,Id"
        }));
      axios({
        method: "POST",
        url: "api/data",
        //data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        tabcontent.innerHTML="";

        if (response.data.status == "200") {
          count_lesson.innerHTML="تعداد "+response.data.data.length+" قسمت";
          for (var i = 0; i < response.data.data.length; i++) {
            items[response.data.data[i]["Id"]]={
              id: response.data.data[i]["Id"],
              name: response.data.data[i]["Name"],
              author: response.data.data[i]["Description"],
              price: response.data.data[i]["Price"],
              logo: response.data.data[i]["Logo"],
              full:response.data.data[i]["FullCount"]??0,
            };
            if(Rokh)
            fu=1;
            else
            fu=((i>0)?response.data.data[i-1]["FullCount"]:1);
              elem='<div id="div_'+response.data.data[i]["Id"]+'" onclick="showVideo('+response.data.data[i]["Id"]+',0,'+Rokh+','+fu+')" class="border bg-white mb-2  d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-play-fill d-block" style="color: var(--bs-btn-color);margin: auto auto;font-size: 9.96px;"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
              //elem+=response.data.data[i]["Description"]??'';
              elem+='</h4></div><div class="row" style="margin: auto 0px;"><div class=" d-flex"><div style="/*text-align: center;*//*float: right;*/margin-right: 10px;"><h6 style="font-family: \'Peyda Med\';padding-top: 0;margin-bottom: 0px;text-align: right;">'+response.data.data[i]["Name"]+'</h6><small class="text-end d-block justify-content-start" style="font-family: \'Peyda ExtLt\';text-align: right;">';
              elem+=((response.data.data[i]["Description"]??'')!=response.data.data[i]["Name"])?response.data.data[i]["Description"]??'':'';
              //elem+=response.data.data[i]["Description"]??'';
              //elem+=app['Name'];              
              elem+='</small></div><button class="btn btn-sm me-1 rounded-circle" type="button" style=";border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto 0px;width: 30px;height: 30px;padding: 0 0 0 0;box-shadow: 0px 0px;"><img style="width: 20px;height: 20px;" width="20" height="20" src="'+logo+'"></button></div> </div></div>';
            
            tabcontent.innerHTML+=elem;
        }

         Swal.close();
        } else {
          Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message, 
          confirmButtonText: 'باشه',
          icon: "error"
          });

        }
      })["catch"](function (error) {
        console.log(error);
        Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:response.data.message, 
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
     }
    function myarray_unique(arr) 
    {
     return [...new Set(arr)];
    }
    function myarray_Sort(arr) 
    {
      arr.forEach(function(item,index) 
      {
        FAsort(arr,item,index);
      });
    }
    function FAsort(arr,item,index) 
      {
        var tmp;
        if(item.endsWith("یک") && index!=0)
        {
        tmp=arr[0];
        arr[0]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("دو") && index!=1)
        {
        tmp=arr[1];
        arr[1]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("سه") && index!=2)
        {
        tmp=arr[2];
        arr[2]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("چهار") && index!=3)
        {
        tmp=arr[3];
        arr[3]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("پنج")  && index!=4)
        {
        tmp=arr[4];
        arr[4]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("شش")  && index!=5)
        {
        tmp=arr[5];
        arr[5]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("هفت") && index!=6)
        {
        tmp=arr[6];
        arr[6]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("هشت")  && index!=7)
        {
        tmp=arr[7];
        arr[7]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("نه") && index!=8)
        {
        tmp=arr[8];
        arr[8]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith(" ده") && index!=9)
        {
        tmp=arr[9];
        arr[9]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("یازده") && index!=10)
        {
        tmp=arr[10];
        arr[10]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("دوازده") && index!=11)
        {
        tmp=arr[11];
        arr[11]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("سیزده") && index!=12)
        {
        tmp=arr[12];
        arr[12]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("چهارده") && index!=13)
        {
        tmp=arr[13];
        arr[13]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("پانزده") && index!=14)
        {
        tmp=arr[14];
        arr[14]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("شانزده") && index!=15)
        {
        tmp=arr[15];
        arr[15]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("هفده") && index!=16)
        {
        tmp=arr[16];
        arr[16]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("هجده") && index!=17)
        {
        tmp=arr[17];
        arr[17]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("نوزده") && index!=18)
        {
        tmp=arr[18];
        arr[18]=item;
        arr[index]=tmp;
        }
        else if(item.endsWith("بیست") && index!=19)
        {
        tmp=arr[19];
        arr[19]=item;
        arr[index]=tmp;
        }
        if(tmp)
        FAsort(arr,tmp,index);
      }
    const arrayColumn = (array, column) => {
     return array.map(item => item[column]);
    };
    
    if(localStorage.getItem('flash_message')??0)
    {
      spop('<strong>'+localStorage.getItem('flash_message')+'</strong>', 'error');
        localStorage.removeItem('flash_message');
    }