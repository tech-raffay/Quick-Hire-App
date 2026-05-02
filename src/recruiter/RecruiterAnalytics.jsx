import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Card from '../components/ui/Card';
import { BarChartIcon, UserIcon, BriefcaseIcon, FileTextIcon, CheckIcon } from '../components/Icons';

/* ─── Animated progress bar ─── */
const ProgressBar = ({ value, max, color, delay = 0 }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: pct,
      duration: 900,
      delay,
      useNativeDriver: false,
    }).start();
  }, [pct]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={{ height: 7, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden' }}>
      <Animated.View style={{ width, height: '100%', backgroundColor: color, borderRadius: 4 }} />
    </View>
  );
};

/* ─── Ring-like stat tile ─── */
const StatTile = ({ label, value, icon, color, sub }) => (
  <Card style={{ flex: 1, padding: 14, alignItems: 'center' }}>
    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color + '22', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
      {icon}
    </View>
    <Text style={{ fontSize: 22, fontFamily: FONTS.headingBold, color }}>{value}</Text>
    <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, textAlign: 'center', marginTop: 2 }}>{label}</Text>
    {sub ? <Text style={{ fontSize: 10, color, fontFamily: FONTS.bodySemiBold, marginTop: 3 }}>{sub}</Text> : null}
  </Card>
);

/* ─── Funnel row ─── */
const FunnelRow = ({ label, value, max, color, delay }) => (
  <View style={{ marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
      <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.bodyMedium }}>{label}</Text>
      <Text style={{ fontSize: 13, color, fontFamily: FONTS.bodySemiBold }}>{value}</Text>
    </View>
    <ProgressBar value={value} max={max} color={color} delay={delay} />
  </View>
);

/* ─── Per-job breakdown bar ─── */
const JobBar = ({ job, max, accent }) => (
  <View style={{ marginBottom: 12 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
      <Text style={{ fontSize: 12, color: COLORS.textPrimary, fontFamily: FONTS.bodyMedium, flex: 1 }} numberOfLines={1}>{job.title}</Text>
      <Text style={{ fontSize: 12, color: accent, fontFamily: FONTS.bodySemiBold, marginLeft: 8 }}>{job.applicants} applicants</Text>
    </View>
    <ProgressBar value={job.applicants} max={max} color={accent} delay={200} />
  </View>
);

const RecruiterAnalytics = ({ jobs, applications }) => {
  const accent = COLORS.recruiterAccent;

  const totalApplicants = jobs.reduce((s, j) => s + j.applicants, 0);
  const activeJobs      = jobs.filter(j => j.status === 'active').length;
  const shortlisted     = applications.filter(a => a.status === 'shortlisted').length;
  const reviewed        = applications.filter(a => a.status === 'reviewed').length;
  const pending         = applications.filter(a => a.status === 'pending').length;
  const rejected        = applications.filter(a => a.status === 'rejected').length;
  const convRate        = totalApplicants > 0 ? Math.round((shortlisted / totalApplicants) * 100) : 0;

  const maxApplicants = Math.max(...jobs.map(j => j.applicants), 1);
  const topJobs       = [...jobs].sort((a, b) => b.applicants - a.applicants).slice(0, 5);

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 22, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, letterSpacing: -0.5 }}>Analytics</Text>
        <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginTop: 2 }}>Hiring pipeline overview</Text>
      </View>

      {/* KPI tiles */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 20, marginBottom: 10 }}>
        <StatTile label="Active Jobs"    value={activeJobs}      color={accent}          icon={<BriefcaseIcon size={18} color={accent} />} />
        <StatTile label="Total Applied"  value={totalApplicants} color={COLORS.accent}   icon={<UserIcon      size={18} color={COLORS.accent} />} />
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
        <StatTile label="Shortlisted"    value={shortlisted}     color={COLORS.success}  icon={<CheckIcon     size={18} color={COLORS.success} />} sub={`${convRate}% rate`} />
        <StatTile label="Applications"   value={applications.length} color={COLORS.warning} icon={<FileTextIcon  size={18} color={COLORS.warning} />} />
      </View>

      {/* Hiring Funnel */}
      <Card style={{ padding: 18, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <BarChartIcon size={16} color={accent} />
          <Text style={{ fontSize: 14, fontFamily: FONTS.heading, color: COLORS.textPrimary }}>Hiring Funnel</Text>
        </View>
        <FunnelRow label="Applicants"  value={totalApplicants} max={Math.max(totalApplicants, 1)} color={COLORS.accent}   delay={0} />
        <FunnelRow label="Pending"     value={pending}         max={Math.max(totalApplicants, 1)} color={COLORS.warning}  delay={100} />
        <FunnelRow label="Reviewed"    value={reviewed}        max={Math.max(totalApplicants, 1)} color={COLORS.accent}   delay={200} />
        <FunnelRow label="Shortlisted" value={shortlisted}     max={Math.max(totalApplicants, 1)} color={COLORS.success}  delay={300} />
        <FunnelRow label="Rejected"    value={rejected}        max={Math.max(totalApplicants, 1)} color={COLORS.danger}   delay={400} />
      </Card>

      {/* Per-Job breakdown */}
      {topJobs.length > 0 && (
        <Card style={{ padding: 18, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <BriefcaseIcon size={16} color={accent} />
            <Text style={{ fontSize: 14, fontFamily: FONTS.heading, color: COLORS.textPrimary }}>Top Job Listings</Text>
          </View>
          {topJobs.map(job => (
            <JobBar key={job.id} job={job} max={maxApplicants} accent={accent} />
          ))}
        </Card>
      )}

      {/* Conversion insight */}
      <Card style={{ padding: 18, marginBottom: 8, backgroundColor: accent + '14', borderColor: accent + '33', borderWidth: 1 }}>
        <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, lineHeight: 20 }}>
          <Text style={{ color: accent, fontFamily: FONTS.bodySemiBold }}>Conversion rate: {convRate}%{' '}</Text>
          — {convRate >= 15 ? 'Great hiring efficiency! Your shortlisting is on track.' : 'Tip: review more applicants to improve your shortlist rate.'}
        </Text>
      </Card>
    </View>
  );
};

export default RecruiterAnalytics;
