// src/utils/cloudinaryUtils.ts
import CryptoJS from 'crypto-js';
import config from '@/config/Config';

export const deleteImageFromCloudinary = async (publicId: string): Promise<boolean> => {
    try {
        const url = `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/image/destroy`;

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${config.cloudinarySecretKey}`;
        const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                public_id: publicId,
                signature: signature,
                api_key: config.cloudinaryApiKey,
                timestamp: timestamp
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, requestOptions);
        const result = await response.json();

        return result.result === 'ok';
    } catch (error) {
        console.error("Error deleting image:", error);
        return false;
    }
};
