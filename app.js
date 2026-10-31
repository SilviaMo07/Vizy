const menuSections = [
  {
    title: "Carne Angus importada",
    items: [
      { name: "Picanha", description: "Conocida como punta gorda (350 gramos) muy apetecida ya que proviene del extremo con mayor marmoleo, con cascos de papa y ensalada.", price: "$ 140.000" },
      { name: "New york", description: "Corte del lomo trasero (350 gramos) de la res y se caracteriza por una capa de grasa externa que le aporta mucho sabor, con cascos de papa y ensalada.", price: "$ 140.000" },
      { name: "Rib Eye", description: "Corte premium de res, extraído del lomo alto de la res, con cascos de papa y ensalada.", price: "$ 140.000" }
    ]
  },
  {
    title: "Pescados y Mariscos",
    items: [
      { name: "Langostinos San Miguel", description: "Chorizo de cerdo y tortilla española, chips de arracacha.", price: "$ 95.000" },
      { name: "Langostinos en mantequilla de hierbas", description: "Puré de papa criolla, cremoso aguacate y tomate.", price: "$ 100.000" },
      { name: "Langostinos thermidor", description: "Langostinos en salsa blanca gratinados.", price: "$ 115.000" },
      { name: "Langostinos Molinito", description: "Langostinos con miel, mostaza francesa y vino blanco.", price: "$ 115.000" },
      { name: "Pulpo a la parrilla", description: "Con puré de papa y chimichurri de mango.", price: "$ 88.000" },
      { name: "Salmón a las finas hierbas", description: "Con arroz y papa frita.", price: "$ 80.000" },
      { name: "Pescado blanco a la plancha", description: "Con vegetales salteados y papa frita.", price: "$ 42.000" },
      { name: "Pescado blanco al malecón", description: "En salsa criolla con camarones, arroz, papa y yuca.", price: "$ 75.000" },
      { name: "Pescado blanco vatel", description: "Con champiñones y camarones, gratinado, arroz y papa frita.", price: "$ 75.000" },
      { name: "Pescado blanco marinera", description: "En salsa marinera con frutos del mar, arroz y papa frita.", price: "$ 85.000" },
      { name: "Pescado blanco lacedo en aceite aromatizado", description: "Con vegetales mediterráneos y papa frita.", price: "$ 46.000" },
      { name: "Salmón encostrado en semillas de ajonjolí blanco y negro", description: "Con sirri y de vegetales, aderezo de salsa de soya, bolita de risotto y parmesano.", price: "$ 80.000" },
      { name: "Fiesta de mariscos", description: "Frutos del mar, pescado blanco al ajillo, salmón en llama de brandy y papa dorada.", price: "$ 125.000" },
      { name: "Cazuela marina", description: "Crema marinera con camarones, almeja, pulpo, calamar, pescado blanco, langostino, con patacón y arroz.", price: "$ 98.000" }
    ]
  }
];

const cookingProfiles = {
  "Picanha": { cooking: "3/4, jugosa y bien cocida", temperature: "66°C, lista para disfrutar" },
  "New york": { cooking: "3/4, jugosa y bien cocida", temperature: "66°C, lista para disfrutar" },
  "Rib Eye": { cooking: "3/4, jugosa y bien cocida", temperature: "66°C, lista para disfrutar" },
  "Langostinos San Miguel": { cooking: "bien cocido, suave y sabroso", temperature: "64°C, caliente" },
  "Langostinos en mantequilla de hierbas": { cooking: "bien cocido, suave y sabroso", temperature: "64°C, caliente" },
  "Langostinos thermidor": { cooking: "bien cocido, con salsa cremosa", temperature: "62°C, tibio" },
  "Langostinos Molinito": { cooking: "bien cocido, suave y sabroso", temperature: "64°C, caliente" },
  "Pulpo a la parrilla": { cooking: "bien cocido y tierno", temperature: "65°C, servido tibio" },
  "Salmón a las finas hierbas": { cooking: "3/4, ligeramente jugoso", temperature: "60°C, suave y sabroso" },
  "Pescado blanco a la plancha": { cooking: "bien cocido y seco", temperature: "63°C, disponible al momento" },
  "Pescado blanco al malecón": { cooking: "bien cocido y sabroso", temperature: "63°C, servido caliente" },
  "Pescado blanco vatel": { cooking: "bien cocido, con termino dorado", temperature: "64°C, caliente" },
  "Pescado blanco marinera": { cooking: "bien cocido y sabroso", temperature: "63°C, caliente" },
  "Pescado blanco lacedo en aceite aromatizado": { cooking: "bien cocido y dorado", temperature: "63°C, caliente" },
  "Salmón encostrado en semillas de ajonjolí blanco y negro": { cooking: "3/4, jugoso y dorado", temperature: "60°C, suave" },
  "Fiesta de mariscos": { cooking: "bien cocido, con punto de calor medio", temperature: "64°C, servido caliente" },
  "Cazuela marina": { cooking: "bien cocida, con sabores integrados", temperature: "68°C, caliente y cremosa" }
};

const menuItems = menuSections.flatMap((section) =>
  section.items.map((item, index) => {
    const profile = cookingProfiles[item.name] || { cooking: "Punto de cocción estándar del restaurante", temperature: "Servicio habitual del restaurante" };

    return {
      ...item,
      id: `${section.title.toLowerCase().replace(/\s+/g, "-")}-${index}`,
      category: section.title,
      calories: "No disponible",
      weight: null,
      temperature: profile.temperature,
      cooking: profile.cooking,
      ingredients: item.description ? [item.description] : ["Ingredientes seleccionados del plato"],
      allergens: ["Se informa según disponibilidad del restaurante"],
      note: "Descripción según carta del restaurante.",
      pairing: {
        wine: "vino de la casa",
        cocktail: "cóctel de la carta",
        dessert: "postre sugerido"
      }
    };
  })
);

const messagesEl = document.getElementById("chatMessages");
const formEl = document.getElementById("chatForm");
const inputEl = document.getElementById("userInput");
const menuListEl = document.getElementById("menuList");
const gamesSection = document.getElementById("gamesSection");
const scanQrBtn = document.getElementById("scanQrBtn");
const sendOrderBtn = document.getElementById("sendOrderBtn");
const chefWhatsapp = "573046356202";

let selectedDish = menuItems[0];

function normalise(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function addMessage(content, type = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `message ${type}`;
  bubble.innerHTML = content;
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function renderMenu() {
  menuListEl.innerHTML = "";

  menuSections.forEach((section) => {
    const sectionWrap = document.createElement("div");
    sectionWrap.className = "menu-section";

    const title = document.createElement("h3");
    title.className = "menu-section-title";
    title.textContent = section.title;
    sectionWrap.appendChild(title);

    section.items.forEach((item) => {
      const dish = menuItems.find((entry) => entry.name === item.name && entry.category === section.title);
      const row = document.createElement("button");
      row.type = "button";
      row.className = `menu-row ${dish && dish.id === selectedDish.id ? "selected" : ""}`;
      row.innerHTML = `
        <div class="menu-row-main">
          <span class="menu-row-name">${item.name}</span>
          ${item.description ? `<span class="menu-row-description">${item.description}</span>` : ""}
        </div>
        <span class="menu-row-price">${item.price}</span>
      `;

      row.addEventListener("click", () => {
        if (dish) {
          selectedDish = dish;
          renderMenu();
          addMessage(
            `<strong>${dish.name}</strong> está seleccionado. Puedo ayudarte con su información técnica, alergias, temperatura y sugerencias de maridaje en segundos.`,
            "bot"
          );
        }
      });

      sectionWrap.appendChild(row);
    });

    menuListEl.appendChild(sectionWrap);
  });
}

function formatList(items) {
  if (!items || !items.length) {
    return "No hay un detalle exacto cargado en este momento, pero te cuento que se prepara con ingredientes frescos y bien seleccionados.";
  }
  return items.join(", ");
}

function findDishByMessage(message) {
  const normalised = normalise(message);

  return menuItems.find((dish) => {
    const candidates = [dish.name, dish.category, ...dish.ingredients].map(normalise);
    return candidates.some((candidate) => candidate.includes(normalised) || normalised.includes(candidate));
  }) || null;
}

function buildDishResponse(dish) {
  const allergenText = dish.allergens && dish.allergens.length
    ? `⚠️ Alérgenos: ${formatList(dish.allergens)}.`
    : "⚠️ Alérgenos: ese detalle exacto no está listado en la base, pero te puedo guiar con confianza por los ingredientes principales y alternativas disponibles.";

  const weightText = dish.weight
    ? `⚖️ Peso: ${dish.weight}.`
    : "⚖️ Peso: ese detalle exacto no está registrado, aunque el plato se sirve con una porción cuidada y equilibrada.";

  const tempText = dish.temperature
    ? `🌡️ Temperatura de servicio: ${dish.temperature}.`
    : "🌡️ Temperatura de servicio: se entrega en la presentación habitual del restaurante.";

  const cookingText = dish.cooking
    ? `🔥 Cocción: ${dish.cooking}.`
    : "🔥 Cocción: es una preparación estándar del restaurante.";

  const ingredientText = `🌿 Ingredientes clave: ${formatList(dish.ingredients)}.`;

  return `
    <strong>¡Claro! ${dish.name} es una excelente elección.</strong><br>
    🔥 Calorías: ${dish.calories}.<br>
    ${weightText}<br>
    ${tempText}<br>
    ${cookingText}<br>
    ${ingredientText}<br>
    ${allergenText}<br>
    ${dish.note}<br>
    <span style="color:#6a4f3a;">Si quieres, te ayudo a elegir una buena combinación para disfrutarlo aún más.</span>
  `;
}

function getPairingResponse(dish, intent) {
  const pairing = dish.pairing || {};

  const wine = pairing.wine || "un vino blanco fresco";
  const cocktail = pairing.cocktail || "un cóctel cítrico ligero";
  const dessert = pairing.dessert || "un postre delicado";

  if (intent.includes("vino") || intent.includes("bebida") || intent.includes("maridar")) {
    return `Para acompañar ${dish.name}, te recomendaría ${wine}. Tiene un equilibrio muy bonito con la intensidad del plato y hace que todo se disfrute mejor.`;
  }

  if (intent.includes("cocktail") || intent.includes("coctel")) {
    return `Si buscas algo más fresco, ${cocktail} encaja muy bien con ${dish.name}. Aporta ligereza y ayuda a equilibrar el sabor.`;
  }

  if (intent.includes("postre") || intent.includes("dessert")) {
    return `Para cerrar la experiencia, ${dessert} es una gran opción. Tiene ese toque final que acompaña sin opacar el plato principal.`;
  }

  return `Para ${dish.name}, mi recomendación más completa sería empezar con ${wine}, seguir con ${cocktail} y cerrar con ${dessert}. La combinación queda muy bien por equilibrio y textura.`;
}

function getDislikedTerms(intent) {
  const groups = {
    mariscos: ["marisco", "mariscos", "camaron", "camarones", "langostino", "langostinos", "calamar", "pulpo", "almeja", "marino", "marina"],
    pescado: ["pescado", "pez", "salmon", "salmón", "atun", "atún", "bacalao"],
    carne: ["carne", "res", "bife", "lomo", "pollo", "cerdo", "churrasco"],
    lactosa: ["lactosa", "lacteo", "lácteo", "leche", "queso", "crema", "mantequilla"],
    gluten: ["gluten", "trigo", "harina", "pan", "pasta"],
    picante: ["picante", "aji", "ají", "pimienta", "pimenton", "pimentón"],
    vegetal: ["verdura", "vegetales", "espinaca", "brocoli", "brócoli"],
    dulce: ["dulce", "azucar", "azúcar"]
  };

  const negativePhrases = [
    "no me gusta",
    "prefiero sin",
    "evito",
    "no quiero",
    "no me agrada",
    "no lo quiero",
    "odio",
    "rechazo",
    "detesto",
    "sin",
    "no me gusta el",
    "no me gusta la",
    "no me gustan",
    "no me gusta ni"
  ];

  const found = [];

  for (const [key, terms] of Object.entries(groups)) {
    const isDisliked = terms.some((term) => intent.includes(term));
    const hasNegativePhrase = negativePhrases.some((phrase) => intent.includes(phrase));
    if (isDisliked && hasNegativePhrase) {
      found.push(key);
    }
  }

  return found;
}

function formatDislikedTerms(disliked) {
  if (!disliked.length) return "ese detalle";
  if (disliked.length === 1) return disliked[0];
  if (disliked.length === 2) return `${disliked[0]} ni ${disliked[1]}`;
  return `${disliked.slice(0, -1).join(", ")} ni ${disliked[disliked.length - 1]}`;
}

function getSafeRecommendation(intent) {
  const disliked = getDislikedTerms(intent);
  if (!disliked.length) return null;

  const safeCandidates = menuItems.filter((dish) => {
    const searchable = `${dish.name} ${dish.description} ${dish.category}`.toLowerCase();
    return !disliked.some((term) => {
      const patterns = {
        mariscos: ["marisco", "mariscos", "camaron", "camarones", "langostino", "langostinos", "calamar", "pulpo", "almeja", "marina"],
        pescado: ["pescado", "pez", "salmon", "salmón", "atun", "atún"],
        carne: ["carne", "res", "bife", "lomo", "pollo", "cerdo", "churrasco"],
        lactosa: ["lactosa", "lacteo", "lácteo", "leche", "queso", "crema", "mantequilla"],
        gluten: ["gluten", "trigo", "harina", "pan", "pasta"],
        picante: ["picante", "aji", "ají", "pimienta", "pimenton", "pimentón"],
        vegetal: ["verdura", "vegetales", "espinaca", "brocoli", "brócoli"],
        dulce: ["dulce", "azucar", "azúcar"]
      };

      return (patterns[term] || []).some((pattern) => searchable.includes(pattern));
    });
  });

  return safeCandidates.length ? safeCandidates[0] : null;
}

function startGame(mode) {
  const gameMap = {
    burger: {
      title: "Burger Boss",
      subtitle: "Arma el pedido perfecto",
      objective: "Burger doble + papas",
      ingredients: ["Pan", "Carne", "Queso", "Tomate", "Papas", "Lechuga"],
      recipe: ["Pan", "Carne", "Queso", "Tomate", "Lechuga", "Pan"],
      reward: "¡Perfecto! Pedido listo para servir."
    },
    kitchen: {
      title: "Kitchen Rush",
      subtitle: "Prepara la orden del cliente",
      objective: "Sopa caliente + tostadas",
      ingredients: ["Caldo", "Tomate", "Cebolla", "Pan", "Queso", "Pimienta"],
      recipe: ["Caldo", "Tomate", "Cebolla", "Pan", "Queso"],
      reward: "¡Excelente! La sopa quedó impecable."
    },
    dessert: {
      title: "Dessert Dash",
      subtitle: "Crea el postre ideal",
      objective: "Pastel de chocolate",
      ingredients: ["Harina", "Chocolate", "Leche", "Huevo", "Vainilla", "Azúcar"],
      recipe: ["Harina", "Chocolate", "Leche", "Huevo", "Azúcar"],
      reward: "¡Delicioso! El postre está perfecto."
    }
  };

  const selected = gameMap[mode];
  let selectedIngredients = [];

  const renderIngredients = () => {
    const ingredientButtons = selected.ingredients
      .map(
        (ingredient) => `
          <button class="ingredient-btn" type="button" data-ingredient="${ingredient}">${ingredient}</button>
        `
      )
      .join("");

    const currentOrder = selectedIngredients.length
      ? selectedIngredients.join(" → ")
      : "Aún no has armado la orden";

    gamesSection.innerHTML = `
      <div class="games-header">
        <h3>🎮 ${selected.title}</h3>
        <p>${selected.subtitle}</p>
      </div>

      <div class="cooking-game">
        <div class="order-box">
          <span class="mini-label">Pedido</span>
          <h4>${selected.objective}</h4>
          <p>Orden actual: <strong>${currentOrder}</strong></p>
        </div>

        <div class="ingredient-grid">${ingredientButtons}</div>

        <div class="game-controls">
          <button class="action-btn" type="button" id="cookDishBtn">Cocinar</button>
          <button class="action-btn ghost" type="button" id="resetDishBtn">Reiniciar</button>
        </div>

        <div class="game-result" id="gameResult">Haz clic en los ingredientes para preparar la orden.</div>
      </div>
    `;

    gamesSection.querySelectorAll(".ingredient-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const ingredient = button.dataset.ingredient;
        selectedIngredients.push(ingredient);
        renderIngredients();
      });
    });

    const cookButton = document.getElementById("cookDishBtn");
    if (cookButton) {
      cookButton.addEventListener("click", () => {
        const resultEl = document.getElementById("gameResult");
        const isCorrect = JSON.stringify(selectedIngredients) === JSON.stringify(selected.recipe);

        resultEl.textContent = isCorrect ? selected.reward : "No quedó bien: revisa el orden y prueba otra vez.";
        resultEl.style.color = isCorrect ? "#2b7a59" : "#8e4329";
      });
    }

    const resetButton = document.getElementById("resetDishBtn");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        selectedIngredients = [];
        renderIngredients();
      });
    }
  };

  renderIngredients();
}

function showGamesSection() {
  if (!gamesSection) return;

  gamesSection.classList.remove("hidden");
  gamesSection.innerHTML = `
    <div class="games-header">
      <h3>🎮 Juegos de cocina</h3>
      <p>Elige uno y prepara platos mientras esperas tu comida.</p>
    </div>
    <div class="game-grid">
      <button class="game-card" type="button" data-game="burger">
        <strong>🍔 Burger Boss</strong>
        Arma el pedido perfecto y sirve al cliente.
      </button>
      <button class="game-card" type="button" data-game="kitchen">
        <strong>🍲 Kitchen Rush</strong>
        Prepara la orden más rápida del restaurante.
      </button>
      <button class="game-card" type="button" data-game="dessert">
        <strong>🥧 Dessert Dash</strong>
        Crea el mejor postre y gana la cocina.
      </button>
    </div>
    <div class="game-result" id="gameResult">Selecciona un juego para empezar.</div>
  `;

  gamesSection.querySelectorAll(".game-card").forEach((button) => {
    button.addEventListener("click", () => {
      startGame(button.dataset.game);
    });
  });
}

function isRunningFromFile() {
  return window.location.protocol === "file:";
}

function buildWhatsAppLink(dish) {
  const text = encodeURIComponent(
    [
      "Hola chef,",
      "",
      "Pedido confirmado.",
      "",
      "Detalle del pedido:",
      `Pedido: ${dish.name}`,
      `Precio: ${dish.price || "Por confirmar"}`,
      `Categoría: ${dish.category || "Sin categoría"}`,
      `Punto de cocción: ${dish.cooking || "No informado"}`,
      `Temperatura de servicio: ${dish.temperature || "No informada"}`,
      "",
      "Gracias."
    ].join("\n")
  );

  return `https://wa.me/${chefWhatsapp}?text=${text}`;
}

async function sendOrderToChef(dish) {
  if (isRunningFromFile()) {
    window.location.href = "http://localhost:3000";
    return;
  }

  const payload = {
    dish: dish.name,
    price: dish.price || "Por confirmar",
    category: dish.category || "Sin categoría",
    cooking: dish.cooking || "No informado",
    temperature: dish.temperature || "No informada"
  };

  const waLink = buildWhatsAppLink(dish);

  addMessage(
    `Pedido confirmado para <strong>${dish.name}</strong>. Estoy enviándolo al WhatsApp del chef <strong>${chefWhatsapp}</strong>.`,
    "bot"
  );

  try {
    const response = await fetch(`/api/order?dish=${encodeURIComponent(payload.dish)}&price=${encodeURIComponent(payload.price)}&category=${encodeURIComponent(payload.category)}&cooking=${encodeURIComponent(payload.cooking)}&temperature=${encodeURIComponent(payload.temperature)}`);
    const data = await response.json();

    if (response.ok && data && data.whatsappUrl) {
      addMessage("✅ El pedido confirmado se abrió en WhatsApp para enviarlo al chef.", "bot");
      window.open(data.whatsappUrl, "_blank");
      return;
    }

    addMessage("📲 El pedido confirmado está listo para enviarse por WhatsApp.", "bot");
    window.open(waLink, "_blank");
  } catch (error) {
    addMessage("📲 El pedido confirmado está listo para enviarse por WhatsApp.", "bot");
    window.open(waLink, "_blank");
  }
}

function handleInput(message) {
  const intent = normalise(message);
  const dish = findDishByMessage(message) || selectedDish;
  const disliked = getDislikedTerms(intent);

  if (intent.includes("pedido") || intent.includes("ordenar") || intent.includes("confirmo") || intent.includes("lo pido") || intent.includes("quiero este") || intent.includes("quiero pedir") || intent.includes("confirmar pedido")) {
    sendOrderToChef(dish);
    return `Perfecto, tu pedido de ${dish.name} ya está listo para enviarse al chef por WhatsApp.`;
  }

  if (disliked.length) {
    const safeDish = getSafeRecommendation(intent);
    if (safeDish) {
      const dislikedText = formatDislikedTerms(disliked);
      return `Entiendo. Si no te gusta ${dislikedText}, te recomiendo ${safeDish.name}. Es una opción que no incluye ese detalle y además tiene un equilibrio muy agradable de sabor. ${safeDish.description || "Te va a encantar."}`;
    }
  }


  if (!intent || intent.includes("hola") || intent.includes("buenas") || intent.includes("ayuda")) {
    return `¡Hola! Soy Vizy, tu asistente virtual de Vizora. Estoy aquí para ayudarte a elegir algo delicioso según tu gusto, tus preferencias y la experiencia que quieras vivir. Si me dices qué te apetece o qué no te gusta, te recomiendo algo perfecto para ti.`;
  }

  const hasPairingRequest = [
    "sugerencia",
    "recomienda",
    "acompa",
    "vino",
    "coctel",
    "cocktail",
    "postre",
    "maridaje",
    "bebida"
  ].some((term) => intent.includes(term));

  const isAllergyRequest = [
    "alerg",
    "lacteo",
    "lactosa",
    "gluten",
    "mariscos",
    "frutos secos",
    "nuts",
    "pescado"
  ].some((term) => intent.includes(term));

  const isCookingQuestion = [
    "cocida",
    "cocido",
    "coccion",
    "cocción",
    "a punto",
    "3 4",
    "3/4",
    "4 5",
    "4/5",
    "medio",
    "bien cocida",
    "bien cocido",
    "temperatura"
  ].some((term) => intent.includes(term));

  if (hasPairingRequest) {
    return getPairingResponse(dish, intent);
  }

  if (dish && (intent.includes(dish.name.toLowerCase()) || intent.includes("plato") || intent.includes("calorias") || intent.includes("peso") || intent.includes("temperatura") || isAllergyRequest || isCookingQuestion)) {
    return buildDishResponse(dish);
  }

  if (intent.includes("menu") || intent.includes("ver platos") || intent.includes("recomendacion")) {
    const top = menuItems.slice(0, 3).map((item) => item.name).join(", ");
    return `Hoy tengo opciones muy buenas: ${top}. Si quieres, te ayudo a elegir según tu gusto, si prefieres algo más ligero, más sabroso o más contundente.`;
  }

  return `Claro, te puedo ayudar con eso. Si me dices el plato, lo que te gusta o lo que no te gusta, te recomiendo algo perfecto para tu momento.`;
}

function onSubmit(event) {
  event.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage(text, "user");
  inputEl.value = "";

  const response = handleInput(text);
  window.setTimeout(() => {
    addMessage(response, "bot");
  }, 220);
}

scanQrBtn.addEventListener("click", () => {
  const cookingGamesUrl = "https://www.crazygames.com/es/t/cooking";
  window.open(cookingGamesUrl, "_blank", "noopener,noreferrer");
  addMessage(
    "🎮 Te estoy llevando a la categoria de juegos de cocina para que juegues mientras esperas tu comida.",
    "bot"
  );
});

sendOrderBtn.addEventListener("click", () => {
  const link = buildWhatsAppLink(selectedDish);
  addMessage(
    `Pedido confirmado para <strong>${selectedDish.name}</strong>. Se abrió el WhatsApp del chef <strong>${chefWhatsapp}</strong>.`,
    "bot"
  );
  window.open(link, "_blank");
});

formEl.addEventListener("submit", onSubmit);

renderMenu();
addMessage(
  "¡Hola! Soy Vizy, tu asistente virtual de Vizora. Estoy aquí para ayudarte a elegir algo delicioso, cómodo y perfecto para ti. Si me dices qué te gusta, qué no te gusta o qué te apetece hoy, te recomiendo algo con gusto y sin complicarte la vida.",
  "bot"
);


let hasExplicitDishSelection = false;
menuListEl.addEventListener("click", (event) => {
    if (event.target.closest(".menu-row")) hasExplicitDishSelection = true;
});

function findDishByMessage(message) {
    const query = normalise(message);
    const ignored = new Set(["a", "al", "algo", "algun", "alguna", "ayuda", "blanco", "con", "cual", "cuanto", "cuanta", "de", "del", "dime", "el", "en", "es", "favor", "gusta", "gustaria", "la", "las", "lo", "los", "me", "menu", "mi", "pesa", "peso", "por", "plato", "pescado", "puedes", "que", "quisiera", "saber", "tiene", "un", "una"]);
    const queryWords = query.split(" ").filter((word) => word && !ignored.has(word));
    const exact = menuItems.find((dish) => query.includes(normalise(dish.name)));
    if (exact) return exact;
    if (!queryWords.length) return null;

  const near = (a, b) => {
        if (a === b) return true;
        if (Math.abs(a.length - b.length) > 1 || Math.min(a.length, b.length) < 5) return false;
        let i = 0, j = 0, differences = 0;
        while (i < a.length && j < b.length) {
                if (a[i] === b[j]) { i++; j++; continue; }
                if (++differences > 1) return false;
                if (a.length > b.length) i++;
                else if (b.length > a.length) j++;
                else { i++; j++; }
        }
        return true;
  };
    const matches = menuItems.map((dish) => {
          const words = normalise(dish.name).split(" ").filter((word) => word && !ignored.has(word));
          const count = words.filter((word) => queryWords.some((queryWord) => near(word, queryWord))).length;
          return { dish, count };
    }).filter((match) => match.count > 0).sort((a, b) => b.count - a.count);
    if (!matches.length || (matches[1] && matches[1].count === matches[0].count)) return null;
    return matches[0].dish;
}

function getDishClarification(intent) {
    const fish = ["pescado", "salmon", "atun", "bacalao", "pez"];
    const seafood = ["marisco", "camaron", "langostino", "pulpo", "calamar", "almeja"];
    const terms = [...fish, ...seafood].filter((term) => intent.includes(term));
    if (!terms.length) return null;
    const options = menuItems.filter((dish) => terms.some((term) => normalise(`${dish.name} ${dish.description} ${dish.category}`).includes(term)));
    return options.length ? `En la carta hay varias opciones relacionadas: ${options.map((dish) => dish.name).join(", ")}. ¿De cuál quieres saber?` : null;
}

function handleInput(message) {
    const intent = normalise(message);
    const mentionedDish = findDishByMessage(message);
    const dish = mentionedDish || (hasExplicitDishSelection ? selectedDish : null);
    const disliked = getDislikedTerms(intent);
    if (["pedido", "ordenar", "confirmo", "lo pido", "quiero este", "quiero pedir", "confirmar pedido"].some((term) => intent.includes(term))) {
          if (!dish) return "¿Qué plato deseas pedir? Dime su nombre o selecciónalo en el menú.";
          sendOrderToChef(dish);
          return `Perfecto, tu pedido de ${dish.name} ya está listo para enviarse al chef por WhatsApp.`;
    }
    if (disliked.length) {
          const safeDish = getSafeRecommendation(intent);
          if (safeDish) return `Entiendo. Si no te gusta ${formatDislikedTerms(disliked)}, te recomiendo ${safeDish.name}. Es una opción que no incluye ese detalle y además tiene un equilibrio muy agradable de sabor. ${safeDish.description || "Te va a encantar."}`;
    }
    if (!intent || intent.includes("hola") || intent.includes("buenas") || intent.includes("ayuda")) return `¡Hola! Soy Vizy, tu asistente virtual de Vizora. Estoy aquí para ayudarte a elegir algo delicioso según tu gusto, tus preferencias y la experiencia que quieras vivir. Si me dices qué te apetece o qué no te gusta, te recomiendo algo perfecto para ti.`;
    const pairing = ["sugerencia", "recomienda", "acompa", "vino", "coctel", "cocktail", "postre", "maridaje", "bebida"].some((term) => intent.includes(term));
    const allergy = ["alerg", "lacteo", "lactosa", "gluten", "mariscos", "frutos secos", "nuts", "pescado"].some((term) => intent.includes(term));
    const cooking = ["cocida", "cocido", "coccion", "a punto", "3 4", "3/4", "4 5", "4/5", "medio", "temperatura"].some((term) => intent.includes(term));
    if (!dish) {
          const clarification = getDishClarification(intent);
          if (clarification) return clarification;
    }
    if (pairing) return dish ? getPairingResponse(dish, intent) : "¿Qué plato quieres acompañar? Dime el nombre o selecciónalo en el menú y te recomiendo una combinación.";
    if (dish && (mentionedDish || hasExplicitDishSelection || intent.includes("plato") || intent.includes("calorias") || intent.includes("peso") || intent.includes("temperatura") || allergy || cooking)) return buildDishResponse(dish);
    if (intent.includes("menu") || intent.includes("ver platos") || intent.includes("recomendacion")) {
          const top = menuItems.slice(0, 3).map((item) => item.name).join(", ");
          return `Hoy tengo opciones muy buenas: ${top}. Si quieres, te ayudo a elegir según tu gusto, si prefieres algo más ligero, más sabroso o más contundente.`;
    }
    return `Claro, te puedo ayudar con eso. Si me dices el plato, lo que te gusta o lo que no te gusta, te recomiendo algo perfecto para tu momento.`;
}


function getDishClarification(intent) {
    const fish = ["pescado", "salmon", "atun", "bacalao", "pez"];
    const seafood = ["marisco", "camaron", "langostino", "pulpo", "calamar", "almeja"];
    const fishTerms = fish.filter((term) => intent.includes(term));
    const terms = [...fishTerms, ...seafood.filter((term) => intent.includes(term))];
    if (!terms.length) return null;
    const options = menuItems.filter((dish) => terms.some((term) => normalise(`${dish.name} ${dish.category}`).includes(term)));
    return options.length ? `En la carta hay varias opciones relacionadas: ${options.map((dish) => dish.name).join(", ")}. ¿De cuál quieres saber?` : null;
}
