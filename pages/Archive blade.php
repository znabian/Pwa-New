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
  <style>
    @font-face {
      font-family: "Vazir-Bold";
      src: url("./public/fonts/Vazir-Bold.ttf") format("ttf"),
        url("./public/fonts/Vazir-Bold.eot") format("eot"),
          url("./public/fonts/Vazir-Bold.woff") format("woff");
      font-weight: bold;
      font-style: normal;
    }
    @font-face {
      font-family: "Vazir";
      src: url("./public/fonts/Vazir.ttf") format("ttf"),
        url("./public/fonts/Vazir.eot") format("eot"),
          url("./public/fonts/Vazir.woff") format("woff");
      font-weight: normal;
      font-style: normal;
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
     @media (max-width: 767px)
      {
      .col-sm-6
        {
          flex: 0 0 auto;
            width: 50%;
        }
        .cover-img svg {
            right: 33px!important;
        }
        .cover-img .icon {
          left: 61px!important;
        }
        .play-container .icon {
            top: -49px!important;
            right: 29px!important;
            left: 0px!important;
        }
      
    }
  .rtl
  {
    direction: rtl;
    color:#636363;
  }
  .btn-light-green {
    border-radius: 15px;
    color: white;
    background-color: #05C545;
    padding: 2px 7px;
    text-align: center;
    width: fit-content;
    display: inline-block;
    font-size: 8pt;
}
.text-right
{
  text-align: right!important;
  color:#636363;
}
.btn-full {
    text-align: center;
    background-color: #FF0045;
    color: white;
    border-radius: 15px;
    padding: 5px;
    margin-top: 10px;
    cursor: pointer;
}
.btn-full:hover, .btn-show:hover{
    background: white;
    outline: 2px solid #FF0045;
    color: #FF0045;
}
.btn-show {
    text-align: center;
    background-color: #FF0045;
    color: white;
    border-radius: 15px;
    padding: 1px 15px;
    margin-top: 10px;
    cursor: pointer;
    float: left;
    font-size: 10pt;
}
.cover-img img {
  width: 100%;
    height: 100px;
   
}
.cover-img .image {
    width: 89px;
    height: 75px;
    border-radius: 16px;
}
.filter-contrast
{
  filter: contrast(0.5);
}
.text-danger
{
  color: #FF0045!important;
}
.FA-numbers
{
  font-family: 'Vazir-Bold';
  color: #ACACAC!important;
}
.cover-img svg {
    color: #FF0045;
    position: relative;
    top: -63px;
    right: 41px;
    z-index: 1;
}
.cover-img .icon {
    color: #FF0045;
    position: relative;
    /* top: -63px; */
    top:0;
    left: 59px;
    z-index: 1;
    width: 26px;
    height: 26px;
}
.spliter{
    border-top: 1px solid;
    margin-top: 11px;
    opacity: 0.5;
}
.container
{
  background-color: #FAF8FE;
}
  </style>
</head>

<body style="background: rgb(249,249,255);"><!-- Start: Navbar Centered Links -->
<div class="container">
  <nav class="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav" style="text-align: right;border-style: none;background: rgb(250,248,254);">
    <div class="container">
      <svg onclick="goBack()" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-arrow-back-up" style="background: #ffffff;width: 25px;height: 25px;padding: 5px;box-shadow: 2px 2px 10px rgba(45,45,45,0.08);border-radius: 10px;">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
      </svg>
      <span style="font-family: 'Peyda ExtBd';position: sticky;">سامانه رشد خوش نظر</span>
      <img style="width: 20px;height: 20px;" width="20" height="20" src="./public/img/brands/logo.png?h=e92598d96c7d0f6733acc9635d1a2bbe">
    </div>
  </nav><!-- End: Navbar Centered Links -->
  
  <div class="container">
  <div class="row">
    <div class="col-md-6">
      <img src="./public/img/cover-live.jpg" alt="image" class="img-fluid">
      <button class="btn btn-primary">Play</button>
    </div>
    <div class="col-md-6">
      <div class="d-flex flex-column justify-content-between h-100">
        <div>
          <h5>Date</h5>
          <h2>Title</h2>
          <p>Description</p>
        </div>
        <button class="btn btn-secondary">Button</button>
      </div>
    </div>
  </div>
</div>




  <div id="Live" class="mt-2 rtl">
    <b class="btn-light-green pull-left">پخش زنده</b>
    <div class="col-12 d-flex row">
      <div class="col-md-3 col-sm-6 cover-img ">
      <img class="image  filter-contrast" src="./public/img/cover-live.jpg" alt="">
      <img class="icon" src="./public/img/color-play.svg">        
      </div>
      <div class="col-md-9 col-sm-6 text-center text-right">
      <h3>عنوان</h3>
      <p>توضیحات</p>
      </div>
    </div>
    <div class="btn-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"></path>
    </svg>
      <b>ورود به پخش زنده</b>
    </div>
  </div>
  <div class="mt-3 row rtl">
    <div class="d-flex gap-2">
      <i class="mt-1 fa fa-circle text-success"></i>
      <b>برنامه های پیش رو</b>
      <span class="spliter col"></span>
    </div>
  </div>
<div id="NearContent" class="row ">
  <div class="m-2 rtl card">
    <div class="card-body">
        <b class=" FA-numbers pull-left">1402/03/03</b>
        <div class="col-12 d-flex row">
          <div class="col-md-3 col-sm-6 cover-img ">
            <img class="image " src="./public/img/cover-live.jpg" alt="">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"></path>
            </svg> -->
            
          </div>
          <div class="col-md-9 col-sm-6 text-center text-right">
          <h3>عنوان</h3>
          <p>توضیحات</p>
          </div>
        </div>     
    </div>
  </div>
  <div class="m-2 rtl card">
    <div class="card-body">
        <b class=" FA-numbers pull-left">1402/03/03</b>
        <div class="col-12 d-flex row">
          <div class="col-md-3 col-sm-6 cover-img ">
            <img class="image " src="./public/img/cover-live.jpg" alt="">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"></path>
            </svg> -->
            
          </div>
          <div class="col-md-9 col-sm-6 text-center text-right">
          <h3>عنوان</h3>
          <p>توضیحات</p>
          </div>
        </div>     
    </div>
  </div>

</div>

  <div class="mt-3 row rtl">
    <div class="d-flex gap-2">
      <i class="mt-1 fa fa-circle text-danger"></i>
      <b>آرشیوها</b>
      <span class="spliter col"></span>
    </div>
  </div>

<div id="ArchiveContent" class="row ">
  <div class="m-2 rtl card">
    <div class="card-body">
        <b class="FA-numbers pull-left">1402/03/03</b>
        <div class="col-12 d-flex row">
          <div class="col-md-3 col-sm-6 cover-img play-container ">
            <img class="image  filter-contrast" src="./public/img/cover-live.jpg" alt="">
            <img class="icon" src="./public/img/color-play.svg">
            
          </div>
          <div class="col-md-9 col-sm-6 text-center text-right">
          <h3>عنوان</h3>
          <p>توضیحات</p> 
          <div class="btn-show">
            <span>مشاهده</span>
          </div> 
          </div>
        </div>    
    </div>
  </div>
  <div class="m-2 rtl card">
    <div class="card-body">
        <b class="FA-numbers pull-left">1402/03/03</b>
        <div class="col-12 d-flex row">
          <div class="col-md-3 col-sm-6 cover-img  play-container">
            <img class="image  filter-contrast" src="./public/img/cover-live.jpg" alt="">
            <img class="icon" src="./public/img/color-play.svg">            
          </div>
          <div class="col-md-9 col-sm-6 text-center text-right">
          <h3>عنوان</h3>
          <p>توضیحات</p>
          <div class="btn-show">
            <span>مشاهده</span>
          </div>  
          </div>
        </div>    
    </div>
  </div>

</div>
      
</div>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


  <script> 
  </script>
</body>

</html>