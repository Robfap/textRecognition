import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Button } from "react-bootstrap";
import data from "./utils/trainingData.js";
import ai from "./utils/ai.js";

const Input = styled.textarea`
  margin-bottom: 15px;
  width: 100%;
  height: 100px;
  resize: none;
`;

const ResultWrap = styled.div`
  margin: 10px;
  font-size: 16px;
  text-align: left;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    ai.train(data);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({
      results: ai.execute(this.state.value)
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <Input value={this.state.value} onChange={this.handleChange} />
          <div/>
          <Button block type="submit" bsStyle="primary">Define</Button>
        </form>

        {this.state.results.map(result => {
          return (
            <ResultWrap>
              <span style={{color: 'green', marginRight: '10px'}}>{result.actor}:</span>
              <span>{result.percent}</span>
            </ResultWrap>
          )
        })}

      </div>
    );
  }
}
export default App;
