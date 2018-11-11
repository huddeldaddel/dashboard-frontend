import React, { Component} from 'react';

import './bug_lifetime.css';

export default class BugLifetime extends Component {

  render() {
    return (
      <div className={BugLifetime.getClassName(this.props.sprint)}>
        <h3>Avg Bug Lifespan</h3>
        <div>
          <p>{ BugLifetime.prepareData(this.props.sprint) } h</p>
        </div>
      </div>
    );
  }

  static getClassName(sprint) {
    let result = "bug-lifetime";
    if(!sprint)
      return result;

    const value = BugLifetime.prepareData(sprint);
    if(24 > value)
      result += " good";
    if(48 < value)
      result += " bad";
    return result;
  } 

  static prepareData(sprint) {
    if(!sprint)
      return '-';

    let sum = 0;
    let count = 0;
    sprint.stories
      .filter((s) => s.kind === 'story' && s.story_type === 'bug')
      .map((story) => BugLifetime.calculateAge(story, sprint))
      .forEach(age => {
        sum += age;
        count++;
      });
    return count === 0 ? 0 : Math.round(sum / count);
  }

  static calculateAge(story, sprint) {
    const storyCreated = new Date(story.created_at);
    const sprintStarted = new Date(sprint.start);    
    const start = storyCreated > sprintStarted ? storyCreated : sprintStarted;
    const end = (!!story.accepted_at) ? new Date(story.accepted_at) : new Date();
    return Math.abs(start - end) / 36e5;
  }

}