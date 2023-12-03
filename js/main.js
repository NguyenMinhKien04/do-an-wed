$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });

    $("#backtop").click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
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

/*------------------------*/
function momodal(){
    document.getElementById("nenmodal-1").classList.toggle("active");
    }

    /*----------------------------*/
    document.addEventListener('DOMContentLoaded', function () {
        const dots = document.querySelectorAll('.dot');
        const slides = document.querySelectorAll('.slide');
        let currentIndex = 0;
     
        // Function to navigate to a specific slide
        const goToSlide = (index) => {
           slides.forEach((slide, i) => {
              slide.style.marginLeft = `-${index * 850}px`; // Adjust the slide width accordingly
           });
     
           // Update the active dot
           dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === index);
           });
        };
     
        // Click event for each dot
        dots.forEach((dot, index) => {
           dot.addEventListener('click', () => {
              currentIndex = index;
              goToSlide(currentIndex);
           });
        });
     
        // Auto-slide functionality (optional)
        setInterval(() => {
           currentIndex = (currentIndex + 1) % slides.length;
           goToSlide(currentIndex);
        }, 5000); // Adjust the interval as needed
     });
    /*-----------------------------------------*/
    function showCategory(categoryId) {
        // Hide all categories
        document.getElementById('category1').style.display = 'none';
        document.getElementById('category2').style.display = 'none';

        // Show the selected category
        document.getElementById(categoryId).style.display = 'block';
    }

   /*-----------------------------*/

  