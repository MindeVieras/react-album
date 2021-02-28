import React, { FunctionComponent } from 'react'
import { Progress } from 'antd'

interface IMediaItemProgressProps {
  progress: number
}

export const MediaItemProgress: FunctionComponent<IMediaItemProgressProps> = ({ progress }) => {
  return (
    <Progress percent={progress} steps={10} size="small" showInfo={false} strokeColor="#1890ff" />
  )
}
