<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>Sorkh</title>
  <link rel="icon" type="image/x-icon" href="./public/favicon.ico">
  <link rel="stylesheet" href="./public/bootstrap/css/bootstrap.min.css?h=11cd6552f0cfd1243be7481c40111374">
  <link rel="manifest" href="./manifest.json?h=eed4d16da80411bc190c3c04527f71d5">
  <link rel="stylesheet" href="./public/css/styles.min.css?h=e9d03c3510e6ec244b28cf0cda7ff78f">
  <link rel="stylesheet" href="./public/fonts/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="./public/css/spop.min.css">
  <style>
    .active 
    {
    border-top: 3px solid #E91E63;
    }
    div#tablist>div
    {
      cursor: pointer;
    }
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
  }
  </style>
</head>

<body style="background: rgb(249,249,255);"><!-- Start: Navbar Centered Links -->
  <nav class="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav" style="text-align: right;border-style: none;background: rgb(250,248,254);">
    <div class="container">
      <svg onclick="goBack()" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-arrow-back-up" style="background: #ffffff;width: 25px;height: 25px;padding: 5px;box-shadow: 2px 2px 10px rgba(45,45,45,0.08);border-radius: 10px;">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
      </svg>
      <span style="font-family: 'Peyda ExtBd';position: sticky;">سامانه رشد خوش نظر</span>
      <img style="width: 20px;height: 20px;" width="20" height="20" src="./public/img/brands/logo.png?h=e92598d96c7d0f6733acc9635d1a2bbe"></div>
  </nav><!-- End: Navbar Centered Links -->
  <header class="bg-primary-gradient">
  <div class="mx-4 mx-md-5 d-none" id="real_show">
      <span class="btn mb-0 p-2 shadow-none rounded-top text-bg-danger" onclick="gotoReal()" >
        ورود به رئالیتی شو
      </span>
  </div>
    <div class="col" style="background: #ffffff;width: 85%;margin: 0 auto;padding: 10px;box-shadow: 0px 0px 6px rgba(45,45,45,0.13);border-radius: 15px;padding-top: 20px;">
      <div class="d-flex" style="border-radius: 16px;">
      <img id="castle_Image" style="height:25%;width:25%;margin: auto auto;border-radius: 11px;" >
        <div style="text-align: center;margin: auto auto;">
          <h4 id="castle_Title" class="text-end" style="font-family: 'Peyda ExtBd';padding-top: 0;font-size: 16px;margin-bottom: 0px;"></h4>
          <small id="castle_Description" class="d-flex justify-content-start" style="font-family: 'Peyda ExtLt';font-size: 12px;"></small>
        </div>
      </div>

    </div>
  </header>
  <div class="container">
    <div class="row" style="margin-top: 15px;">
      <div class="text-center text-md-start mx-auto" style="margin-top: 10px;">
        <div class="text-center"></div>
        <div class="row" style="margin: 0 auto;">
          <div class="col-md-4 col-xs-12 col-sm-12 col-lg-6 text-center" style="width: 90%;margin: 0 auto;padding-left: 0px;padding-right: 0px;border-radius: 55px;">
            <div id="tablist" class="list-group list-group-horizontal justify-content-between" style="direction: rtl;overflow-x: auto;white-space: nowrap;">
              
           
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Start: 1 Row 2 Columns -->
  <div class="container" style="margin-top: 15px;">
    <div class="row" style="margin: 10px;">
      <div class="col-md-6" style="width: 50%;">
      <small id="session_lesson" class="text-start d-flex justify-content-start" style="font-family: 'Peyda ExtLt';font-size: 10px;"></small>
      </div>
      <div class="col-md-6" style="width: 50%;">
        <h4 class="text-end" id="count_lesson" style="font-family: 'Peyda ExtBd';padding-top: 0;font-size: 12px;margin-bottom: 0px;"></h4>
      </div>
    </div>
  </div>
  <!-- End: 1 Row 2 Columns -->
<div id="tabcontent">

</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="./public/js/spop.min.js"></script>
<!-- <script src="./public/js/list.js?h=9a9b13"></script> -->
<script src="./js-decode/list.js?h=9a9c2"></script>
  <script>
        
  </script>
</body>

</html>