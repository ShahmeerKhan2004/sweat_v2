import { AxiosResponse } from 'axios';
import httpClient from '../../../shared/api/httpClient';
import { Programme } from '../../../shared/types';
import { ModuleDocument } from '../../../types/admin/CreateModule';

export const createModule = async (
  moduleData: ModuleDocument,
  readingWeeks?: number[] | { sem1: number[]; sem2: number[] },
): Promise<ModuleDocument> => {
  try {
    const response: AxiosResponse<ModuleDocument> = await httpClient.post(
      '/modules/create-module',
      { moduleData, readingWeeks },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating module:', error);
    throw error;
  }
};

export const updateModuleById = async (
  moduleId: string,
  updatedData: Partial<ModuleDocument>,
): Promise<ModuleDocument> => {
  try {
    const response: AxiosResponse<ModuleDocument> = await httpClient.put(
      `/modules/${moduleId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating module with ID ${moduleId}:`, error);
    throw error;
  }
};

export const deleteModuleById = async (moduleId: string): Promise<void> => {
  try {
    await httpClient.delete(`/modules/${moduleId}`);
  } catch (error) {
    console.error(`Error deleting module with ID ${moduleId}:`, error);
    throw error;
  }
};

export const createProgramme = async (
  programmeData: Programme,
): Promise<Programme> => {
  try {
    const response: AxiosResponse<Programme> = await httpClient.post(
      '/programmes',
      programmeData,
    );
    return response.data;
  } catch (error) {
    console.error('Error creating programme:', error);
    throw error;
  }
};

export const updateProgrammeById = async (
  programmeId: string,
  updatedData: Partial<Programme>,
): Promise<Programme> => {
  try {
    const response: AxiosResponse<Programme> = await httpClient.put(
      `/programmes/${programmeId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating programme with ID ${programmeId}:`, error);
    throw error;
  }
};

export const deleteProgrammeById = async (
  programmeId: string,
): Promise<void> => {
  try {
    await httpClient.delete(`/programmes/${programmeId}`);
  } catch (error) {
    console.error(`Error deleting programme with ID ${programmeId}:`, error);
    throw error;
  }
};
export const updateModuleIdsForAllProgrammes = async (
  programmeId: string,
  moduleIds: string[],
): Promise<void> => {
  try {
    await httpClient.put(`/programmes/${programmeId}/update-module-ids`, {
      moduleIds,
    });
  } catch (error) {
    console.error(
      `Error updating module IDs for programme ${programmeId}:`,
      error,
    );
    throw error;
  }
};

export const removeModuleFromProgramme = async (
  programmeId: string,
  moduleId: string,
): Promise<Programme> => {
  try {
    const response: AxiosResponse<Programme> = await httpClient.put(
      `/programmes/${programmeId}/remove-module`,
      { moduleId },
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error removing module from programme with ID ${programmeId}:`,
      error,
    );
    throw error;
  }
};

export const updateProgrammeArrayInModules = async (): Promise<void> => {
  try {
    await httpClient.put('/modules/update-programme-array');
  } catch (error) {
    console.error('Error updating programme array in modules:', error);
    throw error;
  }
};
