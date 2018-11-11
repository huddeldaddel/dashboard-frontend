import React, { Component} from 'react';

import PRLabel from './pr_label';

import './oldest_pull_requests.css';

export default class OldestPullRequest extends Component {

  constructor(props) {
    super(props)
    this.state = { offsetWidth: 0, offsetHeight: 0};
    this.container = React.createRef();
  }

  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.container.current;
    this.setState({ offsetWidth, offsetHeight });
  }

  getGithubLink(pr) {
    return <a href={pr.html_url} target="_blank"><img src="http://github.com/favicon.ico" width="11px" /></a>;
  }

  getTrackerLink(label) {
    const matches = label.match(/\d{6,12}/);
    if(!matches || 1 !== label.match(/\d{6,12}/).length)
      return undefined;
    return (
      <a href={`https://www.pivotaltracker.com/story/show/${label.match(/\d{6,12}/)}`}
         target="_blank"><img src="http://pivotaltracker.com/favicon.ico" width="11px" /></a>
    );
  }

  getCellStyle(ratio) {
    const width = this.state.offsetWidth - 30;
    return { maxWidth: `${width * ratio}px`, minWidth: `${width * ratio}px` };
  }

  render() {
    let pullRequests = [];
    this.props.repositories.forEach((repo) => {
      if(!!this.props.pullRequests[repo])
        pullRequests = pullRequests.concat(this.props.pullRequests[repo]);
    });    
    pullRequests.sort((a, b) => new Date(a.created_at) > new Date(b.created_at));
    const tableData = pullRequests.length === 0 ? undefined : pullRequests.map((pr, idx) => {
      if(idx >= 10)
        return null;
      const age = Math.round(Math.abs(new Date(pr.created_at) - new Date()) / 36e5);
      let className = "default";
      if(72 > age)
        className = "good";
      if(120 < age)
        className = "bad";
      
      const githubLink = this.getGithubLink(pr);
      const trackerLink = this.getTrackerLink(pr.head.label);
      return (
        <tr key={pr.id} className={className}>
          <td style={this.getCellStyle(0.1)} className="age num">{age} h</td>
          <td style={this.getCellStyle(0.6)} className="name">{trackerLink} {githubLink} {pr.title}</td>
          <td style={this.getCellStyle(0.15)} className="repo">{pr.head.repo.name}</td>
          <td style={this.getCellStyle(0.15)} className="label">{pr.labels.map(l => <PRLabel label={l}></PRLabel>)}</td>
        </tr>
      );
    });

    return (
      <div className="oldes-pull-requests" ref={this.container}>
        <h3>Oldest pull requests</h3>
        <table>
          <thead>
            <tr>
              <th className="num">Age</th>
              <th>Name</th>
              <th>Repo</th>
              <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            { tableData }
          </tbody>
        </table>
      </div>
    );
  }

}
