import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '../../constants';

const VARIANTS = {
  primary:   { bg: COLORS.accent,          color: '#fff' },
  recruiter: { bg: COLORS.recruiterAccent, color: '#fff' },
  ghost:     { bg: 'transparent',          color: COLORS.accent,        borderColor: COLORS.accent + '44' },
  danger:    { bg: COLORS.danger,          color: '#fff' },
  success:   { bg: COLORS.success,         color: '#fff' },
  muted:     { bg: COLORS.card,            color: COLORS.textSecondary, borderColor: COLORS.border },
};

const Btn = ({ children, onPress, variant = 'primary', size = 'md', disabled = false, loading = false, fullWidth = false, icon }) => {
  const s = VARIANTS[variant] || VARIANTS.primary;
  const pad = size === 'sm' ? { paddingHorizontal: 16, paddingVertical: 8 } : size === 'lg' ? { paddingHorizontal: 28, paddingVertical: 14 } : { paddingHorizontal: 22, paddingVertical: 11 };
  const fs  = size === 'sm' ? 13 : size === 'lg' ? 15 : 14;
  
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} activeOpacity={0.78}
      style={[{ backgroundColor: s.bg, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderWidth: s.borderColor ? 1 : 0, borderColor: s.borderColor || 'transparent', opacity: isDisabled ? 0.6 : 1 }, pad, fullWidth && { width: '100%' }]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={s.color} />
      ) : (
        <>
          {icon && <View>{icon}</View>}
          <Text style={{ color: s.color, fontSize: fs, fontFamily: FONTS.bodySemiBold, letterSpacing: 0.1 }}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Btn;
