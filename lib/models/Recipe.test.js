const mongoose = require('mongoose');
const Recipe = require('./Recipe');

describe('Recipe model', () => {
  it('has a required name', () => {
    const recipe = new Recipe();
    const { errors } = recipe.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name, ingrediends and directions field', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [
        { name: 'milk', measurement: 'cups', amount: 2 },
        { name: 'sugar', measurement: 'cups', amount: 1.5 }
      ]
    });

    expect(recipe.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [
        { _id: expect.any(mongoose.Types.ObjectId), name: 'milk', measurement: 'cups', amount: 2 },
        { _id: expect.any(mongoose.Types.ObjectId), name: 'sugar', measurement: 'cups', amount: 1.5 }
      ],
    });
  });
});
