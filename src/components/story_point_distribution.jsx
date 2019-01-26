import React, { Component} from 'react';
import {BarChart} from 'react-d3-components';
import {scaleOrdinal} from 'd3-scale';

import './story_point_distribution.css';

export default class StoryPointDistribution extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offsetWidth: 0,
      offsetHeight: 0
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    const updateDimensions = () => {
      const { offsetWidth, offsetHeight } = this.container.current;
      this.setState({ offsetWidth, offsetHeight });
    }
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
  }

  render() {
    const colorScale = scaleOrdinal()
      .domain(['unscheduled', 'planned', 'unstarted', 'started', 'finished', 'delivered', 'accepted', 'rejected' ])
      .range(["#B445FE", "#5757FF", "#DD75DD", "#ECA245", "#FFFF84", "#90C564", "#63E9FC", "#E3524F"]);
    const validStates = ['accepted', 'delivered', 'finished', 'started', 'rejected', 'planned', 'unstarted', 'unscheduled'];
    const points = [0, 1, 2, 3, 5, 8, 'bug', 'chore'];
    
    var chart = undefined;
    const sprint = this.props.sprint;
    if(!!sprint) {
      let data = validStates.map((status) => {
        return { 
          label: status, 
          values: points.map((point) => {
            return { 
              x: Number.isInteger(point) ? `${point.toString()} SP` : `${point.charAt(0).toUpperCase()}${point.slice(1)}s`, 
              y: sprint.stories.filter(s => 
                (s.kind === 'story') && 
                (s.current_state === status) && 
                ((Number.isInteger(point) && (s.estimate === point) && ((s.story_type !== 'bug') && (s.story_type !== 'chore'))) || 
                 (!Number.isInteger(point) && ((s.story_type === point))))
              ).length 
            };
          })
        };
      });

      chart = (
        <BarChart colorScale={colorScale}
                  data={data}
                  width={this.state.offsetWidth - 40}
                  height={(this.state.offsetHeight - 50)}
                  margin={{top: 10, bottom: 50, left: 50, right: 10}} 
                  yAxis={{label: "Number of tickets"}}/>
      );
    }

    return (
      <div className="story-point-distribution" ref={this.container}>
        <h3>Story Point distribution ({ !!this.props.sprint ? this.props.sprint.stories.length : 0} tickets)</h3>
        { chart }
      </div>
    );
  }

}
