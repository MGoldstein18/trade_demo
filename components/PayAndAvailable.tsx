import { HStack, Text, Spacer } from '@chakra-ui/react';

const PayAndAvailable = ({
  pay,
  amount,
  currency
}: {
  pay: string;
  amount: string;
  currency: string;
}) => {
  return (
    <HStack>
      <Text color={'#6f708e'} fontSize={'24px'}>
        {pay}:
      </Text>
      <Spacer />
      <Text color={'#6f708e'} fontSize={'24px'}>
        Available:{' '}
      </Text>
      <Text fontSize={'24px'} display={'inline'} color='#ffffff'>
        {amount} {currency}
      </Text>
    </HStack>
  );
};

export default PayAndAvailable;
