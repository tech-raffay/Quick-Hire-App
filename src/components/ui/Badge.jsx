import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS } from '../../constants';

const Badge = ({ children, color = COLORS.accent, size = 'sm' }) => (
  <View style={{ backgroundColor: color + '22', borderWidth: 1, borderColor: color + '44', borderRadius: 6, paddingHorizontal: size === 'sm' ? 10 : 14, paddingVertical: size === 'sm' ? 2 : 4, alignSelf: 'flex-start' }}>
    <Text style={{ color, fontSize: size === 'sm' ? 11 : 13, fontFamily: FONTS.bodySemiBold, letterSpacing: 0.4 }}>{children}</Text>
  </View>
);

export default Badge;
