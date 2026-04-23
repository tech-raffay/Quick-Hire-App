import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Badge from '../components/ui/Badge';
import Pill from '../components/ui/Pill';
import { BookmarkIcon } from '../components/Icons';

const JobCard = ({ job, isApplied, isSaved, onSelect, onSave }) => (
  <View style={{ backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 18, marginBottom: 14 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onSelect} activeOpacity={0.8}>
        <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 15, marginBottom: 3 }}>{job.title}</Text>
        <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{job.company}</Text>
        <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>{job.location}</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'flex-end', gap: 6 }}>
        <TouchableOpacity onPress={onSave} style={{ padding: 4 }}>
          <BookmarkIcon size={18} color={isSaved ? COLORS.warning : COLORS.textMuted} />
        </TouchableOpacity>
        {isApplied && <Badge color={COLORS.success}>Applied</Badge>}
      </View>
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
      <Badge color={COLORS.accent}>{job.type}</Badge>
      {job.skills.slice(0, 3).map(s => <Pill key={s} label={s} />)}
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 13, fontFamily: FONTS.bodySemiBold, color: COLORS.success }}>{job.salary}</Text>
      <Text style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body }}>{job.posted}</Text>
    </View>
  </View>
);

export default JobCard;
