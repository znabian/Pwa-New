<?php
header('Content-type: application/json; charset=utf-8');
//include 'vendor/guzzlehttp/guzzle/src/Client.php';
class ApiController 
{
    private $api_token;
    private $username;
    private $password;
    public function __construct()
    {
        $this->api_token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NjI4NzYwNjYsImRhdGEiOnsidW5hbWUiOiIwOTEzMzA5MTQ3OCIsInVpZCI6IjIifX0.SVctk-awYZoyhgihLHvMgFHbA1Yq8y7tvXqJyrkvL1A2A6wQ1oms8qh9Fk-0B-3c30fIZamkfdzdLegj3EvAcXPI2kz-VJJp_WNiboYbbQ0DT5xAbMFMyZiOgKrFMlogvdJaQ_ruOOPPRZBy4qAf91bAj1Uh5OMlKD5FEDSfm_DLVQVOGsm_rgiTKZHmfrR3Zh_wt9g5fO8HflA9bRxRB7qGPkjMzMcIAnCcwCPw9R3mYZhKa2C4zKeP7ickhij1R4-xs26c_kh9u0oMzBLpCMcEDwucM1p2QwXirck0lTrOIOsF8LU3j-cn8CgWqCcDXSoxhdnnd9FdbrcMCDcVEe9aN556KpZhJURZC-k8VOM_bEa9_mygpcAyzEt5hxbcHHIRxrQA4XAPZDYawoJ7JuJLmAzrWLSA3IANwxV5RZD_cXB6JWn1e5xKIfo1Y5ON-KcPFtsnMfG10lDZgyqiVhROUbQ-R7eVog22AmDwN_hDt1OoFkeXZZZuxjLfg1vF";
        //$this->username='';
        //$this->password='';
    }
    public function getkey()
    {
        if($this->api_token)
        return $this->api_token;
        else
        {
            $data=['username'=>$this->username,'password'=>$this->password];
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, "http://85.208.255.101/api/login.php");
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $result = curl_exec($curl);
            curl_close($curl);
            if(!$result)
            die("Connection Failure");
            $result=json_decode($result);
            if($result->status==200)
            $this->api_token=$result->data;
            else
            die("Connection Failure");
            
        }
    }
    public function getData(object $request){
        $request=(object)json_decode($_COOKIE['req_data'],1);
        setcookie('req_data', '', -1, '/'); 
        //$this->getkey();
        //$js = json_decode($request->data);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl,CURLOPT_HTTPHEADER,['api_token:'.$this->api_token]);
        if($request->update??0){
            //$my  = json_decode($request->update);
            curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($request->data),"update"=>($request->update)));
        }
        else{
            curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($request->data)));
        }
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_URL, $request->url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
        curl_close($curl);
        if($request->applist??0)
        return html_entity_decode($result);
        else
        { 
            setcookie('api_result',html_entity_decode($result),0,'/');
            return (json_decode($result))->status;
        }
    }
       
    public function sendSms(object $request){
        $request=(object)json_decode($_COOKIE['req_data'],1);
        setcookie('req_data', '', -1, '/'); 
        $apiKey ='1F7ACF9B-67B5-4E02-A270-A3C377554AD2';
        $apiMainurl ='http://sms.parsgreen.ir';
        // $code = $request->token;
        // $apiMainurl =  $apiMainurl . '/Apiv2/' . "Message/SendSms";
        $ch = curl_init($apiMainurl);
        // $SmsBody = "کد ورود به پنل:". $code . "\n سامانه رشد عرفان خوش نظر";
        // $SmsBody = $request->text;
        // $Mobiles = array($request->phone);
        // $SmsNumber = null;
        // $myjson = ["SmsBody"=>$SmsBody, "Mobiles"=>$Mobiles,"SmsNumber"=>$SmsNumber];

        $code = $request->text;
        $apiMainurl =  $apiMainurl . '/Apiv2/' . "Message/SendOtp";
        $ch = curl_init($apiMainurl);
        $SmsBody = "کد ورود به پنل:". $code . "\n سامانه رشد عرفان خوش نظر";
        $Mobiles = $request->phone;
        $SmsNumber = null;
        $myjson = ["TemplateID"=>2, "Mobile"=>$Mobiles,"AddName"=>"True","SmsCode"=>$code];
        $jsonDataEncoded = json_encode($myjson);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $header =array('authorization: BASIC APIKEY:'. $apiKey,'Content-Type: application/json;charset=utf-8');
        curl_setopt($ch, CURLOPT_HTTPHEADER,$header);
        $result = curl_exec($ch);
        $res = json_decode($result);
        curl_close($ch);
        date_default_timezone_set("Asia/Tehran");
        $this->addLogApi($request->phone,$code,date("Y-m-d H:i:s"),$res->R_Success??0);
        return true;
    }
    public function addLogApi($phone,$body,$date,$status)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, [
                "phone"=>$phone,
                "body"=>"کد :". $body . "\n سامانه رشد خوش نظر",
                "platform"=>"PWA",
                'date'=>$date,
                'status'=>$status,
               ]);
        
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_URL, "http://85.208.255.101:8012/RedCastlePanel/public/api/addLogSMS");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
       return true;
    }
    public function getApps(object $request){
        $request=(object)json_decode($_COOKIE['req_data'],1);
        setcookie('req_data', '', -1, '/'); 

        $query="select * from AppTbl where Active=1 and Parent=0 order by Sort,Id";
       
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl,CURLOPT_HTTPHEADER,['api_token:'.$this->api_token]);
        
        curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($query)));
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_URL, "http://85.208.255.101/API/selectApi_jwt.php");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $AllApps = json_decode(curl_exec($curl));
        if($AllApps->status==200)
        {
            $query="select * , (select count(Id) from paymentTbl as P where (select top 1 Phone from UserTbl where UserId=id)='" .$request->Phone .
            "' and (select Id from ProductTbl where BelongsId=A.Id)=P.AppId and P.Active=1 and Access=1) as Allow from AppTbl as A where Parent=0  and (A.Active=1 or A.Type=2)   order by Sort,Id DESC";
            curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($query))); 
            $result = json_decode(curl_exec($curl));

            $query="select P.Id,BelongsId,AppName from ProductTbl as P where P.Type=1 order by P.BelongsId";
            curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($query))); 
            $MasterApp = json_decode(curl_exec($curl));
            curl_close($curl);
            $res=['status'=>$result->status,'All'=>$AllApps->data,'MyApps'=>$result->data,'MasterApp'=>$MasterApp->data,'message'=>$result->message];
           
            return json_encode($res);
        }
        else
        return json_encode($AllApps);
        
    }
    public function getMyViews($userId){       

        $query="select *,
        (select top 1 Name from AppTbl as a where a.Id=AId) as AName,
        (select top 1 Type from ChallTbl as c where c.Id=CId ) as CType,
        (case when AId=424 then (select top 1 Name from ContentTbl where Id=CId) else (CASE WHEN RIGHT(QueryString, 2) = ',2' or AId=1563 THEN (select top 1 Name from AppTbl as a where a.Id=CId) ELSE (select top 1 Name from ChallTbl as b where b.Id=CId) END ) end) as CName,
        (case when AId=424 then (
            (select top 1 Name from AppTbl where Id=(select top 1 Parent from AppTbl where Id=(select top 1 AppId from ContentTbl where Id=CId))) 
            +N'-'+(select top 1 Name from AppTbl where Id=(select top 1 AppId from ContentTbl where Id=CId))
            +N'-'+(select top 1 Name from ExpertTbl where Active=1 and id=(select top 1 BelongsId from ContentTbl where Id=CId))
        ) else(CASE WHEN RIGHT(QueryString, 2) = ',2'  or AId=1563 THEN (select top 1 isnull(Meta,(select top 1 Name from AppTbl as b where b.Id=a.Parent)) from AppTbl as a where a.Id=CId) ELSE ((select top 1 Name from AppTbl as a where a.Id=(select top 1 AppId from ChallTbl as b where b.Id=CId))+N' از '+((select top 1 Name from AppTbl as level where level.Id=(select top 1 Parent from AppTbl as step where step.Id=(select top 1 AppId from ChallTbl as chall where chall.Id=CId))))) END ) end) as CStep,
        
        (select top 1 Logo from AppTbl as c where c.Id=AId) as ALogo
        from ViewTbl where UserId=$userId and Type='PWA' and AId is not null and TotalTime <> '0' and TotalTime is not null order By Date Desc";
        /*
        (select top 1 Name from ChallTbl as b where b.Id=CId) as CName,
        (select top 1 Name from AppTbl as a where a.Id=(select top 1 AppId from ChallTbl as b where b.Id=CId)) as CStep,
        (select top 1 Name from AppTbl as level where level.Id=(select top 1 Parent from AppTbl as step where step.Id=(select top 1 AppId from ChallTbl as chall where chall.Id=CId))) as CLevel,
        (select top 1 Logo from AppTbl as c where c.Id=AId) as ALogo
        from ViewTbl where UserId=$userId and Type='PWA' and AId is not null and TotalTime <> '0' and TotalTime is not null  ";*/
       
        
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl,CURLOPT_HTTPHEADER,['api_token:'.$this->api_token]);
        
        curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($query)));
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_URL, "http://85.208.255.101/API/selectApi_jwt.php");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $res = (curl_exec($curl));
        return ($res);
        
    }
    public function getMyRank($userId){       

        $query="select * from (SELECT UserId, SUM(CAST(Times as float)) AS times_sum, DENSE_RANK() OVER (ORDER BY SUM(CAST(Times as float)) DESC ) AS rank
        FROM ViewTbl
        where Times is not null
        and Type='PWA'  and AId is not null and TotalTime <> '0'
        GROUP BY UserId) as ranks where UserId=$userId";
       
                
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl,CURLOPT_HTTPHEADER,['api_token:'.$this->api_token]);
        
        curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($query)));
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_URL, "http://85.208.255.101/API/selectApi_jwt.php");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $res = (curl_exec($curl));
        return ($res);
        
    }
    public function getMyViewApps($ID){       

        $query="select * from ViewTbl where UserId=$ID and Type='PWA' and AId is not null ";
       
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl,CURLOPT_HTTPHEADER,['api_token:'.$this->api_token]);
        
        curl_setopt($curl, CURLOPT_POSTFIELDS, array("data"=>($query)));
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_URL, "http://85.208.255.101/API/selectApi_jwt.php");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $res = json_decode(curl_exec($curl));
        return json_encode($res);
        
    }
}
