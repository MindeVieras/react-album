
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fsize from 'filesize'

import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'

import grey from '@material-ui/core/colors/grey'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Spinner from '../../Partials/Spinner'

import DeleteButton from './DeleteButton'
import RestoreButton from './RestoreButton'

import { fitMediaToWrapper, drawCanvasImage } from '../../../../_helpers'

const styles = theme => ({
  panelExpanded: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  summaryRoot: {
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,
    '&$summaryFocused': {
      backgroundColor: grey[700]
    }
  },
  summaryFocused: {},
  summaryContent:{
    alignItems: `center`,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  summaryIcon: {
    marginRight: theme.spacing.unit
  },
  panelDetails: {
    alignItems: `flex-start`
  },
  actionsRoot: {
    borderTop: `1px solid ${grey[600]}`
  },
  metaTableRow: {
    height: theme.spacing.unit * 4.5
  },
  metaTableCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 4
  }
})

class MediaItem extends Component {

  componentDidMount() {

    const { media } = this.props

    if (media.mime.includes('image')) {
      // Draw summary icon image canvas
      drawCanvasImage(this.refs.summary_canvas, media.thumbs.icon)
      // Draw details image canvas
      drawCanvasImage(this.refs.details_canvas, media.thumbs.mini)
    }
    else if (media.mime.includes('video')) {
      // Draw summary icon video canvas
      drawCanvasImage(this.refs.details_canvas, media.videos.thumb)
    }

  }

  render() {
    const { classes, media } = this.props

    const fitCanvasSize = fitMediaToWrapper(220, 220, media.width, media.height)

    // console.log(media)
    return (
      <ExpansionPanel
        classes={{
          expanded: classes.panelExpanded
        }}
      >

        <ExpansionPanelSummary
          expandIcon={ <ExpandMoreIcon/> }
          classes={{
            root: classes.summaryRoot,
            focused: classes.summaryFocused,
            content: classes.summaryContent
          }}
        >
          <canvas
            ref="summary_canvas"
            width={ 40 }
            height={ 40 }
            className={ classes.summaryIcon }
          />
          <Typography variant="body2">{ media.org_filename }</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails
          className={ classes.panelDetails }
        >
          <canvas
            ref="details_canvas"
            width={ fitCanvasSize.width }
            height={ fitCanvasSize.height }
            className={ classes.summaryIcon }
          />

          <div>
            <Table>
              <TableBody>
                <TableRow className={ classes.metaTableRow }>
                  <TableCell className={ classes.metaTableCell }>Album</TableCell>
                  <TableCell className={ classes.metaTableCell }>{ media.album_name }</TableCell>
                </TableRow>
                <TableRow className={ classes.metaTableRow }>
                  <TableCell className={ classes.metaTableCell }>Width</TableCell>
                  <TableCell className={ classes.metaTableCell }>{ media.width }</TableCell>
                </TableRow>
                <TableRow className={ classes.metaTableRow }>
                  <TableCell className={ classes.metaTableCell }>Height</TableCell>
                  <TableCell className={ classes.metaTableCell }>{ media.height }</TableCell>
                </TableRow>
                <TableRow className={ classes.metaTableRow }>
                  <TableCell className={ classes.metaTableCell }>Size</TableCell>
                  <TableCell className={ classes.metaTableCell }>{ fsize(media.filesize) }</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

        </ExpansionPanelDetails>

        <ExpansionPanelActions
          classes={{
            root: classes.actionsRoot,
            action: classes.actionsAction
          }}
        >
          <DeleteButton id={ media.id } />
          <RestoreButton id={ media.id } />
        </ExpansionPanelActions>

        {media.deleting &&
          <Spinner type="list-item" size={ 30 } />
        }
        {media.restoring &&
          <Spinner type="list-item" size={ 30 } />
        }

      </ExpansionPanel>
    )
  }
}

MediaItem.propTypes = {
  classes: PropTypes.object.isRequired,
  media: PropTypes.object.isRequired
}

export default withStyles(styles)(MediaItem)
