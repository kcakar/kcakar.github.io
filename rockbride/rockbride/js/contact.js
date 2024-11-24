import "../css/style.scss";
import { animateText, sectionReveal } from "./motions.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { confetti } from "@tsparticles/confetti";
import { languageSelectorINIT, bindHamburger, initScrollButton } from "./motions";

const firebaseConfig = {
  apiKey: "AIzaSyCd-nspx0BBEQC-KvvlNvE1VWgHpFOLq1A",
  authDomain: "rockbride-studio.firebaseapp.com",
  projectId: "rockbride-studio",
  storageBucket: "rockbride-studio.firebasestorage.app",
  messagingSenderId: "772102168692",
  appId: "1:772102168692:web:979d2c71cbc2f612a27121",
  measurementId: "G-YLNES74LL7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let contactModel = {
  name: "",
  email: "",
  eventType: "",
  eventDate: "",
  eventLocation: "",
  whichPackage: "",
  whereDidYouHear: "",
  //agreedtocommunications
};

const nameInput = document.querySelector("#input-1");
const eventTypeInput = document.querySelector("#input-2");
const eventDate = document.querySelector("#input-3");
const eventLocation = document.querySelector("#input-4");
const email = document.querySelector("#input-5");

initScrollButton();
bindHamburger();
stage1Animations();
languageSelectorINIT();

document.querySelector('[data-stage="1"] button').addEventListener("click", handleStage1Input);
document.querySelector('[data-stage="2"] button').addEventListener("click", handleStage2Input);
document.querySelector('[data-stage="3"] button').addEventListener("click", handleStage3Input);
document.querySelector('[data-stage="4"] button').addEventListener("click", handleStage4Input);
document.querySelector('[data-stage="5"] button').addEventListener("click", handleStage5Input);

nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleStage1Input();
  }
});

eventTypeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleStage2Input();
  }
});

eventDate.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleStage3Input();
  }
});

eventLocation.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleStage4Input();
  }
});

email.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleStage5Input();
  }
});

function celebrate() {
  const duration = 60 * 60 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 20 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 500);
}

const saveContactModel = async (contactModel) => {
  try {
    const timestamp = Date.now();
    const customId = `${contactModel.email}-${timestamp}`;
    const contactRef = doc(db, "contacts", customId);
    await setDoc(contactRef, contactModel);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

function stage1Animations() {
  document.querySelectorAll('[data-stage="1"] h3').forEach((el, index) => {
    animateText(el, 1, 0.007, (index / 2) * 1.1);
  });
  sectionReveal('[data-stage="1"] .form', null, 1.2, 1);
  sectionReveal('[data-stage="1"] .emoji', null, 0.2, 0.1);
  setTimeout(() => {
    nameInput.focus();
  }, 1200);
}

function stage2Animations() {
  document.querySelector('[data-stage="1"').classList.remove("active");
  document.querySelector('[data-stage="2"').classList.add("active");
  document.querySelectorAll('[data-stage="2"] h3').forEach((el, index) => {
    animateText(el, 1, 0.007, (index / 2) * 1.1);
  });
  sectionReveal('[data-stage="2"] .form', null, 1.5, 1);
  sectionReveal('[data-stage="2"] .emoji', null, 0.3, 0.1);
  eventTypeInput.focus();
}

function stage3Animations() {
  document.querySelector('[data-stage="2"').classList.remove("active");
  document.querySelector('[data-stage="3"').classList.add("active");

  document.querySelectorAll('[data-stage="3"] h3').forEach((el, index) => {
    animateText(el, 1, 0.007, (index / 2) * 1.1);
  });
  sectionReveal('[data-stage="3"] .form', null, 1, 1);
  sectionReveal('[data-stage="3"] .emoji', null, 0.4, 0.1);
  eventDate.focus();
}

function stage4Animations() {
  document.querySelector('[data-stage="3"').classList.remove("active");
  document.querySelector('[data-stage="4"').classList.add("active");

  document.querySelectorAll('[data-stage="4"] h3').forEach((el, index) => {
    animateText(el, 1, 0.007, (index / 2) * 1.1);
  });
  sectionReveal('[data-stage="4"] .form', null, 1, 1);
  sectionReveal('[data-stage="4"] .emoji', null, 1, 0.1);
  eventLocation.focus();
}

function stage5Animations() {
  document.querySelector('[data-stage="4"').classList.remove("active");
  document.querySelector('[data-stage="5"').classList.add("active");

  document.querySelectorAll('[data-stage="5"] h3').forEach((el, index) => {
    animateText(el, 1, 0.007, (index / 2) * 1.1);
  });
  sectionReveal('[data-stage="5"] .form', null, 1, 1);
  sectionReveal('[data-stage="5"] .with-emoji:nth-of-type(1) .emoji', null, 0.2, 0.1);
  sectionReveal('[data-stage="5"] .with-emoji:nth-of-type(2) .emoji', null, 1.1, 0.1);
  email.focus();
}

function stage6Animations() {
  document.querySelector('[data-stage="5"').classList.remove("active");
  document.querySelector('[data-stage="6"').classList.add("active");

  document.querySelectorAll('[data-stage="6"] h3').forEach((el, index) => {
    animateText(el, 1, 0.007, (index / 2) * 1.1);
  });
  sectionReveal('[data-stage="6"] .with-emoji:nth-of-type(1) .emoji:nth-of-type(1)', null, 0.1, 0.1);
  sectionReveal('[data-stage="6"] .with-emoji:nth-of-type(1) .emoji:nth-of-type(2)', null, 0.3, 0.1);
  sectionReveal('[data-stage="6"] .with-emoji:nth-of-type(2) .emoji:nth-of-type(1)', null, 1.5, 0.1);
  sectionReveal('[data-stage="6"] .with-emoji:nth-of-type(2) .emoji:nth-of-type(2)', null, 1.8, 0.1);

  celebrate();
  saveContactModel(contactModel);
}

function handleStage1Input() {
  if (!nameInput.value) {
    return;
  }
  contactModel.name = nameInput.value;
  document.querySelectorAll(".name-span").forEach((e) => (e.innerHTML = contactModel.name));
  stage2Animations();
}

function handleStage2Input() {
  if (!eventTypeInput.value) {
    return;
  }
  contactModel.eventType = eventTypeInput.value;
  stage3Animations();
}

function handleStage3Input() {
  if (!eventDate.value) {
    return;
  }
  contactModel.eventDate = eventDate.value;
  stage4Animations();
}

function handleStage4Input() {
  if (!eventLocation.value) {
    return;
  }
  contactModel.eventLocation = eventLocation.value;
  stage5Animations();
}

function handleStage5Input() {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email.value)) {
    return;
  }
  if (!email.value) {
    return;
  }
  contactModel.email = email.value;
  stage6Animations();
}
