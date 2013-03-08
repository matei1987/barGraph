$(document).ready(function() {
    $("div.bar").each(function(index){
        index = index+1;
        $(this).after("<p class = 'xField' id = 'f" + index+"'> Field" + index + " </p> ");
    });

    $("#submit").click(function(evt){
        go(nums);
        i = 0;
        start();
    });
    start();

});

/*
function go(nums){
    var inputs = $(".inputBox");
    for (var i=0;i<inputs.length;i++){
        nums[i]=parseInt(inputs[i].val;
    }
 }
*/
 function go(nums){
    $(".inputBox").each(function(index){
        nums[index] = parseInt($(this).val());
    });
 }



var nums = [];
var bars = $('.bar');
var i = 0;
var heightData = []
var colorList = ['#b20e0f','#e22516','#e24616','#e26c16','#e29316','#e2bb16','#dfd616','#b6d616','#98d616','#80df16','#5ddf16','#32df16','#00c316','#00ab16'];
var colorList = colorList.reverse();

function roundTo(number, to) {
    return Math.round(number * to) / to;
}

function convertToHeights(nums){
    var heights = []
    var max = Math.max.apply(null,nums);
    for (var i=0;i<nums.length;i++){
        heights.push((Math.round(($("#graph").height()/(max/nums[i]))))-10);
        if (heights[i] <=6) heights[i]=6;
    }
    return heights;
}



function grow(size, elem) {
    
    var barColor = Math.round((colorList.length-1)/(Math.max.apply(null,heightData)/size));
    var finCol = colorList[barColor]; 
    $(elem).animate({
        height: size,
        opacity: '1.0',
        backgroundColor: finCol
    }, 1000);//.css("background-color",colorList.reverse()[barColor-1]);


}


function start() {
    heightData = convertToHeights(nums);
    setTimeout (function(){
        grow(heightData[i], bars[i]);

        if (i >= bars.length) {
            return;
        } else {
            i++;
            return start();
        };
    }, 100);
}
