<!DOCTYPE html>
<html lang="{{App::getLocale()}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" type="image/x-icon" href="./public/favicon.ico">
  <link rel="stylesheet" href="./public/bootstrap/css/bootstrap.min.css?h=11cd6552f0cfd1243be7481c40111374">
    <link rel="stylesheet" href="./public/css/styles.min.css">
    <title> سامانه رشد خوش نظر </title>
    <style>
     
* {
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Peyda Med';
    font-size: 11pt;
    direction: rtl;
}

body {
    /* height: 100vh; */
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: linear-gradient(to bottom right, #EEE, #AAA); */
    /* background-image: linear-gradient(to right, #F64162, #ff5865); */
    /* color: white; */
}
.message
{
  margin: 0 auto;
    width: 50%;
}
h1 {
  margin: 40px 0 20px;
}

.lock {
  border-radius: 5px;
  width: 55px;
  height: 45px;
  background-color: #fff;
  animation: dip 1s;
  animation-delay: 1.5s;
}
.lock::before, .lock::after {
  content: "";
  position: absolute;
  border-left: 5px solid #fff;
  height: 20px;
  width: 15px;
  left: calc(50% - 12.5px);
}
.lock::before {
  top: -30px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 15px 15px 0 0;
  height: 30px;
  animation: lock 2s, spin 2s;
}
.lock::after {
  top: -10px;
  border-right: 5px solid transparent;
  animation: spin 2s;
}

@keyframes lock {
  0% {
    top: -45px;
  }
  65% {
    top: -45px;
  }
  100% {
    top: -30px;
  }
}
@keyframes spin {
  0% {
    transform: scaleX(-1);
    left: calc(50% - 30px);
  }
  65% {
    transform: scaleX(1);
    left: calc(50% - 12.5px);
  }
}
@keyframes dip {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
    </style>
</head>
<body>
<nav class="d-flex gap-2 py-3" id="mainNav" style="text-align: right;border-style: none;background: rgb(250,248,254);">       
      <img style="width: 20px;height: 20px;" width="20" height="20" src="./public/img/brands/logo.png?h=e92598d96c7d0f6733acc9635d1a2bbe">
      <span style="font-family: 'Peyda ExtBd';position: sticky;">سامانه رشد خوش نظر</span>
      
  </nav>  
    <div id="app" class="m-auto mt-5 text-center">
    <img src="./public/img/sad404.svg" alt="404" style="max-height: 17rem;">
    <div>
        <h2>صفحه مورد نظر یافت نشد!</h2>
      <p class="bg-danger btn mt-4 rounded text-white" onclick="location.assign('Login')">بازگشت به صفحه اصلی</p>     
    </div>

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./public/js/script.min.js?h=9a9b12d9479055b6ccf322643488f6dd"></script>

</body>
</html>