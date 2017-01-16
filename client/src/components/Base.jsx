import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div className="base">
    { children }
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;