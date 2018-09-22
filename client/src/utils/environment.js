/**
 * check if environment is production
 * @return {boolean} result - is in production environment
 */
export const isEnvProduction = () => process.env.NODE_ENV === 'production'
