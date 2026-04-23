import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS } from '../constants';
import JobCard from './JobCard';

const SeekerSaved = ({ jobs, appliedJobs, onSelect, onSave }) => (
  <View style={{ padding: 20 }}>
    <Text style={{ fontFamily: FONTS.headingBold, fontSize: 20, color: COLORS.textPrimary, marginBottom: 20, letterSpacing: -0.3 }}>Saved Jobs</Text>
    {jobs.length === 0
      ? <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.body, textAlign: 'center', paddingVertical: 48 }}>No saved jobs yet. Bookmark roles you're interested in!</Text>
      : jobs.map(job => <JobCard key={job.id} job={job} isApplied={appliedJobs.has(job.id)} isSaved onSelect={() => onSelect(job)} onSave={() => onSave(job.id)} />)
    }
  </View>
);

export default SeekerSaved;
