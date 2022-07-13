import React, { createContext, useState } from "react";
import { About, Footer, Header, Skills, Testimonials, Work } from "./container";
import { Navbar } from "./components";
import "./App.scss";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [icon, setIcon] = useState(false);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    setIcon(!icon);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app__${theme}`}>
        <Navbar theme={theme} icon={icon} callback={toggleTheme} />
        <Header />
        <About />
        <Work />
        <Skills />
        <Testimonials />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
