document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Countdown timer
    function countdown() {
        const endDate = new Date("Dec 31, 2024 23:59:59").getTime();
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.querySelector('.discount-news .time').innerHTML =
            `<label>${days}<span>:</span></label>
            <label>${hours}<span>:</span></label>
            <label>${minutes}<span>:</span></label>
            <label>${seconds}</label>`;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            document.querySelector('.discount-news .time').innerHTML = "EXPIRED";
        }
    }

    const timerInterval = setInterval(countdown, 1000);
    countdown();

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('.category, .most-rated, .popular-products, .discount-news, .our-services').forEach(section => {
        observer.observe(section);
    });

    // Add 'in-view' class for the CSS to handle animations
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .in-view {
            animation: fadeIn 1s ease-in-out;
        }
    `, styleSheet.cssRules.length);
});



