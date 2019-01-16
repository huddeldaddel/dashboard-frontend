import React, { Component} from 'react';
import {connect} from 'react-redux'; 
import {hot} from "react-hot-loader";
import {bindActionCreators} from 'redux';
import {loadPullRequests} from '../actions/pull_requests';
import {loadRepositories} from '../actions/repositories';
import {loadCurrentTrackerIteration, loadTrackerIteration} from '../actions/tracker_iterations';

import BugLifetime from './bug_lifetime';
import CurrentSprintOverview from './current_sprint_overview';
import OldestPullRequest from './oldest_pull_requests';
import PullRequestPerRepo from './pullrequests_per_repo';
import PRLifetime from './pr_lifetime';
import StoryPointDistribution from './story_point_distribution';
import './App.css';

class App extends Component {
  
  componentDidMount() {
    const load = () => {
      this.props.loadCurrentTrackerIteration();
      this.props.loadRepositories();
    };
    setInterval(() => { load(); }, 60000);
    load();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(( 0 < this.props.repositories.length) && (0 === prevProps.repositories.length)) {
      this.props.repositories.forEach(element => {
        this.props.loadPullRequests(element);
      });
    }
  }

  render() {
    return(
      <div className="App">
          <StoryPointDistribution sprint={this.props.iterations.current}></StoryPointDistribution>          
          <CurrentSprintOverview sprint={this.props.iterations.current}></CurrentSprintOverview>
          <BugLifetime sprint={this.props.iterations.current}></BugLifetime>
          <OldestPullRequest pullRequests={this.props.pullRequests} repositories={this.props.repositories}></OldestPullRequest>
          <PullRequestPerRepo pullRequests={this.props.pullRequests} repositories={this.props.repositories}></PullRequestPerRepo>
          <PRLifetime pullRequests={this.props.pullRequests} repositories={this.props.repositories}></PRLifetime>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    loadCurrentTrackerIteration,
    loadPullRequests,
    loadTrackerIteration,
    loadRepositories
  }, dispatch);
}

function mapStateToProps(state) {  
  return {
    iterations: state.trackerIterations,
    pullRequests: state.pullRequests,
    repositories: state.repositories
  };
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));