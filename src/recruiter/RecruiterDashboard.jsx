import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Card from '../components/ui/Card';
import Btn from '../components/ui/Btn';
import Badge from '../components/ui/Badge';
import { BriefcaseIcon, UserIcon, FileTextIcon, BarChartIcon, PlusIcon } from '../components/Icons';

const Stat = ({ label, value, icon, color }) => (
  <Card style={{ padding: 16, flex: 1 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      {icon}
      <Text style={{ fontSize: 24, fontFamily: FONTS.headingBold, color }}>{value}</Text>
    </View>
    <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body }}>{label}</Text>
  </Card>
);

const RecruiterDashboard = ({ user, jobs, applications, onPostJob }) => {
  const stats = [
    { label: 'Active Jobs',      value: jobs.filter(j => j.status === 'active').length, icon: <BriefcaseIcon size={18} color={COLORS.recruiterAccent} />, color: COLORS.recruiterAccent },
    { label: 'Total Applicants', value: jobs.reduce((s, j) => s + j.applicants, 0),     icon: <UserIcon size={18} color={COLORS.accent} />,              color: COLORS.accent },
    { label: 'Applications',     value: applications.length,                              icon: <FileTextIcon size={18} color={COLORS.success} />,         color: COLORS.success },
    { label: 'Hires Made',       value: user.hiresMade,                                  icon: <BarChartIcon size={18} color={COLORS.warning} />,         color: COLORS.warning },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, letterSpacing: -0.5, marginBottom: 4 }}>Hello, {user.name.split(' ')[0]}</Text>
      <Text style={{ color: COLORS.textSecondary, fontSize: 14, fontFamily: FONTS.body, marginBottom: 24 }}>{user.company}</Text>

      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
        <Stat {...stats[0]} />
        <Stat {...stats[1]} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
        <Stat {...stats[2]} />
        <Stat {...stats[3]} />
      </View>

      <View style={{ backgroundColor: COLORS.recruiterAccent + '18', borderWidth: 1, borderColor: COLORS.recruiterAccent + '44', borderRadius: 16, padding: 24, marginBottom: 24, alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 15, fontFamily: FONTS.heading, color: COLORS.textPrimary, marginBottom: 4 }}>Post a New Job</Text>
        <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginBottom: 16 }}>Reach thousands of qualified candidates today</Text>
        <Btn onPress={onPostJob} variant="recruiter" icon={<PlusIcon size={15} color="#fff" />}>Post Job</Btn>
      </View>

      <Text style={{ fontSize: 15, fontFamily: FONTS.heading, color: COLORS.textPrimary, marginBottom: 12 }}>Recent Postings</Text>
      {jobs.length === 0
        ? <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.body }}>No jobs posted yet.</Text>
        : jobs.slice(0, 3).map(job => (
          <Card key={job.id} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 14 }}>{job.title}</Text>
                <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 3 }}>{job.location} · {job.type}</Text>
              </View>
              <Badge color={COLORS.success}>{job.applicants} applied</Badge>
            </View>
          </Card>
        ))
      }
    </View>
  );
};

export default RecruiterDashboard;
