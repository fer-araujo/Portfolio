import React, { useState } from "react";
import * as HiIcons from "react-icons/hi";
import { motion } from "framer-motion";
import * as MdIcons from "react-icons/md";
import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = ({ theme, icon, callback }) => {
  console.log(theme, icon, callback);

  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__nav-container">
      <div className="app__nav-logo">
        {theme === "dark" ? (
          <img src={images.logo} alt="logo" />
        ) : (
          <img src={images.logoB} alt="logo" />
        )}
      </div>
      <ul className="app__nav-links">
        {["home", "about", "work", "skills", "contact"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      <div className="app__nav-btn-container">
        <button type="button" className="app__flex p-text" onClick={callback}>
          {icon === false ? (
            <MdIcons.MdOutlineLightMode className="app__dark-icon" />
          ) : (
            <MdIcons.MdOutlineDarkMode className="app__light-icon" />
          )}
        </button>
      </div>

      <div className="app__nav-menu">
        <HiIcons.HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="app__nav-svg"
          >
            <HiIcons.HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "about", "work", "skills", "contact"].map((item) => (
                <li className="app__flex p-text" key={`link-${item}`}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
              <li className="app__nav-btn-container">
                <button
                  type="button"
                  className="app__flex p-text"
                  onClick={callback}
                >
                  {icon === false ? (
                    <MdIcons.MdOutlineLightMode className="app__dark-icon" />
                  ) : (
                    <MdIcons.MdOutlineDarkMode className="app__light-icon" />
                  )}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
