const API_BASE_URL = 'http://localhost:3000'; 

export const getCompanies = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/empresa/`); 

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: Falha ao buscar empresas`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Falha no companyService:', error);
        throw error; 
    }
};

git 