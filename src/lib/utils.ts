import CryptoJS from 'crypto-js';

export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isEmptyString = (string: string) => {
    return !string || string === '';
}

export const getFileMd5 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const binary = event.target?.result;
            const md5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(binary)).toString(CryptoJS.enc.Base64);
            resolve(md5);
        };

        reader.readAsBinaryString(file);
    });
}