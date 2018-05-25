import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Button } from "react-bootstrap";
import data from "./utils/trainingData.js";
import ai from "./utils/ai.js";

const Input = styled.input`
  margin: 5px;
  width: 160px;
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
          <Button type="submit" bsStyle="primary">Define</Button>
        </form>

        {this.state.results.map(result => {
          return (
            <div>
              <span>{result.actor}</span>
              <span>{result.percent}</span>
            </div>
          )
        })}

      </div>
    );
  }
}
export default App;
