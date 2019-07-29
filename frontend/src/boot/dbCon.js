// import something here
import wings from 'wings-feathers'

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$dbCon = wings('http://localhost:3030')
}
