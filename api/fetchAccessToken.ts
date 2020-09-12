import { fetchGQL } from "./fetchGQL.ts";

type Request = {
  data: {
    signin: {
      authToken: {
        accessToken: string,
        tokenType: 'Bearer',
      }
    }
  }
}

const fetchAccessToken = async (email: string, password: string): Promise<string> => {
  const request: Request = await fetchGQL(
    `
      mutation SignInMutation($input: SigninInput!) {
        signin(input: $input) {
          authToken {
            accessToken
            tokenType
          }
        }
      }
    `,
    undefined,
    {
      input: {
        email,
        password,
      },
    },
    'SignInMutation',
  )

  return request.data.signin.authToken.accessToken
}

export { fetchAccessToken }
