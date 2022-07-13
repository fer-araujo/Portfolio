import React, { useState } from "react";
// import { images } from "../../constants";
import { AppWrapp, MotionWrapp } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Lets Chat! <br /> Shoot me <span>a Message!</span></h2>

      <div className="app__footer-cards">
        {/* <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:ferno93@gmail.com" className="p-text">
            Send me an Email!
          </a>
        </div> */}
        {/* <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +52 (961) 269-8566" className="p-text">
            +52 (961) 269-8566
          </a>
        </div> */}
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder=" Your Name"
              value={name}
              name="name"
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder=" Your Email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <textarea
              className="p-text"
              placeholder="Your message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="submit" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrapp(
  MotionWrapp(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
