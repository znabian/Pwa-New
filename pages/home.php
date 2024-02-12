<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>Sorkh</title>
  <link rel="icon" type="image/x-icon" href="./public/favicon.ico">
  <link rel="stylesheet" href="./public/bootstrap/css/bootstrap.min.css?h=11cd6552f0cfd1243be7481c40111374">
  <link rel="manifest" href="./manifest.json?h=eed4d16da80411bc190c3c04527f71d5">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="./public/css/styles.min.css?h=1623853f1de45657c9808a33c26eacf8">
  <link rel="stylesheet" href="./public/fonts/font-awesome/css/font-awesome.min.css">
<style>
   @media (min-width: 769px)
  {
    body
    {
      width: 51%;margin: 0 auto;
    }
    .swal2-popup
     {
    font-size: 10pt!important;
    }
    .navbar-expand-md .navbar-nav
    {
      font-size: 10pt!important;
    }
    .collection
    {
      font-family: 'Peyda ExtLt';font-size: 15px!important;display: inline-flex;gap: 5px;padding-right: 9px;
    }
  }
   @media (max-width: 768px)
  {
    .collection
    {
      font-family: 'Peyda ExtLt';font-size: 11px!important;display: inline-flex;gap:2px;padding-right: 9px;
    }
    .itemsTitle
    {
      /*padding-left: 86px;*/
    }
    .itemsDes
    {
      font-size:11px!important;
    }
  }
</style>
</head>

<body><!-- Start: Navbar Centered Links -->
  <nav class="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav" style="text-align: right;border-style: none;background: rgb(250,248,254);">
    <div class="container">
      <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1" style="border-style: none;width: 30px;height: 30px;padding-top: 0;padding-right: 0;padding-bottom: 0;padding-left: 0;color: rgb(0,0,0);background: #ffffff;font-size: 16px;border-radius: 10px;">
        <span class="visually-hidden">منو</span>
        <span class="navbar-toggler-icon" style="width: 20px;height: 20px;font-family: 'Peyda ExtLt';font-weight: bold;"></span>
      </button>
      <span style="font-family: 'Peyda ExtBd';position: sticky;">سامانه رشد خوش نظر</span>
      <img style="width: 20px;height: 20px;" width="20" height="20" src="./public/img/brands/logo.png?h=e92598d96c7d0f6733acc9635d1a2bbe">
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="navbar-nav mx-auto" id="master_menu">
            <li class="nav-item">
              <a class="nav-link active" href="Home" style="font-family: 'Peyda ExtBd';">خانه</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="Report-Card" style="font-family: 'Peyda ExtLt';">کارنامه</a>
            </li>
            
            <!-- <li class="nav-item">
              <a class="nav-link" href="https://sorkhcity.com/" target="_blank" style="font-family: 'Peyda ExtLt';">شهر سرخ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://cafebazaar.ir/app/com.erfankhoshnazar.jibeto" target="_blank" style="font-family: 'Peyda ExtLt';">جیب سرخ</a>
            </li> -->
            
          </ul>
          <a class="btn btn-primary text-bg-danger shadow" role="button" onclick="exitFromAccount()" style="font-family: 'Peyda ExtBd';border-radius: 63px;">خروج از حساب</a>
        </div>
    </div>
  </nav><!-- End: Navbar Centered Links -->
  <header class="bg-primary-gradient"><!-- Start: Hero Clean Reverse -->
    <div class="container pt-4 pt-xl-5"><img style="display: block;width: 95%;margin: 0 auto;border-radius: 26px;" src="./public/img/products/new-banner.png?h=448f1a4c7434d1db3f40378385d4d798">
      <div class="col-md-10 offset-md-1" style="margin-top: -20px;">
        <div class="card m-auto" style="border-radius: 250;width: 85%;">
          <div class="card-body" style="border-radius: 197px;padding: 0px;">
            <div class="d-flex align-items-center" style="margin-right: 10px;">
            
            <input class="form-control flex-shrink-1 form-control-borderless" type="search" placeholder="جستجو برای" oninput="searchCastle(this.value)" name="searchbar" style="direction: rtl;font-family: 'Peyda Med';font-size: 13px;text-align: right;padding-right: 0px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" class="fs-4 text-end text-black-50 d-block d-sm-block h4 text-body m-0">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor"></path>
              </svg></div>
          </div>
        </div>
      </div>
      <div class="row pt-5" style="position: static;margin-top: -30px;">
        <div class=""><strong class="text-end d-flex justify-content-end" style="font-family: 'Peyda ExtBd';font-size: 13px;">لیست تماشا</strong></div>
        <div class="col-md-8 col-xl-6 text-center text-md-start mx-auto" style="margin-top: 10px;">
          <div class="text-center"></div>
          <div class="row" style="margin: 0 auto;" id="historyCastle">
            
          </div>
        </div>
        <div class="" style="margin-top: 20px;"><strong class="text-end d-flex justify-content-end" style="font-family: 'Peyda ExtBd';font-size: 13px;">مشاهده دوره ها</strong></div>
        <div class=" text-center text-md-start mx-auto" style="margin-top: 10px;">
          <div class="text-center"></div>
          <div class="row" id="castles" style="margin: 0 auto;">
          
          </div>
        </div>
        <button id="btnrefersh" onclick="refereshData();" class="btn m-auto mt-3 rounded w-100 d-none" style="background-color: #F82F65;color:#fff">دریافت مجدداطلاعات</button>
      </div>
    </div><!-- End: Hero Clean Reverse -->
  </header>
  <section></section>
  <section></section><!-- Start: Footer Multi Column -->
  <footer class="bg-primary-gradient"></footer><!-- End: Footer Multi Column -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
       <script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
       <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <!-- <script src="./public/js/home.js?h=9a9b12"></script> -->
      <script src="./js-decode/home.js?h=9a9b32"></script>
<script>
  
  </script>
</body>

</html>