const toggleButton= document.getElementById('nav-toggle');
const navLinks=document.getElementById('nav-links');
toggleButton.addEventListener('click',()=>{
    navLinks.classList.toggle('active');
})



// Get the logged-in user from localStorage
const username = localStorage.getItem('username');
if (username) {
  document.getElementById('welcomeUser').innerText =" "+ username;
} else {
  window.location.href = "index.html"; // Redirect to login page if not logged in
}

// Article section
document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', () => {
        const likeCount = button.previousElementSibling.querySelector('.like-count');
        let currentLikes = parseInt(likeCount.textContent);
        likeCount.textContent = `${currentLikes+10}`;
        button.textContent = '❤️ Liked';
    });
});
    //View more functionality
    function toggleView() {
        const moreCards = document.querySelectorAll('.more-cards');
        const viewAllBtn = document.getElementById('viewAllBtn');
        moreCards.forEach(card => {
            card.style.display = (card.style.display === 'none' || card.style.display === '') ? 'block' : 'none';
        });

        if (viewAllBtn.innerText === 'View All') {
            viewAllBtn.innerText = 'View Less';
        } else {
            viewAllBtn.innerText = 'View All';
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const moreCards = document.querySelectorAll('.more-cards');
        moreCards.forEach(card => {
            card.style.display = 'none';
        });
    });



$(document).ready(function(){

    $(window).scroll(function(){
        //Navbar-bottom scrolling
        if(this.scrollY > 5){
            $('.navbar-bottom').addClass("sticky");
        }else{
            $('.navbar-bottom').removeClass("sticky");
        }

        //Scrolling Button Btn
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

        //slide up script
        $('.scroll-up-btn').click(function(){
            $('html').animate({scrollTop:0});
        });
 });

$(document).ready(function(){
    // Initialize Owl Carousel for testimonials
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
});


// Get the modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("explore-more");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
