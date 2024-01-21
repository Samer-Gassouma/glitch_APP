import * as csApi from '../api/csApi';

export const getSubjects = async (credentials) => {
  try {
    const subjects = await csApi.getSubjects(credentials);
    return subjects;
  } catch (error) {
    throw error;
  }
};

export const getFileByDownloadURL = async (downloadURL) => {
    try {
        const file = await csApi.getFileByDownloadURL(downloadURL);
        return file;
    } catch (error) {
        throw error;
    }
    }
    


export const getSubjectCourse = async (subjectName,courseName) => {
  try {
    const subjectCourse = await csApi.getSubjectCourse(subjectName,courseName);
    return subjectCourse;
  } catch (error) {
    throw error;
  }
};

export const getAllFiles = async () => {
  try {
    const folders = await csApi.getAllFiles();
    return folders;
  } catch (error) {
    throw error;
  }
};

export const getFolders = async () => {
    try {
        const folders = await csApi.getFolders();
        return folders;
    } catch (error) {
        throw error;
    }
    }


export const UploadFile = async (path, file, userId, visibility) => {
    try {
        const response = await csApi.UploadFile(path, file, userId, visibility);
        return response;
    } catch (error) {
        throw error;
    }
    }

