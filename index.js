// Caractères disponibles
const characters = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

// Éléments du DOM
const copyMessage = document.getElementById("copyMessage");
const lengthSlider = document.getElementById("lengthSlider");
const lengthDisplay = document.getElementById("lengthDisplay");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");

// Mise à jour de l'affichage de la longueur
lengthSlider.addEventListener("input", function () {
  lengthDisplay.textContent = this.value;
});

// Fonction pour générer un mot de passe
function generatePassword() {
  const length = parseInt(lengthSlider.value);
  let charset = "";

  // Construction du jeu de caractères
  if (uppercaseCheck.checked) charset += characters.uppercase;
  if (lowercaseCheck.checked) charset += characters.lowercase;
  if (numbersCheck.checked) charset += characters.numbers;
  if (symbolsCheck.checked) charset += characters.symbols;

  // Vérification qu'au moins une option est sélectionnée
  if (charset === "") {
    alert("Veuillez sélectionner au moins un type de caractère !");
    return;
  }

  // Génération du mot de passe
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Affichage du mot de passe
  passwordOutput.value = password;

  // Évaluation de la force
  evaluateStrength(password);
}

// Fonction pour évaluer la force du mot de passe
function evaluateStrength(password) {
  let score = 0;
  const length = password.length;

  // Points pour la longueur
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;

  // Points pour la diversité des caractères
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Mise à jour de l'affichage
  strengthFill.className = "strength-fill";

  if (score <= 2) {
    strengthFill.classList.add("strength-weak");
    strengthLabel.textContent = "Force: Faible";
  } else if (score <= 4) {
    strengthFill.classList.add("strength-medium");
    strengthLabel.textContent = "Force: Moyenne";
  } else if (score <= 6) {
    strengthFill.classList.add("strength-strong");
    strengthLabel.textContent = "Force: Forte";
  } else {
    strengthFill.classList.add("strength-very-strong");
    strengthLabel.textContent = "Force: Très forte";
  }
}

// Fonction pour copier le mot de passe
function copyPassword() {
  if (passwordOutput.value === "") {
    copyMessage.textContent = "Veuillez d'abord générer un mot de passe !";
    copyMessage.style.color = "red";
    setTimeout(() => {
      copyMessage.textContent = "";
    }, 3000);
    return;
  }
  passwordOutput.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copié !";
  copyBtn.classList.add("copied");
  copyMessage.textContent = "";
  setTimeout(() => {
    copyBtn.textContent = "Copier";
    copyBtn.classList.remove("copied");
  }, 2000);
}

// Événements
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
passwordOutput.addEventListener("click", copyPassword);

// Génération automatique du premier mot de passe
// generatePassword();

// Génération automatique lors du changement des paramètres
[
  uppercaseCheck,
  lowercaseCheck,
  numbersCheck,
  symbolsCheck,
  lengthSlider,
].forEach((element) => {
  element.addEventListener("change", generatePassword);
});
