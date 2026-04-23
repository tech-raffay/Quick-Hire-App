/**
 * Safely extract a public HTTP URL string from a resumeUrl/avatarUrl field.
 *
 * The old buggy code spread the raw file-picker object { uri, name, type, isNew }
 * directly into Firestore.  When read back those values become Firestore Maps, not
 * strings.  These helpers guard against that so nothing crashes.
 *
 * @param {*} val  - Whatever is stored in Firestore (string | object | null)
 * @returns {string|null}  A valid URL string, or null if nothing usable exists.
 */
export const getResumeUrl = (val) => {
  if (!val) return null;
  if (typeof val === 'string' && val.startsWith('http')) return val;
  // Legacy object stored by old buggy code – no usable public URL
  return null;
};

export const getAvatarUrl = (val) => {
  if (!val) return null;
  if (typeof val === 'string' && val.startsWith('http')) return val;
  // Legacy object – return the local URI so at least a preview is shown
  if (typeof val === 'object' && typeof val.uri === 'string') return val.uri;
  return null;
};
