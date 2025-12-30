import API from '../axios/AuthenticateAxios';

const galleryService = {
    getGalleryItems: async () => {
        try {
            const response = await API.get('/gallery/items/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addGalleryItem: async (formData) => {
        try {
            const response = await API.post('/gallery/items/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteGalleryItem: async (id) => {
        try {
            const response = await API.delete(`/gallery/items/${id}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default galleryService;
