$(document).ready(function () {

    var animating = false;
    var cardsCounter = 0;
    var numOfCards = 10;
    var decisionVal = 80;
    var ecisionVal = -80;
    var pullDeltaX = 0;
    var ullDeltaX = 0;
    var deg = 0;
    var $card, $cardReject, $cardLike;
    var i = 0;



    //create array 
    var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


    //smily/sad face showing after pull
    function pullChange() {
        //console.log("Pull change");
        animating = true;
        deg = pullDeltaX / 10;
        $card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");

        var opacity = pullDeltaX / 100;
        var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        var likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", 0);
        $cardLike.css("opacity", 0);
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

                // if (cardsCounter === numOfCards) {
                //     cardsCounter = 0;
                //     $(".demo__card").removeClass("below");
                // }
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

    function incrementOrSend() {
        if (i < 9) {
            i += 1;
        } else if (i === 9) {
            $.ajax({
                method: "GET",
                url: "/api/quiz_result",
                data: { array: array },
                success: function (response) {
                    localStorage.setItem("id", JSON.parse(response));
                    window.location.href = '/quiz?id='+response;
                }
            });
        }
    }

    $(".mostred").click(function () {
        array[i] += 1;
        incrementOrSend();
        $cards = $(".demo__card:not(.below)");
        $card = $cards.last();
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        pullDeltaX = -800;
        pullChange();
        release();

        var x = array.toString();
        console.log(i);
        console.log(x);
    });

    $(".twored").click(function () {
        array[i] += 2;
        incrementOrSend();
        $cards = $(".demo__card:not(.below)");
        $card = $cards.last();
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        pullDeltaX = -800;
        pullChange();
        release();
        console.log(i);
        //console.log(x);
        if (array[10] > 0) {

        }
    });
    $(".fourgreen").click(function () {
        array[i] += 4;
        incrementOrSend();
        $cards = $(".demo__card:not(.below)");
        $card = $cards.last();
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        pullDeltaX = -800;
        pullChange();
        release();
    });
    $(".mostgreen").click(function () {
        array[i] += 5;
        incrementOrSend();
        $cards = $(".demo__card:not(.below)");
        $card = $cards.last();
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        pullDeltaX = -800;
        pullChange();
        release();
    });
    $(".threegreen").click(function () {
        array[i] += 3;
        incrementOrSend();
        $cards = $(".demo__card:not(.below)");
        $card = $cards.last();
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        pullDeltaX = -800;
        pullChange();
        release();
    });


});


