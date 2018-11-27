import React, { Component} from 'react';

import './pr_label.css';

export default function PRLabel(props) {
  return (
    <span key={props.label.id} style={{ 
          backgroundColor: `#${props.label.color}`,
          color: "000000" === props.label.color ? "rgba(255, 255, 255, 0.86)" : "#000000" 
        }}>
      { props.label.name }
    </span>
  );
}