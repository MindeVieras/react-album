import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
// import Modal from '@material-ui/core/Modal'
// import Backdrop from '@material-ui/core/Backdrop'
// import Fade from '@material-ui/core/Fade'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import UsersAddForm from '../../../Form/UserCreateForm'
// import Divider from '@material-ui/core/Divider'

// import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
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
  return <Slide direction="left" ref={ref} {...props} />
})

export function UsersAdd() {
  const classes = useStyles()
  const history = useHistory()

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
    history.push('users/add')
  }

  const isAddPath = history.location.pathname.split('/').includes('add')

  const handleClose = () => {
    setOpen(false)
    history.goBack()
  }

  return (
    <div>
      <Zoom in={!open || !isAddPath}>
        <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Zoom>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open || isAddPath}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={open || isAddPath}>
          <div className={classes.paper}>
            <header>
              <h2 id="transition-modal-title">Create new user</h2>
            </header>
            <UsersAddForm />
            <footer>footer</footer>
          </div>
        </Fade>
      </Modal> */}
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
          <UsersAddForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
