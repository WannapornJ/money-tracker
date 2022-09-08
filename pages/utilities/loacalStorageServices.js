export const setToken = (token) => {
  localStorage.setItem('ACC_TOKEN', token);
};

export const getToken = () => {
  return localStorage.getItem('ACC_TOKEN');
};
export const removeToken = () => {
    localStorage.removeItem('ACC_TOKEN');
};
