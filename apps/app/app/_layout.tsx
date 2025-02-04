import React, { useContext, useEffect } from 'react'
import {
  Separator,
  Stack,
  TamaguiProvider,
  Theme,
  useMedia,
  XStack,
  YStack,
} from 'tamagui'
import { useFonts } from 'expo-font'
import { SplashScreen, Tabs, usePathname, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { useColorScheme } from 'react-native'
import * as Linking from 'expo-linking'

import config from '../tamagui.config'
import { Header, BottomTabs, Sidebar } from '../components'
import { Platform } from 'react-native'

import { ToastController } from '../components/ToastController'
import { TorrentsProvider } from '../contexts/TorrentsContext'
import { NodeProvider } from '../contexts/NodeContext'
import { PeerRequest } from '../components/PeerRequest'
import { SettingsContext, SettingsProvider } from '../contexts/SettingsContext'
import { TermsOfUseDialog } from '../dialogs/TermsOfUseDialog'
import isElectron from 'is-electron'

const screenOptions = {
  title: 'PikaTorrent',
  headerShown: false,
}

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    // Note: Deprecated, but status bar has issues if we migrate to the new api
    // https://github.com/expo/expo/issues/23450
    return <SplashScreen />
  }

  return (
    <TamaguiProvider config={config}>
      <NativeURLHandlers />
      <SettingsProvider>
        <ThemedLayout />
      </SettingsProvider>
    </TamaguiProvider>
  )
}

const NativeURLHandlers = () => {
  const url = Linking.useURL()
  const router = useRouter()

  useEffect(() => {
    // In Electron, subscribe for redirects from main process
    if (!isElectron()) {
      return
    }

    window.electronAPI.onRedirect((_, route: string) => {
      router.push(route)
    })
  }, [router])

  useEffect(() => {
    if (!url || typeof url !== 'string') return
    const parsedUrl = new URL(url)
    // Redirect incoming magnet links to /add?magnet=
    // as expo-router does not support hash for now
    if (parsedUrl.protocol === 'magnet:') {
      router.replace('/add?magnet=' + encodeURIComponent(url))
    }

    // Handle pikatorrent deep link for magnet
    if (parsedUrl.protocol === 'pikatorrent:') {
      const afterHash = parsedUrl.hash.split('#')[1]
      if (/^magnet/.test(afterHash)) {
        router.replace('/add?magnet=' + encodeURIComponent(afterHash))
      }
    }

    // TODO for Android, handle content:
    // if (typeof url === 'string' && /^content:/.test(url)) {
    //   return <Redirect href={'/add?content=' + encodeURIComponent(url)} />
    // }
  }, [url, router])

  return null
}

const ThemedLayout = () => {
  const { settings } = useContext(SettingsContext)
  const colorSheme = useColorScheme()
  const theme = settings.theme === 'system' ? colorSheme : settings.theme
  const media = useMedia()

  return (
    <Theme name={theme}>
      <StatusBar
        translucent={false}
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'dark' ? '#151515' : '#f9f9f9'}
      />
      <PeerRequest />
      <TermsOfUseDialog />
      <NodeProvider>
        <ToastProvider>
          <ToastViewport flexDirection="column" top={'$4'} left={0} right={0} />
          <ToastController />

          <Stack
            f={1}
            {...(Platform.OS === 'web' ? { h: '100vh' } : {})}
            bc="$background"
          >
            <Header />
            <TorrentsProvider>
              {media.gtMd ? <Desktop /> : <Mobile />}
            </TorrentsProvider>
          </Stack>
        </ToastProvider>
      </NodeProvider>
    </Theme>
  )
}

const Desktop = () => {
  return (
    <XStack f={1}>
      <Sidebar />
      <Separator vertical />
      <YStack f={1}>
        <Tabs
          screenOptions={screenOptions}
          sceneContainerStyle={{ backgroundColor: 'transparent' }}
          tabBar={() => null}
        ></Tabs>
      </YStack>
    </XStack>
  )
}

const Mobile = () => {
  return (
    <YStack pt="$2" f={1}>
      <Tabs
        screenOptions={screenOptions}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        tabBar={BottomTabs}
      ></Tabs>
    </YStack>
  )
}
