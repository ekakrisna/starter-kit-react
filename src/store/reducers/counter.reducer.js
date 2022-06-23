import {
  COUNTER_DECREMENT,
  COUNTER_DECREMENT_WITH_VALUE,
  COUNTER_INCREMENT,
  COUNTER_INCREMENT_WITH_VALUE,
} from '../actions';

const initialState = 0;

const counterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COUNTER_INCREMENT:
      return Number((state += 1));

    case COUNTER_DECREMENT:
      return Number((state -= 1));

    case COUNTER_INCREMENT_WITH_VALUE:
      return Number(state + Number(payload));

    case COUNTER_DECREMENT_WITH_VALUE:
      return Number(state - Number(payload));

    default:
      return Number(state);
  }
};

export default counterReducer;
