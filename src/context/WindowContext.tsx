import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

interface WindowWidthContextProps {
  width: number;
  showChatBar: boolean;
  toggleChatBar: () => void;
  setChatBar: (value: boolean) => void;
}

const WindowWidthContext = createContext<WindowWidthContextProps | undefined>(
  undefined
);

const WindowWidthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [width, setWidth] = useState<number>(0);
  const [showChatBar, setShowChatBar] = useState<boolean>(true);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const toggleChatBar = () => {
    setShowChatBar((prev) => !prev);
  };

  const setChatBar = (value: boolean) => {
    setShowChatBar(value);
  };

  return (
    <WindowWidthContext.Provider
      value={{ width, setChatBar, toggleChatBar, showChatBar }}
    >
      {children}
    </WindowWidthContext.Provider>
  );
};

const useWindowWidth = (): WindowWidthContextProps => {
  const context = useContext(WindowWidthContext);
  if (context === undefined) {
    throw new Error('useWindowWidth must be used within a WindowWidthProvider');
  }
  return context;
};

export { WindowWidthProvider, useWindowWidth };
