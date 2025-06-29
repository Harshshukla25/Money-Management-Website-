const toggleButton= document.getElementById('nav-toggle');
const navLinks=document.getElementById('nav-links');
toggleButton.addEventListener('click',()=>{
    navLinks.classList.toggle('active');
})
    
    
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


// Disable the like button functionality
document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); 
    });
});


// Function to display the popup
function showLoginPopup() {
    document.getElementById('login-popup').style.display = 'flex';
    document.body.classList.add('no-scroll');
  }
  function closePopup() {
    document.getElementById('login-popup').style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
  function redirectToLogin() {
    window.location.href = 'login.html'; 
  }
  
  // Function to show the "Get In Touch" popup
function showContactPopup() {
    document.getElementById('contact-popup').style.display = 'flex';
    document.body.classList.add('no-scroll');
  }
  function closeContactPopup() {
    document.getElementById('contact-popup').style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
  function redirectToLogin() {
    window.location.href = 'login.html'; 
  }
  
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

// Get the button that opens the modal
var btn = document.getElementById("explore-more");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}