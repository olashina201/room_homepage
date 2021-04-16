window.addEventListener("load", function () {

    // NAV
    function LoadNav() {
        let nav = document.querySelector(".nav");
        let navtoggle = nav.querySelector(".toggler")

        navtoggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        })
    }
    LoadNav();


    // CAROUSEL
    let imagecontainer;
    let images;
    let next;
    let prev;
    let width;

    let contents;
    let contentsContainer;
    let contentwidth;

    // define logic 
    let curposition;
    let maxpos;



    // Get current DOM
    function getState() {
        imagecontainer = document.querySelector(".slider-images");
        images = document.querySelectorAll(".slide-image");

        contents = document.querySelectorAll(".image-content");
        contentsContainer = document.querySelector(".image-slider-content");

        next = document.querySelector(".next");
        prev = document.querySelector(".prev");

        width = images[0].clientWidth;
        // i am translating content by 100% of the hero__content width, not the content's container width
        contentwidth = document.querySelector(".hero__content").clientWidth;
    }

    // initialize logic
    function setLogic(images) {
        curposition = 0;
        maxpos = images.length - 1;
    }

    // set images to stack beside each other
    function stack(images, contents) {
        images.forEach((image, index) => {
            let absposition = width * index + "px";
            image.style.left = absposition;
            // console.log(`set image ${index} to absolute position left: ${absposition}`);
        });

        contents.forEach((content, index) => {
            let absposition = contentwidth * index + "px";
            content.style.left = absposition;
        });

        // also translate the containers after stacking
        translateX()

    }

    // translates image/content container based on the current position of the carousel
    function translateX() {
        let moveto = images[curposition].style.left;
        let movecontentto = contents[curposition].style.left;
        // console.log(`moving to position: ${moveto}`);
        imagecontainer.style.transform = `translateX(-${moveto})`;
        contentsContainer.style.transform = `translateX(-${movecontentto})`;
    }

    // add Listeners
    function addListeners() {

        next.addEventListener("click", () => {
            if (curposition < maxpos) {
                curposition += 1;
                translateX()
            }
        });

        prev.addEventListener("click", () => {
            // if not at the last position
            if (curposition > 0) {
                curposition -= 1;
                translateX()
            }
        })
    }

    // resize the carousel
    function resizeCarousel() {
        getState();
        stack(images, contents);
    }


    // Load Carousel
    getState();
    setLogic(images);
    stack(images, contents);
    addListeners();

    window.addEventListener('resize', resizeCarousel);

});