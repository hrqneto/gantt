<template>
  <div class="dashboard-header">
    <div class="header-texts">
      <generic-title
      class="header-title"
      >Planejamento de Produção</generic-title>
      <generic-sub-title
        class="header-sub-title"
        color="gray"
        size="small"
      >Diagrama de Gantt</generic-sub-title>
    </div>
    <div class="header-selection">
      <generic-text
        class="selection-text"
        color="gray"
        size="small"
        :is-bold="true"
      >Gerentes:</generic-text>
      <generic-multi-select-combo
        :items="items"
        @selected="setSelectedCel($event)"
      ></generic-multi-select-combo>
      <generic-text
        class="selection-text"
        color="gray"
        size="small"
        :is-bold="true"
      >Visualização:</generic-text>
      <generic-radio-button
        color="primary"
        size="medium"
        :items="periods"
        @selected="setSelectedPeriod($event)"
      ></generic-radio-button>
      <div class="grid-action">
        <div @click="set2Grid()"><a id="grid-2" class="menu-icon"><i class="el-icon-menu"></i></a></div>
        <div @click="set4Grid()"><a id="grid-4" class="menu-icon"><i class="el-icon-s-grid"></i></a></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GenericTitle from '@/components/atoms/GenericTitle'
import GenericSubTitle from '@/components/atoms/GenericSubTitle'
import GenericText from '@/components/atoms/GenericText'
import GenericMultiSelectCombo from '@/components/atoms/GenericMultiSelectCombo'
import GenericRadioButton from '@/components/atoms/GenericRadioButton'
export default {
  name: 'dashboard-header',

  components: {
    'generic-title': GenericTitle,
    'generic-sub-title': GenericSubTitle,
    'generic-text': GenericText,
    'generic-multi-select-combo': GenericMultiSelectCombo,
    'generic-radio-button': GenericRadioButton
  },

  computed: {
    ...mapGetters({
      getTasks: 'dashboard/getTasks',
      getFilter: 'dashboard/getFilter'
    }),
    items () {
      return this.getTasks?.gerentes.map((user, index) => ({
        id: index,
        label: user.nome,
        value: user.nome
      }))
    }
  },

  data () {
    return {
      periods: [
        {
          id: '1',
          label: 'Hora'
        },
        {
          id: '2',
          label: 'Dia'
        },
        {
          id: '3',
          label: 'Semana'
        },
        {
          id: '4',
          label: 'Mês'
        },
        {
          id: '5',
          label: 'Ano'
        }
      ]
    }
  },

  methods: {
    ...mapActions({
      setPeriodMode: 'dashboard/setPeriodMode',
      setCell: 'dashboard/setCell',
      setFilter: 'dashboard/setFilter',
      setGridRows: 'dashboard/setGridRows'
    }),

    castPeriod (period) {
      if (period === 'Hora') return 'hour'
      if (period === 'Dia') return 'day'
      if (period === 'Semana') return 'week'
      if (period === 'Mês') return 'month'
      if (period === 'Ano') return 'year'
      return period
    },

    setSelectedPeriod (event) {
      this.setPeriodMode(this.castPeriod(event))
    },

    setSelectedCel (cel) {
      this.setFilter(cel)
    },

    set2Grid () {
      const rows = '2'
      let grid2 = document.getElementById('grid-2')
      let grid4 = document.getElementById('grid-4')
      if (grid2.classList.contains('active')) {
        grid2.classList.remove('active')
      }else {
        grid2.classList.add('active')
        grid4.classList.remove('active')
        this.setGridRows(rows)
      }
    },

    set4Grid () {
      const rows = '4'
      let grid4 = document.getElementById('grid-4')
      let grid2 = document.getElementById('grid-2')
      if (grid4.classList.contains('active')) {
        grid4.classList.remove('active')
      }else {
        grid4.classList.add('active')
        grid2.classList.remove('active')
        this.setGridRows(rows)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $icon-size: 22px;
  $time: all 200ms;
  $red: #b0042b;
  $gray: #C0C4CC;
  $half: 25%;
  $full: 100%;

  .dashboard-header {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 40px;

    .header-texts {
      .header-title {
        margin-bottom: 7px;
      }
    }

    .header-selection {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 30px;
      .selection-text {
        margin-right: 10px;
        margin-left: 10px;
      }
      .grid-action {
        margin-left: 10px;
        display: flex;
        .menu-icon {
          font-size: $icon-size;
          cursor: pointer;
          transition: $time;
          color: $gray;
          &:hover {
            color: $red;
          }
          &:visited {
            color: $red;
          }
        }
        .active {
          color: $red;
        }
        .grid-icon {
          margin-left: 10px;
          font-size: $icon-size;
          cursor: pointer;
          transition: $time;
          &:hover {
            color: $red;
          }
        }
      }
    }
  }
</style>
