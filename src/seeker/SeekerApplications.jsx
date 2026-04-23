import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Pill from '../components/ui/Pill';

const STATUS_COLORS = { pending: COLORS.warning, reviewed: COLORS.accent, shortlisted: COLORS.success, rejected: COLORS.danger };
const STATUS_LABELS  = { pending: 'Under Review', reviewed: 'Reviewed', shortlisted: 'Shortlisted', rejected: 'Not Selected' };

const SeekerApplications = ({ applications, allJobs }) => (
  <View style={{ padding: 20 }}>
    <Text style={{ fontFamily: FONTS.headingBold, fontSize: 20, color: COLORS.textPrimary, marginBottom: 20, letterSpacing: -0.3 }}>My Applications</Text>
    {applications.length === 0
      ? <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.body, textAlign: 'center', paddingVertical: 48 }}>You haven't applied to any jobs yet.</Text>
      : applications.map(app => {
        const job = (allJobs || store.jobs).find(j => j.id === app.jobId);
        if (!job) return null;
        return (
          <Card key={app.id} style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 15 }}>{job.title}</Text>
                <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 2 }}>{job.company}</Text>
                <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>Applied {app.appliedAt}</Text>
              </View>
              <Badge color={STATUS_COLORS[app.status] || COLORS.textMuted}>{app.status}</Badge>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {(job.skills || []).slice(0, 3).map(s => <Pill key={s} label={s} />)}
            </View>
            <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body, fontStyle: 'italic' }}>{STATUS_LABELS[app.status]}</Text>
          </Card>
        );
      })
    }
  </View>
);

export default SeekerApplications;
