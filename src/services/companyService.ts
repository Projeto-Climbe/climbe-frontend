import https from './https';

export interface CompanyData {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
}

export const getCompanies = async () => {
  try {
    const response = await https.get('/empresa/');
    return response.data;
  } catch (error: any) {
    console.error('Falha no companyService.getCompanies:', error);
    if (error.response) {
      throw new Error(`Erro ${error.response.status}: ${error.response.data.message || 'Falha ao buscar empresas'}`);
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Tente novamente.');
    } else {
      throw new Error(error.message);
    }
  }
};

export const createCompany = async (companyData: CompanyData) => {
  try {
    const response = await https.post('/empresa/', companyData);

    return response.data;

  } catch (error: any) {
    console.error('Falha no companyService.createCompany:', error);
    if (error.response) {
      throw new Error(`Erro ${error.response.status}: ${error.response.data.message || 'Falha ao criar empresa'}`);
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Tente novamente.');
    } else {
      throw new Error(error.message);
    }
  }
};
