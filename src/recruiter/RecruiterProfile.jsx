import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Btn from '../components/ui/Btn';
import { ShieldIcon, EditIcon, LogOutIcon } from '../components/Icons';
import { getAvatarUrl, getResumeUrl } from '../utils';

const Row = ({ label, value }) => (
  <Card style={{ marginBottom: 10, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{label}</Text>
    <Text style={{ fontSize: 13, fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary }}>{String(value)}</Text>
  </Card>
);

const RecruiterProfile = ({ user, onLogout, onEdit }) => (
  <View style={{ padding: 20 }}>
    <Text style={{ fontFamily: FONTS.headingBold, fontSize: 20, color: COLORS.textPrimary, marginBottom: 20, letterSpacing: -0.3 }}>Profile</Text>
    <Card style={{ marginBottom: 20, alignItems: 'center', padding: 32 }}>
      <Avatar url={getAvatarUrl(user.avatarUrl)} initials={user.avatar} size={72} color={COLORS.recruiterAccent} />
      <Text style={{ fontSize: 20, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, marginTop: 14, letterSpacing: -0.3 }}>{user.name}</Text>
      <Text style={{ fontSize: 14, color: COLORS.recruiterAccent, fontFamily: FONTS.bodyMedium, marginTop: 4 }}>{user.company}</Text>
      {user.verified && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}><ShieldIcon size={13} color={COLORS.success} /><Text style={{ fontSize: 12, color: COLORS.success, fontFamily: FONTS.bodySemiBold }}>Verified Recruiter</Text></View>}
      {!!user.bio && <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 12, textAlign: 'center', lineHeight: 20 }}>{user.bio}</Text>}
    </Card>
    <Row label="Location"     value={user.location    || 'Not set'} />
    <Row label="Industry"     value={user.industry    || 'Not set'} />
    <Row label="Company Size" value={user.companySize || 'Not set'} />
    <Row label="Website"      value={user.website     || 'Not set'} />
    <Row label="Email"        value={user.email} />
    <Card style={{ marginBottom: 10, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>Resume/Doc</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 13, fontFamily: FONTS.bodySemiBold, color: getResumeUrl(user.resumeUrl) ? COLORS.success : COLORS.textMuted }}>
          {getResumeUrl(user.resumeUrl) ? 'Uploaded ✓' : 'Not uploaded'}
        </Text>
{(() => {
          const resumeUrl = getResumeUrl(user.resumeUrl);
          return resumeUrl ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(resumeUrl).catch((err) => {
                  console.error('[Resume]', err);
                  Alert.alert('Cannot Open', `Failed to open file.\n\n${resumeUrl}`);
                })
              }
              style={{ paddingHorizontal: 10, paddingVertical: 4, backgroundColor: COLORS.recruiterAccent + '22', borderRadius: 6 }}>
              <Text style={{ fontSize: 11, color: COLORS.recruiterAccent, fontFamily: FONTS.bodySemiBold }}>VIEW</Text>
            </TouchableOpacity>
          ) : null;
        })()}
      </View>
    </Card>
    <Row label="Jobs Posted"  value={user.jobsPosted} />
    <Row label="Hires Made"   value={user.hiresMade} />
    <View style={{ marginTop: 20, gap: 10 }}>
      <Btn variant="recruiter" fullWidth icon={<EditIcon size={15} color="#fff" />} onPress={onEdit}>Edit Profile</Btn>
      <Btn onPress={onLogout} variant="muted" fullWidth icon={<LogOutIcon size={15} color={COLORS.textSecondary} />}>Sign Out</Btn>
    </View>
  </View>
);

export default RecruiterProfile;
