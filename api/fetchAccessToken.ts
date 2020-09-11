import { fetchGQL } from "./fetchGQL.ts";

type SignInResponse = {
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
  const { data: { signin: { authToken: { accessToken } } } }: SignInResponse = await fetchGQL(
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
    {
      input: {
        email,
        password,
      },
    },
    'SignInMutation',
  )

  return accessToken
}

export { fetchAccessToken }
