<template>
  <div>
    <pie-chart :donut="true" :data="[['Remaining', tasks], ['Accomplished', accomplished]]"></pie-chart>
    <noel hello="qwee" />
  </div>
</template>
<script>
import noel from 'components/noel.vue'
export default {
  components: {
    noel
  },
  mounted () {
    this.accomplishedService = this.$dbCon.wingsService('todos', {
      query: {
        isDone: true
      }
    },
    {
      channels: [{ prop: 'isDone', value: true }]
    }).init().on('dataChange', async () => {
      this.accomplished = (await this.tasksService.find({ query: { isDone: true } })).total
    })
    this.tasksService = this.$dbCon.wingsService('todos', {
      query: {
        isDone: false
      }
    },
    {
      channels: [{ prop: 'isDone', value: false }]
    }).init().on('dataChange', async () => {
      this.tasks = (await this.tasksService.find({ query: { isDone: false } })).total
    })
  },
  data: () => ({
    tasks: 0,
    accomplished: 0,
    tasksService: { total: 0 },
    accomplishedService: { total: 0 }
  })
}
</script>
