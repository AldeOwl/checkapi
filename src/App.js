import React, { Component } from 'react';
import './App.css';
import Iplist from './component/ip-list/ip-list';

import getData from './component/service/getData';
import Input from './component/input/input';

class App extends Component {

  getInfo = new getData();

  state = {
    ip: '',
    ipList: [],
    inputStatus: ''
  }
  componentDidMount() {
    const ip = (localStorage.getItem('ip'));
    const ipList = localStorage.getItem('ipList');
    if (ip) {
      this.setState({
        ip: ip
      });
    };
    if (ipList) {
      this.setState({
        ipList: JSON.parse(ipList)
      });
    };
  };

  onInputChange = (ev) => {
    this.setState({ip: ev.target.value});
    localStorage.setItem('ip', ev.target.value);
  };

  checkIp() {
    this.getInfo
      .getGeo(this.state.ip)
      .then(info => this.setNewIp(info))
      .catch(this.setState({inputStatus: 'uncorrect'}))
  };

  setNewIp = (newIp) => {
    if (newIp) {
      this.setState({ inputStatus: 'correct'})
      this.setState(({ ipList }) => {
        const newIpList = [
          ...ipList,
          newIp
        ];
        
        localStorage.setItem('ip', this.state.ip);
        localStorage.setItem('ipList', JSON.stringify(newIpList));
        
        return { ipList: newIpList };
      });
      
    }
  };
  updateIp = (ev) => {
    ev.preventDefault();
    this.checkIp();

  };
  updateStorage = () => {
    const ip = this.state.ip;
    localStorage.setItem('ip', ip);
  };

  render() {
    const { ipList } = this.state;
    console.log(this.state.ip)
    return (
      <div className="App">
        <form
          className="form"
          onSubmit={this.updateIp}>
          <Input
            status={this.state.inputStatus}
            ip={this.state.ip}
            onInputChange={this.onInputChange} />
        </form>

        <div className="wrap-content">
          <Iplist list={ipList} />
        </div>
      </div>
    );
  }
}

export default App;
