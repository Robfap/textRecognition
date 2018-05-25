import brain from 'brain.js';

function encode(arg) {
  return arg.split('')
    .map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
  return data.map(d => {
    return {
      input: encode(d.input),
      output: d.output
    }
  })
}

const AI = class {

  constructor() {
    this.net = new brain.NeuralNetwork();
    this._trainedNet = () => {
    };
  }

  train(data) {
   console.log(this.net.train(processTrainingData(data)));
    //this._trainedNet = this.net.toFunction();
  }

  execute(input) {
    const results = this.net.run(encode(input));

    return [
      {
        actor: 'trump',
        percent: Math.floor(results.trump * 100)
      },
      {
        actor: 'kardashian',
        percent: Math.floor(results.kardashian * 100)
      }]

  }

};

const ai = new AI();
export default ai;
