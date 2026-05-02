import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Drawer from '../components/Drawer';
import Avatar from '../components/ui/Avatar';
import { XIcon, DashboardIcon, BriefcaseIcon, FileTextIcon, UserIcon, PlusIcon, SettingsIcon, HelpIcon, LogOutIcon, ShieldIcon, BellIcon, BarChartIcon } from '../components/Icons';
import { COLORS, FONTS } from '../constants';

const NavItem = ({ icon, label, active, accent, onPress, badge }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}
    style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 11, backgroundColor: active ? accent + '18' : 'transparent', borderLeftWidth: 3, borderLeftColor: active ? accent : 'transparent' }}
  >
    {icon}
    <Text style={{ flex: 1, color: active ? accent : COLORS.textSecondary, fontSize: 14, fontFamily: active ? FONTS.bodySemiBold : FONTS.bodyMedium }}>{label}</Text>
    {badge != null && badge > 0 && <View style={{ backgroundColor: accent, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 }}><Text style={{ color: '#fff', fontSize: 11, fontFamily: FONTS.bodySemiBold }}>{badge}</Text></View>}
  </TouchableOpacity>
);

const Divider = () => <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: 8 }} />;

const RecruiterDrawer = ({ isOpen, onClose, tab, setTab, user, onPostJob, onLogout, jobCount, appCount, onEditProfile, onComingSoon, notifCount }) => {
  const accent = COLORS.recruiterAccent;
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
            <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 1 }}>{user.company}</Text>
            {user.verified && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}><ShieldIcon size={11} color={COLORS.success} /><Text style={{ fontSize: 11, color: COLORS.success, fontFamily: FONTS.bodySemiBold }}>Verified</Text></View>}
          </View>
        </TouchableOpacity>
      </View>

      {/* Post Job CTA */}
      <View style={{ padding: 14 }}>
        <TouchableOpacity onPress={() => { onPostJob(); onClose(); }} activeOpacity={0.8}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, backgroundColor: accent + '18', borderWidth: 1, borderColor: accent + '44', borderRadius: 12 }}
        >
          <PlusIcon size={18} color={accent} />
          <Text style={{ color: accent, fontFamily: FONTS.bodySemiBold, fontSize: 14 }}>Post a New Job</Text>
        </TouchableOpacity>
      </View>

      <Divider />
      <Text style={{ paddingHorizontal: 20, paddingTop: 6, paddingBottom: 4, fontSize: 10, fontFamily: FONTS.bodySemiBold, color: COLORS.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>Navigation</Text>
      <NavItem icon={<DashboardIcon size={18} color={tab === 'dashboard'    ? accent : COLORS.textSecondary} />} label="Dashboard"    active={tab === 'dashboard'}    accent={accent} onPress={() => handleNav('dashboard')} />
      <NavItem icon={<BriefcaseIcon size={18} color={tab === 'jobs'         ? accent : COLORS.textSecondary} />} label="My Jobs"      active={tab === 'jobs'}         accent={accent} onPress={() => handleNav('jobs')} badge={jobCount} />
      <NavItem icon={<FileTextIcon  size={18} color={tab === 'applications' ? accent : COLORS.textSecondary} />} label="Applications" active={tab === 'applications'} accent={accent} onPress={() => handleNav('applications')} badge={appCount} />
      <NavItem icon={<UserIcon      size={18} color={tab === 'profile'      ? accent : COLORS.textSecondary} />} label="Profile"      active={tab === 'profile'}      accent={accent} onPress={() => handleNav('profile')} />

      <Divider />
      <Text style={{ paddingHorizontal: 20, paddingTop: 6, paddingBottom: 4, fontSize: 10, fontFamily: FONTS.bodySemiBold, color: COLORS.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>More</Text>
      <NavItem icon={<BarChartIcon size={18} color={tab === 'analytics'      ? accent : COLORS.textSecondary} />} label="Analytics"      active={tab === 'analytics'}      accent={accent} onPress={() => handleNav('analytics')} />
      <NavItem icon={<BellIcon     size={18} color={tab === 'notifications'   ? accent : COLORS.textSecondary} />} label="Notifications"  active={tab === 'notifications'}   accent={accent} onPress={() => handleNav('notifications')} badge={notifCount} />

      <Divider />
      <NavItem icon={<SettingsIcon size={18} color={COLORS.textSecondary} />} label="Settings"       active={false} accent={accent} onPress={() => { onClose(); setTimeout(() => onComingSoon('Settings'), 600); }} />
      <NavItem icon={<HelpIcon     size={18} color={COLORS.textSecondary} />} label="Help & Support"  active={false} accent={accent} onPress={() => { onClose(); setTimeout(() => onComingSoon('Help & Support'), 600); }} />

      <View style={{ marginTop: 'auto', padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border }}>
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

export default RecruiterDrawer;
