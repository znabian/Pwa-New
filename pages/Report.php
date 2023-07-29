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
          font-family: 'Peyda Med'!important;
        }
        .swal2-popup
        {
          font-size: 10pt!important;
        }
      }
      .pointer
      {
        cursor:pointer;
      }
      .alert
      {
        font-family: 'Peyda ExtBd';
      }
      h5
      {
        font-family: 'Peyda Med'!important;
        color:#212529!important;
      }
      h6
      {
        font-family: 'Peyda Med'!important;
        color:#212529!important;
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
      .bg-FF0045 {
        border-radius: 15px;
        color: white;
        background-color: #FF0045;
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
      .in {
          opacity: 100;
        animation: fade-in 1s ease-in;
      }

      @keyframes fade-in {
        from {          
          opacity: 0;
        }
        to {
          opacity: 100;
        }
      }
      .in1 {
        position: fixed;
        right: -300px;
        animation: slide-in 1s forwards;
      }

      @keyframes slide-in {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
          right: 0;
         position: inherit;
        }
      }

      .in2 {
        position: relative;
        /* overflow: hidden; */
    } 

    .slide {
        position: absolute;
        left: -600px;
        -webkit-animation: slide 1s forwards ease-in-out;
        animation: slide 1s forwards ease-in-out;
    }

    @-webkit-keyframes slide {
        100% { left: 0;
         position: inherit; }
    }

    @keyframes slide {
        100% { left: 0;
         position: inherit; }
    }
    [title]
     {
    direction: rtl;
    }
    .rating-o {
        font-size: 20pt;
        color: gray;
        display: inline-block;
        overflow: hidden;
        }
       .rating,.ratingtxt {
        font-size: 20pt;
        color: orange;
        display: inline-block;
        overflow: hidden;
        }
        .rating::before { 
        content: "★★★★★" ;
        }
    </style>
</head>

<body style="background: rgb(249,249,255);"><!-- Start: Navbar Centered Links -->
  <nav class="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav" style="text-align: right;border-style: none;background: rgb(250,248,254);">
    <div class="container">
      <svg id="backbtn" onclick="" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-arrow-back-up" style="background: #ffffff;width: 25px;height: 25px;padding: 5px;box-shadow: 2px 2px 10px rgba(45,45,45,0.08);border-radius: 10px;">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
      </svg>
      <span style="font-family: 'Peyda ExtBd';position: sticky;">سامانه رشد خوش نظر</span>
      <img style="width: 20px;height: 20px;" width="20" height="20" src="./public/img/brands/logo.png?h=e92598d96c7d0f6733acc9635d1a2bbe"></div>
  </nav><!-- End: Navbar Centered Links -->
  <header class="bg-primary-gradient">
    <div class="col" style="background: #ffffff;width: 85%;margin: 0 auto;padding: 10px;box-shadow: 0px 0px 6px rgba(45,45,45,0.13);border-radius: 15px;padding-top: 20px;">
      <div class="d-flex" style="border-radius: 16px;">
      <img id="castle_Image" src="./public/img/products/reportcard.jpg" style="height:25%;width:25%;margin: auto auto;border-radius: 11px;" >
        <div style="text-align: center;margin: auto auto;">
          <h4 id="castle_Title" class="text-end" style="font-family: 'Peyda ExtBd';padding-top: 0;font-size: 16px;margin-bottom: 0px;">کارنامه</h4>
          <div id="castle_Description" class="FA-numbers" >
          <b class="bg-FF0045 w-100"><i class="fa fa-trophy  p-1 pull-left"></i> <span id="rank">?</span></b>
          <br><b  class="bg-light-green mt-1 "><i class="fa fa-play-circle-o  p-1 pull-left"></i><span id="rank2">?</span></b>
          </div>
        </div>
        <!-- <div class="mt-md-3 d-none" id="backbtn">
              <button onclick="" class="btn btn-danger btn-sm fa fa-arrow-right"></button>
        </div> -->
      </div>

    </div>
  </header>

<div id="maindiv" class="col-md-10 m-auto d-none  " >
        <div class="bg-white mt-3 p-1 rounded row rtl">
            <div class="col-3 col-form-label col-md-2 icon-container">
              <img src="./public/img/products/watching-vdeo.png" class="image m-auto " alt="Image">
              
            </div>
            <div class="col text-right">
              <div class="row pt-2 " style="font-size: 10pt;">
                
                <div class="col-md-12">
                  <h6>چه دوره هایی رو دیدم؟</h6>
                </div>
                <div class="col-md-12">
                  <p>
                    <?php echo $_COOKIE['name'];?>
                     اینجا میتونی ببینی چه دوره هایی از کاخ سرخ رو دیدی
                    </p>               
                </div>
              </div>
            </div>
            
            <div class="col-2 m-auto">
                    <button id="btn1" disabled onclick="maindiv.classList.add('d-none');myvideo.classList.remove('d-none');myvideo.classList.add('in');myActivity();" class="btn btn-danger btn-sm fa fa-arrow-left rounded-5"></button>
            </div>  
        </div> 
        <!-- <div class="bg-white mt-3 p-1 rounded row rtl">
            <div class="col-3 col-form-label col-md-2 icon-container">
              <img src="./public/img/products/liking-vdeo.png" class="image m-auto " alt="Image">
              
            </div>
            <div class="col text-right">
              <div class="row pt-2 " style="font-size: 10pt;">
                
                <div class="col-md-12">
                  <h6>چه دوره هایی رو بیشتر دوست داشتی؟</h6>
                </div>
                <div class="col-md-12">
                  <p>
                    <?php echo $_COOKIE['name'];?>
                     اینجا میتونی ببینی چه دوره هایی از کاخ سرخ رو چندبار کامل دیدی
                    </p>               
                </div>
              </div>
            </div>
            
            <div class="col-2 m-auto">
                    <button id="btn2" disabled onclick="maindiv.classList.add('d-none');myvideo.classList.remove('d-none');myvideo.classList.add('in');myFavority();" class="btn btn-danger btn-sm fa fa-arrow-left rounded-5"></button>
            </div>  
        </div>  -->
        <div class="bg-white mt-3 p-1 rounded row rtl">
            <div class="col-3 col-form-label col-md-2 icon-container">
              <img src="./public/img/products/liking-vdeo.png" class="image m-auto " alt="Image">
              
            </div>
            <div class="col text-right">
              <div class="row pt-2 " style="font-size: 10pt;">
                
                <div class="col-md-12">
                  <h6> چه دوره هایی رو کامل دیدم؟</h6>
                </div>
                <div class="col-md-12">
                  <p>
                    <?php echo $_COOKIE['name'];?>
                     اینجا میتونی ببینی چه دوره هایی از کاخ سرخ رو کامل دیدی
                    </p>               
                </div>
              </div>
            </div>
            
            <div class="col-2 m-auto">
                    <button id="btn2" disabled onclick="maindiv.classList.add('d-none');myvideo.classList.remove('d-none');myvideo.classList.add('in');completeApp();" class="btn btn-danger btn-sm fa fa-arrow-left rounded-5"></button>
            </div>  
        </div> 
        <div class="bg-white mt-3 p-1 rounded row rtl">
            <div class="col-3 col-form-label col-md-2 icon-container">
              <img src="./public/img/products/liking-vdeo.png" class="image m-auto " alt="Image">
              
            </div>
            <div class="col text-right">
              <div class="row pt-2 " style="font-size: 10pt;">
                
                <div class="col-md-12">
                  <h6> چه دوره هایی رو دارم یاد می گیرم؟</h6>
                </div>
                <div class="col-md-12">
                  <p>
                    <?php echo $_COOKIE['name'];?>
                     اینجا میتونی ببینی چه دوره هایی از کاخ سرخ رو داری یاد می گیری
                    </p>               
                </div>
              </div>
            </div>
            
            <div class="col-2 m-auto">
                    <button id="btn3" disabled onclick="maindiv.classList.add('d-none');myvideo.classList.remove('d-none');myvideo.classList.add('in');incompleteApp();" class="btn btn-danger btn-sm fa fa-arrow-left rounded-5"></button>
            </div>  
        </div> 
</div>
<div id="myvideo" class=" col-md-10 m-auto" >        
      <div id="viewContent">
        <div class="card d-flex gap-2 mt-3 p-2 text-center">
          <i class="fa fa-spinner"></i>
          <b> صبر کن تا ببینم چه کرده ای</b>
        </div>
      </div>

</div>


<!-- Modal -->
<div class="modal fade" dir="rtl" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="commentModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header justify-content-center">
        <h5 class="modal-title text-center" id="commentModalTitle">ثبت نظر</h5>
      </div>
      <div class="modal-body">
        <input type="hidden" name="" id="cidtxt">
        <input type="text" readonly class="form-control"  name="" placeholder="نام و نام خانوادگی" id="" value="<?php echo $_COOKIE['name'];?>">
        <textarea class="form-control" name="" id=""  placeholder="نظرت رو در مورد این آموزش اینجا بنویس" rows="3"></textarea>
        
        <div dir="ltr" style="padding-top: 1rem;text-align: center;">
            <input type="hidden" name="Score" id="score" value="1">
            
                <span  title="1" style="cursor: pointer;font-size:small;" id="Escore1" onmouseover="setEScore(1)" onmouseout="setEScore(1,true)" onclick="submitScore(1)"> &#128566</span>  
                <span  title="2" style="cursor: pointer;font-size:small" id="Escore2" onmouseover="setEScore(2)" onmouseout="setEScore(2,true)" onclick="submitScore(2)">&#128566</span> 
                <span  title="3" style="cursor: pointer;font-size:small" id="Escore3" onmouseover="setEScore(3)" onmouseout="setEScore(3,true)" onclick="submitScore(3)">&#128566</span>
                <span  title="4" style="cursor: pointer;font-size:small" id="Escore4" onmouseover="setEScore(4)" onmouseout="setEScore(4,true)" onclick="submitScore(4)">&#128566</span>
                <span  title="5" style="cursor: pointer;font-size:small" id="Escore5" onmouseover="setEScore(5)" onmouseout="setEScore(5,true)" onclick="submitScore(5)">&#128566</span>               

        </div>

        
      </div>
      <div class="modal-footer">
        <button type="button" class="pointer btn btn-secondary" onclick="$('#commentModal').modal('hide')" data-dismiss="modal">بستن</button>
        <button type="button" class="pointer btn btn-primary">ثبت نظر</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://unpkg.com/jalali-moment/dist/jalali-moment.browser.js"></script>
<script src="./public/js/spop.min.js"></script>
<!-- <script src="./public/js/report.js?h=9a9b5"></script> -->
 <script src="./js-decode/report.js?h=9a9b60"></script> 
 
  <script>
  const emoji=['&#128566','&#128545','&#128547','&#128533','&#128522','&#128516'];
    function setEScore(score,reverce=0)
    {
        
        for(i=1;i<=5;i++)
            {
              document.getElementById('Escore'+i).style.fontSize ="small";
              document.getElementById('Escore'+i).innerHTML=emoji[0];
            }
        for(i=1;i<=score;i++)
        {
              document.getElementById('Escore'+i).style.fontSize ="large";
            document.getElementById('Escore'+i).innerHTML=emoji[score];
        }
        
            document.getElementById('score').value=score;
    }
    function submitScore(score,msg=1)
    {
       /* window.axios.post("{{route('changeScore')}}", null, { params: {
            AskId:"{{$profile->Id}}",Score:score
                }})
                    .then(function ({data}) {
                        if (data.success) {*/
                          for(i=1;i<=5;i++)
                            {
                              document.getElementById('Escore'+i).style.fontSize ="small";
                              document.getElementById('Escore'+i).innerHTML=emoji[0];
                            }
                            for(i=1;i<=score;i++)
                            {
                                  document.getElementById('Escore'+i).style.fontSize ="large";
                                document.getElementById('Escore'+i).innerHTML=emoji[score];
                            }
                            document.getElementById('score').value=score;                          
                            
                        /*}
                        else {

                        }
                    })
                    .catch(error => {
                        console.log('change score failed')
                    });*/
    }
  </script>
</body>

</html>