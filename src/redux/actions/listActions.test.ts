import { addToList, removeFromList } from './listsActions';

describe('list actions', () => {
  test('add to list should create object with correct data', () => {
    const result = addToList('film id', 'film category');
    expect(result).toEqual({
      type: 'ADD_TO_LIST',
      payload: {
        id: 'film id',
        category: 'film category',
      },
    });
  });

  test('remove from list should create object with correct data', () => {
    const result = removeFromList('film id', 'film category');
    expect(result).toEqual({
      type: 'REMOVE_FROM_LIST',
      payload: {
        id: 'film id',
        category: 'film category',
      },
    });
  });
});
