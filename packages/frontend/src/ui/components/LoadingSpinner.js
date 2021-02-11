import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { theme } from '../theme'

const LoadingSpinner = () => 
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
      <PulseLoader loading="true" color={theme.colors.primary} />
      </div>

    </div>

export default LoadingSpinner;
