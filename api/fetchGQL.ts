type FetchGQLBody = {
  query: string,
  variables?: Object,
  operationName?: string,
}

const fetchGQL = async <T>(query: string, variables?: Object, operationName?: string): Promise<T> => {
  const body: FetchGQLBody = {
    query,
  }

  if (variables) {
    body.variables = variables
  }

  if (operationName) {
    body.operationName = operationName
  }

  const bodyString = JSON.stringify(body)

  const response = await fetch("https://api.columns.app/graphql", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-GB,en;q=0.9",
      "authorization": "null",
      "content-type": "application/json",
      "sec-ch-ua": "\"\\\\Not;A\\\"Brand\";v=\"99\", \"Google Chrome\";v=\"85\", \"Chromium\";v=\"85\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://columns.app/signin",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": bodyString,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  })

  return response.json()
}

export { fetchGQL }
