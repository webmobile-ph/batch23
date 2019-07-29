import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
// import something here

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.use(Chartkick.use(Chart))
}
