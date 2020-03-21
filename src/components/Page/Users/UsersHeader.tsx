import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Badge from '@material-ui/core/Badge'

import { IResponsePager } from '../../../services'
import { usersGetList } from '../../../actions'

interface IUsersHeaderProps {
  title: string
  pager: IResponsePager
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    formControl: {
      marginBottom: theme.spacing(1) / 2,
      minWidth: theme.spacing(8),
    },
  }),
)

/**
 * Users pagination component.
 *
 * @returns {FunctionComponent}
 *   Functional 'UsersHeader' component.
 */
const UsersHeader: FunctionComponent<IUsersHeaderProps> = (props) => {
  const options = [5, 10, 25, 50, 100, 200]
  const classes = useStyles()
  const dispatch = useDispatch()
  const { total, limit } = props.pager

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    const { value } = event.target
    dispatch(
      usersGetList({
        // Set to -1 if value is 0.
        limit: value ? parseInt(value) : -1,
        offset: 0,
      }),
    )
  }

  return (
    <div className={classes.root}>
      <Badge badgeContent={props.pager.total} max={999999999}>
        <Typography variant="h4" gutterBottom={false}>
          {props.title}
        </Typography>
      </Badge>
      {total > limit && (
        <div>
          <FormControl className={classes.formControl}>
            <Select value={limit} onChange={handleChangeRowsPerPage}>
              {options.map((option) => {
                if (option <= total) {
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                }
                return null
              })}
              <MenuItem value={0}>All</MenuItem>
            </Select>
            <FormHelperText>Per page</FormHelperText>
          </FormControl>
        </div>
      )}
    </div>
  )
}

export default UsersHeader
