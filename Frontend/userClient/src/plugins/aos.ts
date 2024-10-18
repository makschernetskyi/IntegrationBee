import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  install(app:any) {
    app.config.globalProperties.$AOS = AOS;
    AOS.init();
  }
};