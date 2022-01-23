import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Button } from '@material-ui/core';

const App = () => <>
  <Box width="324px" textAlign="center"> 
    <Button color="primary">Hello World</Button>
  </Box>
</>;

ReactDOM.render(<App />, document.getElementById('root'));
