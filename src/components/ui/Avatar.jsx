import React from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';

const Avatar = ({ initials, url, size = 44, color = COLORS.accent }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color + '33', borderWidth: 2, borderColor: color + '66', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
    {url ? (
      <Image source={{ uri: url }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
    ) : (
      <Text style={{ color, fontSize: size * 0.33, fontFamily: FONTS.headingBold, letterSpacing: 0.5 }}>{initials}</Text>
    )}
  </View>
);

export default Avatar;
