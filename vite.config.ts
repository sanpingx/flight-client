import { ConfigEnv, UserConfig, defineConfig ,loadEnv  } from 'vite';
import react from '@vitejs/plugin-react';
// import tagger from "@dhiwise/component-tagger";


// https://vitejs.dev/config/
export default defineConfig(({command,mode}:ConfigEnv) :UserConfig =>{
    // 获取环境变量
    const env = loadEnv(mode, process.cwd()); 
    // const isProd = mode === 'production';
    // const isBuild = command === 'build';
    console.log('env',env);

    return {

      build: {
        outDir: "build",
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': '/src',
          '@components': '/src/components',
          '@pages': '/src/pages',
          '@assets': '/src/assets',
          '@constants': '/src/constants',
          '@styless': '/src/styless',
          // '@types': '/src/types', // @types有冲突?
          '@config': '/src/config',
          // '@api': '/src/api',// @api有冲突?
          '@@': '',
        },
      },
      server: {
        port: Number(env.VITE_WEB_PORT),
        host: env.VITE_WEB_URL,
        strictPort: true,
        // allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],
        // 当项目部署到Nginx后，前端通过Vite配置的代理设置不再生效!!!
        // 因为Vite的代理配置仅在开发服务器运行时有效‌
        // 配置代理解决跨域问题，将/api 开头的请求代理到http://127.0.0.1:48081
        proxy:{
          [env.VITE_API_URL]:{
              target: env.VITE_BASE_URL,
              changeOrigin: true,
              // secure: false, // 如果是https接口，需要配置这个参数
              // 将前缀/api去掉
              rewrite: (path) => path.replace(env.VITE_API_URL, '')
          }
        }
      }
    }
});
