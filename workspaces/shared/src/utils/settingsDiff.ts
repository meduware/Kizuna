import { TechnicalSettings } from "../types/settings-page";

export function getSectionChanges(settings: TechnicalSettings, local: TechnicalSettings) {
  if (!settings || !local) {
    return {
      isLoginMethodChanged: false,
      isFileSharingChanged: false,
      isCapacitiesChanged: false,
    };
  }

  const current = settings.technical_details;
  const localData = local.technical_details;

  return {
    isLoginMethodChanged:
      JSON.stringify(current.login_methods) !== JSON.stringify(localData.login_methods),
    isFileSharingChanged:
      JSON.stringify(current.file_sharing) !== JSON.stringify(localData.file_sharing),
    isCapacitiesChanged:
      JSON.stringify(current.capacities) !== JSON.stringify(localData.capacities),
  };
}
