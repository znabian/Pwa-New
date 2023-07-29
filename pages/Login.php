<!DOCTYPE html>
<html lang="en">

<head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
       <title>Sorkh</title>
       <link rel="icon" type="image/x-icon" href="./public/favicon.ico">
       <link rel="stylesheet" href="./public/bootstrap/css/bootstrap.min.css?h=11cd6552f0cfd1243be7481c40111374">
       <link rel="manifest" href="./manifest.json?h=eed4d16da80411bc190c3c04527f71d5">
       <link rel="stylesheet" href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome.min.css">
       <link rel="stylesheet" href="./public/css/styles.min.css?h=1623853f1de45657c9808a33c26eacf8">
       <link rel="stylesheet" href="./public/fonts/font-awesome/css/font-awesome.min.css">
<style>
  @media (min-width: 768px)
  {
    #loginPic{
      width: 25% !important;
    }
    .swal2-popup
     {
      font-size: 10pt!important;
    }
  }

  .loader{
    width: 86px;
    height: 94px;
    margin: 0 auto;
    position: relative;
}
.loader div{
    width: 18px;
    height: 18px;
    margin: 0 10px 0 0;
    border-radius: 50px;
    transform-origin: 50% 0;
    display: inline-block;
    animation: bounce 1s linear infinite;
}
.loader div:last-child{ margin: 0; }
.loader div:nth-child(1){ background: #f42f25; }
.loader div:nth-child(2){
    background: #f49725;
    animation-delay: 0.1s;
}
.loader div:nth-child(3){
    background: #255ff4;
    animation-delay: 0.2s;
}
@keyframes bounce{
    0%, 100%{
        transform: translateY(0) scale(1, 1);
        animation-timing-function: ease-in;
    }
    45%{
        transform: translateY(80px) scale(1, 1);
        animation-timing-function: linear;
    }
    50%{
        transform: translateY(80px) scale(1.5, 0.5);
        animation-timing-function: linear;
    }
    55%{
        transform: translateY(80px) scale(1, 1);
        animation-timing-function: ease-out;
    }
}
</style>
<script>
       window.onload=(function () {
              loader.remove();
              content.classList.remove('d-none');
       });
   </script>
</head>

<body style="background: rgb(253,247,253);">
<!-- Start: Navbar Centered Links -->
       <nav class="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav" style="text-align: right;border-style: none;background: rgb(250,248,254);">
              <div class="container">
                <span class="m-auto" style="font-family: 'Peyda ExtBd';position: sticky;">سامانه رشد خوش نظر</span><img style="width: 20px;height: 20px;" width="20" height="20" src="./public/img/brands/logo.png?h=e92598d96c7d0f6733acc9635d1a2bbe"></div>
       </nav><!-- End: Navbar Centered Links -->
       <div id="content" class="d-none">
       <header class="bg-primary-gradient"><!-- Start: Hero Clean Reverse -->
              <div class="container pt-4 pt-xl-5">
                <img id="loginPic" style="display: block;width: 90%;margin: 0 auto;border-radius: 26px;" src="./public/img/login.png?h=dbf6a87b0224a97e0d0f3a635fb9829d">
                     <div class="row pt-5 d-md-block" style="position: static;direction: rtl;">
                            <div class="col">
                              <strong class="text-center d-flex justify-content-center" style="font-family: 'Peyda ExtBd';font-size: 17px;text-align: center;">عرفان خوش نظر</strong><strong class="text-center d-flex justify-content-center" style="font-family: 'Peyda SemBd';font-size: 16px;color: rgb(137,137,137);">سامانه رشد خوش نظر</strong></div>
                            <div class="col-md-8 col-xl-6 text-center text-md-start mx-auto" style="margin-top: 10px;">
                                   <div class="input-group"></div>
                                   <div class="row" style="margin: 0 auto;">
                                          <div class="col" style="direction: ltr;">
                                                 <div class="input-group" style="margin: auto;width: 80%;">
                                                        <input type="number" id="Phone" class="form-control" style="font-family: 'Peyda SemBd';background-color:white;font-size: 10px;text-align: right; color: rgb(137,137,137);" placeholder="شماره تماس">

                                                        <span class="input-group-text"><i class="la la-mobile-phone" style="color: rgb(137,137,137);font-size: 1.2em;"></i></span>

                                                 </div>
                                                 <div class="input-group" style="margin:5px auto; width: 80%">
                                                        <input type="number" id="Pass" name="pass" class="form-control" style="font-family: 'Peyda SemBd';background-color: white;
                                                            font-size: 10px;text-align: right;color: rgb(137, 137, 137);" placeholder="رمز عبور" />

                                                        <span class="input-group-text"><i class="la la-lock" style="color: rgb(137, 137, 137); font-size: 1.2em"></i></span>
                                                 </div>
                                                 

                                                 <div id="buttons_login" class="col-md-10 m-auto">
                                                      <a class="pb-1 pull-left" style="font-family: 'Peyda SemBd';font-size: 14px;color: blue;margin-left: 9%;" onclick="forget()">
                                                        فراموشی رمزعبور
                                                      </a> 
                                                      <button class="btn w-100" style="background: #be0323; border-radius: 30px; box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.09); padding: 12px;font-family: 'Peyda SemBd';font-size: 15px;color: white;"
                                                       onclick="login()">
                                                        شروع کنید
                                                      </button>                                                        
                                                 </div>

                                                 <!-- <div id="buttons_login">
                                                        <button class="btn" style="background: #be0323; border-radius: 30px;
                                                             box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.09);width: 170px;padding: 12px;font-family: 'Peyda SemBd'; font-size: 15px;color: white;" onclick="login()">
                                                               شروع کنید
                                                        </button>
                                                        <button class="btn" style=" background: #be0323; border-radius: 30px; box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.09);
                                                             width: 170px; padding: 12px;font-family: 'Peyda SemBd'; font-size: 15px;color: white;" onclick="forget()">
                                                               فراموشی رمزعبور
                                                        </button>
                                                     </div> -->
                                                 <div id="spinner" class="d-none">
                                                        لطفا کمی صبر کنید...
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
              <!-- End: Hero Clean Reverse -->
       </header>
       </div>
       <div id="loader" class="container-fluid text-center" style="position: absolute;top: 45%;" >
              <div class="loader">
              <div></div>
              <div></div>
              <div></div>
              </div>
       </div>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
       <script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
       <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <!-- <script src="./public/js/login.js?h=9a9b15"></script> -->
      <script src="./js-decode/login.js?h=9a9b17"></script>
      <!-- <script src="https://cdn.jsdelivr.net/npm/moment-jalaali@0.10.0/build/moment-jalaali.min.js"></script> -->
  
</body>

</html>