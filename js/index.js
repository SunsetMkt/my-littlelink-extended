import grayscale from "./grayscale.js";
import confetti from "canvas-confetti";

// Run a function safely
function safeRun(func) {
    try {
        func();
        return true;
    } catch (error) {
        console.error(loggingPrefix, error);
        return false;
    }
}

// Run an async function safely and await
async function safeRunAwait(func) {
    try {
        await func();
        return true;
    } catch (error) {
        console.error(loggingPrefix, error);
        return false;
    }
}

function onDomReady(fn) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn);
    } else {
        fn();
    }
}

function addScriptTag(src, async, onload) {
    var scriptElement = document.createElement("script");
    scriptElement.async = async;
    scriptElement.src = src;
    if (onload) {
        scriptElement.onload = onload;
    }
    var firstScriptElement = document.getElementsByTagName("script")[0];
    firstScriptElement.parentNode.insertBefore(
        scriptElement,
        firstScriptElement,
    );
}

// Init message
console.info("[hi]", "Hello World");

// import "./sensitive-content.js"
safeRun(function () {
    onDomReady(function () {
        // 1) Check for slide-container
        const containers = document.querySelectorAll(".slide-container");

        containers.forEach((container) => {
            // 2) Find the key elements inside this container
            const trigger = container.querySelector(".sensitive-trigger");
            const panel = container.querySelector(".sensitive-panel");
            const continueBtn = container.querySelector(".sensitive-continue");

            // 3) Read the URL from data-continue-url
            const externalUrl = container.dataset.continueUrl;

            // Safety checks: if we don’t have a trigger or panel, skip
            if (!trigger || !panel) return;

            // 4) Toggle panel on trigger click
            trigger.addEventListener("click", function (evt) {
                evt.preventDefault();
                panel.classList.toggle("open"); // open if closed, close if open
            });

            // 5) Close panel if user clicks outside
            document.addEventListener("click", function (evt) {
                if (
                    panel.classList.contains("open") &&
                    !panel.contains(evt.target) &&
                    evt.target !== trigger
                ) {
                    panel.classList.remove("open");
                }
            });

            // 6) “Continue” button
            if (continueBtn) {
                continueBtn.addEventListener("click", function () {
                    // Close the panel
                    panel.classList.remove("open");

                    // If there's a data-continue-url, open it in a new tab
                    if (externalUrl) {
                        window.open(externalUrl, "_blank");
                    }
                });
            }
        });
    });
});

// Add save-ukraine
safeRun(function () {
    addScriptTag(
        "https://unpkg.com/save-ukraine@0.18.111/dist/umd/main.js",
        true,
        function () {
            console.info("[save-ukraine]", "Loaded");
            Ukraine.save({
                ribbon: "TOP_LEFT",
                countries: [],
                hasShadow: true,
                isCancelable: true,
                isBloodIncluded: false,
                isGraphicIncluded: false,
                isInConsole: false,
                moreInfoUrl: "https://war.ukraine.ua/",
            });
        },
    );
});

// Grayscale
safeRun(grayscale);

function firework(x, y) {
    var count = 200;
    var defaults = {
        origin: { x: x, y: y },
        disableForReducedMotion: true,
    };
    console.info("[firework]", defaults);

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// Confetti
safeRunAwait(async function () {
    const avatar = document.querySelector(".avatar");
    if (avatar) {
        avatar.addEventListener("click", function (event) {
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;
            firework(x, y);
        });
    }
});
