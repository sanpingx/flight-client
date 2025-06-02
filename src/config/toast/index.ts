import toast, { Toaster } from 'react-hot-toast';
import i18n from '@/hooks/web/i18n';

export default {
  success: (msg: any) => {
    toast.success(msg, {
      // style: {
      //   border: '1px solid #713200',
      //   padding: '16px',
      //   color: '#713200',
      // },
      position: "top-center",
    });
  },
  error: (msg: any) => {
    toast.error(msg, {
      // style: {
      //   border: '1px solid #713200',
      //   padding: '16px',
      //   color: '#713200',
      // },
      position: "top-center",
    });
  },
  successT: (msg: any) => {
    toast.success(i18n.t(msg), {
      // style: {
      //   border: '1px solid #713200',
      //   padding: '16px',
      //   color: '#713200',
      // },
      position: "top-center",
    });
  },
  errorT: (msg: any) => {
    toast.error(i18n.t(msg), {
      // style: {
      //   border: '1px solid #713200',
      //   padding: '16px',
      //   color: '#713200',
      // },
      position: "top-center",
    });
  }
  
}
