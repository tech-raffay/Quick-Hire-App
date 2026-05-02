import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Pill from '../components/ui/Pill';
import Btn from '../components/ui/Btn';
import { PlusIcon, MoreVerticalIcon, TrashIcon } from '../components/Icons';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const RecruiterJobs = ({ jobs, onPost, onJobDeleted }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleDelete = async (jobId, jobTitle) => {
    Alert.alert(
      "Delete Job",
      `Are you sure you want to delete "${jobTitle}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel", onPress: () => setActiveMenu(null) },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const isFirestoreJob = typeof jobId === 'string' && jobId.length > 5;
              if (isFirestoreJob) {
                // Firestore job: deleting triggers onSnapshot in BOTH apps automatically
                await deleteDoc(doc(db, 'jobs', jobId));
              } else {
                // Static mock job: remove from store + track deleted ID
                const idx = store.jobs.findIndex(j => j.id === jobId);
                if (idx > -1) store.jobs.splice(idx, 1);
                store.deletedJobIds.add(jobId);
              }
              setActiveMenu(null);
              if (onJobDeleted) onJobDeleted(jobId);
            } catch (err) {
              console.error("Delete error:", err);
              Alert.alert("Error", "Failed to delete job.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontFamily: FONTS.headingBold, fontSize: 20, color: COLORS.textPrimary, letterSpacing: -0.3 }}>My Jobs</Text>
        <Btn onPress={onPost} variant="recruiter" size="sm" icon={<PlusIcon size={14} color="#fff" />}>Post Job</Btn>
      </View>
      {jobs.length === 0
        ? <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.body, textAlign: 'center', paddingVertical: 48 }}>No jobs posted yet. Create your first listing!</Text>
        : jobs.map(job => (
          <Card key={job.id} style={{ marginBottom: 14, overflow: 'visible', zIndex: activeMenu === job.id ? 100 : 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 15, marginBottom: 3 }}>{job.title}</Text>
                <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body }}>{job.company} · {job.location}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Badge color={job.status === 'active' ? COLORS.success : COLORS.textMuted}>{job.status}</Badge>
                <TouchableOpacity 
                  onPress={() => setActiveMenu(activeMenu === job.id ? null : job.id)}
                  style={{ padding: 8, marginRight: -8, marginTop: -8 }}
                >
                  <MoreVerticalIcon size={18} color={activeMenu === job.id ? COLORS.recruiterAccent : COLORS.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Delete Menu */}
            {activeMenu === job.id && (
              <View style={{ 
                position: 'absolute', 
                top: 45, 
                right: 15, 
                backgroundColor: COLORS.surface, 
                borderRadius: 12, 
                borderWidth: 1, 
                borderColor: COLORS.border, 
                zIndex: 1000,
                padding: 4,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
              }}>
                <TouchableOpacity 
                  onPress={() => handleDelete(job.id, job.title)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, paddingHorizontal: 16 }}
                >
                  <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.danger + '18', alignItems: 'center', justifyContent: 'center' }}>
                    <TrashIcon size={14} color={COLORS.danger} />
                  </View>
                  <Text style={{ color: COLORS.danger, fontFamily: FONTS.bodySemiBold, fontSize: 13 }}>Delete Job</Text>
                </TouchableOpacity>
              </View>
            )}

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
};

export default RecruiterJobs;
