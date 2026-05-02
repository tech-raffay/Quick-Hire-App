import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Modal } from 'react-native';
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
import RecruiterAnalytics from './RecruiterAnalytics';
import { db } from '../firebase';
import { collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';
import { getAvatarUrl } from '../utils';
import FadeInView from '../components/ui/FadeInView';
import RecruiterNotifications from './RecruiterNotifications';

const ComingSoonModal = ({ visible, label, onClose }) => {
  const accent = COLORS.recruiterAccent;
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} onPress={onClose}
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', alignItems: 'center', justifyContent: 'center', padding: 32 }}
      >
        <TouchableOpacity activeOpacity={1}
          style={{ backgroundColor: COLORS.surface, borderRadius: 20, padding: 28, alignItems: 'center', width: '100%', borderWidth: 1, borderColor: accent + '44' }}
        >
          <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: accent + '22', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 26 }}>{label === 'Settings' ? '⚙️' : '🎧'}</Text>
          </View>
          <Text style={{ fontFamily: FONTS.headingBold, fontSize: 18, color: COLORS.textPrimary, marginBottom: 8 }}>{label}</Text>
          <Text style={{ fontFamily: FONTS.bodySemiBold, fontSize: 13, color: accent, marginBottom: 6, letterSpacing: 0.5 }}>COMING SOON</Text>
          <Text style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 }}>
            These functionalities will be added very soon.
          </Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}
            style={{ marginTop: 22, paddingVertical: 10, paddingHorizontal: 32, backgroundColor: accent, borderRadius: 12 }}
          >
            <Text style={{ color: '#fff', fontFamily: FONTS.bodySemiBold, fontSize: 14 }}>Got it</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
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
  const [comingSoon, setComingSoon] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [deletedIds, setDeletedIds] = useState(new Set());

  useEffect(() => {
    const unsubJobs  = onSnapshot(collection(db, 'jobs'),         snap => setRealJobs(snap.docs.map(d => ({ ...d.data(), id: d.id }))));
    const unsubApps  = onSnapshot(collection(db, 'applications'), snap => setRealApps(snap.docs.map(d => ({ ...d.data(), id: d.id }))));
    const unsubUsers = onSnapshot(collection(db, 'users'), snap => {
      const uMap = {};
      snap.forEach(d => uMap[d.id] = { ...d.data(), id: d.id });
      setRealUsers(uMap);
    });
    const unsubNotifs = onSnapshot(
      query(collection(db, 'notifications'), where('recipientId', '==', user.id), where('recipientType', '==', 'recruiter')),
      snap => setNotifications(snap.docs.map(d => ({ ...d.data(), id: d.id })))
    );
    return () => { unsubJobs(); unsubApps(); unsubUsers(); unsubNotifs(); };
  }, []);

  const allJobs = [...store.jobs, ...realJobs].filter(j => !deletedIds.has(j.id) && !store.deletedJobIds.has(j.id));
  const allApplications = [...store.applications, ...realApps];

  const jobs = allJobs.filter(j => j.recruiterId === user.id);
  const myApplications = allApplications.filter(a => { const j = allJobs.find(x => x.id === a.jobId); return j && j.recruiterId === user.id; });
  
  const refreshJobs = () => {};
  const accent = COLORS.recruiterAccent;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const markAllRead = async () => {
    const unread = notifications.filter(n => !n.read);
    await Promise.all(unread.map(n => updateDoc(doc(db, 'notifications', n.id), { read: true })));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} />
      <ComingSoonModal visible={!!comingSoon} label={comingSoon} onClose={() => setComingSoon(null)} />

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
          {tab === 'jobs' && <RecruiterJobs jobs={jobs} onPost={() => setShowPostJob(true)} onRefresh={refreshJobs} onJobDeleted={id => setDeletedIds(prev => new Set([...prev, id]))} />}
          {tab === 'applications' && <RecruiterApplications applications={myApplications} realUsers={realUsers} allJobs={allJobs} />}
          {tab === 'profile'      && <RecruiterProfile user={user} onLogout={onLogout} onEdit={() => setShowEditProfile(true)} />}
          {tab === 'analytics'    && <RecruiterAnalytics jobs={jobs} applications={myApplications} />}
          {tab === 'notifications'&& <RecruiterNotifications notifications={notifications} onMarkAllRead={markAllRead} />}
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

      <RecruiterDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} tab={tab} setTab={setTab} user={user} onPostJob={() => setShowPostJob(true)} onLogout={onLogout} jobCount={jobs.length} appCount={myApplications.length} onEditProfile={() => setShowEditProfile(true)} onComingSoon={label => setComingSoon(label)} notifCount={unreadNotifs} />
      {showPostJob && <PostJobModal user={user} onClose={() => setShowPostJob(false)} onPosted={() => { refreshJobs(); setShowPostJob(false); }} />}
      {showEditProfile && <RecruiterEditProfileModal user={user} onClose={() => setShowEditProfile(false)} onUpdated={u => { setUser(u); setShowEditProfile(false); }} />}
    </SafeAreaView>
  );
};

export default RecruiterApp;
