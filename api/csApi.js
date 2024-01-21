import api from './index';


export const getSubjects = async (subjectName) => {
    try {
        const response = await api.get(`/${subjectName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
    }


    export const getFolders = async () => {
        try {
            const response = await api.get(`/`);
            return response.data;
        } catch (error) {
            throw error;
        }
        }
export const getSubjectCourse = async (subjectName,courseName) => {
    try {
        const response = await api.get(`/${subjectName}/${courseName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
    }


    export const getFileByDownloadURL = async (downloadURL) => {
        try {
          const response = await api.get(`users/file?downloadURL=${downloadURL}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      };
      


    export const getAllFiles = async () => {
        try {
            const response = await api.get(`users/all`);
            return response.data;
        } catch (error) {
            throw error;
        }
        }

        export const UploadFile = async (path, file, userId, visibility) => {
            try {
              const response = await api.post(path, { file, userId, visibility });
              return response.data;
            } catch (error) {
              throw error;
            }
          };
          