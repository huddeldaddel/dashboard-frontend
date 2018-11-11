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
import SprintHistory from './sprint_history';
import './App.css';
import {CONFIG} from '../../config';

class App extends Component {
  
  componentDidMount() {
    this.props.loadCurrentTrackerIteration();
    this.props.loadRepositories();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!!this.props.iterations.current && !prevProps.iterations.current) {
      for(var i=1; i<6; i++) {
        if(this.props.iterations.current.number > i)
          this.props.loadTrackerIteration(this.props.iterations.current.number - i);
      }
    }

    if(( 0 < this.props.repositories.length) && (0 === prevProps.repositories.length)) {
      this.props.repositories.forEach(element => {
        this.props.loadPullRequests(element);
      });
    }
  }

  render() {
    return(
      <div className="App">
          <SprintHistory sprints={this.props.iterations}></SprintHistory>          
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