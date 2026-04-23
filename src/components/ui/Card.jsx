import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const Card = ({ children, style, onPress }) => {
  const content = (
    <View style={[{ backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 20 }, style]}>
      {children}
    </View>
  );
  if (onPress) return <TouchableOpacity onPress={onPress} activeOpacity={0.8}>{content}</TouchableOpacity>;
  return content;
};

export default Card;
