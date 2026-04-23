import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { XIcon, BellIcon, ChevronRightIcon } from '../components/Icons';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const NotificationsModal = ({ isOpen, onClose, notifications, onSelectJob }) => {
  const markAsRead = async (notif) => {
    if (!notif.read) {
      await updateDoc(doc(db, 'notifications', notif.id), { read: true });
    }
  };

  const handlePress = (notif) => {
    markAsRead(notif);
    if (notif.jobId) {
      onSelectJob(notif.jobId);
    }
    onClose();
  };

  return (
    <Modal visible={isOpen} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.surface }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <BellIcon size={20} color={COLORS.accent} />
            <Text style={{ fontFamily: FONTS.headingBold, fontSize: 18, color: COLORS.textPrimary }}>Notifications</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={{ padding: 4, backgroundColor: COLORS.bg, borderRadius: 12 }}>
            <XIcon size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {notifications.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <BellIcon size={32} color={COLORS.textMuted} />
            </View>
            <Text style={{ fontFamily: FONTS.heading, fontSize: 16, color: COLORS.textPrimary, marginBottom: 8 }}>All caught up!</Text>
            <Text style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' }}>No new updates on your applications yet.</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: item.read ? COLORS.bg : COLORS.surface,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  borderWidth: 1,
                  borderColor: item.read ? COLORS.border : COLORS.accent + '33',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: item.read ? 0 : 0.05,
                  shadowRadius: 4,
                  elevation: item.read ? 0 : 2,
                }}
              >
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: item.read ? 'transparent' : COLORS.accent }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: item.read ? FONTS.bodySemiBold : FONTS.headingBold, fontSize: 14, color: COLORS.textPrimary }}>{item.title}</Text>
                  <Text style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>{item.message}</Text>
                  <Text style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
                <ChevronRightIcon size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
};

export default NotificationsModal;
