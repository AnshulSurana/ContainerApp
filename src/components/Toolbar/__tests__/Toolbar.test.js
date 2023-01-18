import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toolbar from '..';

describe('Toolbar', () => {
  it('Should not render when there is no microUI', () => {
    window.ad_micro_env = 'production';
    render(<Toolbar />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('Should not render in production', () => {
    window.ad_micro_env = 'production';
    window.sessionStorage.setItem(
      `micro_myapp_url_host`,
      'http://localhost:8080'
    );
    render(<Toolbar />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('Should render when there is a microUI', async () => {
    window.ad_micro_env = 'test';
    window.sessionStorage.setItem(
      `micro_myapp_url_host`,
      'http://localhost:8080'
    );
    render(<Toolbar />);
    expect(screen.queryByRole('button')).toBeVisible();
  });

  it('Should display extended when I click the toolbar button', () => {
    window.ad_micro_env = 'test';
    window.sessionStorage.setItem(
      `micro_myapp_url_host`,
      'http://localhost:8080'
    );
    render(<Toolbar />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Connected MicroUIs')).toBeVisible();
  });

  it('Should display MicroUIs when extended', () => {
    window.ad_micro_env = 'test';
    window.sessionStorage.setItem(
      `micro_myapp_url_host`,
      'http://localhost:8080'
    );
    render(<Toolbar />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Name: myapp_url')).toBeVisible();
    expect(screen.getByText('Host: http://localhost:8080')).toBeVisible();
  });

  it('Should not display MicroUIs when closed', () => {
    window.ad_micro_env = 'test';
    window.sessionStorage.setItem(
      `micro_myapp_url_host`,
      'http://localhost:8080'
    );
    render(<Toolbar />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByText('Name: myapp_url')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Host: http://localhost:8080')
    ).not.toBeInTheDocument();
  });

  it('Should remove MicroUIs from session storage when I click on disconnect', () => {
    window.ad_micro_env = 'test';
    window.sessionStorage.setItem(
      `micro_myapp_url_host`,
      'http://localhost:8080'
    );
    render(<Toolbar />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Disconnect All'));
    expect(window.sessionStorage.getItem(`micro_myapp_url_host`)).toBeNull();
  });
});
