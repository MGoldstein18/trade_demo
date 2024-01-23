import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Input,
  Spacer,
  Text,
  IconButton,
  Icon,
  VStack
} from '@chakra-ui/react';
import CurrencyBox from '../components/CurrencyBox';
import PayAndAvailable from '../components/PayAndAvailable';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { ConnectWallet, useAddress, useBalance } from '@thirdweb-dev/react';

const SwitchIconComponent = () => {
  return <Icon color='white' size='lg' as={HiOutlineSwitchVertical} />;
};

const Home = () => {
  const USDC_TOKEN_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
  const USDT_TOKEN_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  const DAI_TOKEN_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

  const [pay, setPay] = useState('0');
  const [paySelected, setPaySelected] = useState<'USDC' | 'USDT' | 'DAI'>(
    'USDC'
  );

  const [receive, setReceive] = useState('0');
  const [receiveSelected, setReceiveSelected] = useState<
    'USDC' | 'USDT' | 'DAI'
  >('USDC');

  const address = useAddress();

  const usdcBalance = useBalance(USDC_TOKEN_ADDRESS);
  const usdtBalance = useBalance(USDT_TOKEN_ADDRESS);
  const daiBalance = useBalance(DAI_TOKEN_ADDRESS);

  const [payBalance, setPayBalance] = useState('0');
  const [receiveBalance, setReceiveBalance] = useState('0');

  const updateBalance = ({
    currency,
    pay
  }: {
    currency: 'USDC' | 'USDT' | 'DAI';
    pay: boolean;
  }) => {
    if (pay) {
      if (currency === 'USDC') {
        setPayBalance(usdcBalance.data?.displayValue || '0');
      } else if (currency === 'USDT') {
        setPayBalance(usdtBalance.data?.displayValue || '0');
      } else if (currency === 'DAI') {
        setPayBalance(daiBalance.data?.displayValue || '0');
      }
    }
    if (!pay) {
      if (currency === 'USDC') {
        setReceiveBalance(usdcBalance.data?.displayValue || '0');
      } else if (currency === 'USDT') {
        setReceiveBalance(usdtBalance.data?.displayValue || '0');
      } else if (currency === 'DAI') {
        setReceiveBalance(daiBalance.data?.displayValue || '0');
      }
    }
  };

  useEffect(() => {
    updateBalance({ currency: paySelected, pay: true });
    updateBalance({ currency: receiveSelected, pay: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    usdcBalance,
    usdtBalance,
    daiBalance,
    paySelected,
    receiveSelected
  ]);

  const onPaySelectedChange = (pay: 'USDC' | 'USDT' | 'DAI') => {
    updateBalance({ currency: pay, pay: true });
    setPaySelected(pay);
  };

  const onReceiveSelectedChange = (receive: 'USDC' | 'USDT' | 'DAI') => {
    updateBalance({ currency: receive, pay: false });
    setReceiveSelected(receive);
  };

  const onSwitch = () => {
    const tempPaySelected = paySelected;
    const tempReceiveSelected = receiveSelected;

    setPaySelected(tempReceiveSelected);
    setReceiveSelected(tempPaySelected);
  };
  return (
    <Box height='100vh' bgColor={'#131126'}>
      <Grid
        templateAreas={`"empty empty"
                  "sideEmpty heading"
                  "sideEmpty trade"`}
        gridTemplateRows={'1fr 2fr 6fr'}
        gridTemplateColumns={'1fr 6fr 1fr'}
        gap={'50'}
      >
        <GridItem area='empty'></GridItem>
        <GridItem area='sideEmpty'></GridItem>
        <GridItem area='heading'>
          <Heading textAlign={'start'} fontSize='96px' color={'#ffffff'}>
            Trade
          </Heading>
        </GridItem>
        <GridItem area='trade'>
          <Box>
            <CurrencyBox>
              <PayAndAvailable
                pay='Pay'
                amount={payBalance}
                currency={paySelected}
              />
              <Spacer />
              <HStack>
                <Input
                  variant='unstyled'
                  fontWeight={'bold'}
                  placeholder='0'
                  border={'none'}
                  maxWidth={'-webkit-fit-content'}
                  fontSize={'48px'}
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                  color='#7f86ac'
                />
                <Spacer />
                <HStack>
                  <Button
                    width={'150px'}
                    _hover={{ backgroundColor: '#40407c' }}
                    size={'lg'}
                    padding={5}
                    color='#ffffff'
                    bgColor={paySelected === 'USDC' ? '#40407c' : '#1a1b30'}
                    border={'1px #343361 solid'}
                    onClick={() => onPaySelectedChange('USDC')}
                  >
                    <HStack>
                      <Image width={'7'} src='/USDC logo.svg' alt='usdc logo' />
                      <Spacer />
                      <Text>USDC</Text>
                    </HStack>
                  </Button>
                  <Button
                    width={'150px'}
                    onClick={() => onPaySelectedChange('USDT')}
                    bgColor={paySelected === 'USDT' ? '#40407c' : '#1a1b30'}
                    _hover={{ backgroundColor: '#40407c' }}
                    size={'lg'}
                    padding={5}
                    color='#ffffff'
                    border={'1px #343361 solid'}
                  >
                    <HStack>
                      <Image width={'7'} src='/tether.svg' alt='usdc logo' />
                      <Spacer />
                      <Text>Tether</Text>
                    </HStack>
                  </Button>
                  <Button
                    width={'150px'}
                    size={'lg'}
                    padding={5}
                    color='#ffffff'
                    onClick={() => onPaySelectedChange('DAI')}
                    bgColor={paySelected === 'DAI' ? '#40407c' : '#1a1b30'}
                    _hover={{ backgroundColor: '#40407c' }}
                    border={'1px #343361 solid'}
                  >
                    <HStack>
                      <Image width={'7'} src='/dai.svg' alt='usdc logo' />
                      <Spacer />
                      <Text>Dai</Text>
                    </HStack>
                  </Button>
                </HStack>
              </HStack>
            </CurrencyBox>
            <VStack>
              <IconButton
                onClick={onSwitch}
                size={'lg'}
                m={'-15'}
                zIndex={10}
                position={'relative'}
                _hover={{ backgroundColor: '#131126' }}
                background={'#40407c'}
                aria-label='Switch'
                icon={<SwitchIconComponent />}
              />
            </VStack>
            <CurrencyBox>
              <PayAndAvailable
                pay='Receive'
                amount={receiveBalance}
                currency={receiveSelected}
              />
              <HStack>
                <Input
                  variant='unstyled'
                  fontWeight={'bold'}
                  placeholder='0'
                  border={'none'}
                  maxWidth={'-webkit-fit-content'}
                  fontSize={'48px'}
                  value={receive}
                  onChange={(e) => setReceive(e.target.value)}
                  color='#7f86ac'
                />
                <Spacer />
                <HStack>
                  <Button
                    width={'150px'}
                    _hover={{ backgroundColor: '#40407c' }}
                    size={'lg'}
                    padding={5}
                    color='#ffffff'
                    bgColor={receiveSelected === 'USDC' ? '#40407c' : '#1a1b30'}
                    border={'1px #343361 solid'}
                    onClick={() => onReceiveSelectedChange('USDC')}
                  >
                    <HStack>
                      <Image width={'7'} src='/USDC logo.svg' alt='usdc logo' />
                      <Spacer />
                      <Text>USDC</Text>
                    </HStack>
                  </Button>
                  <Button
                    width={'150px'}
                    onClick={() => onReceiveSelectedChange('USDT')}
                    bgColor={receiveSelected === 'USDT' ? '#40407c' : '#1a1b30'}
                    _hover={{ backgroundColor: '#40407c' }}
                    size={'lg'}
                    padding={5}
                    color='#ffffff'
                    border={'1px #343361 solid'}
                  >
                    <HStack>
                      <Image width={'7'} src='/tether.svg' alt='usdc logo' />
                      <Spacer />
                      <Text>Tether</Text>
                    </HStack>
                  </Button>
                  <Button
                    width={'150px'}
                    size={'lg'}
                    padding={5}
                    color='#ffffff'
                    onClick={() => onReceiveSelectedChange('DAI')}
                    bgColor={receiveSelected === 'DAI' ? '#40407c' : '#1a1b30'}
                    _hover={{ backgroundColor: '#40407c' }}
                    border={'1px #343361 solid'}
                  >
                    <HStack>
                      <Image width={'7'} src='/dai.svg' alt='usdc logo' />
                      <Spacer />
                      <Text>Dai</Text>
                    </HStack>
                  </Button>
                </HStack>
              </HStack>
            </CurrencyBox>
            <ConnectWallet
              style={{
                padding: '30',
                fontSize: '24px',
                borderRadius: '10',
                marginTop: '30px',
                width: '100%',
                backgroundColor: '#2151ef',
                color: '#FFF'
              }}
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
