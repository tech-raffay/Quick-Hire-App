import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS, FONTS } from '../../constants';

const Input = ({ label, value, onChangeText, type, placeholder, required, multiline, rows = 3, editable = true }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: 16, opacity: editable ? 1 : 0.7 }}>
      <Text style={{ fontSize: 11, fontFamily: FONTS.bodySemiBold, color: COLORS.textSecondary, marginBottom: 6, letterSpacing: 0.7, textTransform: 'uppercase' }}>
        {label}{required ? <Text style={{ color: COLORS.danger }}> *</Text> : null}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        secureTextEntry={type === 'password'}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        multiline={multiline}
        numberOfLines={multiline ? rows : 1}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={editable}
        style={{ backgroundColor: COLORS.card, borderWidth: 1, borderColor: focused ? COLORS.accent : COLORS.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11, color: COLORS.textPrimary, fontSize: 14, fontFamily: FONTS.body, textAlignVertical: multiline ? 'top' : 'center', minHeight: multiline ? rows * 24 : undefined }}
      />
    </View>
  );
};

export default Input;
