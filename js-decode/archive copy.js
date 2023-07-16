var items=[];var lives=[];var NearItem=[];
        var logo="./public/img/brands/logo.png";
       
  $(document).ready(function () 
    {      MyMaster=JSON.parse(localStorage.getItem("MyMaster")??'');
          if((Cookies.get("flag")??0)==0)
            window.location.assign("Login");
            else if(!(MyMaster.includes("31") || MyMaster.includes("32")))
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
            Swal.close();
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
              'url':"http://85.208.255.101/API/selectApi_jwt.php",
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
                      div =document.createElement("div");
                      div2 =document.createElement("div");
                      div2.setAttribute("id", "LiveContent");
                      div.classList.add('m-3');
                      div.innerHTML='<strong class="text-end d-flex justify-content-end" style="font-family: \'Peyda ExtBd\';font-size: 13px;">پخش زنده<i class="mx-2 spinner-grow text-danger" style="height: 1rem;width: 1rem;"></i></strong>';
                      Lives.appendChild(div);  Lives.appendChild(div2);

                      count_Archives.innerHTML="تعداد "+response.data.data.length+" فیلم";
                    LiveContent.innerHTML='';
                    for (var i = 0; i < response.data.data.length; i++) {
                      lives[response.data.data[i]["Id"]]={
                        id: response.data.data[i]["Id"],
                        title: response.data.data[i]["Title"],
                        des: response.data.data[i]["Description"],
                        date: response.data.data[i]["Date"],
                        cover: response.data.data[i]["Cover"],
                        link:response.data.data[i]["Link"],
                        type:response.data.data[i]["Type"],
                      };
                      elemL='<div  class="LiveDiv bg-white mb-2 justify-content-between archive-conatiner" ><div class="archive-cover"><img src="';
                    elemL+=response.data.data[i]["Cover"];
                    elemL+='" class="archive-img" ><i  onclick="ShowVideo('+response.data.data[i]["Id"]+')"  class="btn-archive fa fa-video-camera p-3 text-center"></i></div><div class="archive-body"><h3>';
                    elemL+=response.data.data[i]["Title"]+'</h3><span>';
                    elemL+=response.data.data[i]["Description"]+'</span></div></div>';
                    LiveContent.innerHTML+=elemL;
                      
                    }
                    
                }   
              }
               else {
                if(typeof LiveContent!="undefined")
                LiveContent.innerHTML='';

              }
              getArchives();
      })["catch"](function (error) {
        Lives.innerHTML='';
        console.log(error);
        Swal.fire({
        title:(Cookies.get('name')??'')+" شرمنده",
        text:" نشد که بشه", 
        confirmButtonText: 'باشه',
        icon: "error"
        });

      });
      
      
     }
    function getArchives()
     {
        items = [];
          Cookies.set('req_data',JSON.stringify({
            'url':"http://85.208.255.101/API/selectApi_jwt.php",
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
                count_Archives.innerHTML="تعداد "+response.data.data.length+" فیلم";
                  ArchiveContent.innerHTML='';
                  for (var i = 0; i < response.data.data.length; i++) {
                    items[response.data.data[i]["Id"]]={
                      id: response.data.data[i]["Id"],
                      title: response.data.data[i]["Title"],
                      des: response.data.data[i]["Description"],
                      date: response.data.data[i]["Date"],
                      cover: response.data.data[i]["Cover"],
                      link:response.data.data[i]["Link"],
                      type:response.data.data[i]["Type"],
                    };
                    elemA='<div  class="border bg-white mb-2 justify-content-between archive-conatiner"><div class="archive-cover" ><img src="';
                    elemA+=response.data.data[i]["Cover"];
                    elemA+='" class="archive-img" ><i  onclick="ShowVideo('+response.data.data[i]["Id"]+')"  class="btn-archive fa fa-play p-3 text-center"></i></div><div class="archive-body"><h3>';
                    elemA+=response.data.data[i]["Title"]+'</h3><span>';
                    elemA+=response.data.data[i]["Description"]+'</span></div><div><label class="label label-info">';
                    elemA+=new Date(response.data.data[i]["Date"]).toISOString().split('T')[0]+'</label></div></div>';
                    ArchiveContent.innerHTML+=elemA;
                    
                  }
              }
              else
              {
                count_Archives.innerHTML="";
                ArchiveContent.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
              }
            } else {
              count_Archives.innerHTML="";
              ArchiveContent.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';

            }
            getNears();
          })["catch"](function (error) {
            console.log(error);
            Swal.fire({
      title:(Cookies.get('name')??'')+" شرمنده",
      text:" نشد که بشه", 
      confirmButtonText: 'باشه',
      icon: "error"
      });

          });
          
      
     }
    function getNears()
     {
      NearItem = [];
      
        Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
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
                  count_Near.innerHTML="تعداد "+response.data.data.length+" فیلم";
                  NearContent.innerHTML='';
                  for (var i = 0; i < response.data.data.length; i++) {
                    NearItem[response.data.data[i]["Id"]]={
                      id: response.data.data[i]["Id"],
                      title: response.data.data[i]["Title"],
                      des: response.data.data[i]["Description"],
                      date: response.data.data[i]["Date"],
                      cover: response.data.data[i]["Cover"],
                      link:response.data.data[i]["Link"],
                      type:response.data.data[i]["Type"],
                    };
                    elemN='<div  class="border bg-white mb-2 justify-content-between archive-conatiner"><div class="archive-cover" ><img src="';
                    elemN+=response.data.data[i]["Cover"];
                    elemN+='" class="archive-img" ></div><div class="archive-body"><h3>';
                    elemN+=response.data.data[i]["Title"]+'</h3><span>';
                    elemN+=response.data.data[i]["Description"]+'</span></div><div><label class="label label-info">';
                    elemN+=new Date(response.data.data[i]["Date"]).toISOString().split('T')[0]+'</label></div></div>';
                    NearContent.innerHTML+=elemN;
              }
              
            }
            else
            {
              count_Near.innerHTML="";
                NearContent.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
            }
          } else {
            count_Near.innerHTML="";
            NearContent.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
          }
        })["catch"](function (error) {
          console.log(error);
          Swal.fire({
    title:(Cookies.get('name')??'')+" شرمنده",
    text:" نشد که بشه", 
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