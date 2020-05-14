export default function getSearchParams(search: string) {
  const searchParams = search.substr(1) // redirect=u_AAAA&player=X
  const paramsArr = searchParams.split('&') // [redirect=u_AAAA, player=X]
  const params: any = {}
  paramsArr.forEach((pair) => {
    const [key, value] = pair.split('=')
    params[key] = key === 'redirect' ? value.replace('_', '/') : value
  })

  return params
}
