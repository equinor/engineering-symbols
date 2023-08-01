export const getUniqueId = () => `${Date.now().toString(16)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`;
