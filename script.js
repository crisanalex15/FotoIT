const box = document.querySelector(".contact");
const element = document.querySelector(".icon-closed");
const overlay = document.querySelector(".overlay");
const lentila = document.querySelector(".lentila");

const images = document.querySelectorAll("img");

document.addEventListener("DOMContentLoaded", function () {
  refreshFsLightbox(); // Inițializează corect lightbox-ul
});

images.forEach((img) => {
  img.addEventListener("dragstart", (event) => {
    event.preventDefault(); // Oprește efectul de "ghost image"
  });
});

document.querySelectorAll(".imgpres").forEach((element) => {
  const bgImage = element.getAttribute("data-bg");
  const heightValue = element.getAttribute("data-height");
  if (bgImage) {
    element.style.backgroundImage = `url('${bgImage}')`;
  }
  if (heightValue) {
    element.style.height = heightValue;
  }
});

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ScrollSmoother.create({
//   wrapper: "#smooth-wrapper",
//   content: "#smooth-content",
//   smooth: 1,
//   effects: true,
// });

// Slider

// refreshFsLightbox();
const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: false,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// inchidere fslightbox
document.querySelectorAll("[data-fslightbox]").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
  });
});

document.addEventListener("click", function (event) {
  if (
    document.body.classList.contains("fslightbox-open") &&
    !event.target.closest(".fslightbox-container")
  ) {
    closeFsLightbox();
  }
});

const slides = document.querySelectorAll(".swiper-slide");

slides.forEach((slide) => {
  slide.addEventListener("mouseenter", () => {
    gsap.to(".swiper-slide", {
      opacity: 0.5,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(slide, {
      opacity: 1,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  slide.addEventListener("mouseleave", () => {
    gsap.to(".swiper-slide", {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Animatii

element.addEventListener("click", () => {
  box.style.transform = "l";
  const arrows = element.querySelectorAll("img");
  arrows[0].classList.toggle("hidden");
  arrows[1].classList.toggle("hidden");
  box.classList.toggle("moved");
  overlay.classList.toggle("show");
  setTimeout(() => {
    overlay.style.visibility = "visible";
  }, 300);
});

overlay.addEventListener("click", () => {
  if (box.classList.contains("moved")) {
    box.classList.remove("moved");
    overlay.classList.remove("show");
    const arrows = element.querySelectorAll("img");
    arrows[0].classList.toggle("hidden");
    arrows[1].classList.toggle("hidden");
    setTimeout(() => {
      overlay.style.visibility = "hidden";
    }, 300);
  }
});

gsap.from("header .container a, header .container", {
  y: -60,
  opacity: 0,
  duration: 1,
  stagger: 0.5,
  delay: 2,
});

gsap.to(".contact .icon-arrow", {
  x: "90px",
  duration: 1,
  ease: "expo.in",
  delay: 2.5,
});

var t1 = gsap.timeline();

t1.from(".lentila", {
  opacity: 0,
  duration: 1,
  left: "-590",
  ease: "expo.inOut",
})
  .from(".scrisHero h3", {
    duration: 1,
    opacity: 0,
    stagger: 1,
    ease: "power3.out",
  })
  .to("lentila", {
    duration: 1,
    filter: "brightness(2) drop-shadow(10px 20px 100px rgba(0, 0, 0, 0.5))",
  });

lentila.addEventListener("mouseenter", () => {
  gsap.to(lentila, { rotate: 20, duration: 0.3, ease: "power2.out" });
});
lentila.addEventListener("mouseleave", () => {
  gsap.to(lentila, { rotate: 0, duration: 0.3, ease: "power2.out" });
});

// profil

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".linie2",
    start: "top 80%", // Când începe animația
    end: "top 30%", // Când se termină
    toggleActions: "play reverse play reverse", // Reverse când ieși, play când revii
  },
});

// 1️⃣ Animăm linia
tl.from(".linie2", {
  scaleY: 0,
  transformOrigin: "center center",
  opacity: 0,
  duration: 2,
  ease: "power3.inOut",
})

  // 2️⃣ Animăm poza (după linie)
  .from(
    ".profil",
    {
      x: "125px",
      borderBottomRightRadius: "0px",
      borderTopRightRadius: "0px",
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=1.5"
  )

  // 3️⃣ Animăm textul (după poză)
  .from(
    ".text-screen2",
    {
      x: "-125px",
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.5"
  );

// Galerie

gsap.registerPlugin(ScrollTrigger);

let tlGalerie = gsap.timeline({
  scrollTrigger: {
    trigger: ".swiper-margin",
    start: "top 40%", // Începe mai devreme
    end: "top 10%", // Se inversează mai târziu
    scrub: 1, // Face animația fluidă în funcție de scroll
    toggleActions: "play reverse play reverse",
  },
});

// Animare galerie
tlGalerie.from(".swiper-margin", {
  opacity: 0,
  y: "-50%",
  duration: 1.5,
  ease: "power3.out",
});

gsap.from(".text-chenar", {
  opacity: 0,
  y: "-50%",
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".screen4",
    start: "top 75%", // Începe mai devreme
    end: "top 70%", // Se inversează mai târziu
    scrub: 1, // Face animația fluidă în funcție de scroll
    toggleActions: "play reverse play reverse",
  },
});

const buttonUpload = document.querySelector(".LoadImg");
const modalImg = document.querySelector(".modal");
const overlay2 = document.querySelector(".overlay2");
buttonUpload.addEventListener("click", () => {
  modalImg.classList.toggle("hidden");
  overlay2.classList.toggle("show");
  document.querySelector(".modal").style.display = "block";
});

overlay2.addEventListener("click", () => {
  modalImg.classList.add("hidden");
  overlay2.classList.remove("show");

  setTimeout(() => {
    overlay2.style.visibility = "hidden";
  }, 300);
});

buttonUpload.addEventListener("click", () => {
  overlay2.style.visibility = "visible";
});

const sendData = async () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  const data = {
    name,
    email,
    message,
  };
  const response = await fetch("http://localhost:5100/Home/Preia", {
    method: "POST",
    body: JSON.stringify({ Name: name, Email: email, Description: message }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#message").value = "";
  alert("Mesajul a fost trimis cu succes!");
};

document.querySelector(".Trimite").addEventListener("click", (event) => {
  event.preventDefault();
  sendData();
});

document.querySelector(".Primeste").addEventListener("click", () => {
  window.location.href = "contacte.html";
});

const uploadInput = document.getElementById("uploadImage");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

uploadInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        convertToBlackAndWhite();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const imageDataURL = canvas.toDataURL("image/png"); // Convertim în base64

  const response = await fetch("http://localhost:5100/Home/GETIMG", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: ImageName,
      imagePath: imagePath,
      ImageData: ImageData,
    }),
  });

  if (response.ok) {
    alert("Poza a fost încărcată cu succes!");
    uploadInput.value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    alert("Eroare la încărcarea pozei.");
  }
  // clear
});
