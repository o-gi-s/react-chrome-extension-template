import React, { FC } from "react";
import { ButtonGroup, Button } from "@material-ui/core";

export interface ProgressBtnProps {
  onClick?: (dir: "prev" | "next") => void;
}

/**
 * Functional component.
 * @param props 
 */
export const ProgressBtn: FC<ProgressBtnProps> = ({
  onClick = () => {}
}) => {

  return (
    <>
      <ButtonGroup disableElevation variant="text" color="primary">
        <Button onClick={ () => onClick("prev") }>&lt;&lt; 前の動画</Button>
        <Button onClick={ () => onClick("next") }>次の動画 &gt;&gt;</Button>
      </ButtonGroup>
    </>
  );
};
