import { createRoot } from "react-dom/client";
import App from "./components/TodoList";

import './assets/scss/index.scss';

const container = document.getElementById("app");

const root = createRoot(container);

root.render(<App />);