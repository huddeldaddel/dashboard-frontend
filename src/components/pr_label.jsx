import React, { Component} from 'react';

import './pr_label.css';

export default class PRLabel extends Component {

  render() {
      console.log(this.props.label);
      return (
          <span key={this.props.label.id} style={{ 
                backgroundColor: `#${this.props.label.color}`,
                color: "000000" === this.props.label.color ? "rgba(255, 255, 255, 0.86)" : "#000000" 
              }}>
            { this.props.label.name }
          </span>
      );
  }

}