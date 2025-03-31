document.addEventListener("DOMContentLoaded", function () {
    
    
    // Search Popup Functionality


    const searchIcon = document.querySelector(".search-btn");
    const searchPopup = document.querySelector(".search-popup");
    const closePopup = document.querySelector(".close-popup");

    if (searchIcon && searchPopup && closePopup) {
        searchIcon.addEventListener("click", () => searchPopup.style.display = "block");
        closePopup.addEventListener("click", () => searchPopup.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === searchPopup) searchPopup.style.display = "none";
        });
    }

    // Accordion Functionality
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const openItem = document.querySelector(".accordion-header.active");
            if (openItem && openItem !== header) {
                openItem.classList.remove("active");
                openItem.nextElementSibling.style.maxHeight = null;
            }
            header.classList.toggle("active");
            const content = header.nextElementSibling;
            content.style.maxHeight = header.classList.contains("active") ? content.scrollHeight + "px" : null;
        });
    });

    // Testimonials Carousel
    const container = document.getElementById("testimonialContainer");
    const dotsContainer = document.getElementById("dots");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");
    const cards = document.querySelectorAll(".testimonial-card");

    if (container && dotsContainer && leftArrow && rightArrow && cards.length) {
        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dots");
            if (index === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dots");

        function updateDots() {
            const index = Math.round(container.scrollLeft / (cards[0].offsetWidth + 20));
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");
        }

        container.addEventListener("scroll", updateDots);
        leftArrow.addEventListener("click", () => container.scrollBy({ left: -(cards[0].offsetWidth + 20), behavior: "smooth" }));
        rightArrow.addEventListener("click", () => container.scrollBy({ left: (cards[0].offsetWidth + 20), behavior: "smooth" }));
        dots.forEach((dot, index) => dot.addEventListener("click", () => container.scrollTo({ left: index * (cards[0].offsetWidth + 20), behavior: "smooth" })));
    }

    // Percentage Counter Animation
    const counters = document.querySelectorAll(".percentage");
    let animated = false;

    function animateCounters() {
        const section = document.querySelector(".percentage-section");
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        if (!animated && sectionTop < window.innerHeight - 100) {
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                let count = 0;
                const increment = target / 50;

                function update() {
                    count += increment;
                    counter.textContent = count < target ? `${Math.ceil(count)}%` : `${target}%`;
                    if (count < target) setTimeout(update, 20);
                }
                update();
            });
            animated = true;
        }
    }
    window.addEventListener("scroll", animateCounters);

    // Gallery Functionality
    const images = [
        "./assets/thumbnails/Group 1000003951.png",
        "./assets/thumbnails/Group 1000003953.png",
        "./assets/thumbnails/Group 1000003954.png",
        "./assets/thumbnails/Group 1000003955.png",
        "./assets/thumbnails/Group 1000003956.png",
        "./assets/thumbnails/Group 1000004276.png",
        "./assets/thumbnails/Rectangle 6684.png",
        "./assets/thumbnails/Rectangle 6685.png"
    ];
    
    const mainImage = document.getElementById("main-image");
    const prevArrow = document.getElementById("prev-arrow");
    const nextArrow = document.getElementById("next-arrow");
    const thumbnails = document.querySelectorAll(".thumbnail");
    let currentImageIndex = 0;

    function updateMainImage(index) {
        if (!mainImage) return;
        index = (index + images.length) % images.length;
        mainImage.src = images[index];
        currentImageIndex = index;
        thumbnails.forEach((thumbnail, i) => thumbnail.classList.toggle("active", i === index));
    }

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener("click", () => updateMainImage(currentImageIndex - 1));
        nextArrow.addEventListener("click", () => updateMainImage(currentImageIndex + 1));
    }
    thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener("click", () => updateMainImage(index)));

    // Add to Cart Functionality
    const flavorRadios = document.querySelectorAll("input[name='flavor']");
    const purchaseTypeRadios = document.querySelectorAll("input[name='purchase-type']");
    const addToCartBtn = document.getElementById("add-to-cart");

    function updateAddToCartLink() {
        if (!addToCartBtn) return;
        let flavor = [...flavorRadios].find(r => r.checked)?.value || "";
        let purchaseType = [...purchaseTypeRadios].find(r => r.checked)?.value || "";
        let cartUrl = `https://example.com/cart/add?product=${flavor}-${purchaseType}`;
        addToCartBtn.href = cartUrl;
    }
    flavorRadios.forEach(radio => radio.addEventListener("change", updateAddToCartLink));
    purchaseTypeRadios.forEach(radio => radio.addEventListener("change", updateAddToCartLink));
    updateAddToCartLink();
});
