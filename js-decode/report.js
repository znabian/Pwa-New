const castleHaveSound=["183","424","1092"];
    const castleException=["1550"];
    var RedCastle=["1549","1548","1547","1546","1545","1"];
    var items=items2=[];flag=0;
    var logo="./public/img/brands/logo.png";
    var img="./public/img/products/reportcard.png?v=124b1";
    var totalRnk=[];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
     $(document).ready(function () 
    { 
       if((Cookies.get("flag")??0)==0)
            window.location.assign("Login");
          else
          if(urlParams.get('app'))
          seenVideos();
          else
          myrank() ;
          backbtn.addEventListener("click", goBack);
    });
    function goBack() 
    {
      location.href="Home";
    }
    function formatTime(seconds)
     {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = (seconds % 60).toFixed(0);
      const formattedTime = [hours, minutes, remainingSeconds]
        .map(time => time.toString().padStart(2, '0'))
        .join(':');
      return formattedTime;
     }
    function formatTime2(seconds)
     {
      const hh = Math.floor(seconds / 3600);
      const mm = Math.floor((seconds % 3600) / 60);
      const ss = (seconds % 60).toFixed(0);

        // const date = new Date(seconds * 1000);
        // const hh = date.getUTCHours();
        // const mm = date.getUTCMinutes();
        // const ss = date.getSeconds();
        a=[];
        if(hh)
        { h= hh+" ساعت";a.push(h);}
        if(mm)
        {m= mm+" دقیقه";a.push(m);}
        if(ss)
        { s= ss+" ثانیه";a.push(s);}
        if(a.length)
        return a.join('  و ') +' آموزش از این دوره دیدی';
        else
        return " هیچ آموزشی از این دوره را ندیدی";
        
     }
     function calculateVideoProgress(currentTime, duration)
      {
      if(duration==0)
      return 0;
      else
      {
      var percent = (currentTime / duration) * 100;
      var roundedPercent = Math.round(percent * 100) / 100;
      return roundedPercent.toFixed(0);
      }
      }
       function seenVideos() 
       {
        items=[];flag=0;
          axios({
            method: 'POST',
            url:'api/ViewApps',
            data:{data:Cookies.get('id')},
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (response) {

                if(response.data.status=='200')
                {
                  flag=1;
                  for (let index = 0; index < response.data.data.length; index++) {
                      app=response.data.data[index];
                      if(RedCastle.includes(app['AId']))
                      {
                      app['AId']=1;
                      app['AName']="مجموعه کاخ ها";
                      app['ALogo']="./public/img/64.png";
                      }
                      if(items[app['AId']])
                      {
                        items[app['AId']]['cid'].push(app['CId']);
                       // items[app['AId']]['Full']=items[app['AId']]['Full']+parseInt(app['FullCount']??0);
                      
                      }
                      else
                      {
                        items[app['AId']]={
                          ALogo:app['ALogo']??logo,
                          AName:app['AName'],
                          AId:app['AId'], cid:[app['CId']],
                          Full:0,Times:0,
                        };
                      }
                        items[app['AId']][app['CId']]={url:(app['QueryString']??'mp4,2').split(','),
                          CName:app['CName'], CType:app['CType'], Step:app['CStep'],Full:parseInt(app['FullCount']??0),
                          Times:app['Times'],TotalTime:app['TotalTime'],Date:app['Date']
                        };
                        items[app['AId']]["Times"]+= parseFloat(app['Times']??0);
                        items[app['AId']]["Full"]+= parseFloat(app['FullCount']??0);
                    
                  }
                  items.sort(function(a, b) {
                      return  b.Times - a.Times;
                    });
                   btn1.disabled=false;
                   btn2.disabled=false;
                   var res=in_array(items,'AId',urlParams.get("app")??-1);
                   if(res['Result'])
                   {
                    detailesShow(res['Index']);
                   }
                   else
                  myActivity();
                }
                else
                {
                  viewContent.classList.add('mt-3');
                  viewContent.innerHTML='<p class="alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
                }
            })
            ['catch'](function (error) {
              Cookies.remove("api_result");
              console.log(error);
            })
            
      
       }
       function myrank(app=0,name=null) 
       {
        rank.innerHTML='-';
        rank2.innerHTML='-';
        if(urlParams.get('app'))
            data={uid:Cookies.get('id'),aid:urlParams.get('app')};
        else
            if(app)
                data={uid:Cookies.get('id'),aid:app};
            else
            data={data:Cookies.get('id')}
          axios({
            method: 'POST',
            url:'api/MyRank',
            data:data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (response) {

                if(response.data.status=='200')
                {
                  if(app)
                  name="توی "+name+" ";
                  else
                  name="";
                  rank.innerHTML=response.data.data[0]['rank'];
                  rank.parentNode.title=name+"رتبه "+rank.innerText+" امی ";
                  rank2.innerHTML=formatTime(response.data.data[0]['times_sum']);
                  rank2.parentNode.title=name+formatTime2(response.data.data[0]['times_sum']).replace(' آموزش از این دوره دیدی'," آموزش دیدی ");
                  if(!app)
                  totalRnk=[response.data.data[0]['rank'],response.data.data[0]['times_sum']];
                }
                else
                {
                  rank.innerHTML='-';
                  rank2.innerHTML='-';
                }
            })
            ['catch'](function (error) {
              Cookies.remove("api_result");
              console.log(error);
            })   
            if(!flag)         
             seenVideos();
       }
      function myActivity()
      {        
        window.scrollTo(0,0);
        castle_Image.src=img;
        castle_Title.innerHTML="کارنامه";

        if(totalRnk.length)
        {
        rank.innerHTML=totalRnk[0];
        rank.parentNode.title="رتبه "+rank.innerText+" امی ";
        rank2.innerHTML=formatTime(totalRnk[1]);
        rank2.parentNode.title=formatTime2(totalRnk[1]).replace(' آموزش از این دوره دیدی'," آموزش دیدی ");               
        } 
        else
        {
          rank.innerHTML='?';
        rank.parentNode.title="";
        rank2.innerHTML='?';
        rank2.parentNode.title="";
        }
        
                
        myvideo.classList.remove('in');
        backbtn.removeEventListener("click", myActivity);
        backbtn.removeEventListener("click", MainDivShow);
        backbtn.addEventListener("click", goBack);
       /* backbtn.removeEventListener("click", goBack);
        backbtn.addEventListener("click", MainDivShow);*/
        myvideo.classList.add('in');
        if(items.length)
        {
            viewContent.innerHTML='';
            items.forEach(function(itm,id)
                  { 
                    elem = '<div class="bg-white mt-3 p-1 rounded row rtl"><div class="col-3 col-form-label col-md-2 icon-container"><img onclick="goToCastle('+itm['AId']+')" src="'+itm['ALogo']+'" class="pointer image m-auto " alt="Image"></div>';
                     elem+='<div class="col text-right"><div class="row pt-2 " style="font-size: 10pt;"><div class="col-md-12">';
                    elem+='<h6>'+itm['AName']+' <small>('+itm['cid'].length+' آموزش)</small></h6> </div><div class="col-md-12"><p>'+formatTime2(itm['Times'])+' </p>';
                    
                    elem+='</div> </div>  </div><div class="col-2 m-auto"><button onclick="detailesShow('+id+')" class="btn btn-danger btn-sm fa fa-arrow-left rounded-5"></button></div></div> ';
                    
                    if(urlParams.get('app')!=null)
                      if(urlParams.get('app')==itm['AId'])
                         viewContent.innerHTML+=elem
                      else
                      elm='';
                    else
                         viewContent.innerHTML+=elem
                  });
                  if(document.querySelector("#viewContent").childNodes.length==0)
                  viewContent.innerHTML='<p class="mt-5 alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
          }
          else if(flag)
          {
            //backbtn.addEventListener("click", MainDivShow);
            viewContent.classList.add('mt-3');
            viewContent.innerHTML='<p class="mt-5 alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
          }
      }
       function detailesShow(id)
       {
        myvideo.classList.remove('in');
        backbtn.removeEventListener("click", MainDivShow);
        backbtn.removeEventListener("click", goBack);

        if(!urlParams.get('app'))
        backbtn.addEventListener("click", myActivity);
        else
        backbtn.addEventListener("click", goBack);

        castle_Image.src=items[id]['ALogo'];
        castle_Title.innerHTML=items[id]['AName'];
        myrank(items[id]['AId'],items[id]['AName']);
        viewContent.innerHTML='';
        myvideo.classList.add('in');
        items[id]['cid'].forEach(function(itm)
                  {
                    app=items[id][itm];
                                      
                    if(app['Date'])
                    jDate =moment(app['Date'], 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY-MM-DD  ساعت HH:mm');
                    else
                    jDate ='';
                       elem = '<div class="bg-white mt-3 p-1 rounded row rtl"><div class="col-3 col-form-label col-md-2 icon-container"><img src="'+items[id]['ALogo']+'" class="image m-auto " alt="Image"></div>';
                        elem+='<div class="col text-right"><div class="row pt-2 " style="font-size: 10pt;"><div class="col-md-12"><span class="d-block pull-left FA-numbers">'+jDate+'</span></div><div class="col-md-12">';
                        elem+='<b>'+app['CName']+'</b> </div><div class="col-md-12"><p>'+app['Step']+'</p><p>';
                        t1=formatTime(app['Times']);t2=formatTime(app['TotalTime']);
                       /* percent = (app['Times'] / app['TotalTime']) * 100;
                        t3 = Math.round(percent * 100) / 100;*/
                        t3=calculateVideoProgress(app['Times'],app['TotalTime']);
                        if(!app['TotalTime'])
                        elem+=" هنوز شروع نکرده منصرف شدی";
                        else
                        {
                        elem+='<div class="progress"><div class="progress-bar bg-danger progress-bar-striped " role="progressbar" aria-valuenow="'+t3+'" aria-valuemin="0" aria-valuemax="100" style="width:'+t3+'%">'+t3+'%</div></div>';
                        if(t3>=100)
                        elem+=' دست خوش! کل آموزش رو دیدی';
                        else
                        {
                          if(t3<=20)
                          elem+='تازه اولشی';
                          else if(t3>20 && t3<=40)
                          elem+='یکمی مونده تا وسط آموزش';
                          else if(t3>40 && t3<=55)
                          elem+='فقط نصفش مونده';
                          else if(t3>55 && t3<=95)
                          elem+='یکم دیگه ببینی تمومه';
                          else if(t3>95)
                          elem+=' دیگه آخراشه';
                          /*else
                          elem+=t3+'% از آموزش رو دیدی';*/
                        }
                        }
                        elem+='</p></div> </div>  </div>';
                        if(t3<100)
                        {
                         elem+='<div class="m-auto"><button onclick="';
                       // if(id==1563)
                        elem+='showVideo_VR(\''+itm+'\',\''+items[id]['AId']+'\',\''+app['CType']+'\',1)"';
                        /*else
                        elem+='showVideo('+itm+','+id+')"';*/
                        elem+=' class="btn btn-danger btn-sm rounded-1">ادامه آموزش<i class="fa fa-arrow-left pt-1 mr-1"></i></button></div>';                       

                        }
                         /*else
                         {
                          elem+='<div class="m-auto"><button onclick="';
                           elem+='comment(\''+itm+'\',\''+items[id]['AId']+'\')"';
                           elem+=' class="pointer btn btn-danger btn-sm rounded-1">ثبت نظر<i class="fa fa-comment pt-1 mr-1"></i></button></div>';                       
   
                         }*/
                        elem+='</div> ';
                        viewContent.innerHTML+=elem;                   
                   
                  });
                  window.scrollTo(0,0);
       }
       function MainDivShow()
       {
        castle_Image.src=img;
        castle_Title.innerHTML="کارنامه";
        var elements = document.querySelectorAll('.in');
        //viewContent.classList.remove('slide');
        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove('in');
          elements[i].classList.add('d-none');
        }
        backbtn.removeEventListener("click", MainDivShow);
        backbtn.addEventListener("click", goBack);
        maindiv.classList.remove('d-none');
       }
       function comment(CId,appid)
        { 
              var find=in_array(items,'AId',appid);
              cidtxt.value=CId;
              commentModalTitle.innerHTML="ثبت نظر برای دوره "+find['Item'][CId]['CName'];
              $('#commentModal').modal('show');
        }
       function showVideo_VR(CId,appid,type,ask=1)
        { 
              var find=in_array(items,'AId',appid);
              name=find['Item'][CId]['CName'];
              if(find['Item'][CId]['url'][1]==2)
              {
                format=find['Item'][CId]['url'][0];
                userid = Cookies.get("id");
                androidid = Cookies.get("androidId");
                window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid + "&format=" + format; 
              }
              else
              {
                format=find['Item'][CId]['url'][0];
                vr=find['Item'][CId]['url'][1];
                userid = Cookies.get("id");
                androidid = Cookies.get("androidId");
                window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid + "&format=" + format+ "&vr="+vr ; 
              }
        }
        function showVideo_VR_1(CId,appid,type,ask=1)
        { 
            var find=in_array(items,'AId',appid);
            name=find['Item'][CId]['CName'];
            if(castleHaveSound.includes(appid))
              {
                Swal.fire({
                  title:" مشاهده \n' "+name+" '",
                  text:"می خوای این قسمت  چطوری باشه؟",
                  showDenyButton: true,
                  showCancelButton: false,
                  confirmButtonText: 'فیلم',
                  denyButtonText: "صوت",
                }).then((result) => {
                  if (result.isConfirmed) {
                    userid = Cookies.get("id");
                    androidid = Cookies.get("androidId");
                    window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid 
                    
                  } else if (result.isDenied) {
                    format = 'mp3';
                    userid = Cookies.get("id");
                    androidid = Cookies.get("androidId");
                    window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid + "&format=" + format; 
                    
                  }
                });
              }
              else if(castleException.includes(appid))
              {
                    userid = Cookies.get("id");
                    androidid = Cookies.get("androidId");
                    window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid                     
              }
              else
              {         
                  if(type!="6")
                  {
                        userid = Cookies.get("id");
                        androidid = Cookies.get("androidId");
                        window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid + "&vr=0" ; 
                  }
                  else      
                  {
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
                          userid = Cookies.get("id");
                          androidid = Cookies.get("androidId");
                          window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid + "&vr=0" ; 
                          
                        } else if (result.isDenied) {
                          userid = Cookies.get("id");
                          androidid = Cookies.get("androidId");
                          window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid + "&vr=1" ; 
                          
                        }
                    });
                    }
                    else
                    {
                      userid = Cookies.get("id");
                      androidid = Cookies.get("androidId");
                      window.location.href = "http://85.208.255.101:8012/Web/player/index2.php?appid=" + appid + "&id=" + CId + "&userid=" + userid + "&androidid=" + androidid + "&vr=1" ; 
                    }
                  }
            
          }
          
        } 
        function myFavority()
        {
          myvideo.classList.remove('in');
          backbtn.removeEventListener("click", goBack);
          backbtn.removeEventListener("click", myActivity);
          backbtn.removeEventListener("click", myFavority);
          backbtn.addEventListener("click", MainDivShow);
          myvideo.classList.add('in');
          if(items.length)
          {
              viewContent.innerHTML='';
              items2=[];
              items.forEach(function(itm,id)
                    { 
                      if(itm['Full'])
                      {
                        itm['cid'].forEach(function(cid)
                        { 
                          app=itm[cid];
                          if(app['Full'])
                          {
                          items2.push(
                            {
                             ALogo: itm['ALogo']??logo,
                              AName:itm['AName'],
                              Step:app['Step'],
                              CName:app['CName'],
                              Full:app['Full']
                            }
                          );

                          }
                        });
                      }
                    });
              items2.sort(function(c, d) {
                      return  d.Full - c.Full;
                    });
                    items2.forEach((itm)=>{
                      elem = '<div class="bg-white mt-3 p-1 rounded row rtl"><div class="col-3 col-form-label col-md-2 icon-container"><img src="'+itm['ALogo']+'" class="image m-auto " alt="Image"></div>';
                          elem+='<div class="col text-right"><div class="row pt-2 " style="font-size: 10pt;"><div class="col-md-12">';
                          elem+='<h6>'+itm['AName']+':'+itm['Step']+'</h6> </div><div class="col-md-12"><p><b>'+itm['CName']+'</b>  رو  '+(itm['Full'])+' بار کامل دیده ای</p>';
                          
                          elem+='</div> </div>  </div></div> ';
                          viewContent.innerHTML+=elem
                    });
            }
            else if(flag)
            {
              //backbtn.addEventListener("click", MainDivShow);
              viewContent.classList.add('mt-3');
              viewContent.innerHTML='<p class="mt-5 alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
            }
        }
        function incompleteApp()
        {
          myvideo.classList.remove('in');
          backbtn.removeEventListener("click", goBack);
          backbtn.removeEventListener("click", myActivity);
          backbtn.removeEventListener("click", myFavority);
          backbtn.addEventListener("click", MainDivShow);
          myvideo.classList.add('in');
          if(items.length)
          {
              viewContent.innerHTML='';
              items2=[];
              items.forEach(function(itm,id)
                    { 
                      if(itm['Full'])
                      {
                        itm['cid'].forEach(function(cid)
                        { 
                          app=itm[cid];
                          if(app['Full'])
                          {
                          items2.push(
                            {
                             ALogo: itm['ALogo']??logo,
                              AName:itm['AName'],
                              Step:app['Step'],
                              CName:app['CName'],
                              Full:app['Full']
                            }
                          );

                          }
                        });
                      }
                    });
              items2.sort(function(c, d) {
                      return  d.Full - c.Full;
                    });
                    items2.forEach((itm)=>{
                      elem = '<div class="bg-white mt-3 p-1 rounded row rtl"><div class="col-3 col-form-label col-md-2 icon-container"><img src="'+itm['ALogo']+'" class="image m-auto " alt="Image"></div>';
                          elem+='<div class="col text-right"><div class="row pt-2 " style="font-size: 10pt;"><div class="col-md-12">';
                          elem+='<h6>'+itm['AName']+':'+itm['Step']+'</h6> </div><div class="col-md-12"><p><b>'+itm['CName']+'</b>  رو  '+(itm['Full'])+' بار کامل دیده ای</p>';
                          
                          elem+='</div> </div>  </div></div> ';
                          viewContent.innerHTML+=elem
                    });
            }
            else if(flag)
            {
              //backbtn.addEventListener("click", MainDivShow);
              viewContent.classList.add('mt-3');
              viewContent.innerHTML='<p class="mt-5 alert alert-dark text-center">اطلاعاتی یافت نشد</p>';
            }
        }
        function goToCastle(id) {
          Cookies.remove("field");Cookies.remove("tabs");Cookies.remove("chosenCatData");
          Cookies.remove("RealityShowAllow");Cookies.remove("RealityShow");
               
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
              window.location.assign("Castle");
          
        }
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
       
  