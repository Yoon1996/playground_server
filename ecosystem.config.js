module.exports = {
    apps: [
      {
        name: "playground_prod", // 생성할 프로세스의 이름
        script: "dist/src/main.js", // 프로세스 생성 시 pm2 start를 할 경로(보통 서버 파일)
        env: {
            NODE_ENV: 'prod'
            //나의 local mysql 연결
        },
        env_production: {
          NODE_ENV: 'prod'
        }
      },
    ]
  }