import { ref } from 'vue';
import { getCompanies } from '@/services/companyService'; 

export function useCompanies() {
    
    const companies = ref<any[]>([]); 
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchCompanies = async () => {
        loading.value = true;
        error.value = null;
        try {
            companies.value = await getCompanies();
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
            } 
            else {
                error.value = 'Ocorreu um erro desconhecido.';
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        companies,
        loading,
        error,
        fetchCompanies
    };
}