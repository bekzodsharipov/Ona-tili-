document.addEventListener("DOMContentLoaded", function () {

    function sendEvent(eventType) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://user-action-tracker.asosit.uz/events", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Yuborildi:", xhr.responseText);
                } else {
                    console.error("Xatolik:", xhr.status);
                }
            }
        };

        xhr.send(JSON.stringify({
            type: eventType,
            site_name: "Asosiy"
        }));
    }

    sendEvent("Saytga kirdi");

    var registerButtons = document.querySelectorAll(".registerBtn");
    var registrationModal = document.getElementById("registrationModal");
    var closeModalBtn = document.getElementById("closeModalBtn");
    var modalOverlay = document.querySelector(".homeModalOverlay");
    var registrationForm = document.getElementById("registrationForm");
    var phoneInput = document.getElementById("phone");
    var phoneError = document.getElementById("phoneError");
    var submitBtn = document.getElementById("submitBtn");
    var timerElement = document.getElementById("timer");

    var phoneFormats = {
        "+998": {
            placeholder: "88 888 88 88",
            format: function (num) {
                var formatted = "";
                if (num.length > 0) formatted += num.slice(0, 2);
                if (num.length > 2) formatted += " " + num.slice(2, 5);
                if (num.length > 5) formatted += " " + num.slice(5, 7);
                if (num.length > 7) formatted += " " + num.slice(7, 9);
                return formatted;
            },
            validate: function (val) {
                return /^\d{2} \d{3} \d{2} \d{2}$/.test(val);
            }
        }
    };

    var currentCountryCode = "+998";

    function closeModal() {
        registrationModal.style.display = "none";
        document.body.style.overflowY = "scroll";
    }

    closeModalBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);

    registerButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            sendEvent("Tugmani bosdi");
            registrationModal.style.display = "block";
            document.body.style.overflowY = "hidden";
        });
    });

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var phone = phoneInput.value;
        var country = phoneFormats[currentCountryCode] || phoneFormats["+998"];

        if (country.validate(phone)) {
            phoneError.style.display = "none";
            submitBtn.textContent = "YUBORILMOQDA...";
            submitBtn.disabled = true;

            var now = new Date();
            var formData = {
                TelefonRaqam: currentCountryCode + " " + phone,
                SanaSoat: now.toLocaleDateString("uz-UZ") + " - " + now.toLocaleTimeString("uz-UZ")
            };

            localStorage.setItem("formData", JSON.stringify(formData));
            window.location.href = "/thankYou.html";
        } else {
            phoneError.style.display = "block";
        }
    });

    phoneInput.addEventListener("input", function () {
        var digits = this.value.replace(/\D/g, "");
        var format = phoneFormats[currentCountryCode] || phoneFormats["+998"];
        this.value = format.format(digits);
        phoneError.style.display = "none";
    });

    var timeLeft = 120;
    var timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = "00:00";
            return;
        }

        timeLeft--;
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timerElement.textContent =
            minutes.toString().padStart(2, "0") + ":" +
            seconds.toString().padStart(2, "0");
    }, 1000);

});

let duration = 2 * 60;
const timerBox = document.querySelector('.timer__box');

const interval = setInterval(() => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerBox.textContent = `${minutes}:${seconds}`;

    if (duration <= 0) {
        clearInterval(interval);
        timerBox.textContent = "00:00";
    }

    duration--;
}, 1000);

const img = document.querySelector(".mobile-hero-image");
const bigSrc = img.getAttribute("data-src");
const highRes = new Image();
highRes.src = bigSrc;

highRes.onload = () => {
    img.src = bigSrc;
    img.classList.remove("blur-up");
};
