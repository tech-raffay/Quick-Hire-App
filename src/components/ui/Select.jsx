import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../constants';

const Select = ({ label, value, onValueChange, options }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 11, fontFamily: FONTS.bodySemiBold, color: COLORS.textSecondary, marginBottom: 8, letterSpacing: 0.7, textTransform: 'uppercase' }}>
      {label}
    </Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {options.map(o => {
          const active = value === o.value;
          return (
            <TouchableOpacity
              key={o.value}
              onPress={() => onValueChange(o.value)}
              activeOpacity={0.75}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 9,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: active ? COLORS.recruiterAccent : COLORS.border,
                backgroundColor: active ? COLORS.recruiterAccent + '22' : COLORS.surface,
              }}
            >
              <Text style={{
                fontSize: 13,
                fontFamily: active ? FONTS.bodySemiBold : FONTS.bodyMedium,
                color: active ? COLORS.recruiterAccent : COLORS.textSecondary,
              }}>
                {o.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  </View>
);

export default Select;
