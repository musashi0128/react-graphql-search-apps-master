import gql from 'graphql-tag'

// Repository検索のtextinputで使用するquery -> GET に当たる action?の定義
// 今回は'variables:  { query, first, last, after, before }'を使用 -> 必ず使用する場合は変数化しておくと良いかも
// 取得する情報はrepositoryCount{},pageInfo{},edges{cursor{},node{},viewerHasStarred{}}を指定
export const SEARCH_REPOSITORIES = gql`
  query searchRepositories($first: Int, $after: String, $last: Int, $before: String, $query: String!) {
    search(first: $first, after: $after, last: $last, before: $before, query: $query, type: REPOSITORY) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            url
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`

// 対象のRepositoryに対してStartの付与を行うMutation -> POST(UPDATE)に当たる
// $input: AddStarInput!はgithubが指定している引数
export const ADD_STAR = gql`
  mutation addStar ($input: AddStarInput!) {
    addStar (input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

// 対象のRepositoryに対して付与したStartの剥奪を行うMutation -> POST(DELETE)
// $input: RemoveStarInputはgithubが指定している引数
export const REMOVE_STAR = gql`
  mutation removeStar ($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

// 初期状態はLogin情報を自分の名前で固定
// 今回は.envに自分のgithub_tokenを指定ある
export const ME = gql`
  query me {
    user(login: "iteachonudemy") {
      name
      avatarUrl
    }
  }
`
