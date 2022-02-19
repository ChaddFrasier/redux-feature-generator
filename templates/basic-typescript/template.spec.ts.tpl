import ${featureNameLowercase}Reducer, {
    fetchLinkAsync,
    updateState,
    ${featureNameLowercase}State,
  } from './${featureNameLowercase}Slice';
  
  describe('template reducer', () => {
    const initialState: ${featureNameLowercase}State = {
      status: 'idle',
    };
    it('should handle initial state', () => {
      expect(${featureNameLowercase}Reducer(undefined, { type: 'unknown' })).toEqual({
        status: 'idle',
      });
    });
  
    it('Should update the state when told', () => {
      const actualState = ${featureNameLowercase}Reducer(initialState, updateState('fetching'))
      expect(actualState.status).toBe('fetching');
    });
  });
  