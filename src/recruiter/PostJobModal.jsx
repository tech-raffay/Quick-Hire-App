import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, store } from '../constants';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Btn from '../components/ui/Btn';
import { XIcon, PlusIcon } from '../components/Icons';

import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, increment } from 'firebase/firestore';

const PostJobModal = ({ user, onClose, onPosted }) => {
  const [form, setForm] = useState({ title: '', location: '', type: 'Full-time', salary: '', skills: '', description: '', category: 'Engineering' });
  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const handlePost = async () => {
    if (!form.title || !form.description) return;
    
    try {
      const newJob = {
        title: form.title, company: user.company, recruiterId: user.id, location: form.location, type: form.type, salary: form.salary, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean), description: form.description, posted: 'Just now', applicants: 0, status: 'active', category: form.category, createdAt: Date.now()
      };
      
      await addDoc(collection(db, 'jobs'), newJob);
      
      if (user.id.length > 10) {
        // Real user -> update Firestore user profile jobsPosted count
        await updateDoc(doc(db, 'users', user.id), { jobsPosted: increment(1) });
      } else {
        // Dummy user
        store.recruiters[user.id].jobsPosted++;
      }
      
      onPosted();
    } catch (err) {
      console.error(err);
      alert('Failed to post job');
    }
  };

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)' }} onPress={onClose} activeOpacity={1} />
        <View style={{ backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' }}>
          <ScrollView contentContainerStyle={{ padding: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontFamily: FONTS.headingBold, fontSize: 19, color: COLORS.textPrimary, letterSpacing: -0.3 }}>Post a Job</Text>
              <TouchableOpacity onPress={onClose} style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 8 }}>
                <XIcon size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
            <Input label="Job Title"    value={form.title}       onChangeText={set('title')}       placeholder="e.g. Senior React Developer" required />
            <Input label="Location"     value={form.location}    onChangeText={set('location')}    placeholder="e.g. Remote, New York, NY" />
            <Select label="Job Type"    value={form.type}        onValueChange={set('type')}       options={[{ value: 'Full-time', label: 'Full-time' }, { value: 'Part-time', label: 'Part-time' }, { value: 'Contract', label: 'Contract' }, { value: 'Internship', label: 'Internship' }]} />
            <Select label="Category"    value={form.category}    onValueChange={set('category')}   options={[{ value: 'Engineering', label: 'Engineering' }, { value: 'Design', label: 'Design' }, { value: 'Data', label: 'Data & AI' }, { value: 'Marketing', label: 'Marketing' }]} />
            <Input label="Salary Range" value={form.salary}      onChangeText={set('salary')}      placeholder="e.g. $80k – $100k" />
            <Input label="Skills (comma-separated)" value={form.skills} onChangeText={set('skills')} placeholder="React, TypeScript, Node.js" />
            <Input label="Job Description" value={form.description} onChangeText={set('description')} placeholder="Describe the role..." required multiline rows={5} />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
              <View style={{ flex: 1 }}><Btn onPress={onClose} variant="muted" fullWidth>Cancel</Btn></View>
              <View style={{ flex: 1 }}><Btn onPress={handlePost} variant="recruiter" fullWidth icon={<PlusIcon size={15} color="#fff" />}>Post Job</Btn></View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PostJobModal;
