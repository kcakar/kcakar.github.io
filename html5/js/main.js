
//ANALYTICS FUNCTION
//Google Analytics: UA - XXXXX - X kısmını site idsi ile değiştir!. 
(function (b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l; b[l] || (b[l] =
        function () { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date;
    e = o.createElement(i); r = o.getElementsByTagName(i)[0];
    e.src = 'https://www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e, r)
}(window, document, 'script', 'ga'));
ga('create', 'UA-XXXXX-X', 'auto'); ga('send', 'pageview');

//TWITTER FUNCTION
!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); $(".timeline-InformationCircle-widgetParent").hide(); } }(document, "script", "twitter-wjs");

//MUSIC PLAYER FUNCTION
$(document).ready(function () {

    $("#interactive nav li").click(function () {
        $("#interactive nav li").removeClass("selected");
        $(this).addClass("selected");
    });

    $("main aside nav li").click(function () {
        $("main aside nav li").removeClass("selected");
        $(this).addClass("selected");
        if ($(this).hasClass("news-link")) {
            $("#news").show();
            $("#tweets").hide();
        }
        else {
            $("#news").hide();
            $("#tweets").show();
        }
    });


    $('#tweet-input').on('input', function () {
        var text = "#15Temmuz";

        if ($(this).val() != "") {
            text = $(this).val();
        }
        $("#tweet-btn a").attr("href", "https://twitter.com/intent/tweet?button_hashtag=Enuzungece&text=" + text);
    });

    $("#interactive .monument").click(function () {
        loadMonument();
        $("#video-container iframe").attr("src", "");
        $("#listen-start-container").hide();
        $("#monument").show();
        $("#video").hide();
    });


    $("#interactive .video").click(function () {
        $("#video").show();
        $("#monument").hide();
        $("#video-container iframe").attr("src", "http://www.canlitvlive.io/tvizle.php?t=1&tv=trt-1");
        $("#listen-start-container").hide();
    });

    $("#listen-start-container").click(function () {
        $("#video").show();
        $("#monument").hide();
        $("#video-container iframe").attr("src", "http://www.canlitvlive.io/tvizle.php?t=1&tv=trt-1");
        $("#listen-start-container").hide();
    });
});

var currentTweetCount = 0;
var loaded = 0;
var toLoad = 250;
var tweets = [];
var zIndex = 0;
var frontZ = 999;
var timer = 500;



window.addEventListener('resize', function () {
    tweets = [];
    zIndex = 0;
    $("#avatar-container").html("");
    if ($("#monument").is(":visible")) {
        loadMonument();
    }
})

function loadMonument() {

    var avatars = "";

    var avatarList = [];
    $("#twitter-widget-0").contents().find(".timeline-TweetList-tweet").each(function () {
        var ttext = $(this).find(".timeline-Tweet-text").text();
        var name = $(this).find(".TweetAuthor-name").text();
        var id = $(this).find(".TweetAuthor-screenName").text();
        var ttext = $(this).find(".timeline-Tweet-text").text();
        var tweetId = $(this).find(".timeline-Tweet").attr("data-tweet-id");
        var tweetEle = {
            src: $(this).find(".Avatar").attr("src"),
            count: 1,
            tweet: ttext,
            name: name,
            id: id,
            tweetIds: []
        };

        tweetEle.tweetIds.push(tweetId);
        addTweet(tweetEle, tweetId);
    });



    showTweets()
}

function showPop(ths) {


    if (!$(ths).parent().find(".popup").is(":visible")) {
        $(".popup").hide();
        $(ths).parent().find(".popup").css('display', 'table');
        $(ths).parent().css("z-index", frontZ);
        frontZ++;
    }
    else {
        $(".popup").hide();
    }

}

function getRandWidth(containerWidth) {
    var side = getRandomCoord(1, 0)

    if (1 == side) {
        return getRandomCoord((containerWidth / 3), 0);
    }
    else {
        return getRandomCoord(containerWidth, containerWidth - (containerWidth / 3));
    }
}

function getRandHeight(containerHeight) {
    return getRandomCoord(480, 300);
}

function getRandomCoord(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function addTweet(tweetEle, tweetId) {
    var exist = false;
    for (var i = 0; i < tweets.length; i++) {
        if (tweets[i].id == tweetEle.id) {
            for (var j = 0; j < tweets[i].tweetIds.length; j++) {
                if (tweets[i].tweetIds[j] == tweetId) {
                    return;
                }
            }
            exist = true;
            tweets[i].tweetIds.push(tweetId)
            tweets[i].tweet = tweetEle.tweet;
            tweets[i].count++;
            updateTweet(tweets[i]);
            break;
        }
    }
    if (!exist) {
        drawTweet(tweetEle);
        tweets.push(tweetEle);
    }
}

function drawTweet(tweetEle) {
    var containerWidth = $("#video-container").width() - 100;
    var containerHeight = $("#video-container").height();

    var point = {
        X: getRandWidth(containerWidth),
        Y: getRandHeight(containerHeight)
    }

    var avatarCss = "position:absolute;margin: 6px 0 0 10px; border-radius: 25px;z-index:" + zIndex;
    zIndex++;
    var avatarContainerCss = "background-image:url(\"img/popup.png\");position:absolute;top:" + point.Y + "px;left:" + point.X + "px;background-size: contain; background-position: 4px 1px; background-repeat: no-repeat;width: 70px; height: 64px;z-index:" + zIndex;
    var avatar = "<div class='avatarDiv noOpacity'  style='pointer-events: none;" + avatarContainerCss + "'><span style='cursor:default;color: rgba(37, 23, 0, 0.69); font-weight: 700;position: absolute; background-color: darkgrey; width: 20px; height: 20px; border-radius: 10px; left: 5px; top: 5px; z-index:" + zIndex + "' data-tweet-id='" + tweetEle.id + "'>" + tweetEle.count + "</span><img  onclick='showPop(this)' style='pointer-events:initial;" + avatarCss + "' src='" + tweetEle.src + "'></img><span class='popup' style='display: none; position: absolute; background-color: beige; border-radius: 5px; padding: 12px; text-align: center; width: 200px; top: 60px; z-index: 9999;'><span class='name'>" + tweetEle.name + "</span> - " + tweetEle.tweet + "</span></div>";
    zIndex++;
    $("#avatar-container").prepend(avatar);


}

function updateTweet(tweetEle) {
    $("[data-tweet-id='" + tweetEle.id + "']").html(tweetEle.count);
    $("[data-tweet-id='" + tweetEle.id + "']").parent().find(".popup").html("<span class='name'>" + tweetEle.name + "</span> - " + tweetEle.tweet + "");
}


function showTweets() {
    // If there are hidden divs left
    if ($('.noOpacity').length) {
        // Fade the first of them in
        $('.noOpacity:first').removeClass("noOpacity").addClass("fullOpacity");
        // And wait one second before fading in the next one
        setTimeout(showTweets, 100);
    }
}