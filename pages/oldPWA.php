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
</style>
      </head>

<body style="background: rgb(253,247,253);"><!-- Start: Navbar Centered Links -->
       <nav class="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav" style="text-align: right;border-style: none;background: rgb(250,248,254);">
              <div class="container">
                <span class="m-auto" style="font-family: 'Peyda ExtBd';position: sticky;">سامانه رشد خوش نظر</span><img style="width: 20px;height: 20px;" width="20" height="20" src="./public/img/brands/logo.png?h=e92598d96c7d0f6733acc9635d1a2bbe"></div>
       </nav><!-- End: Navbar Centered Links -->
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
                                                 <div id="buttons_login" class="col-md-10 m-auto rounded text-bg-danger text-center">
                                                      <p class="p-3" dir="rtl">در حال انتقال به نسخه جدید pwa <span id="txt" class="fa fa-pulse fa-spinner" style="font-size: 10pt;"></span></p> 
                                                 </div>  
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
              <!-- End: Hero Clean Reverse -->
       </header>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
       <script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
       <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
       <script src="./js-decode/old-pwa.js?h=9a9b23"></script>
  <script>
      
      <?php
            if(!($_POST['phone']))
            {
              
       ?>
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
       <?php
            }
            else
            {
            ?>
            phone="<?php echo $_POST['phone']??0 ?>";
              aid="<?php echo $_POST['android']??0 ?>";
              login(phone,aid);
        
       <?php
            }
            ?>
   </script>
</body>

</html>