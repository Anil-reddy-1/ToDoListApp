import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Tabs
    screenOptions={{tabBarStyle:{backgroundColor:"#d2d2d2ff",},
  tabBarLabelStyle:{
    fontSize:12,
  }
  }}
    >
        <Tabs.Screen
        name='Home' options={{title:"Home",headerShown:false}}
        />

        <Tabs.Screen
        name='Settings' options={{title:"Completed Tasks",headerShown:false}}
        />

    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})