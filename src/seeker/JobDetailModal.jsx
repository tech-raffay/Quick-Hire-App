import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Badge from '../components/ui/Badge';
import Pill from '../components/ui/Pill';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
import Btn from '../components/ui/Btn';
import { XIcon, BookmarkIcon, ShieldIcon } from '../components/Icons';

const JobDetailModal = ({ job, isApplied, isSaved, onClose, onApply, onSave, isRecruiter }) => {
  const [applied, setApplied] = useState(isApplied);
  const recruiter = store.recruiters[job.recruiterId];

  const handleApply = () => { onApply && onApply(); setApplied(true); };

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.75)' }}>
        <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onPress={onClose} activeOpacity={1} />
        <View style={{ backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '92%' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Sticky-like header */}
            <View style={{ padding: 20, paddingBottom: 0, backgroundColor: COLORS.card }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={{ fontFamily: FONTS.headingBold, fontSize: 21, color: COLORS.textPrimary, letterSpacing: -0.3, marginBottom: 3 }}>{job.title}</Text>
                  <Text style={{ fontSize: 14, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{job.company}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  {!isRecruiter && (
                    <TouchableOpacity onPress={onSave} style={{ padding: 4 }}>
                      <BookmarkIcon size={22} color={isSaved ? COLORS.warning : COLORS.textMuted} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={onClose} style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 8 }}>
                    <XIcon size={17} color={COLORS.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
                <Badge color={COLORS.accent}>{job.type}</Badge>
                <Badge color={COLORS.success}>{job.salary}</Badge>
                <Badge color={COLORS.textMuted}>{job.location}</Badge>
              </View>
            </View>

            <View style={{ padding: 20 }}>
              {/* Skills */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 11, fontFamily: FONTS.bodySemiBold, color: COLORS.textMuted, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 10 }}>Required Skills</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {job.skills.map(s => <Pill key={s} label={s} />)}
                </View>
              </View>

              {/* Description */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 11, fontFamily: FONTS.bodySemiBold, color: COLORS.textMuted, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 10 }}>About the Role</Text>
                <Text style={{ fontSize: 14, color: COLORS.textSecondary, fontFamily: FONTS.body, lineHeight: 22 }}>{job.description}</Text>
              </View>

              {/* Meta */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                {[{ label: 'Posted', value: job.posted }, { label: 'Applicants', value: job.applicants }, { label: 'Category', value: job.category }, { label: 'Type', value: job.type }].map(m => (
                  <Card key={m.label} style={{ padding: 12, flex: 1, minWidth: '45%' }}>
                    <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginBottom: 4 }}>{m.label}</Text>
                    <Text style={{ fontSize: 14, fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary }}>{String(m.value)}</Text>
                  </Card>
                ))}
              </View>

              {/* Recruiter */}
              {recruiter && (
                <Card style={{ marginBottom: 20, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <Avatar initials={recruiter.avatar} size={44} color={COLORS.recruiterAccent} />
                  <View>
                    <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 14 }}>{recruiter.name}</Text>
                    <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{recruiter.company}</Text>
                    {recruiter.verified && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                        <ShieldIcon size={11} color={COLORS.success} />
                        <Text style={{ fontSize: 11, color: COLORS.success, fontFamily: FONTS.bodySemiBold }}>Verified</Text>
                      </View>
                    )}
                  </View>
                </Card>
              )}

              {/* Apply */}
              {!isRecruiter && (
                applied
                  ? <View style={{ backgroundColor: COLORS.success + '22', borderWidth: 1, borderColor: COLORS.success + '44', borderRadius: 14, padding: 16, alignItems: 'center' }}>
                      <Text style={{ color: COLORS.success, fontFamily: FONTS.bodySemiBold, fontSize: 15 }}>Application Submitted</Text>
                    </View>
                  : <Btn onPress={handleApply} variant="primary" fullWidth size="lg">Apply Now</Btn>
              )}
              <View style={{ height: 20 }} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default JobDetailModal;
