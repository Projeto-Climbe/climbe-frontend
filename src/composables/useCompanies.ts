import { ref } from 'vue';
import { getCompanies, createCompany, type CompanyData } from '@/services/companyService'; 

type Company = any;

export function useCompanies() {
  
  const companies = ref<Company[]>([]); 
  const loading = ref(false);     
  const isSaving = ref(false);   
  const error = ref<string | null>(null);


  const fetchCompanies = async () => {
    loading.value = true;
    error.value = null; 
    try {
      companies.value = await getCompanies();
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Ocorreu um erro desconhecido ao buscar empresas.';
      }
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addCompany = async (companyData: CompanyData): Promise<boolean> => {
    isSaving.value = true;
    error.value = null;
    try {
      await createCompany(companyData);
      await fetchCompanies();
      
      return true; 

    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message; 
      } else {
        error.value = 'Ocorreu um erro desconhecido ao salvar a empresa.';
      }
      console.error(err);
      return false; 
    } finally {
      isSaving.value = false;
    }
  };

  return {
    companies,
    loading,
    isSaving, 
    error,
    fetchCompanies,
    addCompany 
  };
}