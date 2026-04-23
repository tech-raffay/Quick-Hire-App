import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Animated, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from '../constants';

const DRAWER_WIDTH = 288;

const Drawer = ({ isOpen, onClose, children }) => {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const opacity    = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0,             duration: 280, useNativeDriver: true }),
        Animated.timing(opacity,    { toValue: 1,             duration: 280, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, { toValue: -DRAWER_WIDTH, duration: 280, useNativeDriver: true }),
        Animated.timing(opacity,    { toValue: 0,             duration: 280, useNativeDriver: true }),
      ]).start(() => setVisible(false));
    }
  }, [isOpen]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        {/* Backdrop */}
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)', opacity }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} activeOpacity={1} />
        </Animated.View>
        {/* Panel */}
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: DRAWER_WIDTH, backgroundColor: COLORS.surface, borderRightWidth: 1, borderRightColor: COLORS.border, transform: [{ translateX }] }}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
              {children}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Drawer;
