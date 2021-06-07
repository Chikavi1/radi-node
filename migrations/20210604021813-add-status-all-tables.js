'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.describeTable('Adoptions').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 1');
        return queryInterface.addColumn(
          'Adoptions',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Isolations').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 2');
        return queryInterface.addColumn(
          'Isolations',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Organizations').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 3');
        return queryInterface.addColumn(
          'Organizations',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Pets').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 4');
        return queryInterface.addColumn(
          'Pets',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Products').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 5');
        return queryInterface.addColumn(
          'Products',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Reservations').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 6');
        return queryInterface.addColumn(
          'Reservations',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Services').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 7');
        return queryInterface.addColumn(
          'Services',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Users').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 8');
        return queryInterface.addColumn(
          'Users',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Vaccines').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 9');
        return queryInterface.addColumn(
          'Vaccines',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      }),
      queryInterface.describeTable('Vets').then(tableDefinition => {
        if (tableDefinition['status']) return Promise.resolve();
        
        console.log('no tenemos status 10');
        return queryInterface.addColumn(
          'Vets',
          'status',
          {type: Sequelize.INTEGER, allowNull: true}
        );
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('Adoptions', 'status'),
      await queryInterface.removeColumn('Isolations', 'status'),
      await queryInterface.removeColumn('Organizations', 'status'),
      await queryInterface.removeColumn('Pets', 'status'),
      await queryInterface.removeColumn('Products', 'status'),
      await queryInterface.removeColumn('Reservations', 'status'),
      await queryInterface.removeColumn('Services', 'status'),
      await queryInterface.removeColumn('Users', 'status'),
      await queryInterface.removeColumn('Vaccines', 'status'),
      await queryInterface.removeColumn('Vets', 'status')
    ]);
  }
};
