import React from 'react';
import { LoaderCircle } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center z-50">
      <LoaderCircle className="animate-spin text-green-500 w-20 h-20" />
    </div>
  );
};

export default Loading;