import { Dimensions, PixelRatio } from "react-native";

export const widthPercentage = (value) => {
  const width = Dimensions.get('window').width;
  const elemWidth = parseFloat(value);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const heightPercentage = (value) => {
  const height = Dimensions.get('window').height;
  const elemHeight = parseFloat(value);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};
