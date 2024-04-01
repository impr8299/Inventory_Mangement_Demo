import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'info') => {
    switch (type) {
      case 'info':
        toast.info(message);
        break;
      case 'success':
        toast.success(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message);
        break;
    }
  };
  