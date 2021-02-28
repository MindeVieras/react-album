import React, { FunctionComponent } from 'react'
import filesize from 'filesize'
import { Typography } from 'antd'

interface IFilesizeProps {
  size: number
}

export const Filesize: FunctionComponent<IFilesizeProps> = ({ size }) => {
  return <Typography style={{ fontSize: 11, letterSpacing: -0.5 }}>{filesize(size)}</Typography>
}
