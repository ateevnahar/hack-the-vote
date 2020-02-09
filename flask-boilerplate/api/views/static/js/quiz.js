$(document).ready(function () {

    var animating = false;
    var cardsCounter = 0;
    var numOfCards = 6;
    var decisionVal = 80;
    var ecisionVal = -80;
    var pullDeltaX = 0;
    var ullDeltaX = 0;
    var deg = 0;
    var $card, $cardReject, $cardLike;
    var i = 0;

    //smily/sad face showing after pull
    function pullChange() {
        //console.log("Pull change");
        animating = true;
        deg = pullDeltaX / 10;
        $card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");

        var opacity = pullDeltaX / 100;
        var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        var likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", rejectOpacity);
        $cardLike.css("opacity", likeOpacity);
    };


    function release() {

        if (pullDeltaX >= decisionVal) {
            $card.addClass("to-right");
        } else if (pullDeltaX <= -decisionVal) {
            $card.addClass("to-left");
        }

        if (Math.abs(pullDeltaX) >= decisionVal) {
            $card.addClass("inactive");

            setTimeout(function () {
                $card.addClass("below").removeClass("inactive to-left to-right");
                cardsCounter++;
                if (cardsCounter === numOfCards) {
                    cardsCounter = 0;
                    $(".demo__card").removeClass("below");
                }
            }, 300);
        }

        if (Math.abs(pullDeltaX) < decisionVal) {
            $card.addClass("reset");
        }

        setTimeout(function () {
            $card.attr("style", "").removeClass("reset")
                .find(".demo__card__choice").attr("style", "");

            pullDeltaX = 0;
            animating = false;
        }, 300);
    };


    $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function (e) {
        console.log($(this));
        if (animating) return;

        $card = $(this);
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        var startX = e.pageX || e.originalEvent.touches[0].pageX;

        $(document).on("mousemove touchmove", function (e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            pullDeltaX = (x - startX);
            if (!pullDeltaX) return;
            //console.log(pullDeltaX);
            pullChange();
        });

        $(document).on("mouseup touchend", function () {
            $(document).off("mousemove touchmove mouseup touchend");
            if (!pullDeltaX) return; // prevents from rapid click events
            console.log(pullDeltaX);
            release();
        });
    });

    $(".red").click(function () {

        $cards = $(".demo__card:not(.below)");
        $card = $cards.last();
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        pullDeltaX = -800;
        pullChange();
        release();
    });

    //click link button 
    $(".green").click(function () {

        $cards = $(".demo__card:not(.below)");
        $card = $cards.last();
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        pullDeltaX = 800;
        pullChange();
        release();
    });

    //hit blurr button 
    $('input[type="checkbox"]').click(function () {
        $item = $(".demo__card__blur");
        $item2 = $(".demo__card__name");
        //$item2 = $(".demo__card__name");
        if ($(this).is(":checked") == true) {

            $item.removeClass("blur");
            $item2.removeClass("blurtext");


        } else if ($(this).is("checked") == false) {
            $item.addClass("blur");
            $item2.addClass("blurtext");
        }
    });


    //pull data from backend base on quiz result

    //matching part 

});


