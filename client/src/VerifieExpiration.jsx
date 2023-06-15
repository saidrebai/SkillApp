import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function useTokenExpiration() {
  useEffect(() => {
    const checkTokenExpiration = () => {
      // Check if the token exists in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          // Check if the token has expired
          if (decodedToken.exp < currentTime) {
            // Token has expired, remove it from localStorage
            localStorage.removeItem('token');
            window.location="/login";
          }
        } catch (error) {
          // Handle any error that occurs during token decoding
          console.log('Error decoding token:', error);
        }
      }
    };

    // Run the token expiration check on component mount
    checkTokenExpiration();

    // Add event listener to check token expiration on storage event
    window.addEventListener('storage', checkTokenExpiration);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', checkTokenExpiration);
    };
  }, []);
}

export default useTokenExpiration;
