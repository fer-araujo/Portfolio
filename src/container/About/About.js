import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { urlFor, client } from "../../client";
import { AppWrapp, MotionWrapp } from "../../wrapper";
import "./About.scss";

// const abouts = [
//   {
//     title: "Frontend Developer",
//     description: "I am a good frontend developer",
//     imgUrl: images.about01,
//   },
//   {
//     title: "Backend Developer",
//     description: "I am a good backend developer",
//     imgUrl: images.about02,
//   },
//   {
//     title: "Fullstack Developer",
//     description: "I am a good fullstack developer",
//     imgUrl: images.about03,
//   },
//   {
//     title: "MERN Stack",
//     description: "I am a good with MERN Stack technologies",
//     imgUrl: images.about04,
//   },
// ];

const About = () => {

  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    
    client.fetch(query)
    .then((data) => setAbouts(data))
  }, [])
  

  return (
    <>
      <h2 className="head-text ">
        Develop <span>Amazing Apps</span>
        <br /> worth every <span>Memory Space</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about,index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, type: 'tween'}}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20}}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10}}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrapp(
  MotionWrapp(About, 'app__about'),
  'about',
  "app__whitebg"
);
