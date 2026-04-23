import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Input from '../components/ui/Input';
import Btn from '../components/ui/Btn';
import { ArrowLeftIcon } from '../components/Icons';

import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthScreen = ({ role, onAuth, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', title: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isRecruiter = role === 'recruiter';
  const accent = isRecruiter ? COLORS.recruiterAccent : COLORS.accent;
  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (loading) return;
    setError('');
    
    if (isLogin) {
      if (!form.email || !form.password) return setError('Please fill all required fields.');

      setLoading(true);
      const dbData = isRecruiter ? store.recruiters : store.seekers;
      const localUser = Object.values(dbData).find(u => u.email === form.email && u.password === form.password);
      
      if (localUser) {
        setLoading(false);
        return onAuth(localUser);
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        const uid = userCredential.user.uid;
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if ((isRecruiter && userData.role !== 'recruiter') || (!isRecruiter && userData.role !== 'seeker')) {
            setError(`This account is registered as a ${userData.role}. Please switch portals.`);
          } else {
            onAuth({ ...userData, id: uid });
          }
        } else {
          // Recover profile if it failed to save during signup
          const initials = (form.email).split('@')[0].substring(0, 2).toUpperCase();
          const newUser = isRecruiter
            ? { role: 'recruiter', name: form.email, email: form.email, company: '', industry: '', companySize: '', website: '', location: '', bio: '', avatar: initials, verified: false, jobsPosted: 0, hiresMade: 0 }
            : { role: 'seeker', name: form.email, email: form.email, title: 'Job Seeker', location: '', skills: [], experience: '', education: '', bio: '', avatar: initials, appliedJobs: [], savedJobs: [], availability: '', expectedSalary: '' };
          await setDoc(doc(db, 'users', uid), newUser);
          onAuth({ ...newUser, id: uid });
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Invalid email or password.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!form.name || !form.email || !form.password) return setError('Please fill all required fields.');
      if (form.password.length < 6) return setError('Password should be at least 6 characters.');

      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const uid = userCredential.user.uid;
        const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

        const newUser = isRecruiter
          ? { role: 'recruiter', name: form.name, email: form.email, company: form.company, industry: '', companySize: '', website: '', location: '', bio: '', avatar: initials, verified: false, jobsPosted: 0, hiresMade: 0 }
          : { role: 'seeker', name: form.name, email: form.email, title: form.title || 'Job Seeker', location: '', skills: [], experience: '', education: '', bio: '', avatar: initials, appliedJobs: [], savedJobs: [], availability: '', expectedSalary: '' };

        await setDoc(doc(db, 'users', uid), newUser);
        onAuth({ ...newUser, id: uid });
      } catch (err) {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          setError('Account exists. Switch to Sign In and log in.');
        } else {
          setError(err.message || 'Failed to create account.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.bg }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <View style={{ width: '100%', maxWidth: 420, backgroundColor: COLORS.card, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.4, shadowRadius: 30, elevation: 10 }}>
          <TouchableOpacity onPress={onBack} disabled={loading} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24, opacity: loading ? 0.5 : 1 }}>
            <ArrowLeftIcon size={16} color={COLORS.textMuted} />
            <Text style={{ color: COLORS.textMuted, fontSize: 14, fontFamily: FONTS.bodyMedium }}>Back</Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: accent + '22', borderWidth: 1, borderColor: accent + '44', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Text style={{ color: accent, fontSize: 22, fontFamily: FONTS.headingBold }}>{isRecruiter ? 'R' : 'J'}</Text>
            </View>
            <Text style={{ fontFamily: FONTS.headingBold, fontSize: 22, color: COLORS.textPrimary, letterSpacing: -0.3 }}>
              {isLogin ? 'Welcome back' : isRecruiter ? 'Join as Recruiter' : 'Start your search'}
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontFamily: FONTS.body, marginTop: 4 }}>
              {isRecruiter ? 'Recruiter Portal' : 'Job Seeker Portal'}
            </Text>
          </View>

          {!isLogin && <Input label="Full Name" value={form.name} onChangeText={set('name')} placeholder="Jane Smith" required editable={!loading} />}
          {!isLogin && isRecruiter && <Input label="Company Name" value={form.company} onChangeText={set('company')} placeholder="Acme Corp" editable={!loading} />}
          {!isLogin && !isRecruiter && <Input label="Job Title / Role" value={form.title} onChangeText={set('title')} placeholder="e.g. Frontend Developer" editable={!loading} />}
          <Input label="Email" type="email" value={form.email} onChangeText={set('email')} placeholder="you@example.com" required editable={!loading} />
          <Input label="Password" type="password" value={form.password} onChangeText={set('password')} placeholder="••••••••" required editable={!loading} />

          {!!error && <View style={{ backgroundColor: COLORS.danger + '22', borderWidth: 1, borderColor: COLORS.danger + '44', borderRadius: 8, padding: 12, marginBottom: 16 }}><Text style={{ color: COLORS.danger, fontSize: 13, fontFamily: FONTS.body }}>{error}</Text></View>}

          <Btn onPress={handleSubmit} fullWidth size="lg" variant={isRecruiter ? 'recruiter' : 'primary'} loading={loading}>{isLogin ? 'Sign In' : 'Create Account'}</Btn>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 18 }}>
            <Text style={{ color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.body }}>{isLogin ? "Don't have an account? " : 'Already have an account? '}</Text>
            <TouchableOpacity onPress={() => { if (!loading) { setIsLogin(!isLogin); setError(''); } }} disabled={loading}>
              <Text style={{ color: accent, fontSize: 13, fontFamily: FONTS.bodySemiBold, opacity: loading ? 0.5 : 1 }}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 18, padding: 12, backgroundColor: COLORS.surface, borderRadius: 10 }}>
            <Text style={{ color: COLORS.textMuted, fontSize: 12, fontFamily: FONTS.body }}>
              <Text style={{ color: COLORS.textSecondary, fontFamily: FONTS.bodySemiBold }}>Demo: </Text>
              {isRecruiter ? 'sarah@technova.com / pass123' : 'alex@email.com / pass123'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
