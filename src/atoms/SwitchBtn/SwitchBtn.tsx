import React, { FC, useState } from "react";
import { Box, FormControlLabel, Switch } from "@material-ui/core";
import { useDidUpdateEffect } from "../../hooks/useDidUpdateEffect";

export interface SwitchBtnProps {
  initChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

/**
 * Functional component.
 * @param props 
 */
export const SwitchBtn: FC<SwitchBtnProps> = ({
  initChecked = false,
  onChange = () => {}
}) => {

  const [checked, setChecked] = useState(initChecked);
  useDidUpdateEffect(() => setChecked(initChecked), [initChecked]);
  useDidUpdateEffect(() => onChange(checked), [checked]);

  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={ checked }
              onChange={ () => setChecked(state => !state) }
              name="checkedB"
              color="secondary"
            />
          }
          label={
            <span style={{ color: "#222" }}>
              連続再生
            </span>
          }
        />
      </Box>
    </>
  );
};
