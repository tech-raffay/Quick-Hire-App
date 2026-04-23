import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../constants';
import JobCard from './JobCard';
import { SearchIcon } from '../components/Icons';

const SeekerDiscover = ({ jobs, allJobs, appliedJobs, savedJobs, searchQuery, setSearchQuery, filterType, setFilterType, onSelect, onSave }) => {
  const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
  const featured = allJobs.filter(j => j.applicants > 10).slice(0, 2);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontFamily: FONTS.headingBold, color: COLORS.textPrimary, letterSpacing: -0.5, marginBottom: 4 }}>Find Your Next Role</Text>
      <Text style={{ color: COLORS.textSecondary, fontSize: 14, fontFamily: FONTS.body, marginBottom: 20 }}>{allJobs.length} open positions available</Text>

      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 14, marginBottom: 14 }}>
        <SearchIcon size={16} color={COLORS.textMuted} />
        <TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Job title, company, or skill..." placeholderTextColor={COLORS.textMuted}
          style={{ flex: 1, paddingVertical: 12, paddingLeft: 10, color: COLORS.textPrimary, fontSize: 14, fontFamily: FONTS.body }}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {types.map(t => (
            <TouchableOpacity key={t} onPress={() => setFilterType(t)}
              style={{ backgroundColor: filterType === t ? COLORS.accent : COLORS.surface, borderWidth: 1, borderColor: filterType === t ? COLORS.accent : COLORS.border, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 }}
            >
              <Text style={{ color: filterType === t ? '#fff' : COLORS.textSecondary, fontSize: 13, fontFamily: FONTS.bodyMedium }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Featured */}
      {!searchQuery && filterType === 'All' && featured.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontFamily: FONTS.heading, color: COLORS.textPrimary, marginBottom: 12 }}>Hot Opportunities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {featured.map(job => (
                <TouchableOpacity key={job.id} onPress={() => onSelect(job)} activeOpacity={0.85}
                  style={{ width: 210, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.accent + '44', borderRadius: 16, padding: 18 }}
                >
                  <Text style={{ fontSize: 13, fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, marginBottom: 3 }}>{job.title}</Text>
                  <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: FONTS.body, marginBottom: 8 }}>{job.company}</Text>
                  <Text style={{ fontSize: 12, fontFamily: FONTS.bodySemiBold, color: COLORS.success }}>{job.salary}</Text>
                  <Text style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 6 }}>{job.applicants} applicants</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <Text style={{ fontSize: 14, fontFamily: FONTS.heading, color: COLORS.textPrimary, marginBottom: 12 }}>
        {searchQuery || filterType !== 'All' ? `Results (${jobs.length})` : 'All Jobs'}
      </Text>
      {jobs.length === 0
        ? <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.body, textAlign: 'center', paddingVertical: 32 }}>No jobs found. Try a different search.</Text>
        : jobs.map(job => <JobCard key={job.id} job={job} isApplied={appliedJobs.has(job.id)} isSaved={savedJobs.has(job.id)} onSelect={() => onSelect(job)} onSave={() => onSave(job.id)} />)
      }
    </View>
  );
};

export default SeekerDiscover;
