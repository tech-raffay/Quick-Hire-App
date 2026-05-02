import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Card from '../components/ui/Card';
import { BellIcon, CheckIcon, FileTextIcon, XIcon } from '../components/Icons';

const timeAgo = iso => {
  if (!iso) return '';
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60)    return 'Just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const STATUS_CFG = {
  shortlisted: { color: COLORS.success, Icon: CheckIcon },
  reviewed:    { color: COLORS.accent,  Icon: FileTextIcon },
  rejected:    { color: COLORS.danger,  Icon: XIcon },
};

const SeekerNotifications = ({ notifications, onMarkAllRead }) => {
  const accent = COLORS.accent;
  const sorted = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Text style={{ fontSize: 22, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, letterSpacing: -0.4 }}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={onMarkAllRead} activeOpacity={0.7}>
            <Text style={{ fontSize: 13, color: accent, fontFamily: FONTS.bodySemiBold }}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginBottom: 20 }}>
        {unreadCount > 0 ? `${unreadCount} new update${unreadCount > 1 ? 's' : ''}` : 'All caught up ✓'}
      </Text>

      {sorted.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: 52 }}>
          <BellIcon size={40} color={COLORS.textMuted} />
          <Text style={{ color: COLORS.textMuted, fontSize: 15, fontFamily: FONTS.bodyMedium, marginTop: 14 }}>No notifications yet.</Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.body, marginTop: 4, textAlign: 'center' }}>
            Recruiter decisions will appear here.
          </Text>
        </View>
      ) : (
        sorted.map(notif => {
          const cfg = STATUS_CFG[notif.status] || { color: accent, Icon: BellIcon };
          const { color, Icon } = cfg;
          const barColor = notif.read ? COLORS.border : color;
          return (
            <Card key={notif.id} style={{ marginBottom: 12, paddingLeft: 0, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 3, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, backgroundColor: barColor }} />
                <View style={{ flex: 1, padding: 14, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color + '22', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontFamily: notif.read ? FONTS.bodyMedium : FONTS.bodySemiBold, color: COLORS.textPrimary, lineHeight: 20 }}>
                      {notif.message}
                    </Text>
                    <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 4 }}>
                      {timeAgo(notif.createdAt)}
                    </Text>
                  </View>
                  {!notif.read && (
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, marginTop: 5 }} />
                  )}
                </View>
              </View>
            </Card>
          );
        })
      )}
    </View>
  );
};

export default SeekerNotifications;
