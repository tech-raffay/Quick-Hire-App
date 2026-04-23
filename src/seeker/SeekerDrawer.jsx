import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Drawer from '../components/Drawer';
import Avatar from '../components/ui/Avatar';
import { XIcon, SearchIcon, BookmarkIcon, FileTextIcon, UserIcon, SettingsIcon, HelpIcon, LogOutIcon, EditIcon, ZapIcon, BellIcon } from '../components/Icons';
import { COLORS, FONTS } from '../constants';

const NavItem = ({ icon, label, active, onPress, badge }) => {
  const accent = COLORS.accent;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 11, backgroundColor: active ? accent + '18' : 'transparent', borderLeftWidth: 3, borderLeftColor: active ? accent : 'transparent' }}
    >
      {icon}
      <Text style={{ flex: 1, color: active ? accent : COLORS.textSecondary, fontSize: 14, fontFamily: active ? FONTS.bodySemiBold : FONTS.bodyMedium }}>{label}</Text>
      {badge != null && badge > 0 && <View style={{ backgroundColor: accent, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 }}><Text style={{ color: '#fff', fontSize: 11, fontFamily: FONTS.bodySemiBold }}>{badge}</Text></View>}
    </TouchableOpacity>
  );
};

const Divider = () => <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: 8 }} />;

const SeekerDrawer = ({ isOpen, onClose, tab, setTab, user, onLogout, appliedCount, savedCount, onEditProfile }) => {
  const accent = COLORS.accent;
  const handleNav = id => { setTab(id); onClose(); };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <View style={{ padding: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: accent, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 14, fontFamily: FONTS.headingBold }}>Q</Text>
            </View>
            <Text style={{ fontFamily: FONTS.headingBold, fontSize: 16, color: COLORS.textPrimary }}>QuickHire</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
            <XIcon size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleNav('profile')} activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Avatar initials={user.avatar} size={44} color={accent} />
          <View>
            <Text style={{ fontFamily: FONTS.heading, fontSize: 14, color: COLORS.textPrimary }}>{user.name}</Text>
            <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 1 }}>{user.title}</Text>
            <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>{user.location}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
        <View style={{ flex: 1, backgroundColor: COLORS.card, borderRadius: 10, padding: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontFamily: FONTS.headingBold, color: accent }}>{appliedCount}</Text>
          <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>Applied</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: COLORS.card, borderRadius: 10, padding: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontFamily: FONTS.headingBold, color: COLORS.warning }}>{savedCount}</Text>
          <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>Saved</Text>
        </View>
      </View>

      <Text style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 4, fontSize: 10, fontFamily: FONTS.bodySemiBold, color: COLORS.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>Navigation</Text>
      <NavItem icon={<SearchIcon   size={18} color={tab === 'discover'     ? accent : COLORS.textSecondary} />} label="Discover Jobs"    active={tab === 'discover'}     onPress={() => handleNav('discover')} />
      <NavItem icon={<BookmarkIcon size={18} color={tab === 'saved'        ? accent : COLORS.textSecondary} />} label="Saved Jobs"       active={tab === 'saved'}        onPress={() => handleNav('saved')}     badge={savedCount} />
      <NavItem icon={<FileTextIcon size={18} color={tab === 'applications' ? accent : COLORS.textSecondary} />} label="My Applications"  active={tab === 'applications'} onPress={() => handleNav('applications')} badge={appliedCount} />
      <NavItem icon={<UserIcon     size={18} color={tab === 'profile'      ? accent : COLORS.textSecondary} />} label="Profile"          active={tab === 'profile'}      onPress={() => handleNav('profile')} />

      <Divider />
      <Text style={{ paddingHorizontal: 20, paddingTop: 6, paddingBottom: 4, fontSize: 10, fontFamily: FONTS.bodySemiBold, color: COLORS.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>Quick Actions</Text>
      <NavItem icon={<EditIcon size={18} color={COLORS.textSecondary} />} label="Update Resume"   active={false} onPress={() => { handleNav('profile'); onEditProfile(); }} />
      <NavItem icon={<BellIcon size={18} color={COLORS.textSecondary} />} label="Notifications"   active={false} onPress={onClose} />

      <Divider />
      <NavItem icon={<SettingsIcon size={18} color={COLORS.textSecondary} />} label="Settings"       active={false} onPress={onClose} />
      <NavItem icon={<HelpIcon     size={18} color={COLORS.textSecondary} />} label="Help & Support"  active={false} onPress={onClose} />

      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border, marginTop: 8 }}>
        <TouchableOpacity onPress={onLogout} activeOpacity={0.8}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, backgroundColor: COLORS.danger + '11', borderWidth: 1, borderColor: COLORS.danger + '33', borderRadius: 12 }}
        >
          <LogOutIcon size={18} color={COLORS.danger} />
          <Text style={{ color: COLORS.danger, fontFamily: FONTS.bodySemiBold, fontSize: 14 }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </Drawer>
  );
};

export default SeekerDrawer;
