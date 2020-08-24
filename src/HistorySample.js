import React, { Component } from "react";

class HistorySample extends Component {
  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleGoHome = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    // 페이지에 변화가 생길 때마다 정말 나갈 것인지 묻는다
    this.unblock = this.props.history.block("really?");
  }

  componentWillUnMount() {
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>goBack</button>
        <button onClick={this.handleGoHome}>goHome</button>
      </div>
    );
  }
}

export default HistorySample;
