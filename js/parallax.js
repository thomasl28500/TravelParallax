const parallax_el = document.querySelectorAll(".parallax"); // récupère tous les éléments avec la class parallax
const main = document.querySelector('main');

let xValue = 0, yValue = 0;

rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

function updateParallax(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) rotateY(${rotateDegree * rotateSpeed}deg) translateY(calc(-50% + ${yValue * speedy}px))perspective(2300px) translateZ(calc(${zValue * speedz}px))`;
    });
}

updateParallax(0); // Position au milieu par défaut

window.addEventListener("mousemove", (e) => {
    if(timeline.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2; // récupère la position X de la souris
    yValue = e.clientY - window.innerHeight / 2; // récupère la position Y de la souris


    updateParallax(e.clientX);
});

if(window.innerWidth >= 725){
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

// GSAP Animation

let timeline = gsap.timeline();

Array.from(parallax_el)
.filter((el) => !el.classList.contains("text"))
.forEach((el) => {
    if (el.classList.contains('miamiBgFilter')) {
        timeline.from(
            el,
            {
                top: "55vh",
                duration: 2, // 2s de défilement
                ease: "power3.out",
            },
            "1" // lancement de l'animation 1s après l'actualisation de la page
        );
    } else if (el.classList.contains('parisBgFilter')) {
        timeline.from(
            el,
            {
                top: "60vh",
                duration: 2, // 2s de défilement
                ease: "power3.out",
            },
            "1" // lancement de l'animation 1s après l'actualisation de la page
        );
    } else {
        timeline.from(
            el,
            {
                top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
                duration: 3.5,
                ease: "power3.out",
            },
            "1"
        );
    }
});

timeline.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
    duration: 2,
    },
    "1.5"
    )
    .from(".text h2", {
            y: -150,
            opacity: 0,
            duration: 1.5,
        },
        "2"
    )
    .from(".hide", {
            opacity: 0,
            duration: 1.5,
        },
        "2"
    );