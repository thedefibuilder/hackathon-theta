import EReducerState from '@/lib/reducer-state';

const generateContractInitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  contractCode: null as string | null
};

type TGenerateContractState = typeof generateContractInitialState;

type TGenerateContractAction = {
  state: EReducerState;
  payload: string | null;
};

function generateContractReducer(state: TGenerateContractState, action: TGenerateContractAction) {
  switch (action.state) {
    case EReducerState.start: {
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        contractCode: null
      };
    }
    case EReducerState.success: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        contractCode: action.payload
      };
    }
    case EReducerState.error: {
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        contractCode: null
      };
    }
    case EReducerState.reset: {
      return {
        isLoading: false,
        isError: false,
        isSuccess: false,
        contractCode: null
      };
    }
    default: {
      return state;
    }
  }
}

export type { TGenerateContractState, TGenerateContractAction };
export { generateContractInitialState, generateContractReducer };
