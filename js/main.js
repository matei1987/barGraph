$(document).ready(function() {


    setUp();

    go(nums);

    start();


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
});


function cleanUp() {
    $(".bar").remove();
    $(".xField").remove();
}

function setUp() {
    var perc = 0;
    //$("#graph").append("<div id = 'bar1' class = 'bar'></div>");
    l = parseInt($("#number").val());
    if (isNaN(l) || l == 0) {
        l = 50;
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
    }, 25);

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
    }, 300);

    $({
        someValue: 0
    }).animate({
        someValue: (size / 600) * 100
    }, {
        duration: 1000,
        easing: 'swing', // can be anything
        step: function() { // called on every step

            $(elem).text(Math.ceil(this.someValue));
            if (this.someValue <= 5) {
                $(elem).text('')
            };
        }
    });
    if ($(elem).width() > $('#graph').height() / 15) {
        $(elem).css({
            fontSize: '29px'
        })
    } else {
        $(elem).css({
            fontSize: ($(elem).width() - 6)
        })
    }


}

function go(nums) {

    for (var i = 0; i < $(".bar").length; i++) {
        nums[i] = Math.floor((Math.random() * 100));
    }
}