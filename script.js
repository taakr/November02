
/* =====================
   FADE UP
===================== */

const fadeElements = document.querySelectorAll(".fade-up");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    });

    fadeElements.forEach((el) => observer.observe(el));

} else {

    fadeElements.forEach((el) => el.classList.add("show"));

}



/* =====================
   MENU OPEN / CLOSE
===================== */

const menuBtn = document.getElementById("open-menu");
const menuOverlay = document.getElementById("menu-overlay");

// メニュー以外をタップしたときの透明な領域
const menuBackdrop = document.createElement("div");
menuBackdrop.id = "menu-backdrop";
document.body.appendChild(menuBackdrop);

if (menuBtn && menuOverlay) {

    function openMenu() {
        menuOverlay.classList.add("open");
        menuBackdrop.classList.add("open");

        menuOverlay.setAttribute("aria-hidden", "false");
        menuBtn.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        menuOverlay.classList.remove("open");
        menuBackdrop.classList.remove("open");

        menuOverlay.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }

    // MENUボタンで開閉
    menuBtn.addEventListener("click", () => {

        if (menuOverlay.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    // 右側をタップしたら閉じる
    menuBackdrop.addEventListener("click", closeMenu);

    // メニュー画像以外をタップしたら閉じる
menuOverlay.addEventListener("click", (event) => {

    // HOMEなどのリンク画像を押した場合は閉じる処理をしない
    if (event.target.closest(".overlay-nav a")) {
        return;
    }

    closeMenu();

});

    // Escキーでも閉じる
    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            menuOverlay.classList.contains("open")
        ) {
            closeMenu();
        }

    });

}

/* =====================
   SCROLL HEADER
===================== */

function updateScrollState() {

    if (window.scrollY > 50) {

        document.body.classList.add("scrolled");

    } else {

        document.body.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateScrollState);

updateScrollState();


/* =====================
   VIDEO AUTOPLAY
===================== */

document.addEventListener("DOMContentLoaded", () => {

    const videos = document.querySelectorAll(
        ".index-video, .index-video01"
    );

    videos.forEach((video) => {

        video.muted = true;

        video.play().catch(() => {});

    });

});


/* =====================
   MARQUEE VIDEO
===================== */

const marqueeVideos = document.querySelectorAll(
    "video.marquee-link"
);

marqueeVideos.forEach((video) => {

    video.addEventListener("mouseenter", () => {

        video.pause();

    });

    video.addEventListener("mouseleave", () => {

        video.play().catch(() => {});

    });

});


/* =====================
   WORK OVERLAY
===================== */

const workInfo = document.getElementById("work-info");
const galleryWorks = document.querySelectorAll(".gallery-work");
const workOverlay = document.getElementById("work-overlay");
const workOverlayImages = document.getElementById("work-overlay-images");
const workClose = document.getElementById("work-close");

if (
    workOverlay &&
    workOverlayImages &&
    workClose
) {

    galleryWorks.forEach((work) => {

        work.addEventListener("click", (e) => {

            const mediaData = work.dataset.media || "";

            if (!mediaData) {
                return;
            }

            e.preventDefault();

            const mediaItems = mediaData
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");

            workOverlayImages.innerHTML = "";

            const info = work.dataset.info || "";
            const description = work.dataset.text || "";
            const link = work.dataset.link || "";

            if (workInfo) {

                workInfo.innerHTML = "";

                if (info) {

                    if (link) {

                        const infoLink = document.createElement("a");

                        infoLink.href = link;
                        infoLink.target = "_blank";
                        infoLink.rel = "noopener noreferrer";
                        infoLink.className = "music-link";
                        infoLink.textContent = info;

                        workInfo.appendChild(infoLink);

                    } else {

                        const infoText = document.createElement("p");

                        infoText.textContent = info;

                        workInfo.appendChild(infoText);

                    }

                }

                if (description) {

                    const subText = document.createElement("p");

                    subText.className = "music-text";
                    subText.textContent = description;

                    workInfo.appendChild(subText);

                }

            }

            mediaItems.forEach((src) => {

                // 動画の場合
                if (/\.(mp4|webm|mov)(\?.*)?$/i.test(src)) {

                    const video = document.createElement("video");

                    video.src = src;
                    video.autoplay = true;
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;

                    workOverlayImages.appendChild(video);

                    video.play().catch(() => {});

                }

                // 画像の場合
                else {

                    const img = document.createElement("img");

                    img.src = src;
                    img.alt = "";

                    workOverlayImages.appendChild(img);

                }

            });

            workOverlay.scrollTop = 0;

            workOverlay.classList.add("is-open");

            document.body.style.overflow = "hidden";

        });

    });

    // 作品画面を閉じる
    workClose.addEventListener("click", () => {

        workOverlay.classList.remove("is-open");

        document.body.style.overflow = "";

        // 閉じた動画を停止
        workOverlayImages.querySelectorAll("video").forEach((video) => {

            video.pause();

        });

    });

}