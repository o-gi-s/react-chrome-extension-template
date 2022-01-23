import React from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@material-ui/core';
import { SwitchBtn } from "./atoms/SwitchBtn/SwitchBtn";
import { ProgressBtn } from './atoms/ProgressBtn/ProgressBtn';

const App = () => <>
  <Box width="260px" textAlign="center">
    <SwitchBtn />
    <ProgressBtn />
  </Box>
</>;

ReactDOM.render(<App />, document.getElementById('root'));
