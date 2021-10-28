import axios from 'axios';

const sum = require('./sum');

describe ('operations', () => {
  it ('solves example operations', () => {
    const example = '2+2';

    axios.get(`/calculate?expression=${example}`)
      .then((res) => {
        expect(res).toBe('4');
      })

  });
});