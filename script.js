window.addEventListener("load", function () {

    function LoadNav() {
        let nav = document.querySelector(".nav");
        let navtoggle = nav.querySelector(".toggler")

        navtoggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        })
    }
    LoadNav();


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



    function getDom() {
        imagecontainer = document.querySelector(".slider-images");
        images = document.querySelectorAll(".slide-image");

        contents = document.querySelectorAll(".image-content");
        contentsContainer = document.querySelector(".image-slider-content");

        next = document.querySelector(".next");
        prev = document.querySelector(".prev");

        width = images[0].clientWidth;
        contentwidth = document.querySelector(".hero__content").clientWidth;
    }

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

    function translateX() {
        let moveto = images[curposition].style.left;
        let movecontentto = contents[curposition].style.left;
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
    getDom();
    setLogic(images);
    stack(images, contents);
    addListeners();

    window.addEventListener('resize', resizeCarousel);

});