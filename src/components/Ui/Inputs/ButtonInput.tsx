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
    },
  }),
)

/**
 * Button input component with loading state.
 *
 * @param {IButtonInputProps} props
 */
export const ButtonInput = (props: IButtonInputProps) => {
  const classes = styles()

  // Filter out 'loading' from IButtonInputProps.
  const { loading, ...restButton } = props

  return (
    <div className={classes.btnWrapper}>
      <Button variant="contained" type="submit" {...restButton}>
        {props.text}
      </Button>
      {loading && <CircleSpinner size={32} />}
    </div>
  )
}
