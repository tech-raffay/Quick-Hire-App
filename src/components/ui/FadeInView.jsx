import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const FadeInView = ({ children, style, duration = 340, translateY: startY = 18 }) => {
  const opacity   = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(startY)).current;

  useEffect(() => {
    // Reset values in case of re-mount
    opacity.setValue(0);
    translateY.setValue(startY);
    
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ flex: 1 }, style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
