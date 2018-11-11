import React, { Component} from 'react';
import {BarChart} from 'react-d3-components';
import {scaleOrdinal} from 'd3-scale';

import './pullrequests_per_repo.css';

export default class PullRequestPerRepo extends Component {

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
    let data = [{
      label: 'Pull requests',
      values: [{ x: "", y: 0}]
    }];
    if(0 < this.props.repositories.length) { 
      data = [{
        label: 'Pull requests',
        values: this.props.repositories.map((repo) => {
          return { x: repo, y: (!!this.props.pullRequests[repo]) ? this.props.pullRequests[repo].length : 0};
        })
      }];
    }

    

    return (
      <div ref={this.container}>
        <h3>Pull requests per project</h3>
        { this.state.offsetWidth && this.state.offsetHeight &&  
          <BarChart colorScale={scaleOrdinal().range(["#5757FF"])}
                    yAxis={{label: "Pull requests"}}
                    data={data}
                    width={this.state.offsetWidth * 0.8}
                    height={(this.state.offsetHeight - 24) * 0.9}
                    margin={{top: 10, bottom: 50, left: 50, right: 10}} />
        }
      </div>
    );
  }

}
