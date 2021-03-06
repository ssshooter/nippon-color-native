import React, { PureComponent } from "react";
import { Animated, StyleSheet, View, Text, Alert } from "react-native";
import { DURATION, FONTSIZE } from "../constant.js";

export default class NameBlock extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
    translateX: new Animated.Value(100),
    name: this.props.selectedColor.name
  };
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: DURATION
      }),
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration: DURATION
      })
    ]).start();
  }
  componentWillReceiveProps(nextProps) {
    let nextFontColor = nextProps.selectedColor.f;
    this.state.opacity.setValue(0);
    this.state.translateX.setValue(100);
    this.setState(
      {
        name: nextProps.selectedColor.name
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: DURATION
          }),
          Animated.timing(this.state.translateX, {
            toValue: 0,
            duration: DURATION
          })
        ]).start();
      }
    );
  }
  render() {
    let { selectedColor, style, displayColor } = this.props;
    let { opacity, translateX, name } = this.state;
    return (
      <Animated.View
        style={[styles.box, style, { transform: [{ translateX }] }]}
      >
        <View>
          {Array.from(name).map(word => (
            <Animated.Text
              style={{ ...styles.kanji, opacity, color: displayColor }}
            >
              {word}
            </Animated.Text>
          ))}
        </View>
        <View>
          {Array.from(selectedColor.color).map(word => (
            <Animated.Text
              style={{ ...styles.romaji, opacity, color: displayColor }}
            >
              {word}
            </Animated.Text>
          ))}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  kanji: {
    fontFamily: "XANO-mincho-U32",
    fontSize: FONTSIZE * 3,
    marginRight: 9
  },
  romaji: {
    transform: [{ rotateZ: "90deg" }]
  }
});
