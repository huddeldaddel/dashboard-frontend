import React, { Component} from 'react';
import {PieChart} from 'react-d3-components';
import {scaleOrdinal} from 'd3-scale';

import './current_sprint_overview.css';

export default class CurrentSprintOverview extends Component {

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
    const colorScale = scaleOrdinal()
      .domain(['unscheduled', 'planned', 'unstarted', 'started', 'finished', 'delivered', 'accepted', 'rejected' ])
      .range(["#B445FE", "#5757FF", "#DD75DD", "#ECA245", "#FFFF84", "#90C564", "#63E9FC", "#E3524F"]);
    return (
      <div className="current-sprint-overview" ref={this.container}>
        <h3>Current Sprint Progress</h3>
        { this.state.offsetWidth && this.state.offsetHeight &&  
          <PieChart colorScale={colorScale}
                    data={CurrentSprintOverview.prepareData(this.props.sprint)}
                    width={this.state.offsetWidth * 0.8}
                    height={(this.state.offsetHeight - 24) * 0.9}
                    margin={{top: 10, bottom: 10, left: 100, right: 100}}
                    sort={null} /> 
        }
      </div>
    );
  }

  static prepareData(sprint) {
    if(!sprint)
      return { label: '', values: [{x: '', y: 0}] };

    const validStates = ['accepted', 'delivered', 'finished', 'started', 'rejected', 'planned', 'unstarted', 'unscheduled'];

    return { label: '', values: validStates.map((status) => {
      return { x: status, y: sprint.stories.filter((s) => s.kind === 'story' && s.current_state === status).length };
    })};
  }

}