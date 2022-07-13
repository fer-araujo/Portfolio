import React from 'react'
import * as BsIcon from 'react-icons/bs';


const SocialMedia = () => {
  return (
    <div className="app__social">
        <div>
            <a href="https://github.com/fer-araujo" target="_blank"><BsIcon.BsGithub /></a>
        </div>
        <div>
            <a href="https://www.linkedin.com/in/feraraujoruiz/" target="_blank"><BsIcon.BsLinkedin /></a>
        </div>
        <div>
            <a href="https://www.instagram.com/fer_araujoo/" target="_blank"><BsIcon.BsInstagram /></a>
        </div>
    </div>
  )
}

export default SocialMedia