export const capitalizeWords = (arr: string) => arr.split(' ').map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase());
