import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'dotenv/config';

// Initialize S3 Client for Cloudflare R2
// Note on forcePathStyle: Cloudflare R2 recommends forcePathStyle: false for newer setups,
// but some older AWS SDK versions expect it to be true for non-AWS endpoints.
// We omit it (defaults to false) as it works seamlessly with the <account_id>.r2.cloudflarestorage.com format.
const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    }
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const PRESIGN_EXPIRES = parseInt(process.env.PRESIGN_EXPIRES_SECONDS || '300', 10);
const PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL;

// Allowed file types for security
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB general limit

/**
 * Creates a presigned URL for uploading a file directly to R2.
 */
export const createUploadUrl = async ({ key, contentType, maxBytes = MAX_FILE_SIZE }) => {
    if (!ALLOWED_MIME_TYPES.includes(contentType)) {
        throw new Error('Invalid file type');
    }
    if (maxBytes > MAX_FILE_SIZE) {
        throw new Error('File size exceeds maximum allowed limit');
    }

    // Sanitize key to prevent path traversal
    const sanitizedKey = key.replace(/[^a-zA-Z0-9.\-_/]/g, '').replace(/\.+/g, '.');

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: sanitizedKey,
        ContentType: contentType,
        ContentLength: maxBytes // Some clients enforce this during PUT
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: PRESIGN_EXPIRES });
    return { uploadUrl, key: sanitizedKey };
};

/**
 * Creates a presigned URL for downloading a private object.
 */
export const createDownloadUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
    });
    return await getSignedUrl(s3Client, command, { expiresIn: PRESIGN_EXPIRES });
};

/**
 * Builds the public URL for a given object key.
 */
export const getPublicUrl = (key) => {
    if (!key) return null;
    return `${PUBLIC_BASE_URL}/${key}`;
};

/**
 * Deletes an object from the R2 bucket.
 */
export const deleteObject = async (key) => {
    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
    });
    return await s3Client.send(command);
};
