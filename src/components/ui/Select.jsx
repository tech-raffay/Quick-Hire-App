import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONTS } from '../../constants';

const Select = ({ label, value, onValueChange, options }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 11, fontFamily: FONTS.bodySemiBold, color: COLORS.textSecondary, marginBottom: 6, letterSpacing: 0.7, textTransform: 'uppercase' }}>{label}</Text>
    <View style={{ backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, overflow: 'hidden' }}>
      <Picker selectedValue={value} onValueChange={onValueChange} style={{ color: COLORS.textPrimary, height: 50 }} dropdownIconColor={COLORS.textMuted}>
        {options.map(o => <Picker.Item key={o.value} label={o.label} value={o.value} color={COLORS.textPrimary} style={{ backgroundColor: COLORS.card }} />)}
      </Picker>
    </View>
  </View>
);

export default Select;
