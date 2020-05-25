<template>
  <div id="app">
    <GSTC :config="config" @state="onState" />
  </div>
</template>

<script>
import plugin from "gantt-schedule-timeline-calendar";
import ItemMovement from "gantt-schedule-timeline-calendar/dist/ItemMovement.plugin";
import GSTC from "vue-gantt-schedule-timeline-calendar";

import json from "../../../assets/json_response.json";

let subs = [];

export default {
  name: "app",
  components: {
    GSTC
  },
  data() {
    return {
      json,
      config: {
        height: 500,
        grid: {
          block: {
            onCreate: []
          }
        },
        locale: {
          name: "pt-br",
          weekdays: "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado".split("_"),
          weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
          weekdaysMin: "D_S_T_Q_Q_S_S".split("_"),
          months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
            "_"
          ),
          monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
          weekStart: 0
        },
        chart: {
          items: json.gerentes
            .reduce((users, user, index) => ({
              ...users,
              ...user.celula_grupos.reduce((groups, group) => ({
                ...groups,
                ...group.modelos.reduce((models, model) => ({
                  ...models,
                  ...model.tarefas_processos.reduce((tasks, task) => ({
                    ...tasks,
                    [`${index}-${group.id}-${model.modelo}-${task.lote}`]: {
                      id: `${index}-${group.id}-${model.modelo}-${task.lote}`,
                      rowId: `${index}-${group.id}-${model.modelo}`,
                      label: `${task.quantidade}\r\n\r\n${task.lote}`,
                      resizable: true,
                      style: {
                        "border-radius": 0
                      },
                      time: {
                        start: new Date(task.metadados.data_inicio).getTime(),
                        end: new Date(task.metadados.entrega).getTime()
                      }
                    }
                  }), {})
                }), {})
              }), {})
            }), {})
        },
        list: {
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
                expander: true,
                isHTML: true,
                header: {
                  content: "Modelo"
                }
              }
            }
          },
          rows: json.gerentes
            .reduce((users, user, index) => ({
              ...users,
                [index]: {
                  id: index,
                  expanded: true,
                  height: 40,
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
                    height: 40,
                    user: null,
                    group: `<div class="row__group">GRUPO ${group.id}</div>`,
                    model: null
                  },
                  ...group.modelos.reduce((models, model) => ({
                    ...models,
                    [`${index}-${group.id}-${model.modelo}`]: {
                      id: `${index}-${group.id}-${model.modelo}`,
                      parentId: `${index}-${group.id}`,
                      user: null,
                      group: null,
                      model: `<div class="row__model"><div class="title">MODELO ${model.modelo}</div><div class="subtitle">Quantidade</div><div class="subtitle">Lote</div></div>`
                    }
                  }), {})
                }), {})
            }), {}),
          rowHeight: 60,
          toggle: {
            display: false
          }
        },
        plugins: [
          ItemMovement({
            moveable: true,
            resizable: true,
            snapStart: (time, diff) =>
              plugin
                .api
                .date(time)
                .add(diff, "milliseconds")
                .startOf("day")
                .valueOf()
          })
        ]
      }
    }
  },
  methods: {
    onState(state) {
      this.state = state;
      subs.push(
        state.subscribe("config.chart.items.1", item => {
          console.log("item 1 changed", item);
        })
      );
      subs.push(
        state.subscribe("config.list.rows.1", row => {
          console.log("row 1 changed", row);
        })
      );
    }
  },
  beforeDestroy() {
    subs.forEach(unsub => unsub());
  }
}
</script>

<style lang="scss">
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
