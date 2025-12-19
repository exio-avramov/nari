import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const tabIconSelected = useThemeColor({}, "tabIconSelected");
  const tabBarBackground = useThemeColor({}, "tabBarBackground");
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: tabIconSelected,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [styles.tabBar, { backgroundColor: tabBarBackground }],
      }}
    >
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="magnifyingglass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="chat" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
  },
});
