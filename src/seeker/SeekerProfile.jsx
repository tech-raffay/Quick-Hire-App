import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, Switch } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { useTheme } from '../ThemeContext';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Pill from '../components/ui/Pill';
import Btn from '../components/ui/Btn';
import { EditIcon, LogOutIcon } from '../components/Icons';
import { getAvatarUrl, getResumeUrl } from '../utils';

const Row = ({ label, value }) => (
  <Card style={{ marginBottom: 10, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{label}</Text>
    <Text style={{ fontSize: 13, fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, maxWidth: '55%', textAlign: 'right' }}>{value}</Text>
  </Card>
);

const SeekerProfile = ({ user, appliedCount, savedCount, onLogout, onEdit }) => {
  const { isDark, toggleTheme } = useTheme();
  const accent = COLORS.accent;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: FONTS.headingBold, fontSize: 20, color: COLORS.textPrimary, marginBottom: 20, letterSpacing: -0.3 }}>My Profile</Text>

      <Card style={{ alignItems: 'center', padding: 28, marginBottom: 20 }}>
        <Avatar url={getAvatarUrl(user.avatarUrl)} initials={user.avatar} size={72} color={accent} />
        <Text style={{ fontSize: 20, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, marginTop: 14, letterSpacing: -0.3 }}>{user.name}</Text>
        <Text style={{ fontSize: 14, color: accent, fontFamily: FONTS.bodyMedium, marginTop: 4 }}>{user.title}</Text>
        {!!user.bio && <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 10, textAlign: 'center', lineHeight: 20 }}>{user.bio}</Text>}
        <View style={{ flexDirection: 'row', gap: 32, marginTop: 18 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontFamily: FONTS.headingBold, color: accent }}>{appliedCount}</Text>
            <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body }}>Applied</Text>
          </View>
          <View style={{ width: 1, backgroundColor: COLORS.border }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontFamily: FONTS.headingBold, color: COLORS.warning }}>{savedCount}</Text>
            <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body }}>Saved</Text>
          </View>
        </View>
      </Card>

      {user.skills?.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Text style={{ fontSize: 11, fontFamily: FONTS.bodySemiBold, color: COLORS.textMuted, marginBottom: 10, letterSpacing: 0.7, textTransform: 'uppercase' }}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {user.skills.map(s => <Pill key={s} label={s} />)}
          </View>
        </Card>
      )}

      <Row label="Location"        value={user.location       || 'Not set'} />
      <Row label="Experience"      value={user.experience     || 'Not set'} />
      <Row label="Education"       value={user.education      || 'Not set'} />
      <Row label="Email"           value={user.email} />
      <Row label="Availability"    value={user.availability   || 'Not set'} />
      <Row label="Expected Salary" value={user.expectedSalary || 'Not set'} />

      <Card style={{ marginBottom: 10, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>Resume</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 13, fontFamily: FONTS.bodySemiBold, color: getResumeUrl(user.resumeUrl) ? COLORS.success : COLORS.textMuted }}>
            {getResumeUrl(user.resumeUrl) ? 'Uploaded ✓' : 'Not uploaded'}
          </Text>
          {(() => {
            const resumeUrl = getResumeUrl(user.resumeUrl);
            return resumeUrl ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(resumeUrl).catch(err => Alert.alert('Cannot Open', `Failed to open resume.\n\n${resumeUrl}`))}
                style={{ paddingHorizontal: 10, paddingVertical: 4, backgroundColor: accent + '22', borderRadius: 6 }}>
                <Text style={{ fontSize: 11, color: accent, fontFamily: FONTS.bodySemiBold }}>VIEW</Text>
              </TouchableOpacity>
            ) : null;
          })()}
        </View>
      </Card>

      {/* Theme Toggle */}
      <Card style={{ marginTop: 10, marginBottom: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 22 }}>{isDark ? '🌙' : '☀️'}</Text>
          <View>
            <Text style={{ fontSize: 14, fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary }}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 1 }}>
              Tap to switch to {isDark ? 'LinkedIn light' : 'dark'} theme
            </Text>
          </View>
        </View>
        <Switch
          value={!isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: COLORS.border, true: accent + 'BB' }}
          thumbColor={!isDark ? accent : COLORS.textMuted}
        />
      </Card>

      <View style={{ marginTop: 12, gap: 10 }}>
        <Btn variant="primary" fullWidth icon={<EditIcon size={15} color="#fff" />} onPress={onEdit}>Edit Profile</Btn>
        <Btn onPress={onLogout} variant="muted" fullWidth icon={<LogOutIcon size={15} color={COLORS.textSecondary} />}>Sign Out</Btn>
      </View>
    </View>
  );
};

export default SeekerProfile;
