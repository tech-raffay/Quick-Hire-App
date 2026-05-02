import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Pill from '../components/ui/Pill';
import Avatar from '../components/ui/Avatar';
import Btn from '../components/ui/Btn';
import { db } from '../firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { getAvatarUrl, getResumeUrl } from '../utils';

const FILTERS = ['all', 'pending', 'reviewed', 'shortlisted', 'rejected'];
const STATUS_COLORS = { pending: COLORS.warning, reviewed: COLORS.accent, shortlisted: COLORS.success, rejected: COLORS.danger };

const RecruiterApplications = ({ applications, realUsers, allJobs }) => {
  const [filter, setFilter] = useState('all');
  const [, forceUpdate] = useState(0);
  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);
  const updateStatus = async (app, status, jobTitle) => {
    if (typeof app.id === 'string' && app.id.length > 5) {
      await updateDoc(doc(db, 'applications', app.id), { status });
    } else {
      app.status = status; forceUpdate(n => n + 1);
    }
    // Notify the seeker
    const msgs = {
      shortlisted: `🎉 Congratulations! You've been shortlisted for ${jobTitle}`,
      reviewed:    `Your application for ${jobTitle} has been reviewed by the recruiter`,
      rejected:    `Your application for ${jobTitle} was not selected this time`,
    };
    try {
      await addDoc(collection(db, 'notifications'), {
        recipientId:   app.seekerId,
        recipientType: 'seeker',
        type:          'status_update',
        status,
        jobTitle,
        message:       msgs[status] || `Your application status was updated to ${status}`,
        createdAt:     new Date().toISOString(),
        read:          false,
      });
    } catch (e) { console.warn('Notification write failed', e); }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: FONTS.headingBold, fontSize: 20, color: COLORS.textPrimary, marginBottom: 16, letterSpacing: -0.3 }}>Applications</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {FILTERS.map(s => (
            <TouchableOpacity key={s} onPress={() => setFilter(s)}
              style={{ backgroundColor: filter === s ? COLORS.recruiterAccent : COLORS.surface, borderWidth: 1, borderColor: filter === s ? COLORS.recruiterAccent : COLORS.border, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 }}
            >
              <Text style={{ color: filter === s ? '#fff' : COLORS.textSecondary, fontSize: 13, fontFamily: FONTS.bodyMedium, textTransform: 'capitalize' }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {filtered.length === 0
        ? <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.body, textAlign: 'center', paddingVertical: 48 }}>No applications here yet.</Text>
        : filtered.map(app => {
          const seeker = store.seekers[app.seekerId] || (realUsers && realUsers[app.seekerId]);
          const job    = (allJobs || store.jobs).find(j => j.id === app.jobId);
          if (!seeker) return null;
          return (
            <Card key={app.id} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <Avatar url={getAvatarUrl(seeker.avatarUrl)} initials={seeker.avatar} size={42} color={COLORS.accent} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 14 }}>{seeker.name}</Text>
                  <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{seeker.title}</Text>
                  <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>Applied to: <Text style={{ color: COLORS.accent }}>{job ? job.title : 'Job'}</Text></Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {(seeker.skills || []).slice(0, 3).map(s => <Pill key={s} label={s} />)}
                  </View>
                </View>
                <Badge color={STATUS_COLORS[app.status] || COLORS.textMuted}>{app.status}</Badge>
              </View>
              {/* Row 1: status actions */}
              <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border, flexDirection: 'row', gap: 8 }}>
                <Btn size="sm" variant="success" onPress={() => updateStatus(app, 'shortlisted', job ? job.title : 'the position')}>Shortlist</Btn>
                <Btn size="sm" variant="muted"   onPress={() => updateStatus(app, 'reviewed',    job ? job.title : 'the position')}>Review</Btn>
                <Btn size="sm" variant="danger"  onPress={() => updateStatus(app, 'rejected',    job ? job.title : 'the position')}>Reject</Btn>
              </View>
              {/* Row 2: resume (only when available) */}
              {(() => {
                const resumeUrl = getResumeUrl(seeker.resumeUrl);
                if (!resumeUrl) return null;
                return (
                  <View style={{ marginTop: 8 }}>
                    <Btn
                      size="sm"
                      variant="primary"
                      fullWidth
                      onPress={() => {
                        console.log('[Resume] Opening URL:', resumeUrl);
                        Linking.openURL(resumeUrl).catch((err) => {
                          console.error('[Resume] openURL error:', err);
                          Alert.alert('Cannot Open', `Failed to open resume.\n\nURL: ${resumeUrl}`);
                        });
                      }}
                    >
                      📄 View Resume
                    </Btn>
                  </View>
                );
              })()}
            </Card>
          );
        })
      }
    </View>
  );
};

export default RecruiterApplications;
