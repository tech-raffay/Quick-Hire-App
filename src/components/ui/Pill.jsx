import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS } from '../../constants';

const Pill = ({ label }) => (
  <View style={{ backgroundColor: COLORS.tagBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 3 }}>
    <Text style={{ color: COLORS.textSecondary, fontSize: 12, fontFamily: FONTS.bodyMedium }}>{label}</Text>
  </View>
);

export default Pill;
