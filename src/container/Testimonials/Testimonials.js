import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrapp, MotionWrapp } from "../../wrapper";
import { urlFor, client } from "../../client";
import './Testimonials.scss';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const query = '*[_type == "testimonials"]';

    client.fetch(query).then((data) => {
      console.log(data);
      setTestimonials(data);
    });
  }, []);

  const TEST = testimonials[currentIndex];

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(TEST.imgurl)} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{TEST.feedback}</p>
              <div>
                <h4 className="bold-text">
                  <a href={TEST.link} target="_blank" title="LinkedIn" rel="noreferrer">
                  {TEST.name}
                  </a>
                </h4>
                <h5 className="p-text">
                  {TEST.company}
                </h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                <HiChevronLeft />
            </div>
            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                <HiChevronRight />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AppWrapp(
  MotionWrapp(Testimonials, 'app__testimonial'),
  'testimonial',
  "app__primary"
);
