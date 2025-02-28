import React, { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="container mx-auto px-4">
    {children}
  </div>
  // <div style={{ margin: '0 auto', maxWidth: '800px' }}>
  //   {children}
  // </div>
)

export default Container

