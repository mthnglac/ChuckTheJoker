import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, Image, ImageStyle, ActivityIndicator } from "react-native"
import { Header, Screen, Text, Button, GradientBackground } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
export const chuckNorris = require("./chuck-norris.png")

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
  fontSize: 14,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
  color: "orange",
}
const LIST_CONTAINER: ViewStyle = {
  flex: 1,
  position: "relative",
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 80,
}
const JOKE_TEXT_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 5,
  backgroundColor: "#98A2AD",
  borderRadius: 10,
  borderWidth: 5,
}
const JOKE_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 22,
  color: "#040404",
}
const JOKE_BUTTON: ViewStyle = {
  alignSelf: "center",
  width: 300,
  height: 50,
  marginBottom: 50,
  borderRadius: 10,
  backgroundColor: "#1D1A18",
}
const JOKE_BUTTON_TEXT: TextStyle = {
  fontSize: 20,
  color: "#F25B24",
}
const ACTIVITY_INDICATOR: ViewStyle = {
  alignSelf: "center",
  marginBottom: 50,
}
const CHUCK_NORRIS_IMAGE: ImageStyle = {
  flex: 0.6,
  alignSelf: "center",
  marginHorizontal: spacing[2],
  width: 200,
  height: 200,
  resizeMode: "contain",
  marginBottom: 50,
}

export const JokeScreen = observer(function JokeScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const { jokeStore } = useStores()
  const { joke } = jokeStore

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!joke) {
      setIsLoading(true)
      jokeStore.fetchRandomJoke()
      setIsLoading(false)
    }
  }, [])

  return (
    <View testID="JokeScreen" style={FULL}>
      <GradientBackground colors={["#7E4D2E", "#3E210F"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="jokeScreen.title"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={LIST_CONTAINER}>
          <Image source={chuckNorris} style={CHUCK_NORRIS_IMAGE} />
          <Screen preset="scroll" style={JOKE_TEXT_CONTAINER} backgroundColor={color.transparent}>
            <Text selectable={true} style={JOKE_TEXT}>{joke && joke.value}</Text>
          </Screen>
        </View>
        {isLoading ? (
          <ActivityIndicator style={ACTIVITY_INDICATOR} />
        ) : (
          <Button
            tx="jokeScreen.fetch"
            style={JOKE_BUTTON}
            textStyle={JOKE_BUTTON_TEXT}
            onPress={() => {
              setIsLoading(true)
              jokeStore.fetchRandomJoke()
              setIsLoading(false)
            }}
          />
        )}
      </Screen>
    </View>
  )
})
