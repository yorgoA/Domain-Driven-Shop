<template>
    <div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorBoundary',
    errorCaptured(err, vm, info) {
      // eslint-disable-next-line no-unused-vars
      console.error('Error:', err, 'Info:', info);
      if (err.message.includes('Maximum recursive updates exceeded')) {
        console.warn('Suppressed recursive update error:', err);
        return false; // Suppress the error to avoid the warning
      } else {
        throw err; // Re-throw other errors
      }
    }
  };
  </script>
  