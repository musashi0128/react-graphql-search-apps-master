## 手順
# 手順1 -> ReactAppの導入
# react app create
npm install --global create-react-app

# 手順2 -> aplloclientの導入 + graphqlの導入
# add apollo & graphql client
yarn add apollo-boost@0.1.16 graphql@14.0.2 react-apollo@2.1.11

# 手順3 Githubで登録したTokenをAppの.envに記述して設定
# write env_file
echo REACT_APP_GITHUB_TOKEN= ["設定したTOKEN"] > .env.development.local

# 手順4
# writhe github
Settings -> Personal access tokensで対応させるappの登録 && public_repoを許可

# 手順5起動
yarn start | npm start
