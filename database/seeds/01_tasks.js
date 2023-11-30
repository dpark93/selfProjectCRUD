/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    {todo_ID: 1, task: 'wash dishes'},
    {todo_ID: 2, task: 'laundry'},
    {todo_ID: 3, task: 'yard'},
  ]);
};
