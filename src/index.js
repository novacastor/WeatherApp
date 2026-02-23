import "./styles/main.css";
import { highlightsGrid } from "./modules/domElements.js";
import { generateHighlightsGrid } from "./modules/domUtils.js";

const { precipitationCard, humidityCard, windCard, sundataCard } =
  generateHighlightsGrid("20", "51", "14", "6:21", "7:33");
highlightsGrid.innerHTML = "";
highlightsGrid.appendChild(precipitationCard);
highlightsGrid.appendChild(humidityCard);
highlightsGrid.appendChild(windCard);
highlightsGrid.appendChild(sundataCard);

document.body.className = "theme-ember-spectrum";
