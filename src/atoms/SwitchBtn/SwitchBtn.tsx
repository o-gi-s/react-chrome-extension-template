import React, { FC, useState, useEffect } from "react";
import { Box, FormControlLabel, Switch } from "@material-ui/core";

export interface SwitchBtnProps {
  onChange?: (checked: boolean) => void;
}

/**
 * Functional component.
 * @param props 
 */
export const SwitchBtn: FC<SwitchBtnProps> = ({
  onChange = () => {}
}) => {

  const [checked, setChecked] = useState(false);
  useEffect(() => onChange(checked), [checked]);

  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={ checked }
              onChange={ () => setChecked(state => !state) }
              name="checkedB"
              color="primary"
            />
          }
          label="連続再生"
        />
      </Box>
    </>
  );
};
