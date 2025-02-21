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
    active?: boolean;
    reservations_allowed ?: boolean;
}

interface ActivityHour {
    activity_id: number;
    day_of_week: string;
    opening_time: string;
    closing_time: string;
}

interface Spa {
    activity_id: number;
}

interface TypeSoin {
    nom: string;
}

interface SpaSoin {
    spa_id: number;
    type_soin_id: number;
    duree: string;
    prix: number;
}

interface SalonBeaute {
    activity_id: number;
}

interface ServiceBeaute {
    nom: string;
}

interface SalonService {
    salon_id: number;
    service_id: number;
    prix: number;
}

interface Piscine {
    activity_id: number;
    type_piscine: string;
}

interface ServicePiscine {
    nom: string;
}

interface Restaurant {
    activity_id: number;
}

interface TypeMenu {
    nom: string;
}

interface Menu {
    restaurant_id: number;
    type_menu_id: number;
    nom: string;
    description: string;
    prix: number;
    imageplat?: File; // New field added
}

interface Villa {
    activity_id: number;
    nombre_chambres?: number;
    prix_nuit?: number;
}

interface ServiceVilla {
    nom: string;
}

interface VillaService {
    villa_id: number;
    service_id: number;
    prix: number;
}

interface PiscineService {
    piscine_id: number;
    service_id: number;
    prix: number;
    description: string;
}

interface Excursion {
    activity_id: number;
    duree?: number;
    prix?: number;
    inclus?: string;
    description?: string;
}

interface ActivityReview {
    activity_id: number;
    user_id: number;
    rating: number;
    comment: string;
}

interface Reservation {
    activity_id: number;
    reservation_date: string;
    reservation_time: string;
    status?: 'pending' | 'accepted' | 'refused';
    user_id : number;
    commentaires: string;
    nombre_personnes : number;
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

    async getCategoriesWithCount(): Promise<{ category: Category, count: number }[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/categories_with_count`);
            return response.data;
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
            formData.append('active', "1");
            formData.append('reservations_allowed', "1");
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

    async updateActivity(activityId: number, activity: Partial<Activity>, token: string): Promise<any> {
        try {
            console.log("activity",activity);
            const formData = new FormData();
            if (activity.name) formData.append('name', activity.name);
            if (activity.description) formData.append('description', activity.description);
            if (activity.city_id) formData.append('city_id', activity.city_id.toString());
            if (activity.category_id) formData.append('category_id', activity.category_id.toString());
            if (activity.address) formData.append('address', activity.address);
            if (activity.capacity) formData.append('capacitys', activity.capacity.toString());

            if (activity.logo) formData.append('logo', activity.logo);
            if(activity.active ) formData.append('active', activity.active.toString());
            if(activity.reservations_allowed ) formData.append('reservations_allowed', activity.reservations_allowed.toString());
            const response = await axios.put(`${this.baseUrls}/activities/${activityId}`, formData, {
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


    async updateActivityHour(activityHourId: number, activityHour: Partial<ActivityHour>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/activity_hours/${activityHourId}`, activityHour, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async uploadActivityImages(formData: FormData, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/activity_images`, formData, {
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

    async deleteActivityImage(imageId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/activity_images/${imageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createSpa(spa: Spa, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/spas`, spa, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateSpa(spaId: number, spa: Partial<Spa>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/spas/${spaId}`, spa, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteSpa(spaId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/spas/${spaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createTypeSoin(typeSoin: TypeSoin, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/types_soins`, typeSoin, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateTypeSoin(typeSoinId: number, typeSoin: Partial<TypeSoin>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/types_soins/${typeSoinId}`, typeSoin, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteTypeSoin(typeSoinId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/types_soins/${typeSoinId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createSpaSoin(spaSoin: SpaSoin, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/spas_soins`, spaSoin, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateSpaSoin(spaSoinId: number, spaSoin: Partial<SpaSoin>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/spas_soins/${spaSoinId}`, spaSoin, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteSpaSoin(spaSoinId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/spas_soins/${spaSoinId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createSalonBeaute(salonBeaute: SalonBeaute, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/salons_beaute`, salonBeaute, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateSalonBeaute(salonBeauteId: number, salonBeaute: Partial<SalonBeaute>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/salons_beaute/${salonBeauteId}`, salonBeaute, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteSalonBeaute(salonBeauteId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/salons_beaute/${salonBeauteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createServiceBeaute(serviceBeaute: ServiceBeaute, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/services_beaute`, serviceBeaute, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateServiceBeaute(serviceBeauteId: number, serviceBeaute: Partial<ServiceBeaute>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/services_beaute/${serviceBeauteId}`, serviceBeaute, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteServiceBeaute(serviceBeauteId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/services_beaute/${serviceBeauteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createSalonService(salonService: SalonService, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/salons_services`, salonService, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateSalonService(salonServiceId: number, salonService: Partial<SalonService>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/salons_services/${salonServiceId}`, salonService, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteSalonService(salonServiceId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/salons_services/${salonServiceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createPiscine(piscine: Piscine, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/piscines`, piscine, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updatePiscine(piscineId: number, piscine: Partial<Piscine>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/piscines/${piscineId}`, piscine, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deletePiscine(piscineId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/piscines/${piscineId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createServicePiscine(servicePiscine: ServicePiscine, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/services_piscine`, servicePiscine, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateServicePiscine(servicePiscineId: number, servicePiscine: Partial<ServicePiscine>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/services_piscine/${servicePiscineId}`, servicePiscine, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteServicePiscine(servicePiscineId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/services_piscine/${servicePiscineId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createPiscineService(piscineService: PiscineService, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/piscines_services`, piscineService, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updatePiscineService(piscineServiceId: number, piscineService: Partial<PiscineService>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/piscines_services/${piscineServiceId}`, piscineService, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deletePiscineService(piscineServiceId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/piscines_services/${piscineServiceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getPiscineServices(token: string): Promise<PiscineService[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/piscines_services`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getPiscineServiceById(piscineServiceId: number, token: string): Promise<PiscineService> {
        try {
            const response = await axios.get(`${this.baseUrls}/piscines_services/${piscineServiceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createRestaurant(restaurant: Restaurant, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/restaurants`, restaurant, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateRestaurant(restaurantId: number, restaurant: Partial<Restaurant>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/restaurants/${restaurantId}`, restaurant, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteRestaurant(restaurantId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/restaurants/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createTypeMenu(typeMenu: TypeMenu, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/type_menu`, typeMenu, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateTypeMenu(typeMenuId: number, typeMenu: Partial<TypeMenu>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/type_menu/${typeMenuId}`, typeMenu, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteTypeMenu(typeMenuId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/type_menu/${typeMenuId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createMenu(menu: Menu, token: string): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('restaurant_id', menu.restaurant_id.toString());
            formData.append('type_menu_id', menu.type_menu_id.toString());
            formData.append('nom', menu.nom);
            formData.append('description', menu.description);
            formData.append('prix', menu.prix.toString());
            if (menu.imageplat) {
                formData.append('imageplat', menu.imageplat);
            }
            console.log("formdataMENUUUUUUU",menu);
            const response = await axios.post(`${this.baseUrls}/menus`, formData, {
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

    async createSoin(soin: any, token: string): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('spa_id', soin.salon_id);
            formData.append('type_soin_id', soin.type_soin_id.toString());
            formData.append('duree', soin.duree);
            formData.append('description', soin.description);
            formData.append('prix', soin.prix.toString());

            console.log("formdataMENUUUUUUU", soin, formData);
            const response = await axios.post(`${this.baseUrls}/spas_soins`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.message === 'Network Error') {
                console.error('Network error: Please check your network connection and API endpoint.');
            }
            this.handleAxiosError(error);
        }
    }

    async updateMenu(menuId: number, menu: Partial<Menu>, token: string): Promise<any> {
        try {
            const formData = new FormData();
            if (menu.restaurant_id !== undefined) formData.append('restaurant_id', menu.restaurant_id.toString());
            if (menu.type_menu_id !== undefined) formData.append('type_menu_id', menu.type_menu_id.toString());
            if (menu.nom !== undefined) formData.append('nom', menu.nom);
            if (menu.description !== undefined) formData.append('description', menu.description);
            if (menu.prix !== undefined) formData.append('prix', menu.prix.toString());
            if (menu.imageplat) {
                formData.append('imageplat', menu.imageplat);
            }

 console.log("formdata",menu);
            const response = await axios.put(`${this.baseUrls}/menus/${menuId}`, formData, {
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

    async deleteMenu(menuId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/menus/${menuId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createVilla(villa: Villa, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/villas`, villa, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateVilla(villaId: number, villa: Partial<Villa>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/villas/${villaId}`, villa, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteVilla(villaId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/villas/${villaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createServiceVilla(serviceVilla: ServiceVilla, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/services_villa`, serviceVilla, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateServiceVilla(serviceVillaId: number, serviceVilla: Partial<ServiceVilla>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/services_villa/${serviceVillaId}`, serviceVilla, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteServiceVilla(serviceVillaId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/services_villa/${serviceVillaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createVillaService(villaService: VillaService, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/villas_services`, villaService, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateVillaService(villaServiceId: number, villaService: Partial<VillaService>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/villas_services/${villaServiceId}`, villaService, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteVillaService(villaServiceId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/villas_services/${villaServiceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getTypeMenus(): Promise<TypeMenu[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/type_menu`);
            console.log("responseddddddddddddd",response.data);
            return response.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getTypeSoins(): Promise<TypeSoin[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/types_soins`);
            return response.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getServiceSalons(): Promise<ServiceBeaute[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/services_beaute`);
            return response.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getServicePiscines(): Promise<ServicePiscine[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/services_piscine`);
            return response.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getServiceVillas(): Promise<ServiceVilla[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/services_villa`);
            return response.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getServiceSalonBeaute(): Promise<ServiceVilla[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/services_beaute`);
            return response.data; // Access the 'data' property
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createExcursion(excursion: Excursion, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/excursions`, excursion, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getExcursions(token: string): Promise<Excursion[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/excursions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getExcursionById(excursionId: number, token: string): Promise<Excursion> {
        try {
            const response = await axios.get(`${this.baseUrls}/excursions/${excursionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateExcursion(excursionId: number, excursion: Partial<Excursion>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/excursions/${excursionId}`, excursion, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteExcursion(excursionId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/excursions/${excursionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getActivities(): Promise<Activity[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/activities`);
            return response.data.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getActivityById(activityId: number): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrls}/activities/${activityId}`);
            return response.data.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createActivityReview(review: ActivityReview, token: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrls}/activity_reviews`, review, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getActivityReviews(token: string): Promise<ActivityReview[]> {
        try {
            const response = await axios.get(`${this.baseUrls}/activity_reviews`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getActivityReviewById(reviewId: number, token: string): Promise<ActivityReview> {
        try {
            const response = await axios.get(`${this.baseUrls}/activity_reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateActivityReview(reviewId: number, review: Partial<ActivityReview>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/activity_reviews/${reviewId}`, review, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteActivityReview(reviewId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/activity_reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async createReservation(reservation: Reservation): Promise<any> {
        try {
            console.log("reservation",reservation);
            const response = await axios.post(`${this.baseUrls}/reservations`, reservation);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async updateReservation(reservationId: number, reservation: Partial<Reservation>, token: string): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrls}/reservations/${reservationId}`, reservation, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async deleteReservation(reservationId: number, token: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrls}/reservations/${reservationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    async getReservationById(reservationId: number, token: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrls}/reservations/${reservationId}`, {
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
