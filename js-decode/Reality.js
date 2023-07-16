var items=[];
        const apps = JSON.parse(localStorage.getItem("app_list"));
        var app;
        var logo="./public/img/brands/logo.png";
  $(document).ready(function () 
    {      
          if((Cookies.get("flag")??0)==0)
            window.location.assign("Login");
          if((Cookies.get("RealityShow")??0)==0 || (Cookies.get("RealityShowAllow")??0)==0)
          {
            localStorage.setItem('flash_message', Cookies.get('name')+' به رئالیتی شو دسترسی نداری ');
            window.location.assign("Castle");
          }
            else
            {              
              apps.forEach(function(item,index){
                      if(item["Id"]== Cookies.get("Castle_show"))
                      app=item;
                    });
               // castle_Description.innerHTML=app['Description'];
                castle_Title.innerHTML=app['Name'];
                castle_Image.src=app['Logo']??logo;

                showWithoutTab();
          }
    });
    function goBack() 
    {
      Cookies.remove("RealityShowAllow");
      Cookies.remove("RealityShow");
      location.href="Castle";
    }
    
    function showVideo(id,sub=0,before_Full=0)
    {
      document.getElementById('tabcontent').querySelectorAll('.border-secondary').forEach(element => 
        {
          element.classList.remove('border-secondary');
        });
          document.getElementById('div_'+id).classList.add('border-secondary');
        if(before_Full)
        {
            appid =1550;
                userid = Cookies.get("id");
                androidid = Cookies.get("androidId");
                window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + id + "&userid=" + userid + "&androidid=" + androidid ;
        }
        else
        Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:" آموزش قبلیش رو ندیدی. اول اونو ببین", 
          confirmButtonText: 'باشه',
          icon: "error"
          });     
    } 
    function showWithoutTab()
    {     
      items = [];
      url="http://85.208.255.101/API/selectApi_jwt.php"
      
      Cookies.set('req_data',JSON.stringify({
          'url':url,
          'applist':true,
          'data':"select *,(select top 1 FullCount from ViewTbl where CId=AppTbl.Id and AId=1550 and Type='PWA' and UserId="+Cookies.get('id')+") as FullCount  from AppTbl where Parent= 1550 and Active=1 order by Sort,Id"
        }));
      axios({
        method: "POST",
        url: "api/data",
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
              full:response.data.data[i]["FullCount"]??0
            };
           
              elem='<div id="div_'+response.data.data[i]["Id"]+'" onclick="showVideo('+response.data.data[i]["Id"]+',0,'+((i>0)?response.data.data[i-1]["FullCount"]:1)+')" class="border bg-white mb-2  d-flex justify-content-between" style="border-radius: 16px;padding-right: 4px;padding-left: 4px;padding-top: 10px;padding-bottom: 10px;width: 90%;margin: auto;"><div class="text-center d-flex float-end" style="background: #ffffff;border-radius: 9px;padding-right: 6px;padding-left: 6px;margin: auto 10px;height: 30px;"><button class="btn btn-primary btn-sm d-block me-1 rounded-circle" type="button" style="background: #fd3838;border-color: var(--bs-card-bg);color: var(--bs-card-bg);margin: auto auto;width: 25px;height: 25px;box-shadow: 0px 0px;padding: 0 0 0 0;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-play-fill d-block" style="color: var(--bs-btn-color);margin: auto auto;font-size: 9.96px;"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></button><h4 style="font-family: \'Peyda Med\';font-size: 10px;margin: auto;padding-right: 10px;padding-left: 10px;">';
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
          text:" نشد که بشه", 
          confirmButtonText: 'باشه',
          icon: "error"
          });

        }
      })["catch"](function (error) {
        console.log(error);
        Swal.close();
         Swal.fire({
          title:(Cookies.get('name')??'')+" شرمنده",
          text:" نشد که بشه", 
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
     }