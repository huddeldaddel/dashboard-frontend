import React, { Component} from 'react';

import './pr_lifetime.css';

export default class PRLifetime extends Component {

  render() {
    let pullRequests = [];
    this.props.repositories.forEach((repo) => {
      if(!!this.props.pullRequests[repo])
        pullRequests = pullRequests.concat(this.props.pullRequests[repo]);
    });    

    return (
      <div className={PRLifetime.getClassName(pullRequests)}>
        <h3>Avg PR Lifespan</h3>
        <div>
          <p>{ PRLifetime.prepareData(pullRequests) } h</p>
        </div>
      </div>
    );
  }

  static getClassName(pullRequests) {
    let result = "pr-lifetime";
    if(0 === pullRequests.length)
      return result;

    const value = PRLifetime.prepareData(pullRequests);
    if(72 > value)
      result += " good";
    if(120 < value)
      result += " bad";
    return result;
  } 

  static prepareData(pullRequests) {
    if(0 === pullRequests.length)
      return '-';

    let sum = 0;    
    pullRequests.map((pr) => PRLifetime.calculateAge(pr)).forEach(age => sum += age);
    return Math.round(sum / pullRequests.length);
  }

  static calculateAge(pr) {
    return Math.abs(new Date(pr.created_at) - new Date()) / 36e5;
  }

}