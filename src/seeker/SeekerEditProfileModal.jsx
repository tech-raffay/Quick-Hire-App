import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Input from '../components/ui/Input';
import Btn from '../components/ui/Btn';
import { XIcon } from '../components/Icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from '../appwrite';
import Avatar from '../components/ui/Avatar';
import { getAvatarUrl } from '../utils';

const SeekerEditProfileModal = ({ user, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: user.name || '',
    title: user.title || '',
    location: user.location || '',
    experience: user.experience || '',
    education: user.education || '',
    bio: user.bio || '',
    availability: user.availability || '',
    expectedSalary: user.expectedSalary || '',
    skills: user.skills ? user.skills.join(', ') : '',
    avatarUrl: user.avatarUrl || null,
    resumeUrl: user.resumeUrl || null,
  });
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      setForm(f => ({ ...f, avatarUrl: { uri: asset.uri, name: 'avatar.jpg', type: 'image/jpeg', size: asset.fileSize || 1024, isNew: true } }));
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] });
    if (!result.canceled) {
      const asset = result.assets[0];
      setForm(f => ({ ...f, resumeUrl: { uri: asset.uri, name: asset.name, type: asset.mimeType, size: asset.size || 1024, isNew: true } }));
    }
  };

  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setLoading(true);
    try {
      // Keep existing string URLs as-is; only upload newly picked files
      let finalAvatarUrl = typeof form.avatarUrl === 'string' ? form.avatarUrl : null;
      let finalResumeUrl = typeof form.resumeUrl === 'string' ? form.resumeUrl : null;

      if (form.avatarUrl?.isNew) {
        finalAvatarUrl = await uploadFile(form.avatarUrl);
      }
      if (form.resumeUrl?.isNew) {
        finalResumeUrl = await uploadFile(form.resumeUrl);
      }

      const updatedData = {
        name:           form.name,
        title:          form.title,
        location:       form.location,
        experience:     form.experience,
        education:      form.education,
        bio:            form.bio,
        availability:   form.availability,
        expectedSalary: form.expectedSalary,
        skills:         form.skills.split(',').map(s => s.trim()).filter(Boolean),
        avatarUrl:      finalAvatarUrl,
        resumeUrl:      finalResumeUrl,
      };

      if (typeof user.id === 'string' && user.id.length > 5) {
        await updateDoc(doc(db, 'users', user.id), updatedData);
      }
      onUpdated({ ...user, ...updatedData });
    } catch (e) {
      console.error(e);
      alert('Error updating profile: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.bg }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.surface }}>
          <Text style={{ fontFamily: FONTS.headingBold, fontSize: 18, color: COLORS.textPrimary }}>Edit Profile</Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 4, backgroundColor: COLORS.bg, borderRadius: 12 }}>
            <XIcon size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, padding: 20 }} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity onPress={pickImage} style={{ position: 'relative' }}>
              <Avatar url={form.avatarUrl?.uri ? form.avatarUrl.uri : getAvatarUrl(form.avatarUrl)} initials={user.avatar} size={80} color={COLORS.accent} />
              <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.accent, padding: 6, borderRadius: 12 }}>
                <Text style={{ color: '#fff', fontSize: 10, fontFamily: FONTS.bodySemiBold }}>EDIT</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <Input label="Full Name" value={form.name} onChangeText={set('name')} />
          <Input label="Email (Cannot be changed)" value={user.email} editable={false} />
          <Input label="Professional Title" value={form.title} onChangeText={set('title')} />
          <Input label="Location" value={form.location} onChangeText={set('location')} />
          <Input label="Experience" value={form.experience} onChangeText={set('experience')} placeholder="e.g. 3 years" />
          <Input label="Education" value={form.education} onChangeText={set('education')} placeholder="e.g. BS Computer Science" />
          <Input label="Bio" value={form.bio} onChangeText={set('bio')} multiline numberOfLines={3} />
          <Input label="Skills (comma separated)" value={form.skills} onChangeText={set('skills')} placeholder="React, Node.js, UI/UX" />
          <Input label="Availability" value={form.availability} onChangeText={set('availability')} placeholder="e.g. Immediate, 2 weeks" />
          <Input label="Expected Salary" value={form.expectedSalary} onChangeText={set('expectedSalary')} placeholder="e.g. $80,000" />
          
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: FONTS.body, marginBottom: 8 }}>Resume</Text>
            <TouchableOpacity onPress={pickDocument} style={{ padding: 14, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, alignItems: 'center', borderStyle: 'dashed' }}>
              <Text style={{ color: form.resumeUrl ? COLORS.accent : COLORS.textMuted, fontFamily: FONTS.bodySemiBold }}>
                {form.resumeUrl
                  ? (typeof form.resumeUrl === 'string' ? 'Resume Attached ✓ (Tap to change)' : (form.resumeUrl.name || 'Resume Attached (Tap to change)'))
                  : '+ Upload Resume (PDF/Docx)'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ height: 40 }} />
        </ScrollView>

        <View style={{ padding: 20, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <Btn onPress={handleSave} variant="primary" fullWidth size="lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </Btn>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SeekerEditProfileModal;
