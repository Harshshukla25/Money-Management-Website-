document.addEventListener('DOMContentLoaded', function () {
    const tipCards = document.querySelectorAll('.tip-card');
    const observerOptions = {
        root: null, 
        threshold: 0.5 
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); 
                observer.unobserve(entry.target);  
            }
        });
    }, observerOptions);

    tipCards.forEach(card => {
        observer.observe(card);  
    });

//Tips card expansion
const tipCardExpand = document.querySelectorAll('.tip-card');

tipCardExpand.forEach(card => {
    card.addEventListener('click', () => {
        const tipDetails = card.querySelector('.tip-details'); 
        const isVisible = tipDetails.style.display === 'block';

        document.querySelectorAll('.tip-details').forEach(detail => {
            detail.style.display = 'none';
        });

        tipDetails.style.display = isVisible ? 'none' : 'block';
    });
});

        // SIP Calculator
        function calculateSIP() {
            const principal = parseFloat(document.getElementById("principal").value);
            const annualRate = parseFloat(document.getElementById("rate").value);
            const years = parseInt(document.getElementById("years").value);
    
            if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate <= 0 || years <= 0) {
                alert("Please enter valid values for all fields.");
                return;
            }
              localStorage.setItem('principal', principal);
              localStorage.setItem('annualRate', annualRate);
              localStorage.setItem('years', years);
            const monthlyRate = annualRate / 12 / 100;
            const months = years * 12;
            const maturityAmount = principal * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
            const formattedAmount = maturityAmount.toLocaleString();
            result.innerHTML = `The maturity amount after ${years} years will be: ₹${formattedAmount}`;
            result.style.opacity = 0; 
            setTimeout(() => {
            result.style.opacity = 1; 
            }, 100);

        }
        const calculateButton = document.querySelector('#sipbtn');
        calculateButton.addEventListener('click', function(event) {
            event.preventDefault();
            calculateSIP();
        });
        window.onload = function() {
            const storedPrincipal = localStorage.getItem('principal');
            const storedAnnualRate = localStorage.getItem('annualRate');
            const storedYears = localStorage.getItem('years');
            if (storedPrincipal) {
                document.getElementById('principal').value = storedPrincipal;
            }
            if (storedAnnualRate) {
                document.getElementById('rate').value = storedAnnualRate;
            }
            if (storedYears) {
                document.getElementById('years').value = storedYears;
            }
        }


    // Newsletter form submission
    const form = document.getElementById('newsletter-form');
    const formResponse = document.getElementById('form-response');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value; 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            formResponse.textContent = `Thank you for subscribing, ${email}! You will start receiving our financial tips soon.`;
            formResponse.style.color = 'red';
            form.reset(); 
        } else {
            formResponse.textContent = 'Please enter a valid email address.';
            formResponse.style.color = 'red';
        }
    });
});
