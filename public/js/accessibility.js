const ACCESSIBILITY_STORAGE_KEY = "weBelongAccessibilitySettings";
const ACCESSIBILITY_FONT_KEY = "weBelongFontScale";

async function loadAccessibility() {
  const container = document.getElementById("accessibility-container");
  if (!container) return;

  try {
    const response = await fetch("/public/components/accessibility.html");
    const html = await response.text();
    container.innerHTML = html;

    initAccessibility();
    restoreAccessibilitySettings();
  } catch (error) {
    console.error("Failed to load accessibility toolbar:", error);
  }
}

function initAccessibility() {
  const btn = document.getElementById("accessibilityBtn");
  const toolbar = document.getElementById("accessibilityToolbar");
  const closeBtn = document.getElementById("closeAccessibility");

  const keyboardNavToggle = document.getElementById("keyboardNavToggle");
  const disableAnimationsToggle = document.getElementById("disableAnimationsToggle");
  const contrastToggle = document.getElementById("contrastToggle");
  const readableFontToggle = document.getElementById("readableFontToggle");
  const markTitlesToggle = document.getElementById("markTitlesToggle");
  const highlightLinksToggle = document.getElementById("highlightLinksToggle");

  const increaseTextBtn = document.getElementById("increaseTextBtn");
  const decreaseTextBtn = document.getElementById("decreaseTextBtn");

  if (!btn || !toolbar || !closeBtn) return;

  btn.addEventListener("click", () => {
    toolbar.hidden = false;
  });

  closeBtn.addEventListener("click", () => {
    toolbar.hidden = true;
  });

  keyboardNavToggle.addEventListener("change", () => {
    document.body.classList.toggle("keyboard-nav", keyboardNavToggle.checked);
    saveAccessibilitySettings();
  });

  disableAnimationsToggle.addEventListener("change", () => {
    document.body.classList.toggle("disable-animations", disableAnimationsToggle.checked);
    saveAccessibilitySettings();
  });

  contrastToggle.addEventListener("change", () => {
    document.body.classList.toggle("high-contrast", contrastToggle.checked);
    saveAccessibilitySettings();
  });

  readableFontToggle.addEventListener("change", () => {
    document.body.classList.toggle("readable-font", readableFontToggle.checked);
    saveAccessibilitySettings();
  });

  markTitlesToggle.addEventListener("change", () => {
    document.body.classList.toggle("mark-titles", markTitlesToggle.checked);
    saveAccessibilitySettings();
  });

  highlightLinksToggle.addEventListener("change", () => {
    document.body.classList.toggle("highlight-links", highlightLinksToggle.checked);
    saveAccessibilitySettings();
  });

  increaseTextBtn.addEventListener("click", () => {
    changeFontScale(1);
    });

  decreaseTextBtn.addEventListener("click", () => {
    changeFontScale(-1);
    });
}

function getAccessibilitySettings() {
  return JSON.parse(localStorage.getItem(ACCESSIBILITY_STORAGE_KEY)) || {
    keyboardNav: false,
    disableAnimations: false,
    highContrast: false,
    readableFont: false,
    markTitles: false,
    highlightLinks: false
  };
}

function saveAccessibilitySettings() {
  const settings = {
    keyboardNav: document.getElementById("keyboardNavToggle")?.checked || false,
    disableAnimations: document.getElementById("disableAnimationsToggle")?.checked || false,
    highContrast: document.getElementById("contrastToggle")?.checked || false,
    readableFont: document.getElementById("readableFontToggle")?.checked || false,
    markTitles: document.getElementById("markTitlesToggle")?.checked || false,
    highlightLinks: document.getElementById("highlightLinksToggle")?.checked || false
  };

  localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
}

function restoreAccessibilitySettings() {
  const settings = getAccessibilitySettings();

  const keyboardNavToggle = document.getElementById("keyboardNavToggle");
  const disableAnimationsToggle = document.getElementById("disableAnimationsToggle");
  const contrastToggle = document.getElementById("contrastToggle");
  const readableFontToggle = document.getElementById("readableFontToggle");
  const markTitlesToggle = document.getElementById("markTitlesToggle");
  const highlightLinksToggle = document.getElementById("highlightLinksToggle");

  if (keyboardNavToggle) keyboardNavToggle.checked = settings.keyboardNav;
  if (disableAnimationsToggle) disableAnimationsToggle.checked = settings.disableAnimations;
  if (contrastToggle) contrastToggle.checked = settings.highContrast;
  if (readableFontToggle) readableFontToggle.checked = settings.readableFont;
  if (markTitlesToggle) markTitlesToggle.checked = settings.markTitles;
  if (highlightLinksToggle) highlightLinksToggle.checked = settings.highlightLinks;

  document.body.classList.toggle("keyboard-nav", settings.keyboardNav);
  document.body.classList.toggle("disable-animations", settings.disableAnimations);
  document.body.classList.toggle("high-contrast", settings.highContrast);
  document.body.classList.toggle("readable-font", settings.readableFont);
  document.body.classList.toggle("mark-titles", settings.markTitles);
  document.body.classList.toggle("highlight-links", settings.highlightLinks);

  restoreFontScale();
}

function changeFontScale(step) {
  let scale = parseFloat(localStorage.getItem(ACCESSIBILITY_FONT_KEY)) || 1;

  scale += step * 0.1; // 10% each click
  if (scale < 0.9) scale = 0.9;
  if (scale > 1.2) scale = 1.2;

  scale = parseFloat(scale.toFixed(2));

  localStorage.setItem(ACCESSIBILITY_FONT_KEY, scale);
  applyFontScale(scale);
}

function restoreFontScale() {
  const scale = parseFloat(localStorage.getItem(ACCESSIBILITY_FONT_KEY)) || 1;
  applyFontScale(scale);
}

function applyFontScale(scale) {
  const textElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, p, a, li, span, label, input, textarea, select, button, td, th"
  );

  textElements.forEach((el) => {
    // do not resize the accessibility toolbar itself
    if (el.closest(".wb-accessibility")) return;

    if (!el.dataset.originalFontSize) {
      el.dataset.originalFontSize = window.getComputedStyle(el).fontSize;
    }

    const originalSize = parseFloat(el.dataset.originalFontSize);
    el.style.fontSize = `${originalSize * scale}px`;
  });
}

document.addEventListener("DOMContentLoaded", loadAccessibility);