import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

const App = () => <>
  <Button color="primary">Hello World</Button>
</>;

ReactDOM.render(<App />, document.getElementById('root'));
