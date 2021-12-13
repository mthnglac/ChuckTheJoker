import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { Header, Screen, Text, Button, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}

export const JokeScreen = observer(function JokeScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const { jokeStore } = useStores()
  const { joke } = jokeStore

  useEffect(() => {
    jokeStore.fetchRandomJoke()
  }, [])

  return (
    <View testID="JokeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="demoListScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={LIST_CONTAINER}>
          <Text style={LIST_TEXT}>{joke && joke.value}</Text>
        </View>
        <Button
          tx="demoScreen.fetch"
          onPress={() => {
            jokeStore.fetchRandomJoke()
          }}
        />
      </Screen>
    </View>
  )
})
