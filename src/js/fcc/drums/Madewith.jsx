
import React from 'react';
import {FaHtml5,FaCss3,FaJs,FaReact,FaCoffee,FaHeart} from 'react-icons/fa';
var Madewith = () => {
  return (
    <div class="made-with">
      <h1>Made With:</h1>
      <ul>
        <li><FaHtml5 /></li>
        <li><FaCss3/></li>
        <li><FaJs/></li>
        <li><FaReact/></li>
        <li><FaCoffee/></li>
        <li><FaHeart/></li>

      </ul>
    </div>

  );
};
export default Madewith
