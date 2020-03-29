import React from 'react'
import {
  FormGroup,
  Checkbox,
  Typography,
  Grid,
} from '@material-ui/core'
import styles from 'styles/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const filter = createFilterOptions()

const RegistrationExperience = ({
  checked, setChecked, tags, setTags, messageSubtitle,
}) => {
  const classes = styles()

  return (
    <FormGroup>
      <Typography
        variant="subtitle2"
        component="h2"
        className={classes.registrationTaskText}
      >
        {messageSubtitle}
      </Typography>
      <Grid container />
      <Autocomplete
        multiple
        freeSolo
        filterSelectedOptions
        id="tags"
        options={tags}
        disableCloseOnSelect
        onChange={(event, newValue) => {
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          if (params.inputValue !== '') {
            filtered.push(
              params.inputValue,
            )
          }
          return filtered
        }}
        getOptionLabel={(option, params) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.text
        }}
        renderOption={(option, { selected, inputValue }) => (
          <>
            <div onClick={() => {
              setChecked([...checked, option])
            }}
            >
              {!inputValue
            && (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </>
            )}
              {inputValue
            && (
            <>
                {'Hinzufügen: '}
                { option }
            </>
            )}
            </div>
          </>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Auswählen oder Hinzufügen" placeholder="Erfahrungen" />
        )}
      />
    </FormGroup>

  )
}

export default RegistrationExperience
