import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  Step,
  Box,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const socket = io('http://localhost:3005');
const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'description' },
  { title: 'Third', description: 'Select Rooms' },
];

function Rider() {
  const { activeStep } = useSteps({
    initialStep: 1, // Set the initial active step
    steps: steps.length,
  });

  const [availableRides, setAvailableRides] = useState([]);

  useEffect(() => {
    socket.on('rides', (rides) => {
      setAvailableRides(rides);
    });
  }, []);

  return (
    <main className="min-h-screen dark:bg-[#37304E] flex">
      <div className="w-2/5 p-4 bg-gray-200 dark:bg-gray-800">
        <div className="flex flex-col justify-center mt-8 w-full h-22 relative">
          <Accordion allowToggle className='bg-gray-400'>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Stepper size="lg" colorScheme="yellow" activeStep={activeStep}>
                      {steps.map((step, index) => (
                        <Step key={index}>
                          <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                          </Box>
                          {index < steps.length - 1 && (
                            <StepSeparator
                              className={
                                index === activeStep - 1
                                  ? 'bg-yellow-500'
                                  : index === activeStep
                                  ? 'bg-yellow-500'
                                  : 'bg-gray-300'
                              }
                            />
                          )}
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <h2>Test</h2>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="w-3/5 p-4">
        {/* google map */}
        <div className="flex justify-center p-2 mt-2">Map Section</div>
      </div>
    </main>
  );
}

export default Rider;
