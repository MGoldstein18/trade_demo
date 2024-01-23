import { Box } from '@chakra-ui/react';

const CurrencyBox = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      py={5}
      px={10}
      rounded='30'
      mb='3px'
      bgColor={'#1a1b30'}
      width={'100%'}
    >
      {children}
    </Box>
  );
};

export default CurrencyBox;
