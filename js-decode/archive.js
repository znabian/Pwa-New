var ArchiveList=[];var NearList=[];
        var logo="./public/img/brands/logo.png";
       
  $(document).ready(function () 
    {      
      MyMaster=JSON.parse(localStorage.getItem("MyMaster")??'');
          if((Cookies.get("flag")??0)==0)
            window.location.assign("Login");
            else if(!(MyMaster.includes("31") || MyMaster.includes("32")) && Cookies.get("perm")!=4)
            {
              localStorage.setItem('flash_message', 'نمی تونی  این صفحه رو ببینی');
              window.location.assign("Home");
            }
            else
            {
              
                Swal.fire({
                  title:"  کمی صبر کن",//(Cookies.get('name')??'')+"  کمی صبر کن"
                  html:'<i class="fa fa-spinner fa-pulse" style="font-size: 12pt;"></i>',
                  icon:'info',
                  allowOutsideClick:false,
                  showConfirmButton:false,
                });
            getLives();
            } 
    });
    function goBack() 
    {
      Cookies.remove("field");
      Cookies.remove("tabs");
      Cookies.remove("chosenCatData");
      location.href="Home";
    }
    function getLives()
     {
          lives = [];
            Cookies.set('req_data',JSON.stringify({
              'url':"http://185.116.161.39:8012/API/selectApi_jwt.php",
              'applist':true,
              'data':"select top 1 * from LiveTbl where cast(Date as date)='"+new Date().toISOString().split('T')[0]+"' and Active=1 and Now=1 order by Date" 
            }));
            axios({
              method: "POST",
              url: "api/data",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(function (response) {

              if (response.data.status == "200") {   
                if(response.data.data.length>0)    
                {
                    for (var i = 0; i < response.data.data.length; i++) {
                      live_img.src=response.data.data[i]["Cover"];
                      live_title.innerHTML=response.data.data[i]["Title"];
                      live_des.innerHTML=response.data.data[i]["Description"];                      
                    }
                    Live.classList.remove('d-none');
                }   
              }
               else {
                Live.classList.add('d-none');

              }
              getArchives();
      })["catch"](function (error) {
          Live.classList.add('d-none');
          console.log(error);
          Swal.fire({
          title:(Cookies.get('name')??'')+" متاسفم",
          html:"یه مشکل  پیش اومده<p><small> <br> func getLives, "+error.stack+"</small></p>",
          confirmButtonText: 'باشه',
          icon: "error"
          });

      });
      
      
     }
    function getArchives()
     {
      ArchiveList = [];
          Cookies.set('req_data',JSON.stringify({
            'url':"http://185.116.161.39:8012/API/selectApi_jwt.php",
            'applist':true,
            'data':"select * from LiveTbl where Date <='"+new Date().toISOString().split('T')[0]+' '+new Date().toTimeString().split('G')[0]+"' and Active=1 and Now<1 order by Date" 
            //,'update':"update LiveTbl set Date='2023-06-16 15:30:00',Now=0 where Id=4"
          }));
          axios({
            method: "POST",
            url: "api/data",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function (response) {

            if (response.data.status == "200") { 
              if(response.data.data.length>0)         
              {
                 ArchiveContent.innerHTML='';
                  for (var i = 0; i < response.data.data.length; i++) {
                    ArchiveList[response.data.data[i]["Id"]]={
                      id: response.data.data[i]["Id"],
                      title: response.data.data[i]["Title"],
                      des: response.data.data[i]["Description"],
                      date: response.data.data[i]["Date"],
                      cover: response.data.data[i]["Cover"],
                      link:response.data.data[i]["Link"],
                      type:response.data.data[i]["Type"],
                    };
                    if(response.data.data[i]["Date"])
                    jDate =moment(response.data.data[i]["Date"], 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY-MM-DD');
                    else
                    jDate ='';
                    elemA='<div class="bg-white mt-2 p-1 rounded row rtl"><div class="col-form-label col-md-5 icon-container">';
                    elemA+='<img src="'+response.data.data[i]["Cover"]+'" class="image filter-contrast m-auto" alt="Image"><div class="overlay">';
                    elemA+='<img class="play-icon" onclick="showVideo(0,'+response.data.data[i]["Id"]+')"  src="./public/img/color-play.svg"></div></div><div class="col text-right"><div class="row pt-2 "><div class="col-md-12 text-left FA-numbers">';
                    elemA+='<p>'+jDate+'</p></div><div class="col-md-12">';
                    elemA+='<h5>'+response.data.data[i]["Title"]+'</h5></div><div class="col-md-12">';
                    elemA+='<p>'+response.data.data[i]["Description"]+'</p>';
                    elemA+='<button class="btn btn-show mb-2 pull-left rounded" onclick="showVideo(0,'+response.data.data[i]["Id"]+')" >مشاهده</button></div></div></div></div>';

                    Archives.innerHTML+=elemA;
                    
                  }
              }
              else
              {
                Archives.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
              }
            }
             else 
             {
              Archives.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
             }
            getNears();
          })["catch"](function (error) {
            console.log(error);
            Swal.fire({
            title:(Cookies.get('name')??'')+" متاسفم",
            html:"یه مشکل  پیش اومده<p><small> <br> func getArchives, "+error.stack+"</small></p>",
            confirmButtonText: 'باشه',
            icon: "error"
            });

           });
          
      
     }
    function getNears()
     {
      NearList = [];
      
        Cookies.set('req_data',JSON.stringify({
          'url':"http://185.116.161.39:8012/API/selectApi_jwt.php",
          'applist':true,
          'data':"select * from LiveTbl where Date >='"+new Date().toISOString().split('T')[0]+' '+new Date().toTimeString().split('G')[0]+"' and Active=1 and Now<1 order by Date" 
        }));
        axios({
          method: "POST",
          url: "api/data",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (response) {

          if (response.data.status == "200") { 
            if(response.data.data.length>0)         
            {
              Near.innerHTML='';
                  for (var i = 0; i < response.data.data.length; i++) {
                    NearList[response.data.data[i]["Id"]]={
                      id: response.data.data[i]["Id"],
                      title: response.data.data[i]["Title"],
                      des: response.data.data[i]["Description"],
                      date: response.data.data[i]["Date"],
                      cover: response.data.data[i]["Cover"],
                      link:response.data.data[i]["Link"],
                      type:response.data.data[i]["Type"],
                    };
                    if(response.data.data[i]["Date"])
                    jDate =moment(response.data.data[i]["Date"], 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY-MM-DD');
                    else
                    jDate ='';
                    elemN='<div class="bg-white mt-2 p-1 rounded row rtl"><div class="col-form-label col-md-5 icon-container">';
                    elemN+='<img src="'+response.data.data[i]["Cover"]+'" class="image m-auto" alt="Image"></div><div class="col text-right"><div class="row pt-2 "><div class="col-md-12 text-left FA-numbers">';
                    elemN+='<p>'+jDate+'</p></div><div class="col-md-12">';
                    elemN+='<h5>'+response.data.data[i]["Title"]+'</h5></div><div class="col-md-12">';
                    elemN+='<p>'+response.data.data[i]["Description"]+'</p>';
                    elemN+='<button class="btn btn-show mb-2 pull-left rounded" onclick="showVideo(0,'+response.data.data[i]["Id"]+')" >مشاهده</button></div></div></div></div>';

                    Near.innerHTML+=elemN;
              }
              
            }
            else
            {
              Near.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
            }
          }
           else 
           {
            Near.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
          }
          Swal.close();
        })["catch"](function (error) {
          Near.innerHTML='';
          console.log(error);
          Swal.fire({
            title:(Cookies.get('name')??'')+" متاسفم",
            html:"یه مشکل  پیش اومده<p><small> <br> func getNears, "+error.stack+"</small></p>",
            confirmButtonText: 'باشه',
            icon: "error"
            });

        });
   }
    
   function showVideo(live,Id=null)
   {
      if(live)
      {
        location.href="https://erfankhoshnazar.com/sorkhlive";
      }
      else
      {

      }
   }