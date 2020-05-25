export default {
  dashboard: {
    mode: '',
    cell: [],
    gridRows: '2',
    tasks: [
      {
        id: '1',
        name: 'Hello',
        start: '2019-01-01',
        end: '2019-01-05',
        progress: 10,
        custom_class: 'bar-style'
      },
      {
        id: '2',
        name: 'World',
        start: '2019-01-05',
        end: '2019-01-10',
        progress: 20,
        dependencies: '1',
        custom_class: 'bar-style'
      },
      {
        id: '3',
        name: 'From',
        start: '2019-01-10',
        end: '2019-01-15',
        progress: 30,
        dependencies: '2',
        custom_class: 'bar-style'
      },
      {
        id: '4',
        name: 'Lloyd',
        start: '2019-01-15',
        end: '2019-01-20',
        progress: 40,
        dependencies: '3',
        custom_class: 'bar-style'
      },
      {
        id: '5',
        name: 'Lloyd',
        start: '2019-01-15',
        end: '2019-01-20',
        progress: 40,
        dependencies: '4',
        custom_class: 'bar-style'
      },
      {
        id: '6',
        name: 'Lloyd',
        start: '2019-01-15',
        end: '2019-01-20',
        progress: 40,
        dependencies: '5',
        custom_class: 'bar-style'
      }
    ]
  }
}
