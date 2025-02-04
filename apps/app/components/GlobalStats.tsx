import React, { useContext } from 'react'
import { XStack, useMedia, useThemeName } from 'tamagui'
import { TorrentFieldFormatter } from './TorrentFieldFormatter'
import { TorrentsContext } from '../contexts/TorrentsContext'

export const GlobalStats = () => {
  const { sessionStats } = useContext(TorrentsContext)
  const media = useMedia()
  const theme = useThemeName()

  return (
    <XStack
      jc="center"
      px="$2"
      bc={/^light/.test(theme) ? 'white' : 'black'}
      br="$4"
      borderTopLeftRadius={0}
      borderBottomLeftRadius={0}
    >
      <XStack gap={media.gtXs ? '$4' : '$1'}>
        <TorrentFieldFormatter
          fontSize={media.gtXs ? '$3' : '$1'}
          name="rateDownload"
          value={sessionStats.downloadSpeed || 0}
        />
        <TorrentFieldFormatter
          fontSize={media.gtXs ? '$3' : '$1'}
          name="rateUpload"
          value={sessionStats.uploadSpeed || 0}
        />
      </XStack>
    </XStack>
  )
}
