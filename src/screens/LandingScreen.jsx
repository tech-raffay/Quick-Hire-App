import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { COLORS, FONTS } from '../constants';

const LandingScreen = ({ onSelectRole }) => {
  const [pressed, setPressed] = useState(null);
  const logoScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const cards = [
    { role: 'recruiter', letter: 'R', title: "I'm Hiring", subtitle: 'Post jobs, find top talent, and manage your pipeline', color: COLORS.recruiterAccent, features: ['Post unlimited jobs', 'Review applications', 'Manage candidates', 'Analytics dashboard'] },
    { role: 'seeker',    letter: 'J', title: "I'm Job Seeking", subtitle: 'Discover opportunities and apply to your dream role', color: COLORS.accent,           features: ['Browse curated jobs', 'One-click apply', 'Track applications', 'Build your profile'] },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', padding: 20, paddingTop: 80, paddingBottom: 40 }}>
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: 48 }}>
        <Animated.View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, transform: [{ scale: logoScale }] }}>
          <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center', shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 8 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontFamily: FONTS.headingBold }}>Q</Text>
          </View>
          <Text style={{ fontSize: 30, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, letterSpacing: -0.8 }}>QuickHire</Text>
        </Animated.View>
        <Text style={{ color: COLORS.textSecondary, fontSize: 15, fontFamily: FONTS.body }}>The fastest way to hire — or get hired.</Text>
      </View>

      {/* Role Cards */}
      {cards.map(card => (
        <TouchableOpacity key={card.role} onPress={() => onSelectRole(card.role)} onPressIn={() => setPressed(card.role)} onPressOut={() => setPressed(null)} activeOpacity={0.9}
          style={{ width: '100%', maxWidth: 360, backgroundColor: COLORS.card, borderWidth: 1, borderColor: pressed === card.role ? card.color + '66' : COLORS.border, borderRadius: 20, padding: 28, marginBottom: 16, shadowColor: card.color, shadowOffset: { width: 0, height: 8 }, shadowOpacity: pressed === card.role ? 0.2 : 0, shadowRadius: 20, elevation: pressed === card.role ? 4 : 0 }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: card.color + '22', borderWidth: 1, borderColor: card.color + '44', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Text style={{ color: card.color, fontSize: 22, fontFamily: FONTS.headingBold }}>{card.letter}</Text>
          </View>
          <Text style={{ fontSize: 20, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, marginBottom: 8, letterSpacing: -0.3 }}>{card.title}</Text>
          <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 20, lineHeight: 20, fontFamily: FONTS.body }}>{card.subtitle}</Text>
          {card.features.map(f => (
            <View key={f} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: card.color + '22', borderWidth: 1, borderColor: card.color + '44', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 6, height: 4, borderBottomWidth: 1.5, borderLeftWidth: 1.5, borderColor: card.color, transform: [{ rotate: '-45deg' }] }} />
              </View>
              <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{f}</Text>
            </View>
          ))}
          <View style={{ backgroundColor: card.color, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#fff', fontFamily: FONTS.bodySemiBold, fontSize: 14 }}>Get Started</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Text style={{ color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.body, marginTop: 8 }}>Already have an account? Select your role to sign in.</Text>
    </ScrollView>
  );
};

export default LandingScreen;
