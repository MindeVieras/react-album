import React from 'react'
import { useDispatch } from 'react-redux'
import { submit } from 'redux-form'
import { useHistory } from 'react-router-dom'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import UsersCreateForm from '../../Form/UserCreateForm'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TransitionProps } from '@material-ui/core/transitions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      borderRadius: theme.spacing(0.25, 0.25, 0, 0),
      outline: 'none',
      // padding: theme.spacing(2, 4, 3),
    },
  }),
)

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />
})

export function UserCreate() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
    history.push('/users/+')
  }

  const isAddPath = history.location.pathname.split('/').includes('+')

  const handleClose = () => {
    setOpen(false)
    history.push('/users')
  }

  return (
    <div>
      <Zoom in={!open || !isAddPath}>
        <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Zoom>
      <Dialog
        open={open || isAddPath}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create new user</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
          <UsersCreateForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="text" onClick={() => dispatch(submit('userCreate'))} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
