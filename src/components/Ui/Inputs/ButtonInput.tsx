import React from 'react'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button, { ButtonProps } from '@material-ui/core/Button'

import CircleSpinner from '../Spinners/CircleSpinner'

interface IButtonInputProps extends ButtonProps {
  text?: string | number
  loading?: boolean
  type?: 'submit' | 'button' | 'reset'
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    btnWrapper: {
      position: 'relative',
      margin: theme.spacing(2, 0),
    },
  }),
)

/**
 * Button input component with loading state.
 * Filter out 'loading' and 'text' props from IButtonInputProps.
 *
 * @param {IButtonInputProps} props
 */
export const ButtonInput = ({ loading, text, ...buttonProps }: IButtonInputProps) => {
  return (
    <div className={styles({}).btnWrapper}>
      <Button variant="contained" type="submit" {...buttonProps}>
        {text}
      </Button>
      {loading && <CircleSpinner size={32} />}
    </div>
  )
}
