import constants from "../constants";

export interface User {
  role?: string;
  token?: string;
  email?: string;
}

export interface AuthorizationHeader {
  Authorization?: string;
}

const authHeader = (): AuthorizationHeader => {
  const user: User = JSON.parse(
    localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY) ?? "{}"
  );
  if (user?.token) {
    return { "Authorization": `Bearer ${user.token}` };
  }
  return {};
};

const login = (email: string, password: string): Promise<User> => {
  return fetch(`${constants.API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then(data => {
      const user = data as User;
      localStorage.setItem(
        constants.USER_LOCAL_STORAGE_KEY,
        JSON.stringify(user)
      );
      return user;
    });
};

const checkResponse = (response: Response): Promise<unknown> => {
  return response.json().then(data => {
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        window.location.reload();
      }
      const error = data?.message || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

const logout = (): void => {
  localStorage.removeItem(constants.USER_LOCAL_STORAGE_KEY);
};

export const authService = {
  authHeader,
  login,
  logout,
  checkResponse,
};
