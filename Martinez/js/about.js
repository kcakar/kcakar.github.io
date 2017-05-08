  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-83926552-1', 'auto');
  ga('send', 'pageview');

$(document).ready(function(){
	$("#plus").click(function(){
		if(!$(this).hasClass("minus"))
		{
			$("#fixedLayer article").addClass("show");
			$(this).addClass("minus");
			$(this).focus();
		}
		else
		{
			$("#fixedLayer article").removeClass("show");
			$(this).removeClass("minus");
		}
	});

	$("#rightTopText > ul > li").click(function(){
		$("ul>ul").hide();
		if($(this).hasClass("underline"))
		{
			$(this).removeClass("underline");
		}
		else
		{
		    $("li").removeClass("underline");
			$(this).next("ul").show();
			$(this).addClass("underline");
		}
	});
	$("body").show();

	$("img.lazy").show().lazyload(
	{
		effect:"fadeIn",
		threshold : 1000
	});
});

