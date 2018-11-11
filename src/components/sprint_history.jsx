import React, { Component} from 'react';
import {BarChart} from 'react-d3-components';
import {scaleOrdinal} from 'd3-scale';

import './sprint_history.css';

export default class SprintHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offsetWidth: 0,
      offsetHeight: 0
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.container.current;
    this.setState({
      offsetWidth,
      offsetHeight
    });
  }

  render() {
    let storyPoints = [];
    let tickets = [];
    let bugs = [];
    if(!!this.props.sprints.current) {
      let nums = Object.getOwnPropertyNames(this.props.sprints)
                       .filter(s => !Number.isNaN(Number.parseInt(s)))
                       .sort((a, b) => a > b);
      storyPoints = nums.map(n => { 
        return { x: SprintHistory.formatSprintRange(this.props.sprints[n]), y: SprintHistory.getAcceptedStoryPoints(this.props.sprints[n]) };
      });
      tickets = nums.map(n => { 
        return { x: SprintHistory.formatSprintRange(this.props.sprints[n]), y: SprintHistory.getAcceptedStories(this.props.sprints[n]) };
      });
      bugs = nums.map(n => { 
        return { x: SprintHistory.formatSprintRange(this.props.sprints[n]), y: SprintHistory.getBugs(this.props.sprints[n]) };
      });
    }

    let data = [{
      label: 'Storypoints',
      values: storyPoints
    }, {
      label: 'Tickets',
      values: tickets
    }, {
      label: 'Bugs',
      values: bugs
    }];

    var chart = !!this.props.sprints.current ? (
      <BarChart groupedBars
                colorScale={scaleOrdinal().domain(["Storypoints", "Tickets", "Bugs"]).range(["#5757FF", "#63E9FC", "#E3524F"])}
                data={data}
                width={this.state.offsetWidth - 40}
                height={(this.state.offsetHeight - 50)}
                margin={{top: 10, bottom: 50, left: 50, right: 10}} />
    ) : undefined;

    return (
      <div className="sprint-history" ref={this.container}>
        <h3><span className="story-points">Story Points</span>, <span className="tickets">Accepted Stories</span> & <span className="bugs">Bugs</span> per Sprint</h3>
        { chart }
      </div>
    );
  }

  static getAcceptedStoryPoints(sprint) {
    if(!sprint)
      return 0;

    let result = 0;
    sprint.stories.filter((s) => s.kind === 'story' && s.current_state === 'accepted').forEach(element => {
      if(Number.isInteger(element.estimate))
        result += element.estimate;
    });
    return result;
  }

  static getAcceptedStories(sprint) {
    if(!sprint)
      return 0;

    return sprint.stories.filter((s) => s.kind === 'story' && s.current_state === 'accepted').length;
  }

  static formatSprintRange(sprint) {
    return (!sprint) ? '' : sprint.number.toString();
  }

  static getBugs(sprint) {
    if(!sprint)
      return 0;

    return sprint.stories.filter((s) => s.kind === 'story' && s.story_type === 'bug').length;
  }

}
