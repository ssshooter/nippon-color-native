import React, { PureComponent } from "react";
import { Animated, StyleSheet, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { DURATION, FONTSIZE } from "../constant.js";
export default class BasicColorChoose extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      currentHex: {},
      list: [
        { hex: "fffffb", color: "w", position: new Animated.Value(0) },
        { hex: "0c0c0c", color: "b", position: new Animated.Value(0) },
        { hex: "8A6BBE", color: "p", position: new Animated.Value(0) },
        { hex: "00AA90", color: "g", position: new Animated.Value(0) },
        { hex: "86C166", color: "c", position: new Animated.Value(0) },
        { hex: "F7C242", color: "y", position: new Animated.Value(0) },
        { hex: "CB1B45", color: "r", position: new Animated.Value(0) },
        { hex: "all", color: "all", position: new Animated.Value(0) }
      ]
    };
  }
  open() {
    let animateList = this.state.list.map((color, index) => {
      return Animated.timing(color.position, {
        toValue: -2 * FONTSIZE * index
      });
    });
    Animated.parallel(animateList).start(() => {
      this.setState({
        isExpanded: true
      });
    });
  }
  close(hex) {
    let animateList = this.state.list.map(color => {
      return Animated.timing(color.position, {
        toValue: 0
      });
    });
    this.setState(
      {
        isExpanded: false,
        currentHex: hex
      },
      () => {
        Animated.parallel(animateList).start();
      }
    );
  }
  toggle = hex => {
    console.log("toggle");
    if (this.state.isExpanded) {
      this.close(hex);
    } else {
      this.open();
    }
  };
  render() {
    let { list } = this.state;
    let { height, width, displayColor, ...otherProps } = this.props;
    return (
      <View {...otherProps}>
        {list.map(color => (
          <TouchableOpacity
            onPress={() => this.toggle(color.hex)}
            style={{
              zIndex: this.state.currentHex === color.hex ? 3 : 1
            }}
          >
            {color.hex !== "all" ? (
              <Animated.View
                style={{
                  ...styles.colorCircle,
                  height,
                  width,
                  backgroundColor: "#" + color.hex,
                  transform: [{ translateY: color.position }],
                  borderColor: displayColor
                }}
              />
            ) : (
              Animated.createAnimatedComponent(
                <LinearGradient
                  colors={[
                    "#fffffb",
                    "#cb1b45",
                    "#f7c242",
                    "#7db9de",
                    "#00aa90",
                    "#8a6bbe",
                    "#fffffb"
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    ...styles.colorCircle,
                    height,
                    width,
                    transform: [{ translateY: color.position }],
                    borderColor: displayColor
                  }} 
                />
              )
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colorCircle: {
    position: "absolute",
    borderRadius: 50,
    borderWidth: 0.1 * FONTSIZE
  }
});
