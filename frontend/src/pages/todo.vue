<template>
  <div>
    <q-toolbar class="bg-purple text-white">
      <q-btn flat round dense icon="assignment_ind" />
      <q-toolbar-title>
        Toolbar {{ task }}
      </q-toolbar-title>
      <q-btn @click="$router.push('/chart')" flat round dense icon="pie_chart" class="q-mr-xs" />
      <q-btn flat round dense icon="more_vert" @click="find" />
    </q-toolbar>
    <div class="q-pa-md" >
      <div class="row">
        <q-btn class="col" @click="showTasks">mga gagawin</q-btn>
        <q-btn class="col" @click="showAccomplishedTasks">mga tapos na</q-btn>
      </div>
      <div class="row items-center">
        <q-input @keyup.enter="add" v-model="task" class="col" value="" label="Task" />
        <q-btn @click="add" :disabled="!task" icon="save" round color="primary" size="sm"></q-btn>
      </div>
      <q-list bordered separator>
        <q-item v-for="(t, i) in todos" :key="i" clickable v-ripple>
          <q-item-section avatar>
            <q-checkbox @click.native="update(t)" :value="t.isDone" />
          </q-item-section>
          <q-item-section :style="{ 'text-decoration': (t.isDone ? 'line-through' : '' ) }">{{ t.desc }}</q-item-section>
          <q-item-section side>
            <q-btn @click="remove(t._id)" icon="delete" color="negative" round size="xs" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    let serviceName = 'todos'
    let params = {
      query: {
        isDone: false
      }
    }
    let config = {
      channels: [
        {
          prop: 'isDone',
          value: false
        }
      ]
    }
    let todosService = this.$dbCon.wingsService(serviceName, params, config)
    this.todosService = todosService
    todosService.on('dataChange', (todos) => {
      console.log('Hoy todos!', todos)
      this.todos = todos
    }).init()
  },
  data: () => ({
    todosService: null,
    task: '',
    todos: [
      {
        desc: 'add button function',
        isDone: false,
        timestamp: Date.now()
      },
      {
        desc: 'add delete function',
        isDone: false,
        timestamp: Date.now()
      }
    ]
  }),
  methods: {
    add () {
      this.$dbCon.services.todos.create({
        desc: this.task,
        isDone: false,
        timestamp: Date.now()
      })
      this.task = ''
    },
    remove (_id) {
      // this.todos.splice(ind, 1)
      this.$dbCon.services.todos.remove(_id)
    },
    update (t) {
      this.$dbCon.wingsService('todos')
      this.$dbCon.service('todos')
      this.$dbCon.services.todos.patch(t._id, {
        isDone: !t.isDone,
        'nestedPro.test1': 'asdasd'
      })
    },
    async find () {
      let result = await this.$dbCon.services.todos.find({
        query: {
          $search: 'qwe'
        }
      })

      console.log('RESULT of FIND()', result)
    },
    showAccomplishedTasks () {
      let params = {
        query: {
          isDone: true
        }
      }
      let config = {
        channels: [
          {
            prop: 'isDone',
            value: true
          }
        ]
      }
      this.todosService.reset(params, config)
    },
    showTasks () {
      let params = {
        query: {
          isDone: false
        }
      }
      let config = {
        channels: [
          {
            prop: 'isDone',
            value: false
          }
        ]
      }
      this.todosService.reset(params, config)
    }
  }
}
</script>
