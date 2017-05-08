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
});

!function(e){e.fn.endlessScroll=function(l){var t={bottomPixels:50,fireOnce:!0,fireDelay:150,loader:"<br />Loading...<br />",data:"",insertAfter:"div:last",resetCounter:function(){return!1},callback:function(){return!0},ceaseFire:function(){return!1}},l=e.extend({},t,l),r=!0,i=!1,n=0;l.ceaseFire.apply(this)===!0&&(r=!1),r===!0&&e(this).scroll(function(){if(l.ceaseFire.apply(this)===!0)return void(r=!1);if(this==document||this==window)var t=e(document).height()-e(window).height()<=e(window).scrollTop()+l.bottomPixels;else{var o=e(".endless_scroll_inner_wrap",this);0==o.length&&(o=e(this).wrapInner('<div class="endless_scroll_inner_wrap" />').find(".endless_scroll_inner_wrap"));var t=o.length>0&&o.height()-e(this).height()<=e(this).scrollTop()+l.bottomPixels}t&&(0==l.fireOnce||1==l.fireOnce&&1!=i)&&(l.resetCounter.apply(this)===!0&&(n=0),i=!0,n++,e(l.insertAfter).after('<div id="endless_scroll_loader">'+l.loader+"</div>"),data="function"==typeof l.data?l.data.apply(this,[n]):l.data,data!==!1&&(e(l.insertAfter).after('<div id="endless_scroll_data">'+data+"</div>"),e("div#endless_scroll_data").hide().fadeIn(),e("div#endless_scroll_data").removeAttr("id"),l.callback.apply(this,[n]),l.fireDelay!==!1||0!==l.fireDelay?(e("body").after('<div id="endless_scroll_marker"></div>'),e("div#endless_scroll_marker").fadeTo(l.fireDelay,1,function(){e(this).remove(),i=!1})):i=!1),e("div#endless_scroll_loader").remove())})}}(jQuery),$(document).ready(function(){

var did=false;
$(document).scroll(function() {
	if(!did)
	{
		if($(document).scrollTop()>0)
	    {
	    	$("#leftBottomText").removeClass("open");
	    	did=true;
	    }
	    else
	    {
	    	did=true;
	    	$("#leftBottomText").addClass("open");
	    }
	}
	else if($(document).scrollTop()<100)
	{
		did=false;
	    $("#leftBottomText").addClass("open");
	}
});

$(document).endlessScroll(
{
	inflowPixels:0,
	callback:function()
	{
		var e=$("#movingLayer").clone();
		// e.css("top",$(document).height());
		$("body").append(e);
	}
});



document.body.scrollTop=document.documentElement.scrollTop=0;

$("img.lazy").show().lazyload(
	{
		effect:"fadeIn",
		threshold : 1000
	}
	)});