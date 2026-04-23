import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { MenuIcon, DashboardIcon, BriefcaseIcon, FileTextIcon, UserIcon } from '../components/Icons';
import RecruiterDrawer from './RecruiterDrawer';
import RecruiterDashboard from './RecruiterDashboard';
import RecruiterJobs from './RecruiterJobs';
import RecruiterApplications from './RecruiterApplications';
import RecruiterProfile from './RecruiterProfile';
import PostJobModal from './PostJobModal';
import RecruiterEditProfileModal from './RecruiterEditProfileModal';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { getAvatarUrl } from '../utils';
import FadeInView from '../components/ui/FadeInView';
const TABS = [
  { id: 'dashboard',    label: 'Dashboard',    Icon: DashboardIcon },
  { id: 'jobs',         label: 'My Jobs',      Icon: BriefcaseIcon },
  { id: 'applications', label: 'Applications', Icon: FileTextIcon },
  { id: 'profile',      label: 'Profile',      Icon: UserIcon },
];

const RecruiterApp = ({ user: initialUser, onLogout }) => {
  const [user, setUser] = useState(initialUser);
  const [tab, setTab]   = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [realJobs, setRealJobs] = useState([]);
  const [realApps, setRealApps] = useState([]);
  const [realUsers, setRealUsers] = useState({});

  useEffect(() => {
    const unsubJobs = onSnapshot(collection(db, 'jobs'), snap => setRealJobs(snap.docs.map(d => ({ ...d.data(), id: d.id }))));
    const unsubApps = onSnapshot(collection(db, 'applications'), snap => setRealApps(snap.docs.map(d => ({ ...d.data(), id: d.id }))));
    const unsubUsers = onSnapshot(collection(db, 'users'), snap => {
      const uMap = {};
      snap.forEach(d => uMap[d.id] = { ...d.data(), id: d.id });
      setRealUsers(uMap);
    });
    return () => { unsubJobs(); unsubApps(); unsubUsers(); };
  }, []);

  const allJobs = [...store.jobs, ...realJobs];
  const allApplications = [...store.applications, ...realApps];

  const jobs = allJobs.filter(j => j.recruiterId === user.id);
  const myApplications = allApplications.filter(a => { const j = allJobs.find(x => x.id === a.jobId); return j && j.recruiterId === user.id; });
  
  const refreshJobs = () => {}; // No longer needed as onSnapshot handles real-time updates
  const accent = COLORS.recruiterAccent;

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
          <Badge color={accent}>Recruiter</Badge>
          <Avatar url={getAvatarUrl(user.avatarUrl)} initials={user.avatar} size={34} color={accent} />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <FadeInView key={tab} translateY={10} duration={300}>
          {tab === 'dashboard'    && <RecruiterDashboard user={user} jobs={jobs} applications={myApplications} onPostJob={() => setShowPostJob(true)} />}
          {tab === 'jobs'         && <RecruiterJobs jobs={jobs} onPost={() => setShowPostJob(true)} onRefresh={refreshJobs} />}
          {tab === 'applications' && <RecruiterApplications applications={myApplications} realUsers={realUsers} allJobs={allJobs} />}
          {tab === 'profile'      && <RecruiterProfile user={user} onLogout={onLogout} onEdit={() => setShowEditProfile(true)} />}
        </FadeInView>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={{ backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border, flexDirection: 'row', paddingTop: 8, paddingBottom: 16 }}>
        {TABS.map(({ id, label, Icon }) => (
          <TouchableOpacity key={id} onPress={() => setTab(id)} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <Icon size={20} color={tab === id ? accent : COLORS.textMuted} />
            <Text style={{ fontSize: 11, fontFamily: tab === id ? FONTS.bodySemiBold : FONTS.body, color: tab === id ? accent : COLORS.textMuted }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <RecruiterDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} tab={tab} setTab={setTab} user={user} onPostJob={() => setShowPostJob(true)} onLogout={onLogout} jobCount={jobs.length} appCount={myApplications.length} onEditProfile={() => setShowEditProfile(true)} />
      {showPostJob && <PostJobModal user={user} onClose={() => setShowPostJob(false)} onPosted={() => { refreshJobs(); setShowPostJob(false); }} />}
      {showEditProfile && <RecruiterEditProfileModal user={user} onClose={() => setShowEditProfile(false)} onUpdated={u => { setUser(u); setShowEditProfile(false); }} />}
    </SafeAreaView>
  );
};

export default RecruiterApp;
