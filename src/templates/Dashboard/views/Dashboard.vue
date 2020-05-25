<template>
  <div class="dashboard">
    <navbar></navbar>
    <dashboard-header></dashboard-header>
    <div :class="grid">
      <div class="cointainer-gantt">
        <div class="left-text-1" v-if="getCell.includes('sc1')">
          <p class="sc1">SC1</p>
          <frappe-gantt
            class="gantt-graph"
            :view-mode="getPeriodMode"
            :tasks="getTasks"
            @task-updated="debugEventLog.push($event)"
            @task-date-updated="debugEventLog.push($event)"
            @task-progress-change="debugEventLog.push($event)"
          ></frappe-gantt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/molecules/Navbar'
import DashboardHeader from '@/components/molecules/DashboardHeader'
import FrappeGantt from '@/components/atoms/FrappeGantt'
import uuidv4 from 'uuid/v4';
export default {
  name: 'dashboard',

  components: {
    'navbar': Navbar,
    'dashboard-header': DashboardHeader,
    'frappe-gantt': FrappeGantt
  },

  computed: {
    ...mapGetters({
      getPeriodMode: 'dashboard/getPeriodMode',
      getCell: 'dashboard/getCell',
      getTasks: 'dashboard/getTasks',
      getGridRows: 'dashboard/getGridRows'
    }),
    
  },

  methods: {
    addRandomTask () {
      const id = uuidv4();
      this.tasks.push({
        id: id,
        name: id,
        start: '2019-01-01',
        end: '2019-01-05',
        progress: Math.random() * 100,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin area-graph-style {
    display: flex;
    align-items: center;
    background-color: white;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    padding-left: 20px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    margin-top: 20px;
  }
  .dashboard {
    .cointainer-gantt {
      margin: 30px;
      padding: 30px;
      -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      -ms-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      -o-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      -ms-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      -o-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      display: block;
    }
    .grid-4-rows {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 40px;
      .left-content {
        margin-top: 20px;
        max-width: 98%;

        .left-text-1, .left-text-3 {
          .sc1, .sc3 {
            @include area-graph-style;
          }
        }
      }
      .right-content {
        margin-top: 20px;
        max-width: 98%;

        .right-text-2, .right-text-4 {
          .sc2, .sc4 {
            @include area-graph-style;
          }
        }
      }
    }
    
    .grid-2-rows {
      display: flex;
      justify-content: center;
      max-width: 100%;
      margin: 20px;
      .left-content {
        margin-top: 20px;
        max-width: 48%;
        margin-right: 10px;

        .left-text-1, .left-text-3 {
          .sc1, .sc3 {
            @include area-graph-style;
          }
        }
      }
      .right-content {
        margin-top: 20px;
        max-width: 48%;
        margin-left: 10px;

        .right-text-2, .right-text-4 {
          .sc2, .sc4 {
            @include area-graph-style;
          }
        }
      }
    }
  }
</style>
