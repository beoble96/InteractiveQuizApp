import "@/styles/globals.css";

import Categories from "./categories"
import Home from "./index"
import NotFound from "./not-found";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
