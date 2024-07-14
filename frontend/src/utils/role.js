import { reactive } from 'vue';

const roleState = reactive({
  role: localStorage.getItem('userRole') || null,
});

export function useRole() {
  return roleState;
}

export function setRole(role) {
  return new Promise((resolve) => {
    if (roleState.role !== role) {
      if (role) {
        localStorage.setItem('userRole', role);
      } else {
        localStorage.removeItem('userRole');
      }
      roleState.role = role;
      resolve(); 
    } else {
      resolve(); 
    }
  });
}

export function clearRole() {
  return new Promise((resolve) => {
    localStorage.removeItem('userRole');
    roleState.role = null;
    sessionStorage.removeItem('hasReloadedLogin'); 
    resolve();
  });
}
