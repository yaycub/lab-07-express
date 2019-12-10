const Attempt = require('./Attempt');

describe('Attempt Model', () => {
  it('has a required recipeId', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();

    expect(errors.recipeId.message).toEqual('Path `recipeId` is required.');
  });

  it('has a recipeId and no dateOfEvent', () => {
    const attempt = new Attempt({ recipeId: 24 });
    const { errors } = attempt.validateSync();

    expect(errors.dateOfEvent.message).toEqual('Path `dateOfEvent` is required.');
  });

  it('has a recipeId and dateOfEvent, but no notes', () => {
    const attempt = new Attempt({ recipeId: 24, dateOfEvent: '2019-12-10' });
    const { errors } = attempt.validateSync();

    expect(errors.notes.message).toEqual('Path `notes` is required.');
  });

  it('has a recipeId, dateOfEvent, and notes, but no rating', () => {
    const attempt = new Attempt({ recipeId: 24, dateOfEvent: '2019-12-10', notes: 'it was a good recipe' });
    const { errors } = attempt.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });
});
