export function findProject(searchRequest: string): Promise<void | any[]>{
  return fetch(`https://api.github.com/search/repositories?q=${searchRequest}`)
    .then(response => response.json())
    .then(result => result.items)
}