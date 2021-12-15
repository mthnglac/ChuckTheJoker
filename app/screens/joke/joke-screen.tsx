import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  TextStyle,
  View,
  Image,
  ImageStyle,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignSelf: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#666",
  width: 300,
  height: 50,
  marginBottom: 50,
  borderRadius: 10,
  backgroundColor: "#1D1A18",
}
const JOKE_BUTTON_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  color: "#F25B24",
}
const ACTIVITY_INDICATOR: ViewStyle = {
  alignSelf: "center",
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
  const { joke, loading } = jokeStore

  useEffect(() => {
    if (!joke) {
      jokeStore.fetchRandomJoke()
    } else {
      jokeStore.setLoading(false);
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
            <Text selectable={true} style={JOKE_TEXT}>
              {joke && joke.value}
            </Text>
          </Screen>
        </View>
        <TouchableOpacity onPress={() => jokeStore.fetchRandomJoke()} disabled={loading}>
          <View style={JOKE_BUTTON}>
            {loading ? (
              <ActivityIndicator size="large" color="#35AADD" style={ACTIVITY_INDICATOR} />
            ) : (
              <Text style={JOKE_BUTTON_TEXT} tx={"jokeScreen.fetch"} />
            )}
          </View>
        </TouchableOpacity>
      </Screen>
    </View>
  )
})
