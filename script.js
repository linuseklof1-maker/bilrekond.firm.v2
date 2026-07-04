// 1. Datan (den du frågar om – BEHÅLL denna)
const tider = [
  { tid: "09:00", upptagen: false },
  { tid: "10:00", upptagen: false },
  { tid: "11:00", upptagen: true },
  { tid: "13:00", upptagen: false },
  { tid: "14:00", upptagen: false },
  { tid: "15:00", upptagen: true }
];
const kalenderContainer = document.getElementById("kalender");

// 2. Variabel för vald tid (ny)
let valdTid = null;

// 3. Uppdaterade funktioner (ersätter den gamla visaTider)
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

  console.log("Vald tid:", valdTid);
}

// 4. Kör funktionen som ritar upp allt
visaTider();

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

const bokningForm = document.getElementById("bokning-form");
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

const epostInput = document.getElementById("k-epost");
const epostFel = document.getElementById("epost-fel");

epostInput.addEventListener("input", function() {
  const epost = epostInput.value;
  const giltig = epost.includes("@") && epost.includes(".");

  if (epost.length > 0 && !giltig) {
    epostFel.textContent = "Ange en giltig e-postadress";
  } else {
    epostFel.textContent = "";
  }
});

const kontaktForm = document.getElementById("kontakt-form");
kontaktForm.addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Tack för ditt meddelande! Vi hör av oss snart.");
  kontaktForm.reset();
  epostFel.textContent = "";
});