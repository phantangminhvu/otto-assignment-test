export const generateKey = (prefix: string, id: string) => {
  return id ? `${prefix}:${id}` : prefix
}
