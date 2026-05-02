import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Animated, StyleSheet, StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

import { COLORS } from './src/constants';
import { ThemeProvider, useTheme } from './src/ThemeContext';
import LandingScreen from './src/screens/LandingScreen';
import AuthScreen    from './src/screens/AuthScreen';
import RecruiterApp  from './src/recruiter/RecruiterApp';
import SeekerApp     from './src/seeker/SeekerApp';
import FadeInView from './src/components/ui/FadeInView';

// ─── Full-screen fade-out overlay ────────────────────────────────────────────
// Shows a brief dark overlay during sign-in / sign-out to mask the hard cut.
const TransitionOverlay = ({ visible, onDone }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.delay(120),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => onDone?.());
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFillObject, { backgroundColor: COLORS.bg, opacity, zIndex: 999 }]}
    />
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

function AppInner() {
  const { isDark } = useTheme();
  const [screen, setScreen]           = useState('landing');
  const [role,   setRole]             = useState(null);
  const [user,   setUser]             = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  // key forces FadeInView to remount (restart animation) on every screen change
  const [screenKey, setScreenKey]     = useState(0);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  // Runs the overlay animation then switches screen
  const transitionTo = useCallback((nextScreen, stateFn) => {
    setTransitioning(true);
    // After overlay fades to black, update state, then overlay fades out
    setTimeout(() => {
      stateFn?.();
      setScreen(nextScreen);
      setScreenKey(k => k + 1);
    }, 220); // wait for fade-to-black to finish
  }, []);

  const handleOverlayDone = useCallback(() => {
    setTransitioning(false);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  const renderScreen = () => {
    if (screen === 'landing') {
      return (
        <FadeInView key={screenKey}>
          <LandingScreen
            onSelectRole={r => transitionTo('auth', () => setRole(r))}
          />
        </FadeInView>
      );
    }

    if (screen === 'auth') {
      return (
        <FadeInView key={screenKey}>
          <AuthScreen
            role={role}
            onAuth={u => transitionTo('app', () => setUser(u))}
            onBack={() => transitionTo('landing', () => setRole(null))}
          />
        </FadeInView>
      );
    }

    if (screen === 'app' && user) {
      const logout = () =>
        transitionTo('landing', () => { setUser(null); setRole(null); });

      return (
        <FadeInView key={screenKey}>
          {role === 'recruiter'
            ? <RecruiterApp user={user} onLogout={logout} />
            : <SeekerApp    user={user} onLogout={logout} />}
        </FadeInView>
      );
    }

    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.surface} />
      {renderScreen()}
      <TransitionOverlay visible={transitioning} onDone={handleOverlayDone} />
    </View>
  );
}
