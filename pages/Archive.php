<!doctype html>
<html lang="fa">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Sorkh</title>
  <link rel="icon" type="image/x-icon" href="./public/favicon.ico">
  <link rel="stylesheet" href="./public/bootstrap/css/bootstrap.min.css?h=11cd6552f0cfd1243be7481c40111374">
  <link rel="manifest" href="./manifest.json?h=eed4d16da80411bc190c3c04527f71d5">
  <link rel="stylesheet" href="./public/css/styles.min.css?h=e9d03c3510e6ec244b28cf0cda7ff78f">
  <link rel="stylesheet" href="./public/fonts/font-awesome/css/font-awesome.min.css">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    
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
      .alert
      {
        font-family: 'Peyda ExtBd';
      }
      h5
      {
        font-family: 'Peyda Med'!important;
      }
      .FA-numbers
      {
        font-family: 'Vazir-Bold';
        color: #ACACAC!important;
        font-size: 8pt;
      }
      .image {
          width: inherit;
          height: auto;
          border-radius: 16px;
      }      
        .filter-contrast
        {
          filter: contrast(0.5);
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

     .icon-container {
             display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center; 

            position: relative;
            width: 100%;
            max-width: 400px;
      }
      .overlay {
        position: absolute;
            height: 100%;
            width: 100%;
            transition: .3s ease;
            background-color: transparent;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .play-icon {
            position: absolute;
            color: black;
            font-size: 2rem;
            cursor: pointer;
            left: 42%;
            bottom: 36%;
            width: 50px;
        }
        .btn-show {
            text-align: center;
            background-color: #FF0045;
            color: white;
            border-radius: 15px;
            padding: 1px 15px;
            margin-top: 10px;
            cursor: pointer;
            font-size: 10pt;
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
      .bg-light-green {
        border-radius: 15px;
        color: white;
        background-color: #05C545;
        padding: 2px 7px;
        text-align: center;
        width: fit-content;
        display: inline-block;
        font-size: 8pt;
      }
      .spliter{
          border-top: 1px solid;
          margin-top: 11px;
          opacity: 0.5;
      }
      .text-FF0045
      {
        color: #FF0045!important;
      }
    </style>
  </head>
  <body style="background: #FAF8FE;">
<div id="google_translate_element"></div>
    <!-- Start: Navbar Centered Links -->
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
  </nav>
  <!-- End: Navbar Centered Links -->
   
  <div class="container">
  <div id="Live" class=" mt-2 p-1 rounded row rtl d-none">
        <div class="col-md-12 text-left">
          <p class="bg-light-green  ">پخش زنده</p>
        </div>
        <div class="col-form-label col-md-5 icon-container">
          <img id="live_img" src="./public/img/cover-live.jpg" class="filter-contrast image m-auto" alt="Image">
          <div class="overlay">
            <img class="play-icon" onclick="showVideo(1)" src="./public/img/color-play.svg">
          </div>
        </div>
        <div class="col text-right">
          <div class="row pt-2 ">
            <div class="col-md-12">
              <h5 id="live_title">عنوان</h5>
            </div>
            <div class="col-md-12">
              <p id="live_des">توضیحات</p>
              
            </div>
          </div>
        </div>
        <div class="btn-full col-12" onclick="showVideo(1)">
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

  <div id="Near" class="mt-2">
    

  </div>
  
     <div class="mt-3 row rtl">
    <div class="d-flex gap-2">
      <i class="mt-1 fa fa-circle text-danger"></i>
      <b>آرشیوها</b>
      <span class="spliter col"></span>
    </div>
  </div>

  <div id="Archives" class="mt-2">
    

  </div>
</div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    <script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://unpkg.com/jalali-moment/dist/jalali-moment.browser.js"></script>
    <script src="./js-decode/archive.js?h=9a9b15"></script>
    <!-- <script src="./public/js/archive.js?h=5B001"></script> -->
    
<script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'fa', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}
</script>

<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
  </body>
</html>