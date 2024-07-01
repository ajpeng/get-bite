import { MenuResponse, Section, Item } from './types';
import { Logger } from './logger';

function validateMenuRequest(req: any):req is MenuResponse {
  return (
    req.sections && Array.isArray(req.sections) && req.sections.every(validateSection) &&
    req.items && Array.isArray(req.items) && req.items.every(validateItem) &&
    req.modGroups && Array.isArray(req.modGroups) && req.modGroups.every(validateModGroups) &&
    req.mods && Array.isArray(req.mods) && req.mods.every(validateMods) &&
    req.discounts && Array.isArray(req.discounts) && req.discounts.every(validateDiscounts) &&
    req.orderTypes && Array.isArray(req.orderTypes) && req.orderTypes.every(validateOrderTypes)
  );
}

function validateSection(section: any): section is Section {
  const valid = (
    section.id && typeof section.id === 'string' &&
    section.name && typeof section.name === 'string' &&
    section.itemIds && Array.isArray(section.itemIds) &&
    section.magicCopyKey && typeof section.magicCopyKey === 'string' &&
    section.imageUrl && typeof section.imageUrl === 'string'
  );
  if (!valid) {
    console.log('Invalid section:', section); 
  }
  return valid;
}

function validateItem(item: any): item is Item {
  const valid = (
    item.id && typeof item.id === 'string' &&
    item.name && typeof item.name === 'string' &&
    item.price && typeof item.price === 'string' &&
    item.modGroupIds && Array.isArray(item.modGroupIds) &&
    item.magicCopyKey && typeof item.magicCopyKey === 'string' &&
    item.imageUrl && typeof item.imageUrl === 'string'
  );
  if (!valid) {
    console.log('Invalid item:', item);
  }
  return valid;
}

function validateModGroups(modGroups: any): modGroups is Section {
  const valid = (
    modGroups.id && typeof modGroups.id === 'string' &&
    modGroups.name && typeof modGroups.name === 'string' &&
    modGroups.modIds && Array.isArray(modGroups.modIds) &&
    modGroups.maxMods && typeof modGroups.maxMods === 'number' &&
    modGroups.minMods && typeof modGroups.minMods === 'number'
  );
  if (!valid) {
    console.log('Invalid mod group:', modGroups);
  }
  return valid;
}

function validateMods(mods: any): mods is Section {
  const valid = (
    mods.id && typeof mods.id === 'string' &&
    mods.name && typeof mods.name === 'string' &&
    mods.modGroupIds && Array.isArray(mods.modGroupIds) &&
    mods.price && typeof mods.price === 'number'
  );
  if (!valid) {
    console.log('Invalid mod:', mods);
  }
  return valid;
}

function validateDiscounts(discounts: any): discounts is Section {
  const valid = (
    discounts.id && typeof discounts.id === 'string' &&
    discounts.name && typeof discounts.name === 'string' &&
    discounts.amount && typeof discounts.amount === 'number' &&
    discounts.rate && typeof discounts.rate === 'number' &&
    discounts.couponCode && typeof discounts.couponCode === 'string'
  );
  if (!valid) {
    console.log('Invalid discount:', discounts);
  }
  return valid;
}

function validateOrderTypes(orderTypes: any): orderTypes is Section {
  const valid = (
    orderTypes.id && typeof orderTypes.id === 'string' &&
    orderTypes.name && typeof orderTypes.name === 'string'
  );
  if (!valid) {
    console.log('Invalid order type:', orderTypes);
  }
  return valid;
}

export {
  validateMenuRequest,
  validateSection,
  validateItem,
  validateModGroups,
  validateMods,
  validateDiscounts,
  validateOrderTypes
};