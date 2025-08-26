<!-- <?php include './logs/tracage.inc.php' ?> -->
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>3D - Three.js # Learning : create Earth</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <link rel="stylesheet" href="./04_globe/style.css">

  <!-- Google tag (gtag.js) 21/12/2023-->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7V3VDCF3PS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-7V3VDCF3PS');
  </script>
</head>
<body>
<!-- partial:index.partial.html -->
<div class="help">
  <h1 class="title">CONTROLS (OrbitControls.js)</h1>
  <p>Orbit - left mouse / touch: one finger move</p>
  <p>Zoom - middle mouse, or mousewheel / touch: two finger spread or squish</p>
  <p>Pan - right mouse, or arrow keys / touch: three finger swipe</p>
  <hr>
  <p>With controls panel, you can change more than 70 parameters.</p>
  <p>Find all my resources in head of js file : Gist, textures, examples, etc :)</p>
  <p class="right"><a href="#" target="_blank">@jerosweb</a></p>
</div>
<!-- partial -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js'></script>
<script src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/dat.gui.min.js'></script>
<script src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/OrbitControls.js'>
</script><script  src="./04_globe/script.min.js"></script>

</body>
</html>
