import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Pill from '../components/ui/Pill';
import Btn from '../components/ui/Btn';
import { PlusIcon } from '../components/Icons';

const RecruiterJobs = ({ jobs, onPost }) => (
  <View style={{ padding: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <Text style={{ fontFamily: FONTS.headingBold, fontSize: 20, color: COLORS.textPrimary, letterSpacing: -0.3 }}>My Jobs</Text>
      <Btn onPress={onPost} variant="recruiter" size="sm" icon={<PlusIcon size={14} color="#fff" />}>Post Job</Btn>
    </View>
    {jobs.length === 0
      ? <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.body, textAlign: 'center', paddingVertical: 48 }}>No jobs posted yet. Create your first listing!</Text>
      : jobs.map(job => (
        <Card key={job.id} style={{ marginBottom: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 15, marginBottom: 3 }}>{job.title}</Text>
              <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{job.company} · {job.location}</Text>
            </View>
            <Badge color={job.status === 'active' ? COLORS.success : COLORS.textMuted}>{job.status}</Badge>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {job.skills.slice(0, 3).map(s => <Pill key={s} label={s} />)}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{job.salary}</Text>
            <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{job.applicants} applicants</Text>
            <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{job.posted}</Text>
          </View>
        </Card>
      ))
    }
  </View>
);

export default RecruiterJobs;
