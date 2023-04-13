import React, { useContext } from 'react'
import { Circle, Paragraph, XStack } from 'tamagui'
import { NodeContext } from '../contexts/node'
import { NodeSelector } from './NodeSelector'

export const ConnectionStatus = () => {
  const node = useContext(NodeContext)

  return (
    <XStack ai="center" gap="$2">
      <Circle bc={node.isConnected ? '$green9' : '$red9'} size={12} />
      <Paragraph>{node.isConnected ? 'Connected' : 'Disconnected'}</Paragraph>
      <NodeSelector />
    </XStack>
  )
}