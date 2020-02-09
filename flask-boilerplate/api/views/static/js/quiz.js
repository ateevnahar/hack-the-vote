$(document).ready(function () {

    let animating = false;
    let cardsCounter = 0;
    let numOfCards = 6;
    let decisionVal = 80;
    let pullDeltaX = 0;
    let ullDeltaX = 0;
    let deg = 0;
    let $card, $cardReject, $cardLike;
    let i = 0;

    //smily/sad face showing after pull
    function pullChange() {
        //console.log("Pull change");
        animating = true;
        deg = pullDeltaX / 10;
        $card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");

        let opacity = pullDeltaX / 100;
        let rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        let likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", rejectOpacity);
        $cardLike.css("opacity", likeOpacity);
    }


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
    }


    $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function (e) {
        console.log($(this));
        if (animating) return;

        $card = $(this);
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        let startX = e.pageX || e.originalEvent.touches[0].pageX;

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



function makeCard(){
    var myvar = '<div class="demo__card">'+
    '                    <header class="demo__header">'+
    '                        <h1 class="enviro">Environment</h1>'+
    '                    </header>'+
    '                    <div class="demo__card__top brown">'+
    '                        <div class="demo__card__img6 demo__card__blur"></div>'+
    '                        <p class="demo__card__name blur_name">Donald</p>'+
    '                    </div>'+
    '                    <div class="demo__card__btm">'+
    '                        <p class="demo__card__we">Whatever</p>'+
    '                    </div>'+
    '                    <div class="demo__card__choice m--reject"></div>'+
    '                    <div class="demo__card__choice m--like"></div>'+
    '                    <div class="demo__card__drag"></div>'+
    '                </div>';


}

