import installerModel from '../model/installerModel.js';

// Função para inserir um novo instalador
export const createInstaller = async (req, res) => {
  try {
    const installer = req.body;
    console.log('Criando instalador:', installer);
    const newInstaller = await installerModel.insertInstaller(installer);
    res.status(201).json(newInstaller);
  } catch (error) {
    console.error('Erro ao criar instalador:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};  

// Função para listar todos os instaladores
export const getAllInstallers = async (req, res) => {
  try {
    console.log('Buscando todos os instaladores...');
    const installers = await installerModel.getAllInstallers();
    if (installers.length === 0) {
      return res.status(404).json({ message: 'Nenhum instalador encontrado' });
    }
    res.status(200).json(installers);
  } catch (error) {
    console.error('Erro ao buscar instaladores:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para atualizar um instalador
export const updateInstaller = async (req, res) => {
  const { cpf } = req.params;
  const updates = req.body;

  try {
    console.log(`Atualizando instalador com cpf ${cpf}...`);
    const updatedInstaller = await installerModel.updateInstaller(cpf, updates);
    if (!updatedInstaller) {
      return res.status(404).json({ message: 'Instalador não encontrado' });
    }
    res.status(200).json(updatedInstaller);
  } catch (error) {
    console.error('Erro ao atualizar instalador:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para buscar instalador por CPF
export const getInstallerByCpf = async (req, res) => {
  const { cpf } = req.params;

  try {
    console.log(`Buscando instalador com CPF ${cpf}...`);
    const installer = await installerModel.getInstallerByCpf(cpf);
    if (!installer) {
      return res.status(404).json({ message: 'Instalador não encontrado' });
    }
    res.status(200).json(installer);
  } catch (error) {
    console.error('Erro ao buscar instalador por CPF:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para deletar instalador
export const deleteInstaller = async (req, res) => {
  const { cpf } = req.params;

  try {
    console.log(`Deletando instalador com CPF ${cpf}...`);
    const deletedInstaller = await installerModel.deleteInstaller(cpf);
    if (!deletedInstaller) {
      return res.status(404).json({ message: 'Instalador não encontrado' });
    }
    res.status(200).json(deletedInstaller);
  } catch (error) {
    console.error('Erro ao deletar instalador:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}