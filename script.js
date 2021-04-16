window.addEventListener("load", function () {

    LoadNav = () => {
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

    let currentPosition;
    let maxpos;

    getDom = () => {
        imagecontainer = document.querySelector(".slider-images");
        images = document.querySelectorAll(".slide-image");

        contents = document.querySelectorAll(".image-content");
        contentsContainer = document.querySelector(".image-slider-content");

        next = document.querySelector(".next");
        prev = document.querySelector(".prev");

        width = images[0].clientWidth;
        contentwidth = document.querySelector(".hero__content").clientWidth;
    }

    setLogic = images => {
        currentPosition = 0;
        maxpos = images.length - 1;
    }

    // set images to stack beside each other
    
    stack = (images, contents) => {
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

    translateX = () => {
        let moveto = images[currentPosition].style.left;
        let movecontentto = contents[currentPosition].style.left;
        imagecontainer.style.transform = `translateX(-${moveto})`;
        contentsContainer.style.transform = `translateX(-${movecontentto})`;
    }

    // add Listeners
    addListeners = () => {
        next.addEventListener("click", () => {
            if (currentPosition < maxpos) {
                currentPosition += 1;
                translateX()
            }
        });

        prev.addEventListener("click", () => {
            if (currentPosition > 0) {
                currentPosition -= 1;
                translateX()
            }
        })
    }

    // resize the carousel
    function resizeCarousel() {
        getDom();
        stack(images, contents);
    }


    // Load Carousel
    getDom();
    setLogic(images);
    stack(images, contents);
    addListeners();

    window.addEventListener('resize', resizeCarousel);

});