define(function() {
  var Analytics = {};
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  Analytics.Apply = function(){
     var ga =  window.ga;
    delete window.ga;
    ga('create', 'UA-39336095-2', 'circles.io'); //dendrite analytics code
    ga('send', 'pageview');
      return ga;
    }
  return Analytics
});
