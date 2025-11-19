export const STATUS_CONFIG = {
      pending : {
            label : '시작 전',
            color : '#649ffffb',
            next : 'inProgress'
      },
      inProgress : {
            label : '진행중',
            color : '#ff5c5c',
            next : 'completed'
      },
      completed : {
            label : '완료',
            color : '#00cb1b',
            next : 'pending'
      }
}