window.addEventListener("load", function () {

    LoadNav = () => {
        let nav = document.querySelector(".nav");
        let navtoggle = nav.querySelector(".toggler")

        navtoggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        })
    }
    LoadNav();


    let currentIndex;
    let lastIndex;

    var imagecontainer = document.querySelector(".slider-images");
    var images = document.querySelectorAll(".slide-image");

    var contents = document.querySelectorAll(".image-content");
    var contentsContainer = document.querySelector(".image-slider-content");

    var next = document.querySelector(".next");
    var prev = document.querySelector(".prev");

    var width = images[0].clientWidth;
    var contentwidth = document.querySelector(".hero__content").clientWidth;

    setLogic = images => {
        currentIndex = 0;
        lastIndex = images.length - 1;
    }

    //set images to stack beside each other
    
    stack = (images, contents) => {
        images.forEach((image, index) => {
            let absposition = width * index + "px";
            image.style.left = absposition;
        });

        contents.forEach((content, index) => {
            let absposition = contentwidth * index + "px";
            content.style.left = absposition;
        });
        //also translate the containers after stacking
        translateX()

    }

    translateX = () => {
        let moveto = images[currentIndex].style.left;
        let movecontentto = contents[currentIndex].style.left;
        imagecontainer.style.transform = `translateX(-${moveto})`;
        contentsContainer.style.transform = `translateX(-${movecontentto})`;
    }

    //add Listeners
    addListeners = () => {
        next.addEventListener("click", () => {
            if (currentIndex < lastIndex) {
                currentIndex += 1;
                translateX()
            }
        });

        prev.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex -= 1;
                translateX()
            }
        })
    }

    setLogic(images);
    stack(images, contents);
    addListeners();

    window.addEventListener('resize', resizeCarousel);

});
