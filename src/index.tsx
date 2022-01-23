import React from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@material-ui/core';
import { SwitchBtn } from "./atoms/SwitchBtn/SwitchBtn";
import { ProgressBtn } from './atoms/ProgressBtn/ProgressBtn';

const App = () => <>
    <Box width="260px" textAlign="center">
      <SwitchBtn onChange={ () => {
        chrome.runtime.sendMessage("めっせぇじ", function (response){
          console.log("受け取ったデータ：", response)
        })
      } } />
      <ProgressBtn onClick={ () => {
        chrome.runtime.sendMessage("めっせぇじ", function (response){
          console.log("受け取ったデータ：", response)
        })
      } } />
    </Box>
</>;

ReactDOM.render(<App />, document.getElementById('root'));
