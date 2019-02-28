import React, { Component } from 'react';
import './App.css';

import getData from './component/service/getData';

class App extends Component {

  getInfo = new getData();

  state = {
    ip: '',
    ipList: []
  }
  componentDidMount() {
    const ip = (localStorage.getItem('ip'));
    const ipList = localStorage.getItem('ipList');
    if(ip){
      this.setState({
        ip: ip
      });
    };
    if(ipList){
      this.setState({
        ipList: JSON.parse(ipList)
      });
    };
  };

  onInputChange = (ev) => {
    this.setState({ ip: ev.target.value});
  };
  
  checkIp() {
    this.getInfo
      .getGeo(this.state.ip)
      .then(info => this.setNewIp(info));
    };
  setNewIp = (newIp) => {
    if(newIp){
      this.setState(({ipList}) => {
        const newIpList = [
          ...ipList,
          newIp
        ];
  
        localStorage.setItem('ip', this.state.ip);
        localStorage.setItem('ipList', JSON.stringify(newIpList));
  
        return { ipList: newIpList};
      });
    }
  }; 
    updateIp = (ev) => {
      ev.preventDefault();
      this.checkIp();

  };

  renderIpList = (list) => {
    return list.map((item, index) => (
        <div className="ip-list__item" key={index}>
          <h1>{item.ip}</h1>
          <h1>{item.country_code}</h1>
          <h1>{item.city}</h1>
        </div>
    ));
  };

  render() {
    const { ipList } = this.state;
    return (
      <div className="App">
        <form 
          className="form" 
          onSubmit={this.updateIp}> 
          <input
            value={this.state.ip}
            onChange={this.onInputChange}
            className="form__input" 
            type='text'/>
          <button className="form__btn" >Check IP</button>
        </form>
        <div className="ip-list">
          {this.renderIpList(ipList)}
        </div>
      </div>
    );
  }
}

export default App;
