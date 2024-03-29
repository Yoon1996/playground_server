
// module.exports = {
//     apps: [
//       {
//         name: "playground_server", // 생성할 프로세스의 이름
//         script: "dist/main.js", // 프로세스 생성 시 pm2 start를 할 경로(보통 서버 파일)
//         env: {
//             PORT: 3000,
//             NODE_ENV: 'local'
//             //나의 local mysql 연결
//         },
//         env_production: {
//             PORT:3000,
//             NODE_ENV: 'prod',
//             //rds
//         }
//       }
//     ]
//   }