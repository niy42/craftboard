import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { fireEvent } from '@testing-library/dom';
import TaskForm from '../src/components/TaskForm';
import { test } from '@jest/globals';
// import { test } from 'jest'; // Jest's test function is globally available

test('renders task form and submits', () => {
  render(<TaskForm />);
  fireEvent.change(screen.getByPlaceholderText('Task Name'), { target: { value: 'Test Task' } });
  fireEvent.click(screen.getByText('Create Task'));
  expect(screen.getByPlaceholderText('Task Name')).toHaveValue('');
});

function expect(element: any) {
  return {
    toHaveValue: (value: any) => {
      if (element.value !== value) {
        throw new Error(`Expected element to have value ${value}, but got ${element.value}`);
      }
    }
  };
}