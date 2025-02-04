import { Tags } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { Button, Separator, YStack, useMedia, useThemeName } from 'tamagui'
import { Dialog } from '../dialogs/Dialog'
import { useTorrents } from '../hooks/useTorrents'
import { LabelsSelector, SelectedLabels } from '../dialogs/EditLabelsDialog'
import i18n from '../i18n'

export const Filters = ({ onChangeFilters }) => {
  const media = useMedia()
  const { labels } = useTorrents()
  const [filteredLabels, setFilteredLabels] = useState<string[]>([])
  const theme = useThemeName()

  return (
    <Dialog
      title="Labels"
      trigger={
        <Button
          icon={Tags}
          bc={/^light/.test(theme) ? 'white' : 'black'}
          {...(filteredLabels.length > 0 && { color: '$blue9' })}
          borderRadius={0}
        >
          {media.gtXs
            ? `${filteredLabels.length} ${i18n.t('torrents.filteredLabels')}`
            : ''}
        </Button>
      }
      snapPointsMode="fit"
    >
      <YStack w={360} gap="$4">
        <LabelsSelector
          labels={labels}
          labelsToExlude={filteredLabels}
          onLabelPress={(l: string) => {
            const newFilters = [...filteredLabels, l]
            setFilteredLabels(newFilters)
            onChangeFilters(newFilters)
          }}
        />
        <Separator />

        <SelectedLabels
          labels={filteredLabels}
          onRemoveLabel={(l: string) => {
            const newFilters = filteredLabels.filter((label) => l !== label)
            setFilteredLabels(newFilters)
            onChangeFilters(newFilters)
          }}
          onRemoveAll={() => {
            setFilteredLabels([])
            onChangeFilters([])
          }}
        />
      </YStack>
    </Dialog>
  )
}
