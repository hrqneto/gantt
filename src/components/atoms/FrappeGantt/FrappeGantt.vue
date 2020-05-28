<template>
  <div id="app">
    <GSTC v-if="getTasks" :config="config" @state="onState" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import plugin from 'gantt-schedule-timeline-calendar'
import CalendarScroll from 'gantt-schedule-timeline-calendar/dist/CalendarScroll.plugin'
import ItemMovement from 'gantt-schedule-timeline-calendar/dist/ItemMovement.plugin'
import WeekendHighlight from 'gantt-schedule-timeline-calendar/dist/WeekendHighlight.plugin'
import GSTC from 'vue-gantt-schedule-timeline-calendar'

const week_colour = (week) =>
  week % 5 === 0
    ? 'red'
  : week % 5 === 1
    ? 'darkgreen'
  : week % 5 === 2
    ? 'indigo'
  : week % 5 === 3
    ? 'orange'
  : 'darkmagenta'

export default {
  name: 'frappe-gantt',

  components: {
    GSTC
  },

  data () {
    return {
      subscriptions: []
    }
  },

  computed: {
    ...mapGetters({
      getPeriodMode: 'dashboard/getPeriodMode',
      getTasks: 'dashboard/getTasks'
    }),

    config: function () {
      return {
        height: 500,
        locale: {
          name: "pt-br",
          weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
          weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          weekdaysMin: ["D", "S", "T", "Q", "Q", "S", "S"],
          months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
          monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        },
        chart: {
          /*calendar: {
            expand: true,
            levels: [
              {
                main: true,
                formats: [
                  {
                    zoomTo: 21,
                    period: 'day',
                    className: 'gstc-date-medium gstc-date-left',
                    format() {
                      return 'TESTE'
                    }
                  },
                ]
              }
            ]
          },*/
          items: this.getTasks?.gerentes
            .reduce((users, user, index) => ({
              ...users,
              ...user.celula_grupos.reduce((groups, group, group_index) => ({
                ...groups,
                ...group.modelos.reduce((models, model, model_index) => ({
                  ...models,
                  ...model.tarefas_processos.reduce((tasks, task, task_index) => ({
                    ...tasks,
                    [`${index}-${group.id}-${model.modelo}-${task.lote}`]: {
                      id: `${index}-${group.id}-${model.modelo}-${task.lote}`,
                      rowId: `${index}-${group.id}-${model.modelo}`,
                      task: task,
                      indexes: [index, group_index, model_index, task_index],
                      moveable: this.getTasks?.gerentes
                        .map((moveable_user, moveable_index) =>
                          moveable_user.celula_grupos
                            .filter((moveable_group) => moveable_group.modelos.filter((moveable_model) => moveable_model.modelo === model.modelo).length > 0)
                            .map((moveable_group) => `${moveable_index}-${moveable_group.id}-${model.modelo}`)
                        )
                        .reduce((moveable, value) => [...moveable, ...value], []),
                      label: `${task.quantidade}\r\n\r\n${task.lote}`,
                      style: {
                        "border-radius": 0
                      },
                      time: {
                        start: plugin
                          .api
                          .date(
                            new Date(task.data).getTime()
                          )
                          .add(1, "day")
                          .startOf("day")
                          .valueOf(),
                         end: plugin
                          .api
                          .date(
                            new Date(task.data).getTime()
                          )
                          .add(1, "day")
                          .endOf("day")
                          .valueOf()
                      }
                    }
                  }), {})
                }), {})
              }), {})
            }), {})
         },
        list: {
          toggle: {
            display: false
          },
          columns: {
            data: {
              user: {
                id: "user",
                data: "user",
                width: 100,
                expander: true,
                isHTML: true,
                header: {
                  content: "Usuário"
                }
              },
              group: {
                id: "group",
                data: "group",
                width: 100,
                expander: true,
                isHTML: true,
                header: {
                  content: "Grupo"
                }
              },
              model: {
                id: "model",
                data: "model",
                width: 100,
                isHTML: true,
                header: {
                  content: "Modelo"
                }
              }
            }
          },
          rows: this.getTasks?.gerentes
            .reduce((users, user, index) => ({
              ...users,
              [index]: {
                id: index,
                expanded: true,
                user: `<div class="row__user"><i class="fas fa-user"></i><div>${user.nome}</div></div>`,
                group: null,
                model: null
              },
              ...user.celula_grupos.reduce((groups, group) => ({
                ...groups,
                [`${index}-${group.id}`]: {
                  id: `${index}-${group.id}`,
                  parentId: index,
                  expanded: true,
                  user: null,
                  group: `<div class="row__group">GRUPO ${group.id}</div>`,
                  model: null
                },
                ...group.modelos.reduce((models, model) => ({
                  ...models,
                  [`${index}-${group.id}-${model.modelo}`]: {
                    id: `${index}-${group.id}-${model.modelo}`,
                    parentId: `${index}-${group.id}`,
                    height: 60,
                    user: null,
                    group: null,
                    model: `<div class="row__model"><div class="title">MODELO ${model.modelo}</div><div class="subtitle">Quantidade</div><div class="subtitle">Lote</div></div>`
                  }
                }), {})
              }), {})
            }), {})
        },
        actions: {
          "chart-timeline-items-row-item": [
            (element, data) => {
              element.style.background = week_colour(plugin.api.date(data.item.time.start).startOf("week").week())
              return {
                update: async (element, data) => {
                  if (data.item.isMoving || data.item.isResizing) {
                    console.log(data);
                    element.style.background = week_colour(plugin.api.date(data.item.time.start).startOf("week").week())
                    data.item.label = ""
                    this.simulateTask({
                      plan_id: data.item.task.metadados.plano,
                      tabela_temp_nome: "MOVE_EVENT",
                      tarefas_processos: [
                        {
                          id_tarefa: data.item.task.id ?? "",
                          cel_codigo_origem: data.item.task.metadados.celula ?? "",
                          ipl_ordem: data.item.task.metadados.ordem_de_producao ?? "",
                          ipl_dtinicio: data.item.task.data ?? "",
                          bal_seq: data.item.task.metadados.balanceamento ?? "",
                          cur_codigo: data.item.task.metadados.curva_de_producao ?? "",
                          ipl_perccurva: data.item.task.metadados.percentual_curva ?? "",
                          ipl_seq_anterior_destino: data.item.task.sequencia ?? "",
                          cel_codigo_destino: data.item.task.metadados.celula ?? "",
                          ipl_data_destino: plugin.api.date(data.item.time.start).format("DD/MM/YYYY")
                        }
                      ]
                    });
                  }
                }
              }
            }
          ]
        },
        plugins: [
          CalendarScroll(),
          ItemMovement({
            moveable: true,
            resizeable: true,
            collisionDetection: false,
            ghostNode: true,
            snapStart: (time, diff) =>
              plugin
                .api
                .date(time)
                .add(diff, "milliseconds")
                .startOf("day")
                .valueOf(),
            snapEnd: (time, diff) =>
              plugin 
                .api 
                .date(time)
                .add(diff, "milliseconds")
                .endOf("day")
                .valueOf()
          }),
          WeekendHighlight()
        ]
      }
    }
  },

  methods: {
    ...mapActions({
      setPeriodMode: 'dashboard/setPeriodMode',
      loadTasks: 'dashboard/loadTasks',
      simulateTask: 'dashboard/simulateTask'
    }),

    onState (state) {
      this.state = state;
      this.subscriptions.push(
        state.subscribe('config.plugin.ItemMovement', itemMovement => {
          if (itemMovement?.item) {
            state.update(`config.chart.items.${itemMovement.item.id}.isMoving`, itemMovement.item.moving)
            state.update(`config.chart.items.${itemMovement.item.id}.isResizing`, itemMovement.item.resizing)
            state.update(`config.chart.items.${itemMovement.item.id}.isWaiting`, itemMovement.item.waiting)
          }
        })
      )
    }
  },

  beforeDestroy() {
    this.subscriptions.forEach(unsubscribe => unsubscribe())
  },

  async created() {
    await this.loadTasks()
  }
}
</script>

<style lang="scss">
.gantt-schedule-timeline-calendar__chart-timeline-grid-row-block--weekend {
  background: lightgray !important;
}

.gantt-schedule-timeline-calendar__chart-timeline-items-row-item-label {
  line-height: 9px;
  margin-top: 1px;
  white-space: pre-line;
}

.gantt-schedule-timeline-calendar__list-column-header-resizer-container,
.gantt-schedule-timeline-calendar__list-column-header-resizer-dots,
.gantt-schedule-timeline-calendar__list-column-row-content,
.gantt-schedule-timeline-calendar__list-column-row {
  padding-left: 0;
  padding-right: 0;
  text-align: center !important;
}

.gantt-schedule-timeline-calendar__list-column-row-expander {
  display: none;
}

.row__user {
  display: flex;
}

.row__user div {
  line-height: 42px;
  margin-left: 10px;
}

.row__group {
  color: #B0042B;
}

.row__model {
  font-size: 10px;
  text-align: left;
}

.row__model .title {
  --height: 25px;
  color: #B0042B;
}

.row__model .subtitle {
  --height: 15px;
}
</style>
