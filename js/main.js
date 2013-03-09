$(document).ready(function() {


    setUp();

    go(nums);

    start();

    hov();


});


var l = 0;
var nums = [];
var i = 0;
var heightData = []
var colorList = ['#b20e0f', '#e22516', '#e24616', '#e26c16', '#e29316', '#e2bb16', '#dfd616', '#b6d616', '#98d616', '#80df16', '#5ddf16', '#32df16', '#00c316', '#00ab16'];
var colorList = colorList.reverse();



$("#submit").click(function(evt) {
    cleanUp();
    setUp();
    nums = [];
    go(nums);
    i = 0;
    start();
    hov();
});


function hov() {

    $(".bar").delay(20).mouseenter(

    function() {
        o = $(this).css("background-color");
        t = parseInt($(this).css("font-size"));
        h = $(this).height();
        w = $(this).width();
        $(this).stop().animate({
            backgroundColor: '#2443af',
            zIndex: 9999,
            height: h+10,
            width: w+10,
            left: -5,
            fontSize: t+12
            

        }, 100);

    });

    $(".bar").delay(20).mouseleave(

    function() {
        $(this).stop().animate({
            backgroundColor: o,
            height: h,
            width: w,
            left: 0,
            zIndex: -9999,
            fontSize: t
        }, 100);


    });
}

function cleanUp() {
    $(".bar").remove();
    $(".xField").remove();
}

function setUp() {
    var perc = 0;

    l = parseInt($("#number").val());
    if (isNaN(l) || l == 0) {
        l = 20;
    };
    for (var i = 0; i < l; i++) {
        var j = i;
        perc = .5 + i * (1 / (l / 99));

        $("#graph").append("<div id = 'bar" + j + "' class = 'bar'></div>");
        $(".bar").last().css({
            marginLeft: perc + '%',
            width: 94 / l + '%'
        });
    };

    //labels(); Try and jam HTML in the divs instead of appending. 




}

function start() {
    heightData = convertToHeights(nums);
    setTimeout(function() {
        grow(heightData[i], $('.bar')[i]);

        if (i >= $('.bar').length) {
            return;
        } else {
            i++;
            return start();
        };
    }, 10);

}


function convertToHeights(nums) {
    var heights = []
    var max = Math.max.apply(null, nums);
    for (var i = 0; i < nums.length; i++) {
        heights.push((Math.round(($("#graph").height() / (max / nums[i])))) - 10);

    }
    return heights;
}

function labels() {
    $("div.bar").each(function(index) {
        index++;
        $(this).append("<p class = 'xField' id = 'f" + index + "'> Field" + index + " </p> ");



    });
}

function grow(size, elem) {

    var barColor = Math.round((colorList.length - 1) / (Math.max.apply(null, heightData) / size));
    var finCol = colorList[barColor];
    var diff = 0;
    $(elem).animate({
        height: size,
        opacity: '1.0',
        backgroundColor: finCol,
    }, 700);

    $({
        someValue: 0
    }).animate({
        someValue: (size / $('#graph').height()) * 100
    }, {
        duration: 700,
        easing: 'swing',
        step: function() {

            $(elem).text(Math.ceil(this.someValue));
            if (this.someValue <= 5) {
                $(elem).text('')
            };
        }
    });
    
    if ($(elem).width() > $('#graph').height() / 15) {
        $(elem).css({
            fontSize: '26px'
        })
    } else {
        $(elem).css({
            fontSize: ($(elem).width() - 8)
        })
    }


}

function go(nums) {

    for (var i = 0; i < $(".bar").length; i++) {
        nums[i] = Math.floor((Math.random() * 100));
    }
}