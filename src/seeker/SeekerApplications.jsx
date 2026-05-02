import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Pill from '../components/ui/Pill';
import { BarChartIcon, ZapIcon, FileTextIcon, CheckIcon } from '../components/Icons';

const STATUS_COLORS = {
  pending:     COLORS.warning,
  reviewed:    COLORS.accent,
  shortlisted: COLORS.success,
  rejected:    COLORS.danger,
};
const STATUS_LABELS = {
  pending:     'Under Review',
  reviewed:    'Reviewed',
  shortlisted: 'Shortlisted 🎉',
  rejected:    'Not Selected',
};

/* ─── Animated progress bar ─── */
const AnimBar = ({ value, max, color, delay = 0 }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const pct  = max > 0 ? Math.min(value / max, 1) : 0;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: pct,
      duration: 850,
      delay,
      useNativeDriver: false,
    }).start();
  }, [pct]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={{ height: 6, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden' }}>
      <Animated.View style={{ width, height: '100%', backgroundColor: color, borderRadius: 4 }} />
    </View>
  );
};

/* ─── Single funnel row ─── */
const FunnelRow = ({ label, value, max, color, delay }) => (
  <View style={{ marginBottom: 13 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
      <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.bodyMedium }}>{label}</Text>
      <Text style={{ fontSize: 13, color, fontFamily: FONTS.bodySemiBold }}>{value}</Text>
    </View>
    <AnimBar value={value} max={max} color={color} delay={delay} />
  </View>
);

/* ─── Mini KPI chip ─── */
const KpiChip = ({ label, value, color }) => (
  <View style={{ flex: 1, backgroundColor: color + '18', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: color + '33' }}>
    <Text style={{ fontSize: 20, fontFamily: FONTS.headingBold, color }}>{value}</Text>
    <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2, textAlign: 'center' }}>{label}</Text>
  </View>
);

const SeekerApplications = ({ applications, allJobs }) => {
  const accent = COLORS.accent;
  const total       = applications.length;
  const pending     = applications.filter(a => a.status === 'pending').length;
  const reviewed    = applications.filter(a => a.status === 'reviewed').length;
  const shortlisted = applications.filter(a => a.status === 'shortlisted').length;
  const rejected    = applications.filter(a => a.status === 'rejected').length;
  const maxVal      = Math.max(total, 1);

  return (
    <View style={{ padding: 20 }}>
      {/* Title */}
      <Text style={{ fontFamily: FONTS.headingBold, fontSize: 22, color: COLORS.textPrimary, marginBottom: 4, letterSpacing: -0.4 }}>My Applications</Text>
      <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginBottom: 20 }}>Track your job application journey</Text>

      {total > 0 && (
        <>
          {/* KPI row */}
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 18 }}>
            <KpiChip label="Applied"     value={total}       color={accent} />
            <KpiChip label="Shortlisted" value={shortlisted} color={COLORS.success} />
            <KpiChip label="Rejected"    value={rejected}    color={COLORS.danger} />
          </View>

          {/* Progress funnel card */}
          <Card style={{ padding: 18, marginBottom: 22 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <BarChartIcon size={15} color={accent} />
              <Text style={{ fontSize: 14, fontFamily: FONTS.heading, color: COLORS.textPrimary }}>Application Funnel</Text>
            </View>
            <FunnelRow label="Total Applied"  value={total}       max={maxVal} color={accent}          delay={0}   />
            <FunnelRow label="Under Review"   value={pending}     max={maxVal} color={COLORS.warning}  delay={120} />
            <FunnelRow label="Reviewed"       value={reviewed}    max={maxVal} color={COLORS.accent}   delay={240} />
            <FunnelRow label="Shortlisted"    value={shortlisted} max={maxVal} color={COLORS.success}  delay={360} />
            <FunnelRow label="Not Selected"   value={rejected}    max={maxVal} color={COLORS.danger}   delay={480} />

            {/* Insight line */}
            {shortlisted > 0 && (
              <View style={{ marginTop: 6, padding: 10, backgroundColor: COLORS.success + '14', borderRadius: 10, borderWidth: 1, borderColor: COLORS.success + '33' }}>
                <Text style={{ fontSize: 12, color: COLORS.success, fontFamily: FONTS.bodySemiBold }}>
                  🎉 You have {shortlisted} shortlisted application{shortlisted > 1 ? 's' : ''}. Keep it up!
                </Text>
              </View>
            )}
          </Card>
        </>
      )}

      {/* Application cards */}
      {total === 0
        ? (
          <View style={{ alignItems: 'center', paddingVertical: 52 }}>
            <FileTextIcon size={40} color={COLORS.textMuted} />
            <Text style={{ color: COLORS.textMuted, fontSize: 15, fontFamily: FONTS.bodyMedium, marginTop: 14 }}>No applications yet.</Text>
            <Text style={{ color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.body, marginTop: 4, textAlign: 'center' }}>Start applying to jobs from the Discover tab!</Text>
          </View>
        )
        : applications.map(app => {
          const job = (allJobs || store.jobs).find(j => j.id === app.jobId);
          if (!job) return null;
          const statusColor = STATUS_COLORS[app.status] || COLORS.textMuted;
          return (
            <Card key={app.id} style={{ marginBottom: 14 }}>
              {/* Status accent bar */}
              <View style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', backgroundColor: statusColor, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }} />
              <View style={{ paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 15 }}>{job.title}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 2 }}>{job.company}</Text>
                    <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>Applied {app.appliedAt}</Text>
                  </View>
                  <Badge color={statusColor}>{app.status}</Badge>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {(job.skills || []).slice(0, 3).map(s => <Pill key={s} label={s} />)}
                </View>
                {/* Progress micro-bar */}
                <View style={{ marginBottom: 6 }}>
                  <AnimBar
                    value={['pending', 'reviewed', 'shortlisted', 'rejected'].indexOf(app.status) + 1}
                    max={4}
                    color={statusColor}
                    delay={300}
                  />
                </View>
                <Text style={{ fontSize: 12, color: statusColor, fontFamily: FONTS.bodySemiBold, fontStyle: 'italic' }}>
                  {STATUS_LABELS[app.status]}
                </Text>
              </View>
            </Card>
          );
        })
      }
    </View>
  );
};

export default SeekerApplications;
