import { Client, Storage, ID } from 'react-native-appwrite';

const ENDPOINT   = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '69e9b183000fce7beae6';
const BUCKET_ID  = '69e9b44300327d8cd04b';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setPlatform('com.raffay.quickhire');

const storage = new Storage(client);

/**
 * Builds a fully public view URL for an Appwrite file.
 * The bucket must have "File Security" disabled (public read) in the Appwrite dashboard.
 */
export const getPublicFileUrl = (fileId) =>
    `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;

/**
 * Uploads a file to Appwrite Storage using the official SDK and returns
 * a public view URL string.
 *
 * @param {Object} file            - File object from expo-image-picker / expo-document-picker
 * @param {string} file.uri        - Local URI of the file
 * @param {string} file.name       - File name (e.g. 'avatar.jpg')
 * @param {string} file.type       - MIME type (e.g. 'image/jpeg')
 * @param {number} [file.size]     - File size in bytes
 */
export const uploadFile = async (file) => {
    console.log('[Appwrite] Uploading:', file.name);

    const fileId = ID.unique();

    // The SDK expects a File-like object: { name, type, size, uri }
    const result = await storage.createFile(
        BUCKET_ID,
        fileId,
        {
            name: file.name,
            type: file.type,
            size: file.size || 102400, // fallback 100 KB if unknown
            uri:  file.uri,
        },
    );

    console.log('[Appwrite] Uploaded, fileId:', result.$id);

    const url = getPublicFileUrl(result.$id);
    console.log('[Appwrite] Public URL:', url);
    return url;
};

export { client, storage, BUCKET_ID, PROJECT_ID };
