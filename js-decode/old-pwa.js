var ENUM="NewPWA:1.4";

function login(phone,aid)
{  
  if(phone)
          {
          var select =
                  "select TOP 1 Id,Name,Family,Phone,Father,Perm,AndroidId,SellerId,SupportId,Pass from UserTbl where Phone='" +
                  phone +
                  "' and AndroidId='"+aid+
                  "' and Active=1 and Perm!=3 order by Perm DESC";
          
          var userLoginDate = new Date()
          
          var jalaliDate =  new Intl.DateTimeFormat('fa-IR-u-nu-latn', {dateStyle: 'short',timeStyle: 'long'}).format(userLoginDate).replace(',','');
          
          Cookies.set('req_data',JSON.stringify({
          'url':"http://85.208.255.101/API/selectApi_jwt.php",
          'data':select
          }));
          axios({
          method: 'POST',
          url:'api/data',
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

              Cookies.set('phone',phone, 2592000)

              Cookies.set('perm', response_data[0]['Perm'], 2592000)
              Cookies.set('androidId', aid, 2592000)
              Cookies.set('flag', 1)
              Cookies.set('name', response_data[0]['Name']+' '+response_data[0]['Family'], 2592000)
              

              getApps();
              }
               else {
              Cookies.remove("api_result");
              buttons_login.classList.add('d-none');
              Swal.fire({
                title:" کاربر گرامی",
                text:"اطلاعات وارد شده صحیح نمی باشد", 
                confirmButtonText: 'بازگشت',
                icon: "error"
                }).then((result) => {
                if (result.isConfirmed)                      
                window.location.href = "https://pwa.erfankhoshnazar.com/"; 
                });
              }
       })
       ['catch'](function (error) {
              Cookies.remove("api_result");
              buttons_login.classList.add('d-none');
              console.log(error)
              Swal.fire({
                title:" کاربر گرامی",
                text:"اطلاعات وارد شده صحیح نمی باشد", 
                confirmButtonText: 'بازگشت',
                icon: "error"
                }).then((result) => {
                if (result.isConfirmed)                      
                window.location.href = "https://pwa.erfankhoshnazar.com/"; 
        });
       })

       }
       
        else
        {
              buttons_login.classList.add('d-none');
              Swal.fire({
                      title:" کاربر گرامی",
                      text:"اطلاعات وارد شده صحیح نمی باشد", 
                      confirmButtonText: 'بازگشت',
                      icon: "error"
                      }).then((result) => {
                      if (result.isConfirmed)                      
                      window.location.href = "https://pwa.erfankhoshnazar.com/"; 
              });
        }
}
function goToCastle() {
  
  Cookies.remove("field");Cookies.remove("tabs");Cookies.remove("chosenCatData");
  Cookies.remove("RealityShowAllow");Cookies.remove("RealityShow");
  
    _castles=Cookies.get("Castles")??[];
    find=false;
    if(_castles.length>0)
    {
      _castles=JSON.parse(_castles);
      _castles.forEach(function(item,index){
        if(item==1550)
        find=true;
      });
    }
    if(!find)
    {
      if(_castles.length>=3)
        _castles.shift();
      _castles.push(1550);
      Cookies.set("Castles", JSON.stringify(_castles), 2592000);
    }    
    /*Cookies.set("RealityShow",true,2592000);
      allow=1;
      Cookies.set("RealityShowAllow",allow,2592000);
      location.href="RealityShow";*/
      buttons_login.classList.add('d-none');
      Cookies.set("Castle_show",1550,2592000);
      window.location.assign("Castle");
  }
  function  getApps() {
    buttons_login.classList.remove('d-none');
    var apps=Master_App= app_All=MyApps=MyMaster= [];
    var sub={
      30:["65","66","64","1545","1546","1547","1548","1549","1550"],
      31:["65","66","64","1545","1546","1547","1548","1549","1550","463","1451","1563"],
      32:["1","64","65","66","183","215","376","424","463","714","779","1510","1441","1451","1543","1544","1545","1546","1547","1548","1549","1550","1563","jibsorkh","sharsorkh","banovan"],
      33:["1451","64","215","714","376","1441","1510","463","1451","1544","1573","1092"],
      34:["banovan","183","424"],
      27:[]
    };
    const RedCastle=["1549","1548","1547","1546","1545"];
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
                Description : "", Id:"banovan",
                Name:  "کاخ بانوان", Parent: "0",Perm : "-1",
                Price :"300000", Type : "1"}
                  ,
          
                
                {Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/jibsorkh.png",
                  Description : "", Id:"jibsorkh",
                  Name:  " جیب سرخ", Parent: "0",Perm : "-1",
                  Price :"300000", Type : "link",Link:"https://erfankhoshnazar.com/product_jibe_sorkh/"},
                 
                  {Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/shahrsorkh.png",
                    Description : "", Id:"sharsorkh",
                    Name:  " شهر سرخ", Parent: "0",Perm : "-1",
                    Price :"300000", Type : "link",Link:"https://sorkhcity.com/"}
          ];
            Master_App=response.data.MasterApp;
            app_All=response.data.All;
            app_All=app_All.concat(a);
            MyApps = response.data.MyApps;
              MyMaster=[];
              MyApps.filter(function(obj,index) {
                find=in_array(Master_App,'BelongsId',obj['Id']);
                if(find['Result'] && obj['Allow']>0)
                   MyMaster.push(find['Item']['Id']);                   
              });
              
              apps=[];
              MyMaster.forEach(function(master)
              {
                app_All.filter(function(obj,index) {
                  obj['Allow']=1;
                  if(sub[master].includes(obj['Id']) && !in_array(apps,'Id',obj['Id'])['Result'])
                  {
                    if(obj['Id']==1)
                    {
                      RedCastle.forEach(function(reditem)
                      {
                        find=in_array(app_All,'Id',reditem);
                        if(find['Result'] && !in_array(apps,'Id',reditem)['Result'])
                        {
                          find['Item']['Allow']=1;
                          apps.push(find['Item']);
                        }
                      });
                    }
                    else if(!["779","1543"].includes(obj['Id']))
                    {
                      apps.push(obj);
                    }
                  }
                });
              });
              app_All.filter(function(obj,index) {
                find=in_array(MyApps,'Id',obj['Id']);
              if(find['Result'])
                {
                  obj['Allow']=1;
                 if(find['Item']['Allow']>0)
                  if(!in_array(apps,'Id',obj['Id'])['Result'])
                  {
                    if(obj['Id']==1)
                    {
                      RedCastle.forEach(function(reditem)
                      {
                        find=in_array(app_All,'Id',reditem);
                        if(find['Result'] && !in_array(apps,'Id',reditem)['Result'])
                        {
                          if(!["779","1543"].includes(obj['Id']))
                          {
                            find['Item']['Allow']=1;
                          apps.push(find['Item']);
                          }
                        }
                      });
                    }
                    else if(!["779","1543"].includes(obj['Id']))
                        apps.push(obj);  
                  }                 
                }
              });
              apps.filter(function(obj,index)
               {
                if(obj['Id']==1543)//sorkh family
                apps.splice(index, 1);
                else if(obj['Id']==779)//old micro sorkh
                apps.splice(index, 1);
               /* else if(obj['Id']==1550)//rafiq shafiq
                apps.splice(index, 1);*/
                
              });
              var rs={Active : "1", Allow: "1",Logo:"https://dl.erfankhoshnazar.com/downloads/icon/1550.png",
              Description : "رئالیتی شو", Id:"1550",
              Name:  " رفیق شفیق", Parent: "0",Perm : "-1",
              };
              if(!in_array(apps,'Id',1550)['Result'])
              apps.push(rs);
              
            Cookies.set("app_flag", 1, 2592000);
            localStorage.setItem("app_list", JSON.stringify(apps));
            localStorage.setItem("MyMaster", JSON.stringify(MyMaster));         
            
               goToCastle()
          } else {  
              console.log(response.data.message);      
            Swal.fire({
              title:(Cookies.get('name')??'')+" شرمنده",
              html:" نشد که بشه <br>"+response.data.message, 
              showDenyButton: true,
              confirmButtonText: 'دورباره سعی کن',
              denyButtonText: 'بیخیال',
              icon: "error"
              }).then((result) => {
                if (result.isConfirmed)
                getApps()
              });
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