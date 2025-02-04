import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React from 'react'
import { Sheet, YStack, useThemeName } from 'tamagui'

import { Adapt, Select as SelectTamagui } from 'tamagui'

export const Select = ({
  id,
  value,
  onValueChange,
  placeholder,
  label,
  options,
  optionsTexts,
}) => {
  const theme = useThemeName()

  return (
    <SelectTamagui id={id} value={value} onValueChange={onValueChange}>
      <SelectTamagui.Trigger
        iconAfter={ChevronDown}
        f={1}
        bc={theme === 'light' ? 'white' : 'black'}
      >
        <SelectTamagui.Value placeholder={placeholder} />
      </SelectTamagui.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <SelectTamagui.Content zIndex={200000}>
        <SelectTamagui.ScrollUpButton
          ai="center"
          jc="center"
          pos="relative"
          w="100%"
          h="$3"
        >
          <YStack zi={10}>
            <ChevronUp size={20} />
          </YStack>
        </SelectTamagui.ScrollUpButton>

        <SelectTamagui.Viewport outlineStyle="none">
          <SelectTamagui.Group space="$0">
            <SelectTamagui.Label>{label}</SelectTamagui.Label>
            {options.map((option, i) => {
              return (
                <SelectTamagui.Item
                  index={i}
                  key={option}
                  value={option}
                  outlineStyle="none"
                >
                  <SelectTamagui.ItemText>
                    {optionsTexts[i]}
                  </SelectTamagui.ItemText>
                  <SelectTamagui.ItemIndicator ml="auto">
                    <Check size={16} />
                  </SelectTamagui.ItemIndicator>
                </SelectTamagui.Item>
              )
            })}
          </SelectTamagui.Group>
        </SelectTamagui.Viewport>

        <SelectTamagui.ScrollDownButton
          ai="center"
          jc="center"
          pos="relative"
          w="100%"
          h="$3"
        >
          <YStack zi={10}>
            <ChevronDown size={20} />
          </YStack>
        </SelectTamagui.ScrollDownButton>
      </SelectTamagui.Content>
    </SelectTamagui>
  )
}
