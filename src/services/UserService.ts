import axios from 'axios';

interface ActivityOwner {
    name: string;
    email: string;
    password: string;
    ice?: string;
    manager_name?: string;
    phone_number?: string;
}

interface User {
    last_name: string;
    first_name: string;
    email: string;
    telephone: string;
    role_id: number;
    password: string;
    repeat_password: string;
    professional?: {
        company_name: string;
        ice: string;
        company_address: string;
    };
}

interface Category {
    name: string;
    description: string;
    image_url?: string;
}

interface City {
    name: string;
    slug?: string;
    image_url?: string;
    left?: number;
    right?: number;
    active?: boolean;
    region?: string;
}

interface Activity {
    name: string;
    description: string;
    city_id: number;
    category_id: number;
    address: string;
    capacity: number;
    logo: File;
}

interface ActivityHour {
    activity_id: number;
    day_of_week: string;
    opening_time: string;
    closing_time: string;
}

class ActivityOwnerService {
    private baseUrl: string;
    private baseUrls: string;

    constructor() {
        this.baseUrl = 'http://localhost:3000/api/activity_owner';
        this.baseUrls = 'http://localhost:3000/api';
    }

    private handleAxiosError(error: any): never {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
            });
            if (error.response?.status === 400 && error.response.data?.error === 'Email already exists') {
                throw new Error('Email already exists');
            }else     if (error.response?.status === 400 && error.response.data?.message === 'Invalid email or password') {
                throw new Error('Email ou mot de passe invalide');
              }


            throw new Error(error.response?.data || 'Error occurred');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Unexpected error');
        }
    }

    async createActivityOwner(activityOwner: ActivityOwner): Promise<any> {
        try {
            const response = await axios.post(this.baseUrl, activityOwner);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createAdmin(admin: { name: string; email: string; password: string }): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/admin`, admin);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createClient(client: { nom: string; prenom: string; numero_telephone: string; email: string; mot_de_passe: string }): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/client`, client);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createUser(user: User): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/users`, user);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateUser(userId: number, user: Partial<User>): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/users/${userId}`, user);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/login`, { email, password });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async loginUser(email: string, password: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/login`, { email, password });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async lostPassword(email: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/lost-password`, { email });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async resetPassword(data: { user_id: number; password_token: string; new_password: string; new_repeatpassword: string }): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/reset-password`, data);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async activateAccount(userId: number, activationToken: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrls}/account-activation/${userId}/${activationToken}`);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getUsers(page: number = 1, limit: number = 10): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrls}/users`, { params: { page, limit } });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteUser(userId: number): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/users/${userId}`);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createCategory(category: Category, imageFile?: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('name', category.name);
            formData.append('description', category.description);
            if (category.image_url) {
                formData.append('image_url', category.image_url);
            }
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await axios.post(`${this.baseUrls}/categories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getCategories(): Promise<Category[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/categories`);
            return response.data.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createCity(city: City, imageFile?: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('name', city.name);
            if (city.slug) {
                formData.append('slug', city.slug);
            }
            if (city.image_url) {
                formData.append('image_url', city.image_url);
            }
            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (city.left !== undefined) {
                formData.append('left', city.left.toString());
            }
            if (city.right !== undefined) {
                formData.append('right', city.right.toString());
            }
            if (city.active !== undefined) {
                formData.append('active', city.active.toString());
            }
            if (city.region) {
                formData.append('region', city.region);
            }

            const response = await axios.post(`${this.baseUrls}/cities`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getCities(): Promise<City[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/cities`);
            return response.data.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getUserById(userId: number, token: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrls}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createActivity(activity: Activity, token: string): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('name', activity.name);
            formData.append('description', activity.description);
            formData.append('city_id', activity.city_id.toString());
            formData.append('category_id', activity.category_id.toString());
            formData.append('address', activity.address);
            formData.append('capacity', activity.capacity.toString());
            formData.append('logo', activity.logo);

            const response = await axios.post(`${this.baseUrls}/activities`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createActivityHour(activityHour: ActivityHour, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/activity_hours`, activityHour, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }
}

export default new ActivityOwnerService();
