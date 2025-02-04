import { ArrowDownNarrowWide, ArrowDownWideNarrow } from '@tamagui/lucide-icons'
import React from 'react'
import {
  Button,
  Label,
  Switch,
  XStack,
  YStack,
  useMedia,
  useThemeName,
} from 'tamagui'
import { Dialog } from '../dialogs/Dialog'
import i18n from '../i18n'
import { Select } from './reusable/Select'

export type SortOptions = {
  property: 'name' | 'size' | 'percentDone'
  isReversed: boolean
}

type SortingOptionsDialogProps = {
  sortOptions: SortOptions
  onChangeSort: (so: SortOptions) => void
}

export const SortingOptionsDialog = ({
  sortOptions,
  onChangeSort,
}: SortingOptionsDialogProps) => {
  const media = useMedia()
  const theme = useThemeName()

  if (!sortOptions) return null

  return (
    <Dialog
      title={i18n.t('sortingOptionsDialog.title')}
      trigger={
        <Button
          icon={
            sortOptions.isReversed ? ArrowDownWideNarrow : ArrowDownNarrowWide
          }
          bc={theme.startsWith('light') ? 'white' : 'black'}
          // {...(filteredLabels.length > 0 && { color: '$blue9' })}
          borderRadius={0}
        >
          {media.gtXs && i18n.t('sortingOptionsDialog.' + sortOptions.property)}
        </Button>
      }
      snapPointsMode="fit"
    >
      <YStack w={360} gap="$4">
        <XStack gap="$4">
          <Label
            paddingRight="$0"
            minWidth={90}
            justifyContent="flex-end"
            htmlFor={'sort-by-select'}
          >
            Sort by
          </Label>
          <Select
            id={'sort-by-select'}
            label={'Sort by'}
            onValueChange={(property) =>
              onChangeSort({ ...sortOptions, property })
            }
            options={['name', 'percentDone', 'totalSize']}
            optionsTexts={[
              i18n.t('sortingOptionsDialog.name'),
              i18n.t('sortingOptionsDialog.percentDone'),
              i18n.t('sortingOptionsDialog.totalSize'),
            ]}
            placeholder={'Sort by'}
            value={sortOptions.property}
          />
        </XStack>
        <XStack gap="$4">
          <Label
            paddingRight="$0"
            minWidth={90}
            justifyContent="flex-end"
            htmlFor={'reverse-switch'}
          >
            {i18n.t('sortingOptionsDialog.reverseOrder')}
          </Label>

          <Switch
            id="reverse-switch"
            ml="auto"
            onCheckedChange={(isChecked) =>
              onChangeSort({ ...sortOptions, isReversed: isChecked })
            }
          >
            <Switch.Thumb
              animation="quick"
              bc={theme === 'light' ? 'black' : 'white'}
            />
          </Switch>
        </XStack>
      </YStack>
    </Dialog>
  )
}
