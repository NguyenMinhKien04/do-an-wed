$(document).ready(function(){
    $(window).scroll(function(){
    if($(this).scrollTop()){
        $('#backtop').fadeIn();
    }
    else{
        $('#backtop').fadeOut();
    }
    });
    $("#backtop").click(function(){
        $('html,body').animate({scrollTop: 0},1000);
    });
});

catSelect.onchange = function(){
// lựa chọn được select
let selectId= this.value;
for(let i=1;i<4;i++){
    let id="category"+i
    if(selectId==i){
        document.getElementById(id).style.display = "block"
    }
    else
    document.getElementById(id).style.display = "none"
}
}

function show() {
    document.getElementById('btnID')
            .style.display = "none";
}