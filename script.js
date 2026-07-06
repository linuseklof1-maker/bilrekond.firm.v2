// 1. Datan
const tider = [
  { tid: "09:00", upptagen: false },
  { tid: "10:00", upptagen: false },
  { tid: "11:00", upptagen: true },
  { tid: "13:00", upptagen: false },
  { tid: "14:00", upptagen: false },
  { tid: "15:00", upptagen: true }
];
const kalenderContainer = document.getElementById("kalender");

// 2. Variabel för vald tid
let valdTid = null;

// 3. Funktioner
function visaTider() {
  tider.forEach(function(tidObjekt) {
    const knapp = document.createElement("button");
    knapp.textContent = tidObjekt.tid;
    knapp.classList.add("tid-knapp");

    if (tidObjekt.upptagen) {
      knapp.classList.add("upptagen");
      knapp.disabled = true;
    } else {
      knapp.addEventListener("click", function() {
        valjTid(knapp, tidObjekt.tid);
      });
    }

    kalenderContainer.appendChild(knapp);
  });
}

function valjTid(knapp, tid) {
  const allaKnappar = document.querySelectorAll(".tid-knapp");
  allaKnappar.forEach(function(k) {
    k.classList.remove("vald");
  });

  knapp.classList.add("vald");
  valdTid = tid;

  visaBokningsformular(tid);
}

function visaBokningsformular(tid) {
  const formularSektion = document.getElementById("bokningsformular");
  const valdTidText = document.getElementById("vald-tid-text");

  valdTidText.textContent = tid;
  formularSektion.style.display = "block";
}

function markeraSomUpptagen(tid) {
  const bokadTid = tider.find(function(tidObjekt) {
    return tidObjekt.tid === tid;
  });

  bokadTid.upptagen = true;

  kalenderContainer.innerHTML = "";
  visaTider();
}

function gomFormular() {
  const formularSektion = document.getElementById("bokningsformular");
  formularSektion.style.display = "none";
  bokningForm.reset();
  valdTid = null;
}

// 4. Kör kalender-koden bara om den finns på sidan
if (kalenderContainer) {
  visaTider();
}

// 5. Bokningsformulär
const bokningForm = document.getElementById("bokning-form");

if (bokningForm) {
  bokningForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const namn = document.getElementById("namn").value;
    const telefon = document.getElementById("telefon").value;
    const biltyp = document.getElementById("biltyp").value;

    console.log("Bokning:", { valdTid, namn, telefon, biltyp });
    alert("Tack " + namn + "! Din tid " + valdTid + " är bokad.");

    markeraSomUpptagen(valdTid);
    gomFormular();
  });
}

// 6. E-post-validering (kontaktsidan)
const epostInput = document.getElementById("k-epost");
const epostFel = document.getElementById("epost-fel");

if (epostInput) {
  epostInput.addEventListener("input", function() {
    const epost = epostInput.value;
    const giltig = epost.includes("@") && epost.includes(".");

    if (epost.length > 0 && !giltig) {
      epostFel.textContent = "Ange en giltig e-postadress";
    } else {
      epostFel.textContent = "";
    }
  });
}

// 7. Kontaktformulär
const kontaktForm = document.getElementById("kontakt-form");

if (kontaktForm) {
  kontaktForm.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Tack för ditt meddelande! Vi hör av oss snart.");
    kontaktForm.reset();
    epostFel.textContent = "";
  });
}

// 8. Hamburgermeny
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
}