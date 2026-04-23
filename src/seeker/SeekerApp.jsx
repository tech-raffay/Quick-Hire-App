import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { MenuIcon, SearchIcon, BookmarkIcon, FileTextIcon, UserIcon } from '../components/Icons';
import SeekerDrawer from './SeekerDrawer';
import SeekerDiscover from './SeekerDiscover';
import SeekerSaved from './SeekerSaved';
import SeekerApplications from './SeekerApplications';
import SeekerProfile from './SeekerProfile';
import JobDetailModal from './JobDetailModal';
import SeekerEditProfileModal from './SeekerEditProfileModal';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, increment } from 'firebase/firestore';
import { getAvatarUrl } from '../utils';
import FadeInView from '../components/ui/FadeInView';
const TABS = [
  { id: 'discover',     label: 'Discover', Icon: SearchIcon },
  { id: 'saved',        label: 'Saved',    Icon: BookmarkIcon },
  { id: 'applications', label: 'Applied',  Icon: FileTextIcon },
  { id: 'profile',      label: 'Profile',  Icon: UserIcon },
];

const SeekerApp = ({ user: initialUser, onLogout }) => {
  const [user, setUser] = useState(initialUser);
  const [tab, setTab] = useState('discover');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedJob, setSelectedJob]   = useState(null);
  const [appliedJobs, setAppliedJobs]   = useState(new Set(initialUser.appliedJobs || []));
  const [savedJobs, setSavedJobs]       = useState(new Set(initialUser.savedJobs   || []));
  const [searchQuery, setSearchQuery]   = useState('');
  const [filterType, setFilterType]     = useState('All');
  const [drawerOpen, setDrawerOpen]     = useState(false);

  const [realJobs, setRealJobs]         = useState([]);
  const [realApps, setRealApps]         = useState([]);

  useEffect(() => {
    const unsubJobs = onSnapshot(collection(db, 'jobs'), snap => setRealJobs(snap.docs.map(d => ({ ...d.data(), id: d.id }))));
    const unsubApps = onSnapshot(collection(db, 'applications'), snap => setRealApps(snap.docs.map(d => ({ ...d.data(), id: d.id }))));
    return () => { unsubJobs(); unsubApps(); };
  }, []);

  const allJobs = [...store.jobs, ...realJobs].filter(j => j.status === 'active');
  const allApplications = [...store.applications, ...realApps];

  const filteredJobs = allJobs.filter(j => {
    const q = searchQuery.toLowerCase();
    return (!q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || (j.skills && j.skills.some(s => s.toLowerCase().includes(q)))) && (filterType === 'All' || j.type === filterType);
  });

  const handleApply = async job => {
    if (!allApplications.find(a => a.jobId === job.id && a.seekerId === user.id)) {
      await addDoc(collection(db, 'applications'), { jobId: job.id, seekerId: user.id, appliedAt: new Date().toLocaleDateString(), status: 'pending' });
      
      if (typeof job.id === 'string' && job.id.length > 10) {
        await updateDoc(doc(db, 'jobs', job.id), { applicants: increment(1) });
      } else {
        const idx = store.jobs.findIndex(j => j.id === job.id);
        if (idx > -1) store.jobs[idx].applicants++;
      }
    }
    const s = new Set(appliedJobs); s.add(job.id); setAppliedJobs(s);
  };

  const handleSave = jobId => {
    const s = new Set(savedJobs);
    if (s.has(jobId)) s.delete(jobId); else s.add(jobId);
    setSavedJobs(s);
  };

  const myApplications = allApplications.filter(a => a.seekerId === user.id);
  const accent = COLORS.accent;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View style={{ backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingHorizontal: 20, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} style={{ padding: 4 }}>
            <MenuIcon size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: accent, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 15, fontFamily: FONTS.headingBold }}>Q</Text>
          </View>
          <Text style={{ fontFamily: FONTS.headingBold, fontSize: 17, color: COLORS.textPrimary, letterSpacing: -0.3 }}>QuickHire</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Badge color={accent}>Job Seeker</Badge>
          <Avatar url={getAvatarUrl(user.avatarUrl)} initials={user.avatar} size={34} color={accent} />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <FadeInView key={tab} translateY={10} duration={300}>
          {tab === 'discover'     && <SeekerDiscover jobs={filteredJobs} allJobs={allJobs} appliedJobs={appliedJobs} savedJobs={savedJobs} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterType={filterType} setFilterType={setFilterType} onSelect={setSelectedJob} onSave={handleSave} />}
          {tab === 'saved'        && <SeekerSaved jobs={allJobs.filter(j => savedJobs.has(j.id))} appliedJobs={appliedJobs} onSelect={setSelectedJob} onSave={handleSave} />}
          {tab === 'applications' && <SeekerApplications applications={myApplications} allJobs={allJobs} />}
          {tab === 'profile'      && <SeekerProfile user={user} appliedCount={myApplications.length} savedCount={savedJobs.size} onLogout={onLogout} onEdit={() => setShowEditProfile(true)} />}
        </FadeInView>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={{ backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border, flexDirection: 'row', paddingTop: 8, paddingBottom: 16 }}>
        {TABS.map(({ id, label, Icon }) => (
          <TouchableOpacity key={id} onPress={() => setTab(id)} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <View>
              <Icon size={20} color={tab === id ? accent : COLORS.textMuted} />
              {id === 'applications' && myApplications.length > 0 && <View style={{ position: 'absolute', top: -4, right: -6, width: 15, height: 15, borderRadius: 8, backgroundColor: accent, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 9, fontFamily: FONTS.bodySemiBold }}>{myApplications.length}</Text></View>}
            </View>
            <Text style={{ fontSize: 11, fontFamily: tab === id ? FONTS.bodySemiBold : FONTS.body, color: tab === id ? accent : COLORS.textMuted }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SeekerDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} tab={tab} setTab={setTab} user={user} onLogout={onLogout} appliedCount={myApplications.length} savedCount={savedJobs.size} onEditProfile={() => {
        setTimeout(() => setShowEditProfile(true), 500);
      }} />
      {selectedJob && <JobDetailModal job={selectedJob} isApplied={appliedJobs.has(selectedJob.id)} isSaved={savedJobs.has(selectedJob.id)} onClose={() => setSelectedJob(null)} onApply={() => handleApply(selectedJob)} onSave={() => handleSave(selectedJob.id)} />}
      {showEditProfile && <SeekerEditProfileModal user={user} onClose={() => setShowEditProfile(false)} onUpdated={(u) => { setUser(u); setShowEditProfile(false); }} />}
    </SafeAreaView>
  );
};

export default SeekerApp;
