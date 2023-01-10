'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
    queryInterface.bulkInsert('Modulos', [
      {
        //id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'home',
        link : '/inicio'
      },
      {
        //id      : 'sgsst',
        title   : 'sgsst',
        type    : 'collapsable',
        icon    : 'archive',
        link    : '/apps/help-center',
      },
      {
        //id   : 'planear',
        title: 'Planear',
        type : 'basic',
        icon : 'chart-bar',
        link : '/estandar/planear',
        parent : 'sgsst'
      },
      {
        //id   : 'hacer',
        title: 'Hacer',
        type : 'basic',
        icon : 'pencil-alt',
        link : '/estandar/hacer',
        parent : 'sgsst'
      },
      {
        //id   : 'verificar',
        title: 'Verificar',
        type : 'basic',
        icon : 'clipboard-list',
        link : '/estandar/verificar',
        parent : 'sgsst'
      },
      {
        //id   : 'actuar',
        title: 'Actuar',
        type : 'basic',
        icon : 'presentation-chart-bar',
        link : '/estandar/actuar',
        parent : 'sgsst'
      },
      {
        //id   : 'pesv',
        title: 'PESV',
        type : 'basic',
        icon : 'view-grid-add',
        link : '/pesv'
      },
      {
        //id   : 'calendario',
        title: 'Calendario',
        type : 'basic',
        icon : 'calendar',
        link : '/calendario'
      },
      {
        //id      : 'configuracion',
        title   : 'Configuracion',
        type    : 'collapsable',
        icon    : 'support',
        link    : '/apps/help-center',
      },
      {
        //id   : 'usuarios',
        title: 'Usuarios',
        type : 'basic',
        icon : 'users',
        link : '/usuarios',
        parent: 'Configuracion'
      },
      {
        //id   : 'maestros',
        title: 'Maestros',
        type : 'basic',
        icon : 'clipboard-list',
        link : '/maestros',
        parent: 'Configuracion'
      }

    ],{});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
